
import React, { useState } from 'react';
// Added Activity and Zap to the lucide-react imports to fix "Cannot find name" errors
import { Copy, Check, Send, Brain, Eye, MousePointer2, Bookmark, BarChart, ChevronDown, Activity, Zap } from 'lucide-react';
import { type ReplyStrategy } from '../types';

interface ReplyCardProps {
  strategy: ReplyStrategy;
  onInject: (strategy: ReplyStrategy) => void;
}

export const ReplyCard: React.FC<ReplyCardProps> = ({ strategy, onInject }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(strategy.replyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-[4rem] border-cyan-500/40 bg-slate-900/30 shadow-[0_0_80px_rgba(6,182,212,0.1)] relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>
      
      <div className="p-10 lg:p-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-3xl bg-slate-950 text-cyan-400 border border-slate-800 flex items-center justify-center font-black text-5xl shadow-xl transition-transform group-hover:scale-110 duration-700 italic">
              Ω
            </div>
            <div>
              <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">Singular Synthesis</h3>
              <div className="flex items-center gap-6">
                <span className="text-[12px] text-cyan-500 font-mono tracking-widest uppercase italic">ALPHA_PAYLOAD_V1.2</span>
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] italic">GLOBAL MAXIMA FOUND</span>
              </div>
            </div>
          </div>
          <div className="bg-cyan-600/10 border border-cyan-500/30 px-8 py-3 rounded-2xl text-right">
            <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Ranker Confidence</div>
            <div className="text-3xl font-black text-white font-mono italic">{strategy.statisticalTelemetry.sigmaLevel.toFixed(1)}σ</div>
          </div>
        </div>

        <div className="relative mb-16 group/quote">
          <div className="absolute -inset-10 bg-cyan-500/5 blur-[80px] opacity-0 group-hover/quote:opacity-100 transition-opacity duration-1000"></div>
          <p className="relative p-12 lg:p-16 bg-slate-950/80 rounded-[3rem] text-slate-100 text-3xl lg:text-4xl leading-[1.3] border border-slate-800 shadow-inner italic font-medium tracking-tight text-center selection:bg-cyan-500/40">
            "{strategy.replyText}"
          </p>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <button onClick={handleCopy} className="p-6 bg-slate-900 hover:bg-slate-800 text-cyan-400 rounded-2xl transition-all border border-slate-700 shadow-2xl">
               {copied ? <Check size={24}/> : <Copy size={24}/>}
            </button>
            <button onClick={() => onInject(strategy)} className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-2xl transition-all shadow-2xl uppercase tracking-[0.3em] text-[14px] border border-cyan-400/50 flex items-center gap-4">
              <Send size={18} />
              EXECUTE INJECTION
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Strategist", val: strategy.cognitiveChain.strategistInsight, color: "text-cyan-400" },
            { label: "Editor", val: strategy.cognitiveChain.editorRefinement, color: "text-purple-400" },
            { label: "Ranker", val: strategy.cognitiveChain.rankerPrediction, color: "text-amber-400" }
          ].map(agent => (
            <div key={agent.label} className="p-6 rounded-3xl border border-slate-800 bg-slate-950/40">
               <div className="flex items-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full bg-current ${agent.color}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest italic ${agent.color}`}>{agent.label} Node</span>
               </div>
               <p className="text-[12px] text-slate-400 font-mono leading-relaxed uppercase italic">"{agent.val}"</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-950/80 px-10 lg:px-16 py-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap items-center gap-12">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">p(AuthorReply)</span>
              <span className="text-cyan-400 font-mono text-[16px] font-black">{(strategy.gnnWeights.pAuthorReply * 100).toFixed(1)}%</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">p(Bookmark)</span>
              <span className="text-purple-400 font-mono text-[16px] font-black">{(strategy.gnnWeights.pBookmark * 100).toFixed(1)}%</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Entropy Reduc.</span>
              <span className="text-green-400 font-mono text-[16px] font-black">{(strategy.statisticalTelemetry.entropyReduction * 100).toFixed(1)}%</span>
           </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="flex items-center gap-4 text-[11px] font-black text-slate-500 hover:text-white uppercase tracking-[0.4em] transition-all group"
        >
          {isExpanded ? 'Hide Audit' : 'Recursive Audit View'}
          <ChevronDown className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} size={16} />
        </button>
      </div>

      {isExpanded && (
        <div className="p-10 lg:p-16 border-t border-slate-800/60 bg-slate-950/40 animate-in slide-in-from-top-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic flex items-center gap-3">
                    <Activity size={12} />
                    INITIAL CRITIQUE
                 </h4>
                 <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-[13px] text-slate-400 font-mono uppercase italic leading-relaxed">
                    "{strategy.recursiveAudit.initialDraftCritique}"
                 </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic flex items-center gap-3">
                    <Zap size={12} />
                    FINAL ADJUSTMENT
                 </h4>
                 <div className="p-6 bg-cyan-900/10 rounded-2xl border border-cyan-500/20 text-[13px] text-cyan-400/80 font-mono uppercase italic leading-relaxed">
                    "{strategy.recursiveAudit.finalAlphaAdjustment}"
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
