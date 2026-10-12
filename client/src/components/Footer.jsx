import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative max-w-6xl mx-auto px-6 font-montserrat sm:px-12 pt-16 pb-12 mt-20 before:absolute before:top-0 before:left-1/2 before:h-px before:w-full before:max-w-[1440px] before:-translate-x-1/2 before:bg-amber-600 before:opacity-10 dark:before:bg-orange-300 before:[mask-image:linear-gradient(90deg,transparent_0%,black_40%,black_60%,transparent_100%)]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-brand text-2xl font-semibold tracking-tight text-foreground">
              WQAI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7D0C] mb-2" />
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-md font-sans">
            AI-based wastewater quality assessment and treatment recommendation system. A digital decision support prototype designed to evaluate water parameters and visual characteristics.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[var(--card-edge)] bg-card text-xs text-foreground">
            <ShieldCheck className="size-3.5 text-neutral-400" />
            <span>PBL academic research prototype</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm font-sans">
            <li>
              <Link to="/" className="text-neutral-400 hover:text-brand transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-neutral-400 hover:text-brand transition-colors">
                About project
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="text-neutral-400 hover:text-brand transition-colors">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/analysis/parameters" className="text-neutral-400 hover:text-brand transition-colors">
                Parameter analysis
              </Link>
            </li>
            <li>
              <Link to="/analysis/image" className="text-neutral-400 hover:text-brand transition-colors">
                Image analysis
              </Link>
            </li>
          </ul>
        </div>

        {/* System notice */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            System notice
          </h4>
          <div className="card-chai p-4 space-y-2 text-xs font-sans">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Info className="size-3.5 shrink-0" />
              <span>Demonstration phase</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Operating in prototype mode. Trained Machine Learning algorithms (Random Forest and CNNs) will be integrated in Phase 2.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[var(--card-edge)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-400">
        <div>
          &copy; {new Date().getFullYear()} WQAI Project. Crafted with ChaiUI design principles.
        </div>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <span className="h-3 w-px bg-border" />
          <Link to="/how-it-works" className="hover:text-foreground transition-colors">
            Methodology
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
