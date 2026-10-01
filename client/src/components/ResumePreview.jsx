import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ATSTemplate from './templates/ATSTemplate'
import MoreATSFriendlyTemplate from './templates/MoreATSFriendlyTemplate'
import { FileText } from 'lucide-react'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
    const selectedTemplate = template || data?.template || "classic";
    const color = accentColor || data?.accent_color || "#3B82F6";
    const fontFamily = data?.font_family || "Outfit";
    const fontSize = data?.font_size || "medium";
    const spacing = data?.spacing || "normal";
    const headerStyle = data?.header_style || "line";
    const skillStyle = data?.skill_style || "badge";

    const renderTemplate = () => {
        const props = {
            data,
            accentColor: color,
            fontFamily,
            fontSize,
            spacing,
            headerStyle,
            skillStyle
        };

        switch (selectedTemplate) {
            case "more-ats-friendly":
            case "more_ats":
            case "more-ats":
            case "ats_friendly":
                return <MoreATSFriendlyTemplate {...props} />;
            case "modern":
                return <ModernTemplate {...props} />;
            case "minimal":
                return <MinimalTemplate {...props} />;
            case "minimal-image":
            case "creative":
                return <MinimalImageTemplate {...props} />;
            case "ats":
                return <ATSTemplate {...props} />;
            case "classic":
            case "professional":
            default:
                return <ClassicTemplate {...props} />;
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-start p-3 sm:p-5 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800/80 shadow-2xl max-h-[calc(100vh-9.5rem)] overflow-y-auto overflow-x-auto scroll-smooth space-y-3">
            {/* Strict Single A4 Canvas (210mm x 297mm) */}
            <div
                id="resume-preview-container"
                className={`w-full max-w-[210mm] h-[297mm] max-h-[297mm] bg-white shadow-2xl shadow-black/80 rounded-xs border border-slate-300 transition-all duration-300 shrink-0 overflow-hidden relative ${classes}`}
                style={{ height: '297mm', minHeight: '297mm', maxHeight: '297mm' }}
            >
                {renderTemplate()}
            </div>
        </div>
    )
}

export default ResumePreview
