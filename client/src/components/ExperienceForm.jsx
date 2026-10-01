import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    };
    onChange([...data, newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`

    try {
      const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
      updateExperience(index, "description", data.enhancedContent)
      toast.success("Job description enhanced!")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Professional Experience</h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Add your previous roles, accomplishments, and responsibilities.</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
        >
          <Plus className="size-4 stroke-[3]" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
          <Briefcase className="size-12 mx-auto text-slate-400" />
          <p className="text-base font-bold text-slate-800">No work experience added yet.</p>
          <p className="text-xs sm:text-sm text-slate-500">Click "Add Experience" to add your work history.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((experience, index) => (
            <div key={index} className="p-5 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-4 shadow-2xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="size-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  Experience Item #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove experience"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Company Name</label>
                  <input
                    value={experience.company || ""}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    type="text"
                    placeholder="e.g. Google / Microsoft"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Job Title / Role</label>
                  <input
                    value={experience.position || ""}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Start Date</label>
                  <input
                    value={experience.start_date || ""}
                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                    type="month"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">End Date</label>
                  <input
                    value={experience.end_date || ""}
                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                    type="month"
                    disabled={experience.is_current}
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs sm:text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Currently working in this role</span>
              </label>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Job Description & Achievements</label>
                  <button
                    onClick={() => generateDescription(index)}
                    disabled={generatingIndex === index || !experience.position || !experience.company}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300 rounded-lg transition-all disabled:opacity-40 cursor-pointer"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="size-3.5 text-purple-600" />
                    )}
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={4}
                  className="w-full text-xs sm:text-sm font-medium p-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400 leading-relaxed resize-none"
                  placeholder="Describe your key responsibilities, bullet points, and accomplishments..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
