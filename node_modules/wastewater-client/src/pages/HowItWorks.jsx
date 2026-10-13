import React from 'react';
import AnimatedBadge from '../components/AnimatedBadge';
import { ArrowDown, Activity, Image as ImageIcon, Server, Database, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
        <AnimatedBadge>System architecture and lifecycle</AnimatedBadge>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          How it works
        </h1>
        <p className="text-base text-neutral-600 sm:text-lg dark:text-neutral-400 leading-relaxed font-sans">
          Tracing data pipelines from client submission to <span className="highlight">persisted environmental records</span>.
        </p>
      </div>

      {/* Workflow Section */}
      <div className="card-chai p-6 sm:p-10 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-neutral-400 border border-[var(--card-edge)] px-2.5 py-0.5 rounded">
            Execution pipeline
          </span>
          <h2 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground">
            Wastewater AI decision pipeline
          </h2>
          <p className="text-xs text-neutral-400 font-sans">
            How user input flows through the client interface and machine learning inference service.
          </p>
        </div>

        {/* Visual Pipeline */}
        <div className="max-w-2xl mx-auto space-y-4 font-sans">
          {/* Step 1: Client Input */}
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">01</span>
              <div>
                <div className="font-montserrat text-sm font-semibold text-foreground">Client submission</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-400">User selects parameter input or sample image upload</div>
              </div>
            </div>
            <span className="text-xs border border-emerald-600/30 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">
              Browser
            </span>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="size-4 text-neutral-400" />
          </div>

          {/* Step 2: Split Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-montserrat text-sm font-semibold">
                <Activity className="size-4 text-neutral-500 dark:text-neutral-400" />
                <span>Parameter evaluation</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed">
                Evaluates effluent parameters across 9 chemical indicators.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-montserrat text-sm font-semibold">
                <ImageIcon className="size-4 text-neutral-500 dark:text-neutral-400" />
                <span>Image ingest</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed">
                Multer multipart storage handles image buffer with metadata extraction.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="size-4 text-neutral-400" />
          </div>

          {/* Step 3: Service Engine */}
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="size-4 text-neutral-500 dark:text-neutral-400" />
              <div>
                <div className="font-montserrat text-sm font-semibold text-foreground">Random Forest AI engine</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-400">Predicts effluent class, confidence score, and generates model-tailored treatment stages</div>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">Node + Python ML</span>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="size-4 text-neutral-400" />
          </div>

          {/* Step 4: Storage & History */}
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-neutral-100 dark:bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="size-4 text-neutral-500 dark:text-neutral-400" />
              <div>
                <div className="font-montserrat text-sm font-semibold text-foreground">Database logging</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-400">Analysis results saved to MongoDB collection with user correlation</div>
              </div>
            </div>
            <span className="text-xs border border-emerald-600/30 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">
              Persisted
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--card-edge)] flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 font-sans">
            Ready to test either evaluation channel?
          </p>
          <div className="flex gap-3">
            <Link
              to="/analysis/parameters"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Parameter analysis <ArrowUpRight className="size-3.5" />
            </Link>
            <Link
              to="/analysis/image"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[var(--card-edge)] bg-card px-3 text-xs font-montserrat font-medium text-foreground hover:border-[var(--card-edge-hover)] transition-colors"
            >
              Image analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
