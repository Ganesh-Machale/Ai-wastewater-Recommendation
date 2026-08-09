import React from 'react';
import { Link } from 'react-router-dom';
import PrototypeBadge from '../components/PrototypeBadge';
import { Activity, Image as ImageIcon, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Layers, Sparkles, Droplet, FlaskConical, BarChart3, HelpCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center">
              <PrototypeBadge text="Prototype Phase — ML Integration Next" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              AI-Based Wastewater <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                Quality Assessment
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              Analyze wastewater quality and receive intelligent treatment recommendations using water parameters and visual analysis.
            </p>

            {/* Prototype Notice Banner */}
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs text-teal-300 max-w-xl mx-auto flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Currently available as a prototype. Machine Learning models will be integrated in the next phase.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/analysis/parameters"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02]"
              >
                <Activity className="w-5 h-5" />
                <span>Analyze Water Parameters</span>
              </Link>

              <Link
                to="/analysis/image"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all hover:scale-[1.02]"
              >
                <ImageIcon className="w-5 h-5 text-teal-400" />
                <span>Analyze Water Image</span>
              </Link>
            </div>
          </div>

          {/* Hero Illustration / Visual Mockup */}
          <div className="mt-12 max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Method 01</span>
                  <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded text-[10px] font-semibold">Active</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">Parameter Input</div>
                  <div className="text-xs text-slate-400">pH Level: 7.2 • TDS: 420 mg/L</div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-medium">Quality: Good</span>
                  <span className="text-slate-400 text-[11px]">Mock Rule Engine</span>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Method 02</span>
                  <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold">Phase 2</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">Visual Image Analysis</div>
                  <div className="text-xs text-slate-400">Effluent Sample Upload</div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-amber-400 font-medium">CNN Model Integration</span>
                  <span className="text-slate-400 text-[11px]">Coming Soon</span>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/60 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Output</span>
                  <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded text-[10px] font-semibold">Decision Support</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">Treatment Guidelines</div>
                  <div className="text-xs text-slate-400">Filtration + Neutralization</div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  Decision support recommendations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">What is the Problem?</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Traditional wastewater quality assessment heavily relies on slow laboratory testing, manual sampling, and expert interpretation. This often leads to delays in identifying toxic effluent discharge and prescribing appropriate treatment protocols.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Digital Solution</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              WQAI provides a digital decision-support system that synthesizes chemical parameter metrics and visual sample analysis. It generates preliminary quality assessments and potential treatment recommendations instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Two Analysis Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Two Independent Analysis Methods</h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
            Our platform provides separate evaluation channels designed for both quantitative lab measurements and visual sample classification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Method 1 */}
          <div className="bg-gradient-to-br from-white to-teal-50/30 rounded-2xl p-8 border border-teal-100 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                Method 1
              </span>
              <Activity className="w-6 h-6 text-teal-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Parameter-Based Analysis</h3>
              <p className="text-slate-600 text-sm mt-2">
                Evaluate wastewater quality using fundamental chemical metrics including pH balance and Total Dissolved Solids (TDS).
              </p>
            </div>

            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Input parameters: pH & Total Dissolved Solids (TDS)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Validation against standard wastewater thresholds</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Instant rule-based prototype quality classification</span>
              </li>
            </ul>

            <Link
              to="/analysis/parameters"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              <span>Try Parameter Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Method 2 */}
          <div className="bg-gradient-to-br from-white to-sky-50/30 rounded-2xl p-8 border border-sky-100 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                Method 2
              </span>
              <ImageIcon className="w-6 h-6 text-sky-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Image-Based Analysis</h3>
              <p className="text-slate-600 text-sm mt-2">
                Upload wastewater sample imagery from your local machine to test image storage and preview future computer vision classification.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Upload JPG, PNG, WEBP files up to 5MB</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Drag-and-drop upload interface & image preview</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Secure server storage & metadata logging</span>
              </li>
            </ul>

            <Link
              to="/analysis/image"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              <span>Try Image Analysis Upload</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How the System Works */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">How the Prototype Works</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A simple 4-step workflow from user submission to stored recommendation records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">1</div>
              <h4 className="font-bold text-slate-900">Select Method</h4>
              <p className="text-xs text-slate-500">Choose between parameter numerical inputs or image upload.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">2</div>
              <h4 className="font-bold text-slate-900">Submit Data</h4>
              <p className="text-xs text-slate-500">Enter pH & TDS or upload a local wastewater sample photo.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">3</div>
              <h4 className="font-bold text-slate-900">Prototype Service</h4>
              <p className="text-xs text-slate-500">Node backend processes input via decoupled mock prediction engine.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">4</div>
              <h4 className="font-bold text-slate-900">Review & Save</h4>
              <p className="text-xs text-slate-500">View quality breakdown, recommendations, and save to dashboard history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future AI Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-teal-900/50 space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-8 h-8 text-teal-400" />
            <h3 className="text-2xl font-bold">Future AI Capabilities (Phase 2)</h3>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            In the upcoming project phase, the mock prediction services in our architecture will be linked to trained Python Machine Learning microservices:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="font-semibold text-teal-300 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Random Forest / XGBoost Model
              </h4>
              <p className="text-xs text-slate-400">
                Multi-parameter predictions including BOD, COD, Turbidity, Dissolved Oxygen, and Ammonia levels.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="font-semibold text-sky-300 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                MobileNetV2 / ResNet50 Vision Models
              </h4>
              <p className="text-xs text-slate-400">
                Deep learning computer vision models trained on wastewater imagery for visual contamination scoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Ready to test the prototype?</h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Start by submitting water parameters or uploading a sample image to see the decision-support system in action.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/analysis/parameters"
            className="px-6 py-3 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all"
          >
            Start Parameter Analysis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
