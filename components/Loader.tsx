
import React, { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

export const Loader: React.FC = () => {
  const messages = [
    "CALIBRATING ULTRA-LINK KERNEL...",
    "MAPPING SIMCLUSTER INTEREST GRAPHS...",
    "CALCULATING pAuthorReply BIAS (75x)...",
    "AUDITING SLOP-INDEX PROTOCOLS...",
    "SYNTHESIZING RESONANCE PAYLOADS...",
    "ENGAGING HEAVY-RANKER BYPASS..."
  ];
  
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 1000);
    
    const prog = setInterval(() => {
      setProgress(prev => (prev < 98 ? prev + (Math.random() * 5) : prev));
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(prog);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto py-32 text-center animate-in fade-in duration-700">
      <div className="relative inline-block mb-12">
        <div className="w-24 h-24 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-[0_0_60px_rgba(34,211,238,0.2)]">
          <BrainCircuit size={48} className="animate-spin-slow" />
        </div>
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping scale-125"></div>
      </div>
      
      <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">NEURAL SYNTHESIS LIVE</h2>
      <p className="text-cyan-500 text-[11px] font-mono uppercase tracking-[0.4em] font-black h-4 mb-10">
        {messages[msgIndex]}
      </p>
      
      <div className="w-full bg-slate-950/80 rounded-full h-2 border border-slate-800 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
        <span>Resonance Optimization</span>
        <span className="text-cyan-500 font-mono">{Math.round(progress)}% COMPLETE</span>
      </div>
    </div>
  );
};
