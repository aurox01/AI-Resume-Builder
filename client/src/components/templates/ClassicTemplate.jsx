import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor = "#3B82F6", fontFamily = "Outfit", fontSize = "medium", spacing = "normal" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        if (!year) return dateStr;
        return new Date(year, (month || 1) - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const getFontSizeClass = () => {
        switch (fontSize) {
            case "small": return "text-xs";
            case "large": return "text-base";
            default: return "text-sm";
        }
    };

    const getSpacingClass = () => {
        switch (spacing) {
            case "compact": return "space-y-3 mb-4";
            case "spacious": return "space-y-6 mb-8";
            default: return "space-y-4 mb-6";
        }
    };

    const fontClass = `font-${fontFamily.toLowerCase().replace(/\s+/g, '')}`;

    return (
        <div className={`w-full max-w-[210mm] h-full mx-auto p-6 sm:p-8 bg-white text-gray-800 ${fontClass} ${getFontSizeClass()} leading-relaxed box-border`}>
            {/* Header */}
            <header className="text-center mb-6 pb-5 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                        {data.personal_info.profession}
                    </p>
                )}

                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3.5" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-3.5" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3.5" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-3.5" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-3.5" style={{ color: accentColor }} />
                            <span className="break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-base font-bold mb-2 uppercase tracking-wide border-b pb-1" style={{ color: accentColor, borderColor: accentColor + '40' }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-justify">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-base font-bold mb-3 uppercase tracking-wide border-b pb-1" style={{ color: accentColor, borderColor: accentColor + '40' }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="avoid-break border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium text-xs">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-500 font-medium">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 text-xs leading-relaxed whitespace-pre-line mt-1">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-base font-bold mb-3 uppercase tracking-wide border-b pb-1" style={{ color: accentColor, borderColor: accentColor + '40' }}>
                        PROJECTS
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index} className="avoid-break border-l-2 border-slate-300 pl-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                                    {proj.type && <span className="text-xs text-gray-500 italic">{proj.type}</span>}
                                </div>
                                {proj.description && <p className="text-xs text-gray-600 mt-1">{proj.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-base font-bold mb-3 uppercase tracking-wide border-b pb-1" style={{ color: accentColor, borderColor: accentColor + '40' }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="avoid-break flex justify-between items-baseline flex-wrap">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-xs text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-xs text-gray-500 font-medium">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="avoid-break">
                    <h2 className="text-base font-bold mb-3 uppercase tracking-wide border-b pb-1" style={{ color: accentColor, borderColor: accentColor + '40' }}>
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-2 flex-wrap">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="px-2.5 py-1 bg-slate-100 rounded text-xs text-gray-700 font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;