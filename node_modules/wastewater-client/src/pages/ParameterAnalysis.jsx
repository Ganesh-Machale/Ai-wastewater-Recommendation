import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  Activity,
  AlertTriangle,
  RefreshCw,
  History,
  ShieldAlert,
  ArrowUpRight,
  Check
} from 'lucide-react';

const ParameterAnalysis = () => {
  const navigate = useNavigate();
  const [pH, setPH] = useState('');
  const [tds, setTds] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (pH === '' || pH === null || pH === undefined) {
      newErrors.pH = 'pH value is required';
    } else {
      const numPH = Number(pH);
      if (isNaN(numPH)) {
        newErrors.pH = 'pH must be a valid number';
      } else if (numPH < 0 || numPH > 14) {
        newErrors.pH = 'pH must be between 0.0 and 14.0';
      }
    }

    if (tds === '' || tds === null || tds === undefined) {
      newErrors.tds = 'TDS value is required';
    } else {
      const numTDS = Number(tds);
      if (isNaN(numTDS)) {
        newErrors.tds = 'TDS must be a valid number';
      } else if (numTDS < 0) {
        newErrors.tds = 'TDS must be a non-negative number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post('/analysis/parameters', {
        pH: Number(pH),
        tds: Number(tds),
      });

      if (res.data.success) {
        setResult(res.data.data);
      }
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          'Failed to complete parameter analysis. Please check input values.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPH('');
    setTds('');
    setResult(null);
    setErrors({});
    setServerError(null);
  };

  // ChaiUI: Status is text and thin outline, never filled status pills
  const getQualityStyle = (quality) => {
    if (quality === 'Good') return 'text-emerald-400 border border-emerald-500/30';
    if (quality === 'Moderate') return 'text-amber-400 border border-amber-500/30';
    return 'text-red-400 border border-red-500/30';
  };

  const getPollutionStyle = (pollution) => {
    if (pollution === 'Low') return 'text-emerald-400 border border-emerald-500/30';
    if (pollution === 'Medium') return 'text-amber-400 border border-amber-500/30';
    return 'text-red-400 border border-red-500/30';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
            <Activity className="size-4 text-neutral-300" />
            <span>Method 01</span>
          </div>
          <AnimatedBadge>Trained ML models next</AnimatedBadge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          Parameter-based wastewater analysis
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans">
          Enter chemical indicators to receive a preliminary quality assessment and <span className="highlight">recommended treatment advisory</span>.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 text-sm flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Form or Result View */}
      {!result ? (
        <div className="card-chai p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* pH Input */}
              <div className="space-y-2">
                <label className="block text-xs font-montserrat font-medium text-foreground">
                  pH balance <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={pH}
                    onChange={(e) => setPH(e.target.value)}
                    placeholder="e.g. 7.2"
                    className={`w-full px-4 py-2.5 rounded-md border ${
                      errors.pH ? 'border-red-500' : 'border-[var(--card-edge)]'
                    } bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors`}
                  />
                  <span className="absolute right-3.5 top-3 text-[11px] font-mono text-neutral-400">
                    scale
                  </span>
                </div>
                {errors.pH ? (
                  <p className="text-xs text-red-400">{errors.pH}</p>
                ) : (
                  <p className="text-xs text-neutral-400">Standard range: 0.0 to 14.0 (Neutral: 7.0)</p>
                )}
              </div>

              {/* TDS Input */}
              <div className="space-y-2">
                <label className="block text-xs font-montserrat font-medium text-foreground">
                  Total Dissolved Solids (TDS) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={tds}
                    onChange={(e) => setTds(e.target.value)}
                    placeholder="e.g. 450"
                    className={`w-full px-4 py-2.5 rounded-md border ${
                      errors.tds ? 'border-red-500' : 'border-[var(--card-edge)]'
                    } bg-card text-foreground placeholder-neutral-500 focus:outline-none focus:border-neutral-400 text-sm font-sans transition-colors`}
                  />
                  <span className="absolute right-3.5 top-3 text-[11px] font-mono text-neutral-400">
                    mg/L
                  </span>
                </div>
                {errors.tds ? (
                  <p className="text-xs text-red-400">{errors.tds}</p>
                ) : (
                  <p className="text-xs text-neutral-400">Concentration in milligrams per liter (mg/L)</p>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[var(--card-edge)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-sans">
                Evaluation engine: calibrated against CPCB effluent standards
              </span>

              {/* The solid asymmetric button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-asym inline-flex h-9 items-center gap-2 bg-neutral-900 px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit sample</span>
                    <ArrowUpRight className="-ml-1 size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Result Page View */
        <div className="card-chai p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-4">
            <div>
              <span className="text-xs font-mono text-neutral-400">Analysis result</span>
              <h2 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground">
                Wastewater quality assessment
              </h2>
            </div>
            <span
              className={`px-3 py-1 rounded text-xs font-montserrat font-medium ${getQualityStyle(
                result.qualityLevel
              )}`}
            >
              {result.qualityLevel} quality
            </span>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20">
              <span className="text-xs font-mono text-neutral-400 block">pH Level</span>
              <span className="font-montserrat text-2xl font-semibold text-foreground">
                {result.parameters?.pH}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20">
              <span className="text-xs font-mono text-neutral-400 block">Total Dissolved Solids</span>
              <span className="font-montserrat text-2xl font-semibold text-foreground">
                {result.parameters?.tds}{' '}
                <span className="text-xs font-normal text-neutral-400">mg/L</span>
              </span>
            </div>

            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20">
              <span className="text-xs font-mono text-neutral-400 block">Pollution risk level</span>
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-montserrat font-medium mt-1.5 ${getPollutionStyle(
                  result.pollutionLevel
                )}`}
              >
                {result.pollutionLevel} risk
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-3 pt-2">
            <h3 className="font-montserrat text-sm font-semibold text-foreground">
              Recommended treatment guidelines
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 p-4 rounded-lg border border-[var(--card-edge)] bg-black/20">
              {result.recommendations?.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-card text-xs text-neutral-400 flex items-start gap-3">
            <ShieldAlert className="size-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground block mb-0.5">Advisory notice</span>
              <span>
                Prototype recommendation only. Final treatment decisions must be based on accredited laboratory testing and qualified environmental professionals.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[var(--card-edge)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <Check className="size-3.5" />
              <span>Logged to MongoDB test history</span>
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="btn-asym-mirror inline-flex h-9 items-center gap-2 border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-black/90"
              >
                <RefreshCw className="size-3.5" />
                <span>Analyze again</span>
              </button>

              <Link
                to="/history"
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <History className="size-4" />
                <span>View history</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterAnalysis;
