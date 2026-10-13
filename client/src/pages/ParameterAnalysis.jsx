import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  Activity,
  AlertTriangle,
  RefreshCw,
  History,
  ShieldCheck,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  BarChart3
} from 'lucide-react';

const ParameterAnalysis = () => {
  const navigate = useNavigate();
  // Primary parameters
  const [pH, setPH] = useState('');
  const [tds, setTds] = useState('');

  // Advanced chemical parameters
  const [turbidity, setTurbidity] = useState('');
  const [cod, setCod] = useState('');
  const [phosphate, setPhosphate] = useState('');
  const [nitrate, setNitrate] = useState('');
  const [iron, setIron] = useState('');
  const [chlorine, setChlorine] = useState('');
  const [sodium, setSodium] = useState('');

  const [showAdvanced, setShowAdvanced] = useState(false);
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
      const payload = {
        pH: Number(pH),
        tds: Number(tds),
      };

      if (turbidity !== '') payload.turbidity = Number(turbidity);
      if (cod !== '') payload.cod = Number(cod);
      if (phosphate !== '') payload.phosphate = Number(phosphate);
      if (nitrate !== '') payload.nitrate = Number(nitrate);
      if (iron !== '') payload.iron = Number(iron);
      if (chlorine !== '') payload.chlorine = Number(chlorine);
      if (sodium !== '') payload.sodium = Number(sodium);

      const res = await api.post('/analysis/parameters', payload);

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
    setTurbidity('');
    setCod('');
    setPhosphate('');
    setNitrate('');
    setIron('');
    setChlorine('');
    setSodium('');
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
            <span>AI Chemical Inference</span>
          </div>
          <AnimatedBadge>Trained Random Forest AI Model Active</AnimatedBadge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          Parameter-based wastewater analysis
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans">
          Enter effluent chemical metrics to evaluate quality with the trained Random Forest classifier and receive <span className="highlight">intelligent treatment recommendations</span>.
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
            {/* Primary Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* pH Input */}
              <div className="space-y-2">
                <label className="block text-xs font-montserrat font-medium text-foreground">
                  pH balance <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="14"
                    value={pH}
                    onChange={(e) => setPH(e.target.value)}
                    placeholder="e.g. 7.55"
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
                    placeholder="e.g. 750"
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
                  <p className="text-xs text-neutral-400">Dissolved solids concentration in milligrams per liter</p>
                )}
              </div>
            </div>

            {/* Advanced Multi-Parameter Toggle */}
            <div className="border-t border-[var(--card-edge)] pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full py-2 text-xs font-montserrat font-medium text-neutral-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="size-3.5 text-neutral-400" />
                  <span>Advanced Chemical Indicators (Optional for full 9-parameter evaluation)</span>
                </div>
                {showAdvanced ? (
                  <ChevronUp className="size-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="size-4 text-neutral-400" />
                )}
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 mt-2 border-t border-[var(--card-edge)]/40">
                  {/* COD */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      COD (Chemical Oxygen Demand)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        value={cod}
                        onChange={(e) => setCod(e.target.value)}
                        placeholder="e.g. 409 (Baseline ~395)"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">mg/L</span>
                    </div>
                  </div>

                  {/* Turbidity */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      Turbidity
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={turbidity}
                        onChange={(e) => setTurbidity(e.target.value)}
                        placeholder="e.g. 2.15"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">NTU</span>
                    </div>
                  </div>

                  {/* Phosphate */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      Phosphate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        value={phosphate}
                        onChange={(e) => setPhosphate(e.target.value)}
                        placeholder="e.g. 0.015"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">mg/L</span>
                    </div>
                  </div>

                  {/* Nitrate */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      Nitrate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        value={nitrate}
                        onChange={(e) => setNitrate(e.target.value)}
                        placeholder="e.g. 7"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">mg/L</span>
                    </div>
                  </div>

                  {/* Iron */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      Iron (Fe)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.001"
                        value={iron}
                        onChange={(e) => setIron(e.target.value)}
                        placeholder="e.g. 0.354"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">mg/L</span>
                    </div>
                  </div>

                  {/* Chlorine */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      Chlorine
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        value={chlorine}
                        onChange={(e) => setChlorine(e.target.value)}
                        placeholder="e.g. 3"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">mg/L</span>
                    </div>
                  </div>

                  {/* Sodium */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans text-neutral-300">
                      Sodium
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        value={sodium}
                        onChange={(e) => setSodium(e.target.value)}
                        placeholder="e.g. 11"
                        className="w-full px-3 py-2 rounded-md border border-[var(--card-edge)] bg-card text-foreground placeholder-neutral-600 focus:outline-none focus:border-neutral-400 text-xs font-sans"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] font-mono text-neutral-400">mg/L</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[var(--card-edge)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-sans">
                Evaluation engine: Random Forest Classifier (100 Trees, 9 Effluent Indicators)
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
                    <span>Running AI Model...</span>
                  </>
                ) : (
                  <>
                    <span>Run AI prediction</span>
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
          {/* Header & Classification Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--card-edge)] pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Cpu className="size-3.5 text-neutral-300" />
                <span>{result.modelName || 'Random Forest Classifier'}</span>
                {result.confidence && (
                  <span className="text-emerald-400">({result.confidence}% confidence)</span>
                )}
              </div>
              <h2 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground mt-1">
                {result.classLabel || 'Wastewater Quality Assessment'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded text-xs font-montserrat font-medium ${getQualityStyle(
                  result.qualityLevel
                )}`}
              >
                {result.qualityLevel} quality
              </span>
              <span
                className={`px-3 py-1 rounded text-xs font-montserrat font-medium ${getPollutionStyle(
                  result.pollutionLevel
                )}`}
              >
                {result.pollutionLevel} risk
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              <span className="text-xs font-mono text-neutral-400 block">Chemical Oxygen Demand</span>
              <span className="font-montserrat text-2xl font-semibold text-foreground">
                {result.parameters?.cod ?? '—'}{' '}
                <span className="text-xs font-normal text-neutral-400">mg/L</span>
              </span>
            </div>

            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20">
              <span className="text-xs font-mono text-neutral-400 block">Turbidity</span>
              <span className="font-montserrat text-2xl font-semibold text-foreground">
                {result.parameters?.turbidity ?? '—'}{' '}
                <span className="text-xs font-normal text-neutral-400">NTU</span>
              </span>
            </div>
          </div>

          {/* Additional Parameter Breakdown */}
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/10 text-xs font-sans">
            <span className="font-montserrat font-medium text-neutral-300 block mb-2">
              Evaluated Parameter Vector
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-neutral-400">
              <div>
                <span className="block text-[11px] text-neutral-500">Phosphate</span>
                <span className="font-mono text-neutral-200">{result.parameters?.phosphate ?? '0.015'} mg/L</span>
              </div>
              <div>
                <span className="block text-[11px] text-neutral-500">Nitrate</span>
                <span className="font-mono text-neutral-200">{result.parameters?.nitrate ?? '7'} mg/L</span>
              </div>
              <div>
                <span className="block text-[11px] text-neutral-500">Iron (Fe)</span>
                <span className="font-mono text-neutral-200">{result.parameters?.iron ?? '0.354'} mg/L</span>
              </div>
              <div>
                <span className="block text-[11px] text-neutral-500">Chlorine</span>
                <span className="font-mono text-neutral-200">{result.parameters?.chlorine ?? '3'} mg/L</span>
              </div>
              <div>
                <span className="block text-[11px] text-neutral-500">Sodium</span>
                <span className="font-mono text-neutral-200">{result.parameters?.sodium ?? '11'} mg/L</span>
              </div>
            </div>
          </div>

          {/* Class Probability Breakdown if available */}
          {result.classProbabilities && (
            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-montserrat font-medium text-neutral-300">
                <BarChart3 className="size-4 text-neutral-400" />
                <span>Model Class Probability Distribution</span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-xs font-sans">
                {['0', '1', '2', '3', '4'].map((cls) => {
                  const prob = result.classProbabilities[cls] || 0;
                  const isPredicted = Number(result.predictedClass) === Number(cls);
                  return (
                    <div
                      key={cls}
                      className={`p-2 rounded border ${
                        isPredicted
                          ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                          : 'border-[var(--card-edge)]/50 bg-card text-neutral-400'
                      }`}
                    >
                      <span className="block text-[10px] font-mono">Class {cls}</span>
                      <span className="block text-sm font-semibold font-mono mt-0.5">
                        {(prob * 100).toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI-Driven Treatment Recommendations */}
          <div className="space-y-3 pt-2">
            <h3 className="font-montserrat text-sm font-semibold text-foreground flex items-center gap-2">
              <span>Model-Driven Treatment Recommendations</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 p-4 rounded-lg border border-[var(--card-edge)] bg-black/20">
              {result.recommendations?.map((rec, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Environmental Advisory Notice */}
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-card text-xs text-neutral-400 flex items-start gap-3">
            <ShieldCheck className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground block mb-0.5">Decision support advisory</span>
              <span>
                Recommendations formulated by Random Forest classification engine trained on multi-parameter environmental datasets. Final discharge verification should be confirmed by certified plant testing.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[var(--card-edge)] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <Check className="size-3.5" />
              <span>Logged to database test history</span>
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="btn-asym-mirror inline-flex h-9 items-center gap-2 border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-black/90"
              >
                <RefreshCw className="size-3.5" />
                <span>Analyze another sample</span>
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
