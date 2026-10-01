import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({ data, onChange }) => {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject])
  }

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated)
  }

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">Projects</h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Showcase your side projects, open-source work, or portfolio highlights.</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
        >
          <Plus className="size-4 stroke-[3]" />
          <span>Add Project</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
          <FolderGit2 className="size-12 mx-auto text-slate-400" />
          <p className="text-base font-bold text-slate-800">No projects added yet.</p>
          <p className="text-xs sm:text-sm text-slate-500">Click "Add Project" to add your featured work.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((project, index) => (
            <div key={index} className="p-5 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-4 shadow-2xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="size-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove project"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Project Name</label>
                  <input
                    value={project.name || ""}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    type="text"
                    placeholder="e.g. E-Commerce Dashboard"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-700">Project Type / Category</label>
                  <input
                    value={project.type || ""}
                    onChange={(e) => updateProject(index, "type", e.target.value)}
                    type="text"
                    placeholder="e.g. Full-Stack Web App / Mobile App"
                    className="w-full px-4 py-3 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Description & Highlights</label>
                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Describe technologies used, key features built, and measurable impact..."
                  className="w-full p-4 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400 leading-relaxed resize-none transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectForm
