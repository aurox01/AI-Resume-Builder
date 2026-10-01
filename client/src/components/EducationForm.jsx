import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const EducationForm = ({ data, onChange }) => {

const addEducation = () =>{
    const newEducation = {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: ""
    };
    onChange([...data, newEducation])
}

const removeEducation = (index)=>{
    const updated = data.filter((_, i)=> i !== index);
    onChange(updated)
}

const updateEducation = (index, field, value)=>{
    const updated = [...data];
    updated[index] = {...updated[index], [field]: value}
    onChange(updated)
}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">Education</h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Add your degree, school name, and study details.</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
        >
          <Plus className="size-4 stroke-[3]" />
          <span>Add Education</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
          <GraduationCap className="size-12 mx-auto text-slate-400" />
          <p className="text-base font-bold text-slate-800">No education added yet.</p>
          <p className="text-xs sm:text-sm text-slate-500">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((education, index) => (
            <div key={index} className="p-5 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-4 shadow-2xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="size-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove education"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Institution / School Name</label>
                  <input
                    value={education.institution || ""}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    type="text"
                    placeholder="e.g. Stanford University"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Degree</label>
                  <input
                    value={education.degree || ""}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    type="text"
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Field of Study</label>
                  <input
                    value={education.field || ""}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    type="text"
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Graduation Date</label>
                  <input
                    value={education.graduation_date || ""}
                    onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                    type="month"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200">
                <label className="text-xs sm:text-sm font-bold text-slate-700">GPA / Grade (Optional)</label>
                <input
                  value={education.gpa || ""}
                  onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                  type="text"
                  placeholder="e.g. 3.9 / 4.0 or First Class Honors"
                  className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm
