import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor = "#3B82F6", fontFamily = "Outfit", fontSize = "medium", spacing = "normal" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        if (!year) return dateStr;
        return new Date(year, (month || 1) - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
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
        <div className={`w-full max-w-[210mm] h-full mx-auto bg-white text-zinc-800 ${fontClass} ${getFontSizeClass()} leading-relaxed box-border`}>
            <div className="grid grid-cols-12 h-full">

                {/* Left Sidebar */}
                <aside className="col-span-4 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                        {/* Profile Image */}
                        <div className="mb-6 text-center">
                            {data.personal_info?.image ? (
                                <img
                                    src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                                    alt="Profile"
                                    className="w-28 h-28 object-cover rounded-full mx-auto shadow-md border-2 border-white"
                                />
                            ) : (
                                <div
                                    className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-sm"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {(data.personal_info?.full_name || "Y")[0]}
                                </div>
                            )}
                        </div>

                        {/* Contact */}
                        <section className="mb-6 avoid-break">
                            <h2 className="text-xs font-bold tracking-widest text-zinc-600 uppercase mb-3 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
                                CONTACT
                            </h2>
                            <div className="space-y-2 text-xs">
                                {data.personal_info?.phone && (
                                    <div className="flex items-center gap-2 break-all">
                                        <Phone size={13} style={{ color: accentColor }} />
                                        <span>{data.personal_info.phone}</span>
                                    </div>
                                )}
                                {data.personal_info?.email && (
                                    <div className="flex items-center gap-2 break-all">
                                        <Mail size={13} style={{ color: accentColor }} />
                                        <span>{data.personal_info.email}</span>
                                    </div>
                                )}
                                {data.personal_info?.location && (
                                    <div className="flex items-center gap-2 break-all">
                                        <MapPin size={13} style={{ color: accentColor }} />
                                        <span>{data.personal_info.location}</span>
                                    </div>
                                )}
                                {data.personal_info?.linkedin && (
                                    <div className="flex items-center gap-2 break-all">
                                        <Linkedin size={13} style={{ color: accentColor }} />
                                        <span>{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                    </div>
                                )}
                                {data.personal_info?.website && (
                                    <div className="flex items-center gap-2 break-all">
                                        <Globe size={13} style={{ color: accentColor }} />
                                        <span>{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section className="mb-6 avoid-break">
                                <h2 className="text-xs font-bold tracking-widest text-zinc-600 uppercase mb-3 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
                                    EDUCATION
                                </h2>
                                <div className="space-y-3 text-xs">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="avoid-break">
                                            <p className="font-bold text-zinc-900">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                                            <p className="text-zinc-600">{edu.institution}</p>
                                            <p className="text-[11px] text-zinc-500 font-medium">
                                                {formatDate(edu.graduation_date)} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <section className="avoid-break">
                                <h2 className="text-xs font-bold tracking-widest text-zinc-600 uppercase mb-3 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
                                    SKILLS
                                </h2>
                                <div className="flex flex-wrap gap-1.5">
                                    {data.skills.map((skill, index) => (
                                        <span key={index} className="px-2 py-0.5 bg-white text-zinc-700 text-xs rounded border border-slate-200 shadow-2xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </aside>

                {/* Right Content */}
                <main className="col-span-8 p-8 flex flex-col justify-start">
                    {/* Header */}
                    <div className="mb-6 pb-4 border-b border-slate-200">
                        <h1 className="text-3xl font-bold text-zinc-900 tracking-wide mb-1" style={{ color: accentColor }}>
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="uppercase text-zinc-600 font-semibold text-xs tracking-widest">
                                {data.personal_info.profession}
                            </p>
                        )}
                    </div>

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className={`avoid-break ${getSpacingClass()}`}>
                            <h2 className="text-xs font-bold tracking-widest mb-2 uppercase" style={{ color: accentColor }}>
                                SUMMARY
                            </h2>
                            <p className="text-zinc-700 leading-relaxed text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className={`avoid-break ${getSpacingClass()}`}>
                            <h2 className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: accentColor }}>
                                EXPERIENCE
                            </h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="avoid-break space-y-1">
                                        <div className="flex justify-between items-baseline flex-wrap">
                                            <h3 className="font-bold text-zinc-900">{exp.position}</h3>
                                            <span className="text-xs text-zinc-500 font-medium">
                                                {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <div className="text-xs text-zinc-700 leading-relaxed whitespace-pre-line">
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
                            <h2 className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-3">
                                {data.project.map((project, index) => (
                                    <div key={index} className="avoid-break space-y-0.5">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-xs font-bold text-zinc-800">{project.name}</h3>
                                            {project.type && <span className="text-[11px] text-zinc-500 italic">{project.type}</span>}
                                        </div>
                                        {project.description && (
                                            <p className="text-xs text-zinc-700 leading-relaxed">{project.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;