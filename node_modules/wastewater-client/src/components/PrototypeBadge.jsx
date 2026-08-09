import React from 'react';
import { Cpu, AlertCircle } from 'lucide-react';

const PrototypeBadge = ({ text = "ML Model Coming Soon", size = "normal" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-medium ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
      </span>
      <span className="flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-teal-600" />
        <span className="font-semibold text-teal-900">Prototype Mode</span>
        <span className="text-teal-400">|</span>
        <span className="text-teal-700">{text}</span>
      </span>
    </div>
  );
};

export default PrototypeBadge;
