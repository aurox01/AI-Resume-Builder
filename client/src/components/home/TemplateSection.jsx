import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Eye, ArrowRight, Sparkles, Check } from 'lucide-react';
import TemplateModal from './TemplateModal';

const TemplateSection = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalTemplate, setModalTemplate] = useState(null);

  const filters = ['All', 'Corporate', 'Technology', 'Creative', 'ATS Friendly'];

  const templates = [
    {
      id: 'more-ats-friendly',
      name: 'More ATS Friendly',
      category: 'ATS Friendly',
      badge: 'Top Recruiter Choice',
      description: 'High-parsing serif ATS format with full-width horizontal rule dividers, clean bullet lists, and 100% parser score.',
      accent: '#000000',
      mockup: (
        <div className="w-full h-44 bg-white rounded-lg p-3 border border-slate-300 shadow-sm flex flex-col justify-between text-[7px] leading-tight font-serif">
          <div className="text-center pb-1 mb-1">
            <div className="font-bold text-black text-[10px] uppercase tracking-wide">AUROSISH RANJAN SWAIN</div>
            <div className="text-slate-600 text-[7px]">Bhubhaneswar, India • swainaurosish@gmail.com • +91 8926213612</div>
          </div>
          <div className="space-y-1 text-slate-800">
            <div className="font-bold text-black border-b border-gray-400">EDUCATION</div>
            <div className="h-1 bg-slate-300 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="space-y-1 text-slate-800">
            <div className="font-bold text-black border-b border-gray-400">EXPERIENCE</div>
            <div className="h-1 bg-slate-300 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-4/5"></div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Classic Professional',
      category: 'Corporate',
      badge: 'Top Executive',
      description: 'Traditional layout with structured section dividers favored by corporate hiring managers.',
      accent: '#0F172A',
      mockup: (
        <div className="w-full h-44 bg-white rounded-lg p-3 border border-slate-200 shadow-sm flex flex-col justify-between text-[7px] leading-tight">
          <div className="text-center border-b border-slate-200 pb-1 mb-1">
            <div className="font-bold text-slate-900 text-[9px]">ALEX MORGAN</div>
            <div className="text-slate-500 text-[7px]">Senior Product Manager</div>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="font-bold text-slate-800 border-b border-slate-200">EXPERIENCE</div>
            <div className="h-1 bg-slate-300 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="font-bold text-slate-800 border-b border-slate-200">EDUCATION</div>
            <div className="h-1 bg-slate-200 rounded w-2/3"></div>
          </div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern SaaS',
      category: 'Technology',
      badge: 'Most Popular',
      description: 'Sleek header block with electric blue background and pill tags for tech & product roles.',
      accent: '#2563EB',
      mockup: (
        <div className="w-full h-44 bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between text-[7px] leading-tight">
          <div className="bg-blue-600 text-white p-2.5">
            <div className="font-bold text-[9px]">ALEX MORGAN</div>
            <div className="text-blue-100 text-[7px]">Frontend Engineer & UI Lead</div>
          </div>
          <div className="p-2 space-y-1.5 text-slate-600">
            <div className="h-1 bg-slate-300 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-4/5"></div>
            <div className="flex gap-1 pt-1">
              <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[6px]">React</span>
              <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[6px]">Node.js</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimalist Clean',
      category: 'Corporate',
      badge: 'High Contrast',
      description: 'Ultra-clean layout prioritizing readability, elegant whitespace, and crisp typography.',
      accent: '#475569',
      mockup: (
        <div className="w-full h-44 bg-white rounded-lg p-3 border border-slate-200 shadow-sm flex flex-col justify-between text-[7px] leading-tight">
          <div>
            <div className="font-light text-slate-900 text-[10px] tracking-wide">ALEX MORGAN</div>
            <div className="text-slate-400 uppercase text-[6px] tracking-widest mt-0.5">Software Architect</div>
          </div>
          <div className="space-y-1.5 text-slate-600">
            <div className="h-1 bg-slate-300 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-3/4"></div>
            <div className="h-1 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal-image',
      name: 'Creative & Profile',
      category: 'Creative',
      badge: 'Portfolio Ready',
      description: 'Dual-column layout featuring profile photo integration, sidebar contact, and core skills.',
      accent: '#06B6D4',
      mockup: (
        <div className="w-full h-44 bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm grid grid-cols-3 text-[7px] leading-tight">
          <div className="col-span-1 bg-slate-100 p-1.5 flex flex-col items-center justify-between text-[6px]">
            <div className="size-5 rounded-full bg-cyan-500 mb-1"></div>
            <div className="space-y-0.5 w-full">
              <div className="h-0.5 bg-slate-300 w-full"></div>
              <div className="h-0.5 bg-slate-300 w-full"></div>
            </div>
          </div>
          <div className="col-span-2 p-2 space-y-1 text-slate-600">
            <div className="font-bold text-slate-900 text-[8px]">ALEX MORGAN</div>
            <div className="h-1 bg-cyan-600/30 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-4/5"></div>
          </div>
        </div>
      )
    },
    {
      id: 'ats',
      name: 'ATS Friendly',
      category: 'ATS Friendly',
      badge: '100% Parser Score',
      description: 'Single-column format designed specifically to pass automated applicant tracking systems cleanly.',
      accent: '#16A34A',
      mockup: (
        <div className="w-full h-44 bg-white rounded-lg p-3 border border-slate-200 shadow-sm flex flex-col justify-between text-[7px] leading-tight">
          <div className="text-center border-b border-slate-300 pb-1 mb-1">
            <div className="font-bold text-slate-900 text-[9px] uppercase tracking-wider">ALEX MORGAN</div>
            <div className="text-slate-600 text-[6px]">SAN FRANCISCO, CA • (555) 019-2834 • ALEX@EXAMPLE.COM</div>
          </div>
          <div className="space-y-1 text-slate-700">
            <div className="font-bold text-slate-900 uppercase text-[7px] border-b border-slate-200">WORK EXPERIENCE</div>
            <div className="h-1 bg-slate-400 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      )
    }
  ];

  const filteredTemplates = activeFilter === 'All'
    ? templates
    : templates.filter(t => t.category === activeFilter || (activeFilter === 'ATS Friendly' && t.id === 'ats'));

  return (
    <div id="templates" className="py-20 bg-slate-50/70 border-t border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/80 rounded-full px-4 py-1.5 mb-3">
            <Layout className="size-3.5" />
            <span>Tested & Recruiter-Approved</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Perfect Resume Style
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Select from battle-tested templates. Switch templates at any time without losing your resume information.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((t) => (
            <div
              key={t.id}
              className="group relative bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                  {t.badge}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="size-3" /> ATS Ready
                </span>
              </div>

              {/* Mockup Frame with Hover Zoom */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-100/70 p-3 mb-4 border border-slate-200/80 group-hover:bg-blue-50/40 transition-colors">
                <div className="transform group-hover:scale-105 transition-transform duration-300">
                  {t.mockup}
                </div>

                {/* Hover Overlay Buttons */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => setModalTemplate(t.id)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="size-3.5" /> Preview
                  </button>

                  <button
                    onClick={() => navigate('/app')}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                  {t.description}
                </p>
              </div>

              {/* Card Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setModalTemplate(t.id)}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="size-3.5" /> Preview
                </button>

                <button
                  onClick={() => navigate('/app')}
                  className="px-4 py-2 bg-slate-900 group-hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Use Template</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <TemplateModal
        templateId={modalTemplate}
        isOpen={!!modalTemplate}
        onClose={() => setModalTemplate(null)}
      />
    </div>
  );
};

export default TemplateSection;
