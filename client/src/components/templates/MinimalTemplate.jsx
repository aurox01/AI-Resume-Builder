import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalTemplate = ({ data, accentColor = "#3B82F6", fontFamily = "Outfit", fontSize = "medium", spacing = "normal" }) => {
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
        <div className={`w-full max-w-[210mm] h-full mx-auto p-6 sm:p-8 bg-white text-gray-900 ${fontClass} ${getFontSizeClass()} leading-relaxed box-border`}>
            {/* Header */}
            <header className="mb-6 pb-4 border-b border-gray-200">
                <h1 className="text-3xl sm:text-4xl font-light mb-1 tracking-tight text-gray-900">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-3">
                        {data.personal_info.profession}
                    </p>
                )}

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600">
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
                    <p className="text-gray-700 text-justify leading-relaxed">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="avoid-break space-y-1">
                                <div className="flex justify-between items-baseline flex-wrap">
                                    <h3 className="text-sm font-medium text-gray-900">{exp.position}</h3>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 font-semibold">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 text-xs leading-relaxed whitespace-pre-line pt-0.5">
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
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div key={index} className="avoid-break space-y-0.5">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-sm font-medium text-gray-900">{proj.name}</h3>
                                    {proj.type && <span className="text-xs text-gray-500 italic">{proj.type}</span>}
                                </div>
                                {proj.description && <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="avoid-break flex justify-between items-baseline flex-wrap">
                                <div>
                                    <h3 className="text-xs font-medium text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-xs text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="avoid-break">
                    <h2 className="text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-xs text-gray-700 leading-relaxed font-medium">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;