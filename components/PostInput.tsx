
import React, { useState } from 'react';
import { Send, Zap, Loader2, Sparkles } from 'lucide-react';

interface PostInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  onLoadExample: () => void;
}

export const PostInput: React.FC<PostInputProps> = ({ onAnalyze, isLoading, onLoadExample }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onAnalyze(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="p-8 lg:p-10 glass-card rounded-[3rem] border-cyan-500/20 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Sparkles size={120} className="text-cyan-500" />
        </div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
            <label className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic">TITAN Pulse Core Input</label>
          </div>
          <button
            type="button"
            onClick={onLoadExample}
            disabled={isLoading}
            className="text-[10px] bg-slate-900 text-cyan-400 hover:bg-slate-800 disabled:opacity-50 px-4 py-1.5 rounded-full border border-slate-800 font-black transition-all uppercase tracking-widest"
          >
            Load Seed Node
          </button>
        </div>
        
        <div className="relative z-10">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            placeholder="Inject attention node content here... Context parsing active."
            className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 text-slate-100 focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium leading-relaxed resize-none h-48 outline-none text-lg selection:bg-cyan-500/30 placeholder:text-slate-700"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="mt-8 w-full flex items-center justify-center gap-4 text-slate-950 font-black py-6 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-300 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-2xl shadow-cyan-500/20 group uppercase tracking-[0.4em] italic relative z-10"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Loader2 size={24} className="animate-spin" />
              <span>Calibrating Kernel Logic...</span>
            </div>
          ) : (
            <>
              <Zap size={22} className="group-hover:rotate-12 transition-transform" />
              <span>Synthesize Alpha Engagement Layer</span>
            </>
          )}
        </button>
        
        <div className="mt-4 flex justify-between items-center px-2">
           <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Input Buffer Status: Nominal</span>
           <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">{text.length} Bytes</span>
        </div>
      </form>
    </div>
  );
};
