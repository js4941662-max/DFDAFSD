
import React from 'react';
import { BrainCircuit } from 'lucide-react';

interface AlphaStatProps {
  label: string;
  value: string | number;
  sub: string;
  colorClass?: string;
}

export const AlphaStat: React.FC<AlphaStatProps> = ({ label, value, sub, colorClass = "text-cyan-400" }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <BrainCircuit size={48} />
      </div>
      <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">{label}</p>
      <div className="flex flex-col">
        <span className={`text-4xl font-black italic tracking-tighter ${colorClass}`}>{value}</span>
        <span className="text-[11px] font-mono text-slate-600 mt-2 uppercase tracking-tighter">{sub}</span>
      </div>
    </div>
  );
};
