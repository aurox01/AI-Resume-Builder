import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

const CallToAction = () => {
  return (
    <div id="cta" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        
        {/* Animated Background Glow Shapes */}
        <div className="absolute -right-10 -bottom-10 size-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute -left-10 -top-10 size-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-4 text-center md:text-left max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/30">
            <Sparkles className="size-3.5" /> 100% Free Resume Builder
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Your Next Opportunity Starts With a Better Resume.
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Build your professional resume today and download it completely free. No subscription, watermark, or credit card required.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-300 pt-2">
            <span className="flex items-center gap-1.5"><Check className="size-4 text-cyan-400 stroke-[3]" /> Free forever</span>
            <span className="flex items-center gap-1.5"><Check className="size-4 text-cyan-400 stroke-[3]" /> No watermark</span>
            <span className="flex items-center gap-1.5"><Check className="size-4 text-cyan-400 stroke-[3]" /> Professional templates</span>
          </div>
        </div>

        <div className="z-10 shrink-0">
          <Link
            to="/app"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-500/30 active:scale-95 transition-all inline-flex items-center gap-2 group cursor-pointer"
          >
            <span>Create Resume Free</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CallToAction;
