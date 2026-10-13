import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedBadge from '../components/AnimatedBadge';
import {
  Activity,
  Image as ImageIcon,
  ArrowUpRight,
  ChevronsDown,
  Check,
  ShieldCheck,
  Cpu,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="flex gap-10 max-md:flex-col pt-6 sm:pt-12 items-center">
        <div className="flex flex-col gap-y-3 sm:gap-y-4 md:w-3/5">
          <AnimatedBadge>Trained Random Forest AI Model Integrated</AnimatedBadge>

          <h1 className="text-[42px] font-semibold tracking-tight max-md:leading-11 md:text-6xl lg:text-7xl">
            Wastewater quality assessment
          </h1>

          <p className="mt-4 max-w-2xl text-base text-neutral-700 sm:mt-6 md:text-xl dark:text-neutral-400">
            Evaluate effluents and receive instant treatment recommendations through <span className="highlight">intelligent decision support</span>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* The single solid button on screen */}
            <Link
              to="/analysis/parameters"
              className="btn-asym inline-flex h-9 items-center gap-2 bg-neutral-900 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Start analysis <ArrowUpRight className="-ml-1 size-4" aria-hidden="true" />
            </Link>

            {/* Outline mirror button beside it */}
            <Link
              to="/how-it-works"
              className="btn-asym-mirror inline-flex h-9 items-center gap-2 border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-black/90"
            >
              See how it works <ChevronsDown className="-ml-1 size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Hero Central Media Card */}
        <div className="w-full md:w-2/5">
          <div className="card-chai p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--card-edge)] pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="font-montserrat text-sm font-semibold text-foreground">
                  Active monitor
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Rule engine 1.0
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-[var(--card-edge)]/40">
                <span className="text-neutral-400">Sample method</span>
                <span className="font-mono text-foreground">Chemical parameter metrics</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--card-edge)]/40">
                <span className="text-neutral-400">TDS baseline</span>
                <span className="font-mono text-foreground">&lt; 500 mg/L (Safe)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--card-edge)]/40">
                <span className="text-neutral-400">pH standard</span>
                <span className="font-mono text-foreground">6.5 to 8.5 range</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-400">Status</span>
                <span className="text-xs border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded">
                  Operational
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/analysis/image"
                className="w-full inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Upload image sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Digital Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium sm:text-[30px]">The problem and solution</h2>
        <p className="text-neutral-600 sm:text-lg dark:text-neutral-400">
          Manual effluent inspection is slow and error-prone, requiring <span className="highlight">automated digital classification</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="card-chai p-6 space-y-3">
            <h3 className="font-montserrat text-base font-semibold text-foreground">
              What is the problem?
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
              Traditional wastewater evaluation relies on delayed chemical lab testing and manual sampling. Discharging untreated effluents damages aquatic systems before lab test results are returned.
            </p>
          </div>

          <div className="card-chai p-6 space-y-3">
            <h3 className="font-montserrat text-base font-semibold text-foreground">
              Our digital solution
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
              WQAI provides rapid decision support by combining physical chemical measurements with visual sample imagery, computing immediate quality classifications and treatment guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Two Analysis Channels */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium sm:text-[30px]">Two evaluation methods</h2>
        <p className="text-neutral-600 sm:text-lg dark:text-neutral-400">
          Select between laboratory numerical indicators and <span className="highlight">visual sample classification</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Method 1 */}
          <article className="card-chai p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono border border-[var(--card-edge)] px-2 py-0.5 rounded text-neutral-400">
                  Method 01
                </span>
                <Activity className="size-5 text-neutral-400" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold text-foreground">
                Parameter-based analysis
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                Evaluate wastewater quality using numerical chemical properties including pH levels, Total Dissolved Solids, Turbidity, and Dissolved Oxygen.
              </p>
              <ul className="space-y-2 text-xs text-neutral-400 pt-2 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Threshold evaluation against CPCB standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Decoupled mock prediction engine for prototyping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Instant multi-stage treatment suggestions</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/analysis/parameters"
                className="inline-flex h-8 min-w-24 items-center justify-center rounded-md bg-primary px-3 text-sm font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Analyze parameters
              </Link>
            </div>
          </article>

          {/* Method 2 */}
          <article className="card-chai p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono border border-[var(--card-edge)] px-2 py-0.5 rounded text-neutral-400">
                  Method 02
                </span>
                <ImageIcon className="size-5 text-neutral-400" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold text-foreground">
                Image-based analysis
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                Upload photos of wastewater samples or industrial effluent discharge to test visual storage pipelines and preview computer vision classification.
              </p>
              <ul className="space-y-2 text-xs text-neutral-400 pt-2 font-sans">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Drag-and-drop image upload up to 5MB</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Sample color and clarity observation logging</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-400" />
                  <span>Prepared for convolutional neural network models</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/analysis/image"
                className="inline-flex h-8 min-w-24 items-center justify-center rounded-md bg-primary px-3 text-sm font-montserrat font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Upload image
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium sm:text-[30px]">System procedure</h2>
        <p className="text-neutral-600 sm:text-lg dark:text-neutral-400">
          A four-step pipeline from sample collection to <span className="highlight">stored recommendation records</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="card-chai p-5 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Step 01</span>
            <h4 className="font-montserrat text-sm font-semibold text-foreground">
              Select channel
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Choose numerical laboratory indicators or visual sample imagery.
            </p>
          </div>

          <div className="card-chai p-5 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Step 02</span>
            <h4 className="font-montserrat text-sm font-semibold text-foreground">
              Input sample data
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Enter verified pH and TDS measurements or upload an effluent photo.
            </p>
          </div>

          <div className="card-chai p-5 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Step 03</span>
            <h4 className="font-montserrat text-sm font-semibold text-foreground">
              Rule evaluation
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Engine processes metrics against benchmark environmental thresholds.
            </p>
          </div>

          <div className="card-chai p-5 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Step 04</span>
            <h4 className="font-montserrat text-sm font-semibold text-foreground">
              Review advisory
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Inspect suggested neutralization and filtration steps in your records.
            </p>
          </div>
        </div>
      </section>

      {/* Live Machine Learning Architecture */}
      <section className="card-chai p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <Cpu className="size-6 text-emerald-400" />
          <h3 className="font-montserrat text-xl font-semibold text-foreground">
            Machine learning architecture
          </h3>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          The platform evaluates wastewater chemistry using our <span className="highlight">trained Random Forest classifier</span> coupled with computer vision pipelines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-2">
            <span className="text-xs font-mono text-emerald-400">Model 01: Multi-Parameter AI (Active)</span>
            <h4 className="font-montserrat text-sm font-semibold text-foreground">
              Random Forest Classifier (100 Trees)
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Trained on environmental laboratory datasets across 9 chemical indicators (pH, TDS, COD, Turbidity, Phosphate, Nitrate, Iron, Chlorine, Sodium) with balanced multi-class classification.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--card-edge)] bg-black/20 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Model 02: Vision Stream</span>
            <h4 className="font-montserrat text-sm font-semibold text-foreground">
              Convolutional Vision Pipeline
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Automated image pre-processing and visual turbidity evaluation for wastewater discharge surveillance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
