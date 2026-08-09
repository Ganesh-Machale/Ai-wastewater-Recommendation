import React from 'react';
import PrototypeBadge from '../components/PrototypeBadge';
import { BookOpen, Target, Cpu, ShieldAlert, CheckCircle2, FlaskConical, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <PrototypeBadge text="College PBL Project Prototype" />
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          About Project
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Understanding the vision, current prototype scope, and future Machine Learning architecture of the WQAI decision-support system.
        </p>
      </div>

      {/* Problem & Solution Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Wastewater treatment facilities and environmental monitoring bodies face severe challenges due to manual sample collection, expensive laboratory turnarounds, and complex chemical metric interpretation. Delays in identifying extreme pH shifts or Total Dissolved Solids spikes lead to downstream ecosystem contamination and damaged municipal infrastructure.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">The Proposed Solution</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            A digital decision-support system that synthesizes wastewater parameter metrics and visual sample analysis to evaluate water quality and recommend possible treatment approaches. This system acts as an instant preliminary evaluation tool to assist plant operators and environmental researchers.
          </p>
        </div>
      </div>

      {/* Current Prototype vs Future ML Capabilities */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-8">
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Scope Comparison</h2>
            <p className="text-slate-400 text-sm mt-1">Current Prototype Status vs. Phase 2 Future AI Models</p>
          </div>
          <div className="bg-teal-500/20 text-teal-300 border border-teal-500/40 px-3 py-1.5 rounded-lg text-xs font-semibold">
            Honest Demonstration Architecture
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Prototype Scope */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
              <FlaskConical className="w-5 h-5" />
              <h3>Current Prototype Capabilities</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Parameter-Based Analysis:</strong> Evaluation using pH & Total Dissolved Solids (TDS).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Image Upload Interface:</strong> Drag-and-drop local image uploading & safe server storage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Mock Service Logic:</strong> Clearly decoupled decision rules for parameter classification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Full-Stack Storage:</strong> Database persistence for users, parameter data, and image metadata.</span>
              </li>
            </ul>
          </div>

          {/* Future Capabilities */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
              <Cpu className="w-5 h-5" />
              <h3>Future Machine Learning Integration</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Trained ML Model:</strong> Random Forest / Gradient Boosting for multi-parameter prediction (BOD, COD, Turbidity, DO).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>CNN Vision Models:</strong> Transfer-learning models (MobileNetV2, ResNet50) for automated image classification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Combined Recommendation Engine:</strong> Synthesized AI decision matrix with domain knowledge rules.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Alert */}
        <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Prototype Transparency Notice</span>
            <span>This college project prototype does not claim to use trained Machine Learning models in its current version. Predictions are generated via clear mock service layers designed for seamless ML replacement in Phase 2.</span>
          </div>
        </div>
      </div>

      {/* Navigation Callout */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-teal-50 rounded-2xl p-6 border border-teal-200 gap-4">
        <div>
          <h4 className="font-bold text-teal-950 text-lg">See the System Architecture</h4>
          <p className="text-sm text-teal-800">Learn how data flows through the React frontend, Node backend, and future ML services.</p>
        </div>
        <Link
          to="/how-it-works"
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2 shrink-0"
        >
          <span>View How It Works</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default About;
