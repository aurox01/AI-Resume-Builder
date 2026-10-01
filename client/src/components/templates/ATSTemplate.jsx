import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ATSTemplate = ({ data, accentColor, fontFamily = "Outfit", fontSize = "medium", spacing = "normal" }) => {
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
      case "compact": return "space-y-3 mb-3";
      case "spacious": return "space-y-6 mb-6";
      default: return "space-y-4 mb-4";
    }
  };

  const fontClass = `font-${fontFamily.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <div className={`w-full max-w-[210mm] h-full mx-auto p-6 sm:p-8 bg-white text-gray-900 ${fontClass} ${getFontSizeClass()} leading-relaxed box-border`}>
      {/* Header - Center Aligned ATS Standard */}
      <header className="text-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider mb-2 text-gray-900" style={{ color: accentColor || '#111827' }}>
          {data.personal_info?.full_name || "YOUR NAME"}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-3">
            {data.personal_info.profession}
          </p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-700">
          {data.personal_info?.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3 text-gray-500" />
              {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="size-3 text-gray-500" />
              {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="size-3 text-gray-500" />
              {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <span className="inline-flex items-center gap-1">
              <Linkedin className="size-3 text-gray-500" />
              <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                {data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          )}
          {data.personal_info?.website && (
            <span className="inline-flex items-center gap-1">
              <Globe className="size-3 text-gray-500" />
              <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="hover:underline">
                {data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className={`avoid-break ${getSpacingClass()}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-800 text-justify leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className={`avoid-break ${getSpacingClass()}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3" style={{ color: accentColor }}>
            WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="avoid-break space-y-1">
                <div className="flex justify-between items-baseline flex-wrap">
                  <span className="font-bold text-gray-900">{exp.position || "Position Title"}</span>
                  <span className="text-xs font-medium text-gray-600">
                    {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-700 italic mb-1">
                  {exp.company}
                </div>
                {exp.description && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-gray-700 text-xs">
                    {exp.description.split('\n').filter(Boolean).map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className={`avoid-break ${getSpacingClass()}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3" style={{ color: accentColor }}>
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="avoid-break flex justify-between items-baseline flex-wrap">
                <div>
                  <span className="font-bold text-gray-900">
                    {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                  </span>
                  <div className="text-xs text-gray-700">{edu.institution}</div>
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {formatDate(edu.graduation_date)} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className={`avoid-break ${getSpacingClass()}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3" style={{ color: accentColor }}>
            PROJECTS
          </h2>
          <div className="space-y-3">
            {data.project.map((proj, index) => (
              <div key={index} className="avoid-break space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{proj.name}</span>
                  {proj.type && <span className="text-xs text-gray-600 italic">{proj.type}</span>}
                </div>
                {proj.description && (
                  <p className="text-xs text-gray-700 leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="avoid-break">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2" style={{ color: accentColor }}>
            SKILLS & COMPETENCIES
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed">
            <span className="font-semibold text-gray-900">Technical & Professional Skills: </span>
            {data.skills.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
};

export default ATSTemplate;
