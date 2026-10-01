import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {
    const [newSkill, setNewSkill] = useState("")

     const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()])
            setNewSkill("")
        }
     }

      const removeSkill = (indexToRemove)=>{
        onChange(data.filter((_, index)=> index !== indexToRemove))
      }

      const handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
      }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">Skills & Expertise</h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Add relevant technical competencies, frameworks, and soft skills.</p>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="e.g., React.js, Python, Leadership, System Design"
          className="flex-1 px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400 transition-all"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Plus className="size-4 stroke-[3]" />
          <span>Add Skill</span>
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2.5 p-4 bg-slate-50/70 border border-slate-200/90 rounded-2xl">
          {data.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-900 border border-blue-200/80 rounded-full text-xs sm:text-sm font-bold shadow-2xs group transition-colors hover:bg-blue-100"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="p-0.5 text-blue-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                title={`Remove ${skill}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
          <Sparkles className="size-10 mx-auto text-slate-400" />
          <p className="text-base font-bold text-slate-800">No skills added yet.</p>
          <p className="text-xs sm:text-sm text-slate-500">Type a skill above and click Add or press Enter.</p>
        </div>
      )}

      <div className="bg-blue-50/80 border border-blue-200/80 p-4 rounded-2xl flex items-start gap-3">
        <Sparkles className="size-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm font-semibold text-blue-900 leading-relaxed">
          <strong>Pro Tip:</strong> Include 8–12 key skills. Combine hard technical skills (e.g. Node.js, Docker, SQL) with strategic soft skills (e.g. Agile, Team Leadership).
        </p>
      </div>
    </div>
  )
}

export default SkillsForm
