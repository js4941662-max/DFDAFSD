
import React from 'react';
import { type PostAnalysis, type ReplyStrategy } from '../types';
import { ReplyCard } from './ReplyCard';
import { TelemetrySidebar } from './TelemetrySidebar';
import { Sparkles } from 'lucide-react';

interface AnalysisDisplayProps {
  analysis: PostAnalysis;
  strategies: ReplyStrategy[];
  onInject: (strategy: ReplyStrategy) => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, strategies, onInject }) => {
  const primaryStrategy = strategies[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="lg:col-span-4">
        <TelemetrySidebar analysis={analysis} />
      </div>
      
      <div className="lg:col-span-8 space-y-12">
        <div className="relative">
          <div className="absolute -top-12 left-0 flex items-center gap-3">
            <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping opacity-25"></div>
            <h2 className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.5em] italic">SINGULAR POINT SYNTHESIZED</h2>
          </div>
          
          {primaryStrategy && (
            <ReplyCard strategy={primaryStrategy} onInject={onInject} />
          )}
        </div>

        <div className="p-10 bg-slate-900/10 border border-slate-800/40 rounded-[3rem] border-dashed text-center">
            <p className="text-[10px] text-slate-600 uppercase font-black tracking-[0.4em] mb-4 flex items-center justify-center gap-4">
               <Sparkles size={12} />
               RECURSIVE MONTE CARLO SIMULATIONS CONVERGED
               <Sparkles size={12} />
            </p>
            <div className="flex justify-center gap-4 opacity-10">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
