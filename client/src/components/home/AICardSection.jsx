import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AICardSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Subtle Glow Decor */}
          <div className="absolute -right-20 -bottom-20 size-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 size-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Column Text & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Sparkles className="size-3.5" /> Next-Gen AI Resume Engine
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Let AI Improve Your Resume Content
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Stuck writing job bullet points or a professional summary? Our built-in AI assistant refines your draft text into compelling, quantifiable, ATS-ready achievement statements.
            </p>

            <div className="space-y-2.5 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-400" /> Action verb enrichment & quantifiable metrics
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-400" /> ATS keyword optimization tailored to job role
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-400" /> One-click instant enhancement with zero prompt engineering
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/app')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Try AI Suggestions</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column Interactive Before/After Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl relative backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="size-4 text-cyan-400" /> Live AI Enhancement Demo
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                  ATS Score Boost +40%
                </span>
              </div>

              {/* BEFORE Box */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  BEFORE (Weak Bullet Point)
                </span>
                <p className="text-xs text-slate-400 italic pt-1">
                  "Worked on website development."
                </p>
              </div>

              {/* AI Arrow Divider */}
              <div className="flex items-center justify-center">
                <div className="size-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg text-white font-bold text-xs animate-bounce">
                  ↓
                </div>
              </div>

              {/* AFTER Box */}
              <div className="bg-gradient-to-br from-blue-950/60 to-cyan-950/40 rounded-xl p-4 border border-cyan-500/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="size-3" /> AFTER (AI Enhanced)
                  </span>
                </div>
                <p className="text-xs text-cyan-100 font-medium leading-relaxed pt-1">
                  "Developed responsive web applications using React.js and modern frontend technologies, improving usability and site performance by 35%."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AICardSection;
