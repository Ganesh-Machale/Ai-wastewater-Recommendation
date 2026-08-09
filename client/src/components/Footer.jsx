import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, AlertTriangle, ShieldCheck, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-slate-900 shadow-md">
                <Droplet className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                WQ<span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              AI-Based Wastewater Quality Assessment and Treatment Recommendation System. A digital decision-support tool prototype designed to evaluate water parameters and visual characteristics.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>College PBL Project Prototype</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">Home Landing</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">About Project</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-teal-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/analysis/parameters" className="hover:text-teal-400 transition-colors">Parameter Analysis</Link>
              </li>
              <li>
                <Link to="/analysis/image" className="hover:text-teal-400 transition-colors">Image Analysis</Link>
              </li>
            </ul>
          </div>

          {/* Prototype Disclaimer */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">System Notice</h4>
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Prototype Phase</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Currently running in demonstration mode. Trained Machine Learning algorithms (Random Forest & CNNs) will be integrated in Phase 2.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WQAI PBL Team. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>React • Vite • Node.js • Express • MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
