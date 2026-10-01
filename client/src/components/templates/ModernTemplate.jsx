import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor = "#3B82F6", fontFamily = "Outfit", fontSize = "medium", spacing = "normal" }) => {
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
		<div className={`w-full max-w-[210mm] h-full mx-auto bg-white text-gray-800 ${fontClass} ${getFontSizeClass()} leading-relaxed box-border`}>
			{/* Header Header block */}
			<header className="p-8 text-white transition-colors duration-200" style={{ backgroundColor: accentColor }}>
				<h1 className="text-3xl sm:text-4xl font-light mb-1 tracking-wide">
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				{data.personal_info?.profession && (
					<p className="text-sm font-medium opacity-90 mb-3 tracking-widest uppercase">
						{data.personal_info.profession}
					</p>
				)}

				<div className="flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-95">
					{data.personal_info?.email && (
						<div className="flex items-center gap-1.5">
							<Mail className="size-3.5" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-1.5">
							<Phone className="size-3.5" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-1.5">
							<MapPin className="size-3.5" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" rel="noreferrer" href={data.personal_info.linkedin} className="flex items-center gap-1.5 hover:underline">
							<Linkedin className="size-3.5" />
							<span className="break-all">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" rel="noreferrer" href={data.personal_info.website} className="flex items-center gap-1.5 hover:underline">
							<Globe className="size-3.5" />
							<span className="break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className={`avoid-break ${getSpacingClass()}`}>
						<h2 className="text-lg font-medium mb-3 pb-1 border-b border-gray-200 uppercase tracking-wider" style={{ color: accentColor }}>
							Professional Summary
						</h2>
						<p className="text-gray-700 leading-relaxed text-justify">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className={`avoid-break ${getSpacingClass()}`}>
						<h2 className="text-lg font-medium mb-4 pb-1 border-b border-gray-200 uppercase tracking-wider" style={{ color: accentColor }}>
							Experience
						</h2>

						<div className="space-y-4">
							{data.experience.map((exp, index) => (
								<div key={index} className="avoid-break relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
									<div className="flex justify-between items-start mb-1 flex-wrap gap-1">
										<div>
											<h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
											<p className="font-medium text-xs" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-xs text-gray-500 bg-slate-100 px-2.5 py-0.5 rounded">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 text-xs leading-relaxed mt-2 whitespace-pre-line">
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
						<h2 className="text-lg font-medium mb-4 pb-1 border-b border-gray-200 uppercase tracking-wider" style={{ color: accentColor }}>
							Projects
						</h2>

						<div className="space-y-3">
							{data.project.map((p, index) => (
								<div key={index} className="avoid-break relative pl-4 border-l-2 border-slate-300">
									<div className="flex justify-between items-baseline">
										<h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
										{p.type && <span className="text-xs text-gray-500 italic">{p.type}</span>}
									</div>
									{p.description && (
										<div className="text-gray-700 text-xs leading-relaxed mt-1">
											{p.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-6">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section className="avoid-break">
							<h2 className="text-lg font-medium mb-3 pb-1 border-b border-gray-200 uppercase tracking-wider" style={{ color: accentColor }}>
								Education
							</h2>

							<div className="space-y-3">
								{data.education.map((edu, index) => (
									<div key={index} className="avoid-break">
										<h3 className="font-semibold text-gray-900 text-xs">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p className="text-xs font-medium" style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-xs text-gray-500 mt-0.5">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section className="avoid-break">
							<h2 className="text-lg font-medium mb-3 pb-1 border-b border-gray-200 uppercase tracking-wider" style={{ color: accentColor }}>
								Skills
							</h2>

							<div className="flex flex-wrap gap-1.5">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-2.5 py-1 text-xs text-white rounded-full font-medium shadow-xs"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModernTemplate;