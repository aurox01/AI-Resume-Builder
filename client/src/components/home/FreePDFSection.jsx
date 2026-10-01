import React from 'react';
import { Download, CheckCircle2, ArrowRight, FileText, Palette, Eye, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreePDFSection = () => {
  const navigate = useNavigate();

  const workflowSteps = [
    { step: "01", name: "Create Resume", icon: FileText, desc: "Fill in info or use AI assistant" },
    { step: "02", name: "Customize", icon: Palette, desc: "Pick template, colors & typography" },
    { step: "03", name: "Live Preview", icon: Eye, desc: "Verify exact A4 paper formatting" },
    { step: "04", name: "Download PDF", icon: Download, desc: "Instant vector PDF file export", active: true },
  ];

  return (
    <div className="py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 rounded-full px-4 py-1.5 mb-3">
          <Download className="size-3.5 text-emerald-600" />
          <span>Zero Paywalls. Zero Watermarks.</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Your Resume. Your PDF. Completely Free.
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-3 leading-relaxed">
          Unlike other builders that force a subscription right at the download screen, we provide 100% free vector PDF downloads for all users.
        </p>

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-600" /> No Subscription
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-600" /> No Watermarks
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-600" /> No Credit Card Needed
          </span>
        </div>

        {/* Interactive Workflow Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 text-left">
          {workflowSteps.map((w, index) => {
            const Icon = w.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  w.active
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-xl scale-105'
                    : 'bg-white text-slate-900 border-slate-200 shadow-2xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${w.active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      Step {w.step}
                    </span>
                    <Icon className={`size-5 ${w.active ? 'text-white' : 'text-emerald-600'}`} />
                  </div>
                  <h3 className="font-extrabold text-base mb-1">{w.name}</h3>
                  <p className={`text-xs ${w.active ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {w.desc}
                  </p>
                </div>

                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 size-6 rounded-full bg-slate-200 border border-white text-slate-600 text-[10px] font-bold flex items-center justify-center">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate('/app')}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all inline-flex items-center gap-2 group cursor-pointer"
          >
            <span>Download PDF Free</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default FreePDFSection;
