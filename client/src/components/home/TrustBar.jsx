import React from 'react';
import { Layout, Download, ShieldCheck, Sparkles } from 'lucide-react';

const TrustBar = () => {
  const stats = [
    { number: "5+", label: "Professional Templates", icon: Layout, color: "text-blue-600 bg-blue-50" },
    { number: "100%", label: "Free PDF Export", icon: Download, color: "text-emerald-600 bg-emerald-50" },
    { number: "94+", label: "ATS Ready Score", icon: ShieldCheck, color: "text-purple-600 bg-purple-50" },
    { number: "24/7", label: "AI Writing Assistance", icon: Sparkles, color: "text-cyan-600 bg-cyan-50" },
  ];

  return (
    <div className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
          Everything you need to create a professional resume
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group"
              >
                <div className={`size-12 rounded-xl ${s.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="size-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {s.number}
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-1">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
