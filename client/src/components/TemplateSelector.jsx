import { Check, Layout, Sparkles, X, ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange, inline = false, customTrigger = null }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id: "more-ats-friendly",
            name: "More ATS Friendly",
            tag: "Top Recruiter Choice",
            score: "ATS 100%",
            description: "High-parsing serif ATS layout with full-width underline dividers, clean bullet points, and optimized typography.",
            bgGradient: "from-slate-900 to-black",
            accentBg: "bg-slate-100 border-slate-300",
            mockup: (
                <div className="w-full h-28 bg-white border border-slate-300 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
                    <div className="text-center pb-1">
                        <div className="h-2 bg-slate-900 rounded-xs w-3/4 mx-auto mb-1"></div>
                        <div className="h-0.5 bg-slate-500 rounded-xs w-1/2 mx-auto"></div>
                    </div>
                    <div className="space-y-1.5 py-1">
                        <div className="h-1 bg-slate-900 rounded-xs w-1/4 pb-0.5 border-b border-slate-400"></div>
                        <div className="h-0.5 bg-slate-300 rounded-xs w-full"></div>
                        <div className="h-0.5 bg-slate-200 rounded-xs w-5/6"></div>
                    </div>
                    <div className="space-y-1 pt-1">
                        <div className="h-1 bg-slate-900 rounded-xs w-1/4 pb-0.5 border-b border-slate-400"></div>
                        <div className="h-0.5 bg-slate-300 rounded-xs w-full"></div>
                    </div>
                </div>
            )
        },
        {
            id: "classic",
            name: "Classic / Professional",
            tag: "Corporate Standard",
            score: "ATS 96%",
            description: "Traditional resume layout with structured section dividers, elegant typography, and clear visual hierarchy.",
            bgGradient: "from-blue-600 to-indigo-600",
            accentBg: "bg-blue-50 border-blue-200",
            mockup: (
                <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
                    <div className="text-center pb-1.5 border-b-2 border-blue-600">
                        <div className="h-2.5 bg-blue-600 rounded-xs w-2/3 mx-auto mb-1"></div>
                        <div className="h-1 bg-slate-400 rounded-xs w-1/2 mx-auto"></div>
                    </div>
                    <div className="space-y-1.5 py-1">
                        <div className="h-1.5 bg-blue-500 rounded-xs w-1/3"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-xs w-4/5"></div>
                    </div>
                    <div className="space-y-1 pt-1 border-t border-slate-100">
                        <div className="h-1.5 bg-blue-500 rounded-xs w-1/4"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                    </div>
                </div>
            )
        },
        {
            id: "modern",
            name: "Modern SaaS",
            tag: "High Impact",
            score: "ATS 94%",
            description: "Sleek header banner with accent backdrop, pill tag highlights, and modern clean geometry.",
            bgGradient: "from-emerald-600 to-teal-600",
            accentBg: "bg-emerald-50 border-emerald-200",
            mockup: (
                <div className="w-full h-28 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs">
                    <div className="bg-emerald-600 p-2 text-white">
                        <div className="h-2.5 bg-white rounded-xs w-1/2 mb-1"></div>
                        <div className="h-1 bg-emerald-200 rounded-xs w-1/3"></div>
                    </div>
                    <div className="p-2 space-y-1.5">
                        <div className="h-1.5 bg-emerald-600 rounded-xs w-1/3"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-xs w-5/6"></div>
                    </div>
                    <div className="p-2 pt-0 flex gap-1">
                        <div className="h-2 bg-emerald-100 rounded-full w-8"></div>
                        <div className="h-2 bg-emerald-100 rounded-full w-8"></div>
                    </div>
                </div>
            )
        },
        {
            id: "minimal",
            name: "Minimalist",
            tag: "Ultra Clean",
            score: "ATS 98%",
            description: "Ultra-clean design focusing on high contrast typography, ample whitespace, and high readability.",
            bgGradient: "from-slate-700 to-slate-900",
            accentBg: "bg-slate-100 border-slate-200",
            mockup: (
                <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
                    <div>
                        <div className="h-3 bg-slate-900 rounded-xs w-1/2 mb-1"></div>
                        <div className="h-1 bg-slate-400 rounded-xs w-1/3 mb-2"></div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-1.5 bg-slate-800 rounded-xs w-1/4"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-xs w-3/4"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-xs w-1/4"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-5/6"></div>
                    </div>
                </div>
            )
        },
        {
            id: "minimal-image",
            name: "Creative / Profile",
            tag: "Photo Supported",
            score: "ATS 92%",
            description: "Dual-column studio layout with profile photo support, left sidebar accents, and skills chips.",
            bgGradient: "from-purple-600 to-pink-600",
            accentBg: "bg-purple-50 border-purple-200",
            mockup: (
                <div className="w-full h-28 bg-white border border-slate-200 rounded-lg overflow-hidden grid grid-cols-3 shadow-xs">
                    <div className="col-span-1 bg-slate-100 p-1.5 flex flex-col items-center justify-start border-r border-slate-200">
                        <div className="size-5 bg-purple-500 rounded-full mb-1"></div>
                        <div className="h-1 bg-slate-300 w-full mb-1"></div>
                        <div className="h-1 bg-slate-200 w-full mb-1"></div>
                    </div>
                    <div className="col-span-2 p-2 space-y-1.5">
                        <div className="h-2 bg-purple-600 rounded-xs w-3/4"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-xs w-4/5"></div>
                    </div>
                </div>
            )
        },
        {
            id: "ats",
            name: "ATS Optimized",
            tag: "Maximum Score",
            score: "ATS 99%",
            description: "Single-column format engineered to achieve maximum parser score with Workday, Taleo, & Greenhouse ATS scanners.",
            bgGradient: "from-amber-500 to-orange-600",
            accentBg: "bg-amber-50 border-amber-200",
            mockup: (
                <div className="w-full h-28 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
                    <div className="text-center pb-1">
                        <div className="h-2.5 bg-amber-600 rounded-xs w-1/2 mx-auto mb-1"></div>
                        <div className="h-1 bg-slate-400 rounded-xs w-2/3 mx-auto"></div>
                    </div>
                    <div className="space-y-1 py-1">
                        <div className="h-1.5 bg-slate-800 rounded-xs w-1/3"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                        <div className="h-1 bg-slate-100 rounded-xs w-full"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="h-1.5 bg-slate-800 rounded-xs w-1/3"></div>
                        <div className="h-1 bg-slate-200 rounded-xs w-full"></div>
                    </div>
                </div>
            )
        }
    ]

    const activeTemplateObj = templates.find(t => t.id === selectedTemplate) || templates[0];

    if (inline) {
        return (
            <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                        <Sparkles className="size-5 text-blue-600" /> Choose Resume Template
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Select a professional layout. Your content is automatically reformatted.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {templates.map((template) => {
                        const isSelected = selectedTemplate === template.id;
                        return (
                            <div
                                key={template.id}
                                onClick={() => onChange(template.id)}
                                className={`group relative rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                                    isSelected
                                        ? "border-blue-600 bg-blue-50/40 ring-4 ring-blue-500/15 shadow-lg scale-[1.01]"
                                        : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                                }`}
                            >
                                <div className="mb-3 relative">
                                    {template.mockup}
                                    <div className="absolute top-2 right-2 flex items-center gap-1">
                                        <span className="text-[10px] font-extrabold bg-slate-900/90 text-white px-2 py-0.5 rounded-full shadow-xs">
                                            {template.score}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5 mb-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                            {template.tag}
                                        </span>
                                        {isSelected && (
                                            <span className="flex items-center gap-1 text-[11px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                                                <Check className="size-3 stroke-[3]" /> Active
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors pt-1">
                                        {template.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                        {template.description}
                                    </p>
                                </div>

                                <button
                                    className={`w-full py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                                            : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
                                    }`}
                                >
                                    {isSelected ? "Active Template" : "Select Template"}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="relative inline-block">
            {customTrigger ? (
                <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
                    {customTrigger}
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 shadow-2xs active:scale-95 transition-all px-3.5 py-2 rounded-xl cursor-pointer"
                >
                    <Layout className="size-4 text-cyan-400" />
                    <span>Template: <strong className="text-white font-extrabold">{activeTemplateObj.name}</strong></span>
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" onClick={() => setIsOpen(false)}>
                    <div
                        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[88vh] flex flex-col text-slate-900 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
                                    <Sparkles className="size-5 text-blue-600" /> Choose Resume Template
                                </h3>
                                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                                    Select a professional layout. Your resume data is automatically reformatted into any template.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="size-9 rounded-full hover:bg-slate-200/80 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Templates Cards Grid */}
                        <div className="p-6 flex-1 min-h-0 overflow-y-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {templates.map((template) => {
                                const isSelected = selectedTemplate === template.id;
                                return (
                                    <div
                                        key={template.id}
                                        onClick={() => {
                                            onChange(template.id);
                                            setIsOpen(false);
                                        }}
                                        className={`group relative rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                                            isSelected
                                                ? "border-blue-600 bg-blue-50/40 ring-4 ring-blue-500/15 shadow-lg scale-[1.01]"
                                                : "border-slate-200 hover:border-slate-300 hover:shadow-lg bg-white"
                                        }`}
                                    >
                                        {/* Mockup Preview Area */}
                                        <div className="mb-3 relative">
                                            {template.mockup}
                                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                                <span className="text-[10px] font-extrabold bg-slate-900/90 text-white px-2 py-0.5 rounded-full shadow-xs">
                                                    {template.score}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content Info */}
                                        <div className="space-y-1.5 mb-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                                    {template.tag}
                                                </span>
                                                {isSelected && (
                                                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-300">
                                                        <Check className="size-3 stroke-[3]" /> Selected
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors pt-1">
                                                {template.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                                {template.description}
                                            </p>
                                        </div>

                                        {/* Action CTA Button */}
                                        <button
                                            className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                                isSelected
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                                                    : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
                                            }`}
                                        >
                                            {isSelected ? "Active Template" : "Select Template"}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-200 bg-slate-50/90 shrink-0 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                                <ShieldCheck className="size-4 text-emerald-600" /> All templates ATS compliant & print ready
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TemplateSelector
