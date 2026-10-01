import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Search, FileText } from 'lucide-react';

const ATSSection = () => {
  const [scanStep, setScanStep] = useState(0);

  const steps = [
    { label: "Scanning Resume.pdf...", status: "scanning" },
    { label: "Structure & Headings Verified", status: "success" },
    { label: "Core Skills & Keywords Detected", status: "success" },
    { label: "Experience Hierarchy Parsed", status: "success" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setScanStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 bg-slate-900 text-white overflow-hidden relative border-t border-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 size-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <ShieldCheck className="size-3.5" /> High ATS Pass Rate
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Built for Modern Applicant Tracking Systems
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Over 75% of resumes are filtered out by automated ATS scanners before a human recruiter reads them. Our templates are precision-formatted to parse cleanly through Workday, Taleo, Greenhouse, and Lever.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Clean single & multi-column structure
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Standard machine-readable headings
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Professional font hierarchy
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> No hidden tables or unreadable graphics
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" /> Consistent section ordering & date formatting
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Optimization focuses on structural compatibility to maximize ATS parsing fidelity.
            </p>
          </div>

          {/* Right Column Score & Scanner Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-6 text-center relative">
              
              {/* Animated 94/100 Circle */}
              <div className="relative size-40 mx-auto flex items-center justify-center">
                <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500 transition-all duration-1000 stroke-dasharray-[94,100]"
                    strokeDasharray="94, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-white">94</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">/ 100 Score</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">ATS Optimization Score</h3>
                <p className="text-xs text-slate-400 mt-0.5">High probability of clearing automated resume screeners</p>
              </div>

              {/* Mini Document Scanner Display */}
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 font-bold text-slate-300">
                    <FileText className="size-3.5 text-blue-400" /> Resume.pdf
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Search className="size-3 animate-pulse" /> Live Scanner
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between transition-opacity duration-300 ${
                        i <= scanStep ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      <span className="text-slate-300 font-medium text-[11px]">{step.label}</span>
                      {i <= scanStep ? (
                        <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="size-2 rounded-full bg-slate-700"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ATSSection;
