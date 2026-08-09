import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import PrototypeBadge from '../components/PrototypeBadge';
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, History, ShieldAlert, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

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
      setServerError(err.response?.data?.message || 'Failed to complete parameter analysis. Please check input values.');
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

  const getQualityBadgeColor = (quality) => {
    if (quality === 'Good') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (quality === 'Moderate') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getPollutionBadgeColor = (pollution) => {
    if (pollution === 'Low') return 'bg-emerald-50 text-emerald-700';
    if (pollution === 'Medium') return 'bg-amber-50 text-amber-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
            <Activity className="w-5 h-5" />
            <span>Method 1</span>
          </div>
          <PrototypeBadge text="ML Model Coming Soon" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Parameter-Based Wastewater Analysis
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Enter basic wastewater parameters (pH and Total Dissolved Solids) to receive a preliminary quality assessment and prototype treatment recommendation.
        </p>
      </div>

      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Form or Result View */}
      {!result ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* pH Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  pH Balance <span className="text-red-500">*</span>
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
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.pH ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-teal-500'
                    } focus:outline-none focus:ring-2 text-slate-900 font-medium placeholder-slate-400`}
                  />
                  <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-semibold">pH Scale</span>
                </div>
                {errors.pH ? (
                  <p className="text-xs text-red-500 font-medium">{errors.pH}</p>
                ) : (
                  <p className="text-xs text-slate-500">Valid range: 0.0 (Highly Acidic) to 14.0 (Highly Alkaline)</p>
                )}
              </div>

              {/* TDS Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Total Dissolved Solids (TDS) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={tds}
                    onChange={(e) => setTDS(e.target.value)}
                    placeholder="e.g. 450"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.tds ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-teal-500'
                    } focus:outline-none focus:ring-2 text-slate-900 font-medium placeholder-slate-400`}
                  />
                  <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-semibold">mg/L</span>
                </div>
                {errors.tds ? (
                  <p className="text-xs text-red-500 font-medium">{errors.tds}</p>
                ) : (
                  <p className="text-xs text-slate-500">Concentration in milligrams per liter (mg/L)</p>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Prototype Mode — Uses modular prototype decision engine</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing Parameters...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    <span>Analyze Parameters</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Result Page View */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Analysis Result</span>
                <h2 className="text-2xl font-bold text-slate-900">Wastewater Quality Assessment</h2>
              </div>
              <span className={`px-4 py-1.5 rounded-full border text-sm font-bold ${getQualityBadgeColor(result.qualityLevel)}`}>
                {result.qualityLevel} Quality
              </span>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">pH Level</span>
                <span className="text-2xl font-extrabold text-slate-900">{result.parameters?.pH}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Total Dissolved Solids</span>
                <span className="text-2xl font-extrabold text-slate-900">{result.parameters?.tds} <span className="text-sm font-normal text-slate-500">mg/L</span></span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block">Pollution Risk Level</span>
                <span className={`text-xl font-bold ${getPollutionBadgeColor(result.pollutionLevel)} inline-block px-2.5 py-0.5 rounded mt-1`}>
                  {result.pollutionLevel} Pollution
                </span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Recommended Treatment Guidelines</span>
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {result.recommendations?.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Prototype Recommendation Disclaimer</span>
                <span>Prototype recommendation only. Final treatment decisions must be based on laboratory testing and qualified environmental professionals.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Automatically saved to MongoDB history</span>
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Analyze Again</span>
                </button>

                <Link
                  to="/history"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-1.5"
                >
                  <History className="w-4 h-4" />
                  <span>View History</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterAnalysis;
