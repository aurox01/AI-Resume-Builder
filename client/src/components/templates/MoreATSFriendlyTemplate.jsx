import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const MoreATSFriendlyTemplate = ({ data, accentColor = "#000000", fontFamily = "Georgia", fontSize = "medium", spacing = "normal" }) => {
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
            case "small": return "text-[11px]";
            case "large": return "text-[13px]";
            default: return "text-[12px]";
        }
    };

    const getSpacingClass = () => {
        switch (spacing) {
            case "compact": return "space-y-2 mb-2.5";
            case "spacious": return "space-y-4 mb-4.5";
            default: return "space-y-3 mb-3.5";
        }
    };

    const personalInfo = data.personal_info || {};
    const experiences = data.experience || [];
    const educationList = data.education || [];
    const projects = data.project || [];
    const skills = data.skills || [];

    return (
        <div className={`w-full max-w-[210mm] h-full mx-auto p-6 sm:p-8 bg-white text-gray-900 font-serif ${getFontSizeClass()} leading-normal box-border`}>
            {/* Header - Center Aligned Clean Serif */}
            <header className="text-center mb-3.5">
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-1" style={{ color: accentColor !== '#3B82F6' ? accentColor : '#000000' }}>
                    {personalInfo.full_name || "YOUR FULL NAME"}
                </h1>

                {personalInfo.profession && (
                    <p className="text-xs font-semibold text-gray-700 tracking-wider mb-2">
                        {personalInfo.profession}
                    </p>
                )}

                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] text-gray-800 font-sans">
                    {personalInfo.location && (
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-gray-700" />
                            {personalInfo.location}
                        </span>
                    )}
                    {personalInfo.email && (
                        <span className="inline-flex items-center gap-1">
                            <Mail className="size-3 text-gray-700" />
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo.phone && (
                        <span className="inline-flex items-center gap-1">
                            <Phone className="size-3 text-gray-700" />
                            {personalInfo.phone}
                        </span>
                    )}
                    {personalInfo.linkedin && (
                        <span className="inline-flex items-center gap-1">
                            <Linkedin className="size-3 text-gray-700" />
                            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '')}
                            </a>
                        </span>
                    )}
                    {personalInfo.website && (
                        <span className="inline-flex items-center gap-1">
                            {personalInfo.website.includes('github') ? <Github className="size-3 text-gray-700" /> : <Globe className="size-3 text-gray-700" />}
                            <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                            </a>
                        </span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5" style={{ color: accentColor !== '#3B82F6' ? accentColor : '#000000' }}>
                        Professional Summary
                    </h2>
                    <p className="text-gray-800 leading-relaxed text-justify">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Education */}
            {educationList.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 border-b border-gray-400 pb-0.5 mb-2" style={{ color: accentColor !== '#3B82F6' ? accentColor : '#000000' }}>
                        Education
                    </h2>
                    <div className="space-y-2">
                        {educationList.map((edu, idx) => (
                            <div key={idx} className="space-y-0.5">
                                <div className="flex justify-between items-baseline font-bold text-gray-900">
                                    <span>
                                        {edu.degree} {edu.field ? `, ${edu.field}` : ''}
                                    </span>
                                    {edu.graduation_date && (
                                        <span className="text-xs font-normal italic text-gray-700">
                                            {edu.graduation_date}
                                        </span>
                                    )}
                                </div>
                                {edu.institution && (
                                    <div className="text-xs italic text-gray-800">
                                        {edu.institution}
                                    </div>
                                )}
                                <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5 pl-1">
                                    {edu.gpa && <li><strong>GPA:</strong> {edu.gpa}</li>}
                                    {edu.coursework && <li><strong>Coursework:</strong> {edu.coursework}</li>}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5" style={{ color: accentColor !== '#3B82F6' ? accentColor : '#000000' }}>
                        Skills
                    </h2>
                    <div className="text-xs text-gray-800 leading-relaxed">
                        {Array.isArray(skills) ? (
                            skills.map((skill, index) => (
                                <span key={index} className="inline-block mr-1 mb-1">
                                    <span className="font-semibold text-gray-900">{skill}</span>
                                    {index < skills.length - 1 ? " • " : ""}
                                </span>
                            ))
                        ) : (
                            <p>{skills}</p>
                        )}
                    </div>
                </section>
            )}

            {/* Work Experience */}
            {experiences.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 border-b border-gray-400 pb-0.5 mb-2" style={{ color: accentColor !== '#3B82F6' ? accentColor : '#000000' }}>
                        Experience
                    </h2>
                    <div className="space-y-3">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-baseline font-bold text-gray-900">
                                    <span>{exp.position}</span>
                                    {(exp.start_date || exp.end_date) && (
                                        <span className="text-xs font-normal italic text-gray-700">
                                            {formatDate(exp.start_date)} {exp.start_date && (exp.end_date || exp.is_current) ? "–" : ""} {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    )}
                                </div>
                                {exp.company && (
                                    <div className="text-xs italic text-gray-800 font-medium">
                                        {exp.company}
                                    </div>
                                )}
                                {exp.description && (
                                    <ul className="text-xs text-gray-800 space-y-1 pl-1">
                                        {exp.description.split("\n").filter(Boolean).map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-gray-600 font-bold">◦</span>
                                                <span className="leading-normal">{bullet.replace(/^[-•◦*]\s*/, "")}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className={`avoid-break ${getSpacingClass()}`}>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 border-b border-gray-400 pb-0.5 mb-2" style={{ color: accentColor !== '#3B82F6' ? accentColor : '#000000' }}>
                        Projects
                    </h2>
                    <div className="space-y-2.5">
                        {projects.map((proj, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-baseline font-bold text-gray-900">
                                    <span>{proj.name}</span>
                                    {proj.type && <span className="text-xs font-normal italic text-gray-600">{proj.type}</span>}
                                </div>
                                {proj.description && (
                                    <ul className="text-xs text-gray-800 space-y-0.5 pl-1">
                                        {proj.description.split("\n").filter(Boolean).map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-gray-600 font-bold">◦</span>
                                                <span className="leading-normal">{bullet.replace(/^[-•◦*]\s*/, "")}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer Page Number Banner */}
            <footer className="mt-4 pt-2 border-t border-gray-200 text-center text-[10px] italic text-gray-500">
                {personalInfo.full_name || "Resume"} - Page 1 of 1
            </footer>
        </div>
    );
};

export default MoreATSFriendlyTemplate;
