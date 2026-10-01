import React from 'react';
import { Sparkles, Download, ShieldCheck, Palette, Save, Eye, Zap, Check } from 'lucide-react';

const Features = () => {
  return (
    <div id="features" className="py-20 bg-white border-t border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 rounded-full px-4 py-1.5 mb-3">
            <Zap className="size-3.5" />
            <span>Complete Career Toolkit</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Stand Out
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            From writing to formatting to final PDF export, everything is built into one simple workflow.
          </p>
        </div>

        {/* Asymmetric Modern Grid with Distinct Card Visual Treatments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: AI Writing Assistant */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="size-11 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Writing Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Refine bullet points and professional summaries into compelling achievement statements with zero prompt hassle.
              </p>
            </div>
            {/* Visual Mini Interface */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 text-[10px] space-y-1.5 shadow-2xs">
              <div className="text-slate-400 italic">"Managed team projects..."</div>
              <div className="text-purple-700 font-bold flex items-center gap-1">
                <Sparkles className="size-3" /> Enhanced: "Spearheaded cross-functional projects delivering 25% efficiency boost."
              </div>
            </div>
          </div>

          {/* Card 2: ATS-Friendly Templates */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="size-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ATS-Friendly Templates</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Machine-readable layouts designed to clear automated Applicant Tracking System filters with high scores.
              </p>
            </div>
            {/* Visual ATS Score Graphic */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center">
                  94
                </div>
                <span className="text-xs font-bold text-slate-800">ATS Match Score</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">High Match ✓</span>
            </div>
          </div>

          {/* Card 3: Free PDF Export */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="size-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Download className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free PDF Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Download crisp, print-ready A4 vector PDF files without any hidden paywalls or ugly watermarks.
              </p>
            </div>
            {/* Visual PDF Animation Graphic */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-red-100 text-red-600 font-bold text-[10px] rounded">PDF</div>
                <span className="text-xs font-bold text-slate-800">Resume.pdf</span>
              </div>
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                100% Free <Download className="size-3" />
              </span>
            </div>
          </div>

          {/* Card 4: Smart Auto Save */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="size-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Save className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Auto Save</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Drafts are backed up continuously to local storage and your user account so you never lose edits.
              </p>
            </div>
            {/* Visual Saving Status Graphic */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <Check className="size-4 stroke-[3]" /> All Changes Saved
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Just now</span>
            </div>
          </div>

          {/* Card 5: Professional Customization */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="size-11 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Customization</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Tailor primary accent colors, font families, text sizes, and margins with instant live preview.
              </p>
            </div>
            {/* Visual Color Pills */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-around shadow-2xs">
              <div className="size-5 rounded-full bg-blue-600 ring-2 ring-blue-300"></div>
              <div className="size-5 rounded-full bg-emerald-500"></div>
              <div className="size-5 rounded-full bg-purple-600"></div>
              <div className="size-5 rounded-full bg-slate-900"></div>
              <span className="text-[10px] font-bold text-slate-500">Theme Engine</span>
            </div>
          </div>

          {/* Card 6: Live Resume Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="size-11 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Eye className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live Resume Preview</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                See exact A4 page updates as you type without waiting for page refreshes or slow re-renders.
              </p>
            </div>
            {/* Visual Mini Document Thumbnail */}
            <div className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="h-6 w-full bg-slate-100 rounded flex items-center px-2 justify-between">
                <span className="text-[9px] font-bold text-slate-600">A4 Document Canvas</span>
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Features;
