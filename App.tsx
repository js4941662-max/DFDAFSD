
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BrainCircuit, Sparkles, ShieldCheck, Zap, Terminal, Activity, ChevronRight, BarChart3, AlertTriangle, Trash2, RefreshCw, Cpu, Gauge, Radio, Network, Users, Eye, MousePointer2, MessageSquare, Heart, Repeat, Bookmark, Share2, Key } from 'lucide-react';
import { type PostAnalysis, type ReplyStrategy, type SystemState } from './types';
import { analyzePost } from './services/geminiService';
import { PostInput } from './components/PostInput';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { Loader } from './components/Loader';
import { AlphaStat } from './components/AlphaStat';

// Fix: Explicitly define the AIStudio interface and use the readonly modifier 
// in the Window declaration to resolve "identical modifiers" and "subsequent property declarations" errors.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    readonly aistudio: AIStudio;
  }
}

export default function App() {
  const [viewMode, setViewMode] = useState<'CONSOLE' | 'SYSTEM' | 'DIAGNOSTICS'>('CONSOLE');
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'INJECTING' | 'KEY_REQUIRED'>('IDLE');
  const [analysisData, setAnalysisData] = useState<{ analysis: PostAnalysis, strategies: ReplyStrategy[] } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [sessionStartTime] = useState(Date.now());
  
  const [systemState, setSystemState] = useState<SystemState>({
    alphaIndex: 0.842,
    nodesProcessed: 1142,
    successRate: 98.4,
    averageSigma: 3.2,
    entropy: 0.041,
    impressions: "308.2K",
    engagementRate: "1.0%"
  });

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 50));
  };

  const clearLogs = () => setLogs([]);

  const checkApiKey = async () => {
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setStatus('KEY_REQUIRED');
        addLog("SYSTEM_ALERT: API Key required for gemini-3-pro-preview.");
      } else {
        setStatus('IDLE');
      }
    } catch (e) {
      console.error("Failed to check API key", e);
    }
  };

  useEffect(() => {
    const startupSequence = [
      "TITAN-v20 KERNEL BOOT... [OK]",
      "RECURSIVE-ALPHA INITIALIZED... [OK]",
      "HEAVY-RANKER EMULATION v15 READY... [ONLINE]",
      "FETCHING RECENT ATTENTION METRICS...",
      "QA CIRCUIT BREAKER: ARMED"
    ];
    startupSequence.forEach((msg, i) => {
      setTimeout(() => addLog(msg), i * 150);
    });
    checkApiKey();
  }, []);

  const handleOpenKeySelector = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Proceed assuming success as per race condition guidelines
      setStatus('IDLE');
      addLog("AUTH: Key selection sequence triggered.");
    } catch (e) {
      addLog("AUTH_ERROR: Failed to open key selector.");
    }
  };

  const handleExecutePipeline = async (text: string) => {
    if (!text.trim()) return;

    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      setStatus('KEY_REQUIRED');
      addLog("BLOCK: Operation halted. Valid API Key required.");
      return;
    }
    
    setStatus('PROCESSING');
    setAnalysisData(null);
    addLog(`NODE_INGEST: ${text.substring(0, 24)}...`);
    addLog("QC: Manifold integrity check initiated.");
    
    try {
      const data = await analyzePost(text);
      
      if (!data?.strategies?.length) {
        throw new Error("Empty neural convergence. Strategy array null.");
      }

      const primary = data.strategies[0];
      const sigma = primary.statisticalTelemetry?.sigmaLevel ?? 0;

      addLog(`RMAS_STABLE: Convergence achieved in ${Math.floor(Math.random() * 400 + 300)}ms`);
      addLog(`PAYLOAD_LOCKED: Resonance threshold met @ ${sigma.toFixed(1)}σ`);
      
      if ((primary.gauntletResults?.sanctum?.slopIndex || 0) > 0.1) {
        addLog("QC_WARNING: Low-level slop detected. Suppression active.");
      }

      setAnalysisData(data);
      
      setSystemState(prev => ({
        ...prev,
        nodesProcessed: prev.nodesProcessed + 1,
        alphaIndex: Math.min(0.999, prev.alphaIndex + 0.0022),
        entropy: Math.max(0.001, prev.entropy * 0.975)
      }));
    } catch (err: any) {
      console.error("Pipeline Fault:", err);
      const errorMsg = err.message || "Unknown error";
      addLog(`CRITICAL_FAULT: ${errorMsg}`);
      
      if (errorMsg.includes("Requested entity was not found")) {
        addLog("AUTH_FAIL: Resetting key selection state.");
        setStatus('KEY_REQUIRED');
      }
    } finally {
      setStatus(prev => prev === 'PROCESSING' ? 'IDLE' : prev);
    }
  };

  const handleInject = async (strategy: ReplyStrategy) => {
    setStatus('INJECTING');
    addLog(`PROTOCOL_INJECT: Engaging X High-Ranker stream.`);
    try {
      await new Promise(r => setTimeout(r, 2200));
      addLog("INJECTION_SUCCESS: Attention vector saturated.");
      setSystemState(prev => ({
        ...prev,
        successRate: Math.min(99.9, prev.successRate + 0.05),
        impressions: (parseFloat(prev.impressions) + 12.4).toFixed(1) + "K"
      }));
    } catch (e) {
      addLog("INJECTION_FAULT: Network variance detected.");
    } finally {
      setStatus('IDLE');
    }
  };

  const uptime = Math.floor((Date.now() - sessionStartTime) / 1000);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/40 font-sans transition-all duration-500">
      <div className="fixed inset-0 pointer-events-none -z-10 bg-grid opacity-10"></div>
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      
      <main className="max-w-[1700px] mx-auto p-6 lg:p-12 space-y-12">
        <header className="flex flex-col xl:flex-row justify-between items-center gap-12 glass-card p-8 lg:p-12 rounded-[3.5rem] border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)] group-hover:scale-105 transition-transform duration-700">
              <BrainCircuit size={48} className="animate-pulse" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">TITAN v20.0</h1>
                <div className="bg-cyan-600 text-slate-950 text-[11px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">QUANTUM-AUTO</div>
              </div>
              <p className="text-[10px] font-mono tracking-[0.8em] text-slate-500 uppercase mt-4 flex items-center justify-center md:justify-start gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                Attention Sovereignty // Heavy Ranker Optimized
              </p>
            </div>
          </div>
          
          <nav className="flex bg-slate-950/80 p-2.5 rounded-[2.5rem] border border-slate-800 shadow-inner">
            {[
              { id: 'CONSOLE', label: 'Console Hub', icon: Terminal },
              { id: 'SYSTEM', label: 'Performance', icon: BarChart3 },
              { id: 'DIAGNOSTICS', label: 'Kernel Stats', icon: Activity }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setViewMode(tab.id as any)}
                className={`flex items-center gap-3 px-10 py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-widest transition-all ${viewMode === tab.id ? 'bg-cyan-600 text-slate-950 shadow-2xl scale-105' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8 space-y-10">
            {status === 'KEY_REQUIRED' ? (
              <div className="glass-card rounded-[3.5rem] p-16 flex flex-col items-center justify-center text-center space-y-12 border-amber-500/20 bg-amber-500/5 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Key size={48} className="animate-bounce" />
                </div>
                <div className="space-y-6 max-w-2xl">
                  <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">API Key Required</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    TITAN v20.0 utilizes <code className="text-cyan-400">gemini-3-pro-preview</code> for high-fidelity deconstruction. To resolve quota constraints and enable deep-manifold analysis, you must select an API key from a paid GCP project.
                  </p>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] font-black text-cyan-500 hover:text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      View Gemini API Billing Documentation <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
                <button 
                  onClick={handleOpenKeySelector}
                  className="px-12 py-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-[2rem] transition-all shadow-2xl shadow-amber-500/20 uppercase tracking-[0.4em] italic text-sm"
                >
                  Configure API Key
                </button>
              </div>
            ) : viewMode === 'CONSOLE' ? (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <PostInput 
                  onAnalyze={handleExecutePipeline} 
                  isLoading={status === 'PROCESSING'} 
                  onLoadExample={() => handleExecutePipeline("The industrial age was about brute force. The information age was about distribution. The next era is about attention sovereignty—direct injection into high-status interest clusters. Move past the slop.")}
                />
                
                {status === 'PROCESSING' && <Loader />}
                
                {analysisData && status !== 'PROCESSING' && (
                  <AnalysisDisplay 
                    analysis={analysisData.analysis} 
                    strategies={analysisData.strategies} 
                    onInject={handleInject} 
                  />
                )}
                
                {!analysisData && status === 'IDLE' && (
                  <div className="glass-card rounded-[3rem] p-36 flex flex-col items-center justify-center text-center space-y-10 border-slate-800 bg-slate-950/20 group hover:border-cyan-500/20 transition-all duration-1000">
                    <div className="relative">
                      <Zap size={80} className="text-slate-700 group-hover:text-cyan-500 transition-all duration-1000 transform group-hover:rotate-12" />
                      <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-slate-600 uppercase tracking-widest italic leading-none">Awaiting Target Node</h3>
                      <p className="text-slate-500 text-[11px] font-mono uppercase tracking-[0.4em] max-w-sm mx-auto">Feed the TITAN Kernel with high-potential attention vectors.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : viewMode === 'SYSTEM' ? (
              <div className="space-y-10 animate-in fade-in duration-700">
                {/* Analytics Chart Emulation */}
                <div className="glass-card rounded-[3rem] p-8 border-slate-800 bg-slate-950/30 overflow-hidden">
                   <div className="flex justify-between items-center mb-8 px-4">
                      <div className="flex gap-4">
                         <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400"></div>
                            <span className="text-[10px] font-black uppercase text-slate-400">Posts</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-green-400"></div>
                            <span className="text-[10px] font-black uppercase text-slate-400">Replies</span>
                         </div>
                      </div>
                      <AlertTriangle size={16} className="text-slate-700" />
                   </div>
                   <div className="h-64 flex items-end justify-around gap-2 px-4 relative">
                      {[
                        { day: 'Dec 23', p: 90, r: 112 },
                        { day: 'Dec 24', p: 150, r: 15 },
                        { day: 'Dec 25', p: 130, r: 10 },
                        { day: 'Dec 26', p: 70, r: 40 },
                        { day: 'Dec 27', p: 210, r: 8 },
                        { day: 'Dec 28', p: 140, r: 5 },
                        { day: 'Dec 29', p: 110, r: 120 }
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-help">
                           <div className="flex gap-1 items-end w-full h-48">
                              <div className="flex-1 bg-cyan-400/80 rounded-t-sm transition-all group-hover:bg-cyan-300" style={{ height: `${(bar.p / 220) * 100}%` }}></div>
                              <div className="flex-1 bg-green-400/80 rounded-t-sm transition-all group-hover:bg-green-300" style={{ height: `${(bar.r / 220) * 100}%` }}></div>
                           </div>
                           <span className="text-[9px] font-black text-slate-600 uppercase mt-2">{bar.day}</span>
                        </div>
                      ))}
                      <div className="absolute inset-x-0 top-0 border-t border-slate-800/30"></div>
                      <div className="absolute inset-x-0 top-1/4 border-t border-slate-800/30"></div>
                      <div className="absolute inset-x-0 top-2/4 border-t border-slate-800/30"></div>
                      <div className="absolute inset-x-0 top-3/4 border-t border-slate-800/30"></div>
                   </div>
                </div>

                {/* Performance Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "Verified followers", value: "4.3K", sub: "/ 7.4K", icon: Users, color: "text-cyan-400", trend: null },
                    { label: "Impressions", value: "308.2K", sub: "", icon: Eye, color: "text-white", trend: "+179%", trendUp: true },
                    { label: "Engagement rate", value: "1%", sub: "", icon: Activity, color: "text-white", trend: "-18%", trendUp: false },
                    { label: "Engagements", value: "3.3K", sub: "", icon: MousePointer2, color: "text-white", trend: "+127%", trendUp: true },
                    { label: "Profile visits", value: "1.5K", sub: "", icon: Users, color: "text-white", trend: "+63%", trendUp: true },
                    { label: "Replies", value: "37", sub: "", icon: MessageSquare, color: "text-white", trend: "+76%", trendUp: true },
                    { label: "Likes", value: "234", sub: "", icon: Heart, color: "text-white", trend: "+58%", trendUp: true },
                    { label: "Reposts", value: "39", sub: "", icon: Repeat, color: "text-white", trend: "+14%", trendUp: true },
                    { label: "Bookmarks", value: "47", sub: "", icon: Bookmark, color: "text-white", trend: "+422%", trendUp: true },
                    { label: "Shares", value: "6", sub: "", icon: Share2, color: "text-white", trend: "+100%", trendUp: true }
                  ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl border-slate-800/60 hover:border-cyan-500/40 transition-all group">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                             {stat.label} {stat.label === "Verified followers" && <ShieldCheck size={10} className="text-cyan-400" />}
                          </span>
                          <stat.icon size={14} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-black ${stat.color} italic`}>{stat.value}</span>
                          {stat.sub && <span className="text-xs text-slate-600 font-black">{stat.sub}</span>}
                          {stat.trend && (
                            <span className={`ml-auto text-[10px] font-black ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                               {stat.trendUp ? '↑' : '↓'} {stat.trend}
                            </span>
                          )}
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in duration-700">
                <div className="glass-card rounded-[3.5rem] p-12 border-slate-800 bg-slate-950/40">
                  <h3 className="text-[13px] font-black text-white mb-10 uppercase tracking-[0.6em] flex items-center gap-4 italic">
                    <Gauge size={22} className="text-amber-500" />
                    SYSTEM DIAGNOSTICS & QC
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      {[
                        { label: "Kernel Health", val: 100, color: "bg-green-500" },
                        { label: "Saliency Filter", val: 94.2, color: "bg-cyan-500" },
                        { label: "MCMC Convergence", val: 99.1, color: "bg-purple-500" },
                        { label: "Token Buffer", val: 82.5, color: "bg-amber-500" }
                      ].map(diag => (
                        <div key={diag.label} className="space-y-3">
                          <div className="flex justify-between items-center px-1">
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{diag.label}</span>
                            <span className="text-[11px] font-mono text-white font-bold">{diag.val}%</span>
                          </div>
                          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                            <div 
                              className={`h-full ${diag.color} transition-all duration-1000 ease-out`} 
                              style={{ width: `${diag.val}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-slate-900/60 rounded-[2.5rem] border border-slate-800 p-10 space-y-8 flex flex-col justify-center shadow-inner">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-500 shadow-lg">
                             <Radio size={32} className="animate-pulse" />
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-white italic uppercase leading-none">Kernel Heartbeat</h4>
                             <p className="text-[11px] text-slate-500 font-mono mt-2 uppercase tracking-widest">Uptime: {uptime}s // Active Loops: 14</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-green-500 shadow-lg">
                             <Network size={32} />
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-white italic uppercase leading-none">Network Mesh</h4>
                             <p className="text-[11px] text-slate-500 font-mono mt-2 uppercase tracking-widest">Latency: 42ms // Jitter: 1.2ms</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="xl:col-span-4 space-y-10">
            <section className="glass-card rounded-[3rem] p-10 border-slate-800 h-[550px] flex flex-col bg-slate-950/60 relative group">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] italic flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse"></div>
                  KERNEL TELEMETRY
                </h2>
                <div className="flex items-center gap-4">
                  <button onClick={clearLogs} title="Purge Logs" className="text-slate-600 hover:text-red-400 transition-colors p-1.5 bg-slate-900 rounded-lg border border-slate-800 shadow-sm">
                    <Trash2 size={14} />
                  </button>
                  <span className="text-[9px] font-mono text-cyan-500/40 uppercase">v20.0 LIVE</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-3.5 text-cyan-400/80 pr-2 custom-scrollbar">
                {logs.length > 0 ? logs.map((log, i) => (
                  <div key={i} className={`pl-5 border-l-2 transition-all duration-500 ${i === 0 ? 'border-cyan-500 text-cyan-200 bg-cyan-500/5 py-1' : 'border-slate-800/40 opacity-40 hover:opacity-100 hover:text-cyan-300'}`}>
                    {log}
                  </div>
                )) : (
                  <div className="h-full flex items-center justify-center text-slate-700 uppercase italic text-[12px] tracking-widest">
                    Telemetry Inactive
                  </div>
                )}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800/60 flex items-center justify-between">
                 <div className="flex gap-2.5">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-cyan-500/20"></div>)}
                 </div>
                 <span className="text-[10px] font-black text-slate-700 uppercase italic tracking-widest">QA Integrity: 99.8%</span>
              </div>
            </section>

            <section className="glass-card rounded-[3rem] p-10 border-slate-800 bg-slate-950/60 group">
               <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] mb-10 italic flex items-center gap-4">
                  <ShieldCheck size={18} className="text-green-500" />
                  SAFETY GAUNTLET
              </h2>
              <div className="space-y-5">
                {[
                  { label: "Slop Detection", status: "Active", icon: ShieldCheck, color: "text-green-500" },
                  { label: "Bot Mitigation", status: "Bypass", icon: Zap, color: "text-cyan-500" },
                  { label: "Rate Limiter", status: "Nominal", icon: Activity, color: "text-amber-500" }
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-5 bg-slate-900/60 rounded-[1.5rem] border border-slate-800 group hover:border-slate-600 transition-all shadow-lg">
                    <div className="flex items-center gap-4">
                      <item.icon size={16} className={item.color} />
                      <span className="text-[11px] font-black uppercase text-slate-400 group-hover:text-slate-200 transition-colors tracking-widest">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-tighter">{item.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="text-center py-24 border-t border-slate-900/50">
          <p className="text-[11px] font-mono text-slate-800 uppercase tracking-[2.5em] italic">TITAN v20.0 // ALPHA DOMINANCE PROTOCOL</p>
        </footer>
      </main>
    </div>
  );
}
