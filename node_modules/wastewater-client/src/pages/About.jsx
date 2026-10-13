import React from 'react';
import AnimatedBadge from '../components/AnimatedBadge';
import { Target, ShieldAlert, FlaskConical, Cpu, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
        <AnimatedBadge>AI-Powered Wastewater Decision Platform</AnimatedBadge>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
          About the project
        </h1>
        <p className="text-base text-neutral-600 sm:text-lg dark:text-neutral-400 leading-relaxed font-sans">
          Integrated machine learning architecture and predictive analytics for <span className="highlight">wastewater decision support</span>.
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

      {/* System Architecture Section */}
      <section className="card-chai p-6 sm:p-10 space-y-8">
        <div className="border-b border-[var(--card-edge)] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-montserrat text-2xl font-semibold text-foreground">
              System architecture
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-sans">
              Integrated Random Forest machine learning and dual-channel decision pipeline.
            </p>
          </div>
          <span className="text-xs font-mono border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded w-fit">
            Active AI Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chemical Analysis Scope */}
          <div className="p-5 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-4">
            <div className="flex items-center gap-2 text-foreground font-montserrat font-semibold text-base">
              <FlaskConical className="size-4 text-emerald-400" />
              <h3>Multi-parameter AI analysis</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chemical metrics input form (pH, TDS, COD, Turbidity, Iron, Nutrients)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Trained Random Forest Classifier (100 Trees, Balanced Class Weights)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Multi-class effluent quality assessment (Classes 0 through 4)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Automated parameter-specific treatment and dosing recommendations</span>
              </li>
            </ul>
          </div>

          {/* Vision and Systems Scope */}
          <div className="p-5 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-4">
            <div className="flex items-center gap-2 text-foreground font-montserrat font-semibold text-base">
              <Cpu className="size-4 text-emerald-400" />
              <h3>Vision and platform services</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>High-performance computer vision preprocessing and image ingestion</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Secure local storage with cryptographic user verification</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>MongoDB persistence for user test logs and analysis history</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>CPCB and international effluent standards compliance mapping</span>
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
