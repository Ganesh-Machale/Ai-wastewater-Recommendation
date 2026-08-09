import React from 'react';
import PrototypeBadge from '../components/PrototypeBadge';
import { ArrowDown, Cpu, Activity, Image as ImageIcon, Server, Database, CheckCircle2, GitMerge } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <PrototypeBadge text="System Architecture & Workflow" />
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          How It Works
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Visualizing the system request lifecycle for current prototype mode and future Machine Learning API integration.
        </p>
      </div>

      {/* Diagram Section 1: Current Prototype Workflow */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Current Flow
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Prototype Execution Workflow</h2>
          <p className="text-xs text-slate-500">How data moves through the user interface and Node.js mock prediction service.</p>
        </div>

        {/* Visual Flow Chart */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Step 1: USER */}
          <div className="flex flex-col items-center">
            <div className="w-48 py-3 bg-slate-900 text-white rounded-xl font-bold text-center text-sm shadow-md flex items-center justify-center gap-2">
              <span>USER</span>
            </div>
            <ArrowDown className="w-5 h-5 text-slate-400 my-2 animate-bounce" />
          </div>

          {/* Step 2: Choose Method */}
          <div className="flex flex-col items-center">
            <div className="w-64 py-3 bg-teal-600 text-white rounded-xl font-bold text-center text-sm shadow-md">
              Choose Analysis Method
            </div>
            <ArrowDown className="w-5 h-5 text-slate-400 my-2" />
          </div>

          {/* Step 3: Split Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold">
                <Activity className="w-3.5 h-3.5" />
                Parameter Analysis
              </div>
              <div className="text-sm font-semibold text-slate-700">Inputs: pH & TDS</div>
              <ArrowDown className="w-4 h-4 text-slate-400 mx-auto" />
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
                Backend Mock Prediction Service
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold">
                <ImageIcon className="w-3.5 h-3.5" />
                Image Analysis
              </div>
              <div className="text-sm font-semibold text-slate-700">Input: Upload Local Image</div>
              <ArrowDown className="w-4 h-4 text-slate-400 mx-auto" />
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
                Multer Storage + Prototype Status
              </div>
            </div>
          </div>

          {/* Step 4: Quality Assessment */}
          <div className="flex flex-col items-center pt-2">
            <ArrowDown className="w-5 h-5 text-slate-400 my-2" />
            <div className="w-64 py-3 bg-emerald-700 text-white rounded-xl font-bold text-center text-sm shadow-md">
              Quality Assessment
            </div>
            <ArrowDown className="w-5 h-5 text-slate-400 my-2" />
            <div className="w-72 py-3.5 bg-slate-900 text-teal-300 rounded-xl font-bold text-center text-sm shadow-lg border border-teal-500/30">
              Treatment Recommendation
            </div>
          </div>
        </div>
      </div>

      {/* Diagram Section 2: Future Architecture */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
            Phase 2 Vision
          </span>
          <h2 className="text-2xl font-bold text-white">Future AI System Architecture</h2>
          <p className="text-xs text-slate-400">Modular decoupled architecture connecting React to Node.js and Python ML model APIs.</p>
        </div>

        {/* Architecture Stack Box */}
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
            <span className="font-bold text-sm text-teal-400">React.js Frontend (Vite + Tailwind)</span>
            <span className="text-xs text-slate-400">User Interface</span>
          </div>
          <ArrowDown className="w-4 h-4 text-teal-500 mx-auto" />

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
            <span className="font-bold text-sm text-sky-400">Node.js / Express Backend API</span>
            <span className="text-xs text-slate-400">JWT Auth + Controller Layer</span>
          </div>
          <ArrowDown className="w-4 h-4 text-sky-500 mx-auto" />

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
            <span className="font-bold text-sm text-purple-400">Python ML Microservice (FastAPI / Flask)</span>
            <span className="text-xs text-slate-400">REST API Gateway</span>
          </div>
          <ArrowDown className="w-4 h-4 text-purple-500 mx-auto" />

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-400">Trained ML Models (Random Forest + MobileNetV2)</span>
            <span className="text-xs text-slate-400">Inference Engine</span>
          </div>
          <ArrowDown className="w-4 h-4 text-emerald-500 mx-auto" />

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
            <span className="font-bold text-sm text-amber-400">Prediction Output & Recommendation Engine</span>
            <span className="text-xs text-slate-400">Synthesized Guidelines</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
