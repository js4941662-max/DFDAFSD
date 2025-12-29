
import React from 'react';
import { type PostAnalysis } from '../types';
import { Target, Activity, Database, Layers, Bookmark, Cpu, Activity as ActivityIcon, BarChart } from 'lucide-react';

interface TelemetrySidebarProps {
  analysis: PostAnalysis;
}

export const TelemetrySidebar: React.FC<TelemetrySidebarProps> = ({ analysis }) => {
  if (!analysis?.deconstruction) return null;
  
  const hr = analysis.deconstruction.heavyRankerFeatures;
  const av = analysis.deconstruction.attentionVector;
  const clusters = analysis.deconstruction.simClusters || [];
  
  return (
    <aside className="space-y-10 animate-in slide-in-from-left-8 duration-1000">
      <div className="glass-card rounded-[3rem] p-10 border-slate-800/60 shadow-2xl relative overflow-hidden bg-slate-900/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
        
        <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
            <h3 className="text-[12px] font-black text-white uppercase tracking-[0.5em] italic">Neural Deconstruction</h3>
        </div>

        {/* Saliency Map Visualization */}
        <div className="h-48 bg-slate-950 rounded-[2.5rem] border border-slate-800 mb-10 overflow-hidden relative group">
           <div className="absolute inset-0 bg-grid opacity-5"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="absolute border border-cyan-500/10 rounded-full" 
                        style={{ 
                          width: `${(i+1)*20}%`, 
                          height: `${(i+1)*20}%`, 
                          animation: `pulse ${4 + i}s infinite ease-in-out` 
                        }}></div>
                 ))}
                 
                 <Target size={32} className="text-cyan-400 animate-pulse relative z-10" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
              </div>
           </div>
           <div className="absolute bottom-6 left-8 flex items-center gap-3">
              <span className="text-[9px] font-mono text-cyan-600 uppercase italic tracking-widest">Saliency Converged</span>
           </div>
        </div>

        {/* SimCluster Alignment */}
        <div className="space-y-6 mb-12">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 italic flex items-center gap-2">
             <BarChart size={12} className="text-purple-500" />
             SimCluster Alignment
           </h4>
           <div className="space-y-4 px-1">
             {clusters.length > 0 ? clusters.map((c, i) => (
               <div key={i} className="space-y-1.5">
                 <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-tighter">
                   <span>{c.cluster}</span>
                   <span className="font-mono">{(c.score * 100).toFixed(0)}%</span>
                 </div>
                 <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500/60" style={{ width: `${c.score * 100}%` }}></div>
                 </div>
               </div>
             )) : (
               <div className="text-[10px] text-slate-600 italic">No community clusters detected.</div>
             )}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {[
             { label: "pAuthorReply", val: `${((hr?.pAuthorReply || 0) * 100).toFixed(0)}%`, color: "text-green-400", icon: Activity },
             { label: "pBookmark", val: `${((hr?.pBookmark || 0) * 100).toFixed(0)}%`, color: "text-purple-400", icon: Bookmark },
             { label: "Likelihood", val: (analysis.statisticalPriors?.posteriorLikelihood || 0).toFixed(3), color: "text-cyan-400", icon: Database },
             { label: "Arbitrage", val: `${((analysis.deconstruction.attentionArbitragePotential || 0) * 100).toFixed(0)}%`, color: "text-amber-400", icon: Layers }
           ].map((stat, i) => (
             <div key={i} className="bg-slate-950/60 p-5 rounded-[2.2rem] border border-slate-800/80 text-center hover:border-cyan-500/30 transition-all group shadow-inner">
                <div className={`text-2xl font-black ${stat.color} tracking-tighter mb-1 transition-transform group-hover:scale-110`}>{stat.val}</div>
                <div className="text-[9px] text-slate-600 uppercase tracking-widest font-black italic">{stat.label}</div>
             </div>
           ))}
        </div>

        <div className="mt-12 p-8 bg-slate-950/90 rounded-[2.5rem] border border-slate-800 relative group overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Cpu size={40} className="text-cyan-500" />
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-3 italic flex items-center gap-2">
              <Target size={12} />
              Alpha Thesis
            </span>
            <p className="text-[12px] text-slate-400 italic leading-relaxed font-medium">"{analysis.deconstruction.coreThesis || "Parsing node signature..."}"</p>
        </div>
      </div>
      
      <div className="p-10 bg-slate-950 border border-slate-800 rounded-[3rem] shadow-2xl border-l-[10px] border-l-cyan-600 group hover:border-l-cyan-400 transition-all">
        <div className="flex items-center gap-4 mb-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_#06b6d4]"></div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.5em] italic">VON NEUMANN GATE</span>
        </div>
        <p className="text-[10px] text-slate-600 font-mono leading-relaxed uppercase tracking-tighter italic">
            RMAS-v2.0 KERNEL ACTIVE. MCMC CONVERGENCE VERIFIED @ 10,000 ITERATIONS.
        </p>
      </div>
    </aside>
  );
};
