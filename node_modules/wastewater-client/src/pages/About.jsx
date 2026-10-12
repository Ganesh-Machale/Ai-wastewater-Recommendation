import React from 'react';
import AnimatedBadge from '../components/AnimatedBadge';
import { Target, ShieldAlert, FlaskConical, Cpu, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
        <AnimatedBadge>Academic PBL research prototype</AnimatedBadge>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          About the project
        </h1>
        <p className="text-base text-neutral-600 sm:text-lg dark:text-neutral-400 leading-relaxed font-sans">
          Understanding the background, current prototype scope, and future machine learning roadmap for <span className="highlight">wastewater decision support</span>.
        </p>
      </div>

      {/* Problem & Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-chai p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <ShieldAlert className="size-5 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider">Context</span>
          </div>
          <h2 className="font-montserrat text-xl font-semibold text-foreground">
            The environmental problem
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
            Wastewater treatment facilities and environmental monitoring agencies face significant operational bottlenecks due to manual sample collection and delayed laboratory turnarounds. Slow identification of toxic effluent spikes results in municipal damage and downstream water contamination.
          </p>
        </div>

        <div className="card-chai p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <Target className="size-5 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider">Solution</span>
          </div>
          <h2 className="font-montserrat text-xl font-semibold text-foreground">
            The digital solution
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
            WQAI delivers a digital decision-support framework that validates key chemical metrics and visual effluent records. It computes immediate assessments and generates targeted treatment guidelines, providing plant operators with actionable guidance before formal laboratory tests complete.
          </p>
        </div>
      </div>

      {/* Scope Comparison Section */}
      <section className="card-chai p-6 sm:p-10 space-y-8">
        <div className="border-b border-[var(--card-edge)] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-montserrat text-2xl font-semibold text-foreground">
              Scope comparison
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-sans">
              Current demonstration release versus Phase 2 Python ML architecture.
            </p>
          </div>
          <span className="text-xs font-mono border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded w-fit">
            Demonstration architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Scope */}
          <div className="p-5 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-4">
            <div className="flex items-center gap-2 text-foreground font-montserrat font-semibold text-base">
              <FlaskConical className="size-4 text-neutral-400" />
              <h3>Current prototype capabilities</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chemical metrics input form (pH and Total Dissolved Solids)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Threshold validation engine evaluating environmental standards</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Image upload interface with preview and metadata storage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>MongoDB persistence for user test logs and analysis history</span>
              </li>
            </ul>
          </div>

          {/* Future Scope */}
          <div className="p-5 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-4">
            <div className="flex items-center gap-2 text-foreground font-montserrat font-semibold text-base">
              <Cpu className="size-4 text-neutral-400" />
              <h3>Phase 2 artificial intelligence roadmap</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Random Forest and Gradient Boosted models for chemical regression</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Convolutional neural networks for visual contamination classification</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Real-time IoT sensor telemetry streaming via MQTT</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Automated multi-facility compliance alert pipelines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/analysis/parameters"
            className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-4 text-sm font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Try parameter analysis <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
