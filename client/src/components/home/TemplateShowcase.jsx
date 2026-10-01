import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Check, Sparkles, ArrowRight } from 'lucide-react';

const TemplateShowcase = () => {
    const templates = [
        {
            id: "classic",
            name: "Classic / Professional",
            badge: "Top Corporate Choice",
            description: "Traditional resume structure favored by Fortune 500 recruiters and corporate executives.",
            bg: "bg-blue-50/50 border-blue-200"
        },
        {
            id: "modern",
            name: "Modern SaaS",
            badge: "Most Popular",
            description: "Sleek header block layout with modern font choices for tech and product roles.",
            bg: "bg-emerald-50/50 border-emerald-200"
        },
        {
            id: "minimal",
            name: "Minimalist",
            badge: "High Contrast",
            description: "Ultra-clean design prioritizing readability, typography spacing, and content clarity.",
            bg: "bg-slate-100/60 border-slate-300"
        },
        {
            id: "minimal-image",
            name: "Creative & Profile",
            badge: "Portfolio Support",
            description: "Dual-column layout featuring profile photo integration and structured sidebar elements.",
            bg: "bg-purple-50/50 border-purple-200"
        },
        {
            id: "ats",
            name: "ATS Friendly",
            badge: "100% Parser Score",
            description: "Single-column format designed specifically to pass automated applicant tracking systems.",
            bg: "bg-amber-50/50 border-amber-200"
        }
    ];

    return (
        <div id="templates" className="py-20 bg-slate-50/70 scroll-mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 rounded-full px-4 py-1.5 mb-3">
                    <Layout className="size-3.5" />
                    <span>Choose Your Style</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Professional Templates for Every Career Field
                </h2>
                <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-3">
                    Switch templates anytime with one click. Your data automatically formats into whichever style you choose.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
                    {templates.map((t) => (
                        <div
                            key={t.id}
                            className={`p-6 rounded-2xl border ${t.bg} hover:shadow-xl transition-all duration-300 flex flex-col justify-between group bg-white`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-900 text-white rounded-md">
                                        {t.badge}
                                    </span>
                                    <Sparkles className="size-4 text-amber-500" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                    {t.name}
                                </h3>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    {t.description}
                                </p>
                            </div>

                            <Link
                                to="/app"
                                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                            >
                                <span>Create Resume Free</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateShowcase;
