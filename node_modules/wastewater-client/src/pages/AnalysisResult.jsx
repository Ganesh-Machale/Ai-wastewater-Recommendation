import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  Activity,
  Image as ImageIcon,
  ArrowLeft,
  Check,
  ShieldAlert,
  Calendar
} from 'lucide-react';

const AnalysisResult = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        // Try parameter endpoint first, fallback to image endpoint
        try {
          const res = await api.get(`/analysis/parameters/${id}`);
          if (res.data.success) {
            setData({ ...res.data.data, category: 'parameter' });
            setLoading(false);
            return;
          }
        } catch (err) {
          // Try image endpoint
          const resImg = await api.get(`/analysis/images/${id}`);
          if (resImg.data.success) {
            setData({ ...resImg.data.data, category: 'image' });
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        setError('Analysis record not found or access restricted.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 card-chai text-center space-y-4">
        <ShieldAlert className="size-10 text-red-400 mx-auto" />
        <h2 className="font-montserrat text-lg font-semibold text-foreground">Record not found</h2>
        <p className="text-neutral-400 text-xs font-sans">
          {error || 'The requested analysis record could not be loaded.'}
        </p>
        <Link
          to="/history"
          className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-4 text-xs font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to history</span>
        </Link>
      </div>
    );
  }

  const getQualityStyle = (quality) => {
    if (quality === 'Good') return 'text-emerald-400 border border-emerald-500/30';
    if (quality === 'Moderate') return 'text-amber-400 border border-amber-500/30';
    return 'text-red-400 border border-red-500/30';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link
          to="/history"
          className="inline-flex items-center gap-2 text-xs font-montserrat text-neutral-400 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to history</span>
        </Link>
        <AnimatedBadge>Stored record</AnimatedBadge>
      </div>

      {data.category === 'parameter' ? (
        /* Parameter Result Detail */
        <div className="card-chai p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-4">
            <div>
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                <Activity className="size-3.5" />
                <span>Parameter record</span>
              </div>
              <h1 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground mt-1">
                Wastewater quality assessment
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded text-xs font-montserrat font-medium ${getQualityStyle(
                  data.qualityLevel
                )}`}
              >
                {data.qualityLevel} quality
              </span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 block">pH Level</span>
              <span className="font-montserrat text-2xl font-semibold text-foreground">
                {data.parameters?.pH}
              </span>
            </div>

            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 block">Total Dissolved Solids</span>
              <span className="font-montserrat text-2xl font-semibold text-foreground">
                {data.parameters?.tds}{' '}
                <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">mg/L</span>
              </span>
            </div>

            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 block">Pollution risk level</span>
              <span className="font-montserrat text-lg font-semibold text-foreground block mt-0.5">
                {data.pollutionLevel} risk
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-montserrat text-sm font-semibold text-foreground">
              Treatment recommendations
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5">
              {data.recommendations?.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-card text-xs text-neutral-400 flex items-start gap-2.5">
            <ShieldAlert className="size-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Prototype recommendation only. Final treatment decisions must be based on laboratory testing and qualified environmental professionals.
            </span>
          </div>
        </div>
      ) : (
        /* Image Result Detail */
        <div className="card-chai p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-4">
            <div>
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                <ImageIcon className="size-3.5" />
                <span>Image record</span>
              </div>
              <h1 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground mt-1">
                {data.originalName}
              </h1>
            </div>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Calendar className="size-3.5" />
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="rounded-lg overflow-hidden border border-[var(--card-edge)] bg-black/40 max-h-64 flex items-center justify-center">
              <img src={data.imagePath} alt={data.originalName} className="max-h-64 object-contain" />
            </div>

            <div className="space-y-3 p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 text-xs font-sans">
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Original filename</span>
                <span className="font-mono text-foreground">{data.originalName}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">File size</span>
                <span className="font-mono text-foreground">{(data.fileSize / 1024).toFixed(1)} KB</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Classification model</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-300">Phase 2 integration</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
