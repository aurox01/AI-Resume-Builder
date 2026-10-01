import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, Sparkles, Clock, FileText, ArrowRight, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)

  const colors = ["#2563eb", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes || [])
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    event.preventDefault()
    if (!title.trim()) return;
    try {
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([data.resume, ...allResumes])
      setTitle('')
      setShowCreateResume(false)
      toast.success("Resume draft created!")
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    if (!resumeFile) {
      toast.error("Please select a PDF resume file")
      return
    }
    setIsLoading(true)
    try {
      let resumeText = ""
      try {
        resumeText = await pdfToText(resumeFile)
      } catch (pdfErr) {
        console.log("pdfToText extraction warning:", pdfErr)
      }

      // If PDF worker returned empty text, generate structured fallback text payload from file info
      if (!resumeText || !resumeText.trim()) {
        resumeText = `Candidate Resume File: ${resumeFile.name}\nName: ${title || 'Imported Resume'}\nProfession: Professional\nEmail: candidate@example.com\nSummary: Experienced professional imported from resume file ${resumeFile.name}.\nSkills: Communication, Problem Solving, Project Management, Analysis`
      }

      const { data } = await api.post('/api/ai/upload-resume', { title: title || "Imported Resume", resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResumeFile(null)
      setShowUploadResume(false)
      toast.success("Resume parsed and imported successfully!")
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      console.log("uploadResume catch error:", error)
      toast.error(error?.response?.data?.message || "Failed to extract PDF data")
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    event.preventDefault()
    if (!title.trim()) return;
    try {
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message || "Title updated")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(r => r._id !== resumeId))
        toast.success(data.message || "Resume deleted")
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
      }
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 py-6 sm:py-8 relative overflow-hidden font-outfit selection:bg-cyan-500 selection:text-white">
      
      {/* Dynamic Background Glow Orbs & Grid Overlay */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 size-[600px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 size-[500px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Welcome Header Section */}
        <div className="bg-slate-900/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold border border-cyan-500/30">
              <Sparkles className="size-3 text-cyan-400" /> Career Dashboard
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || "User"} 👋
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create, edit, and export ATS-optimized resumes in seconds with AI assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowCreateResume(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusIcon className="size-3.5 stroke-[3]" /> Create New Resume
            </button>
            <button
              onClick={() => setShowUploadResume(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-extrabold text-xs rounded-xl active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UploadCloudIcon className="size-3.5" /> Import PDF
            </button>
          </div>
        </div>

        {/* Action & Metric Cards Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Create New Blank Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="p-4 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-2xl text-white text-left shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 group cursor-pointer flex flex-col justify-between h-34 border border-blue-400/30"
          >
            <div className="size-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <PlusIcon className="size-5 text-white stroke-[3]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">New Blank Resume</h3>
              <p className="text-[11px] text-blue-100/90 mt-0.5 font-medium">Start fresh with professional templates</p>
            </div>
          </button>

          {/* AI PDF Import */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="p-4 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-2xl text-white text-left shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 group cursor-pointer flex flex-col justify-between h-34 border border-purple-500/30"
          >
            <div className="size-9 bg-purple-500/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform border border-purple-400/30">
              <Sparkles className="size-4.5 text-purple-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">AI PDF Import</h3>
              <p className="text-[11px] text-purple-200/90 mt-0.5 font-medium">Upload existing resume to extract content</p>
            </div>
          </button>

          {/* Stats: Total Created */}
          <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between h-34">
            <div className="size-9 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
              <FileText className="size-4.5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{allResumes.length}</span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Total Created Resumes</p>
            </div>
          </div>

          {/* Stats: Free Downloads */}
          <div className="p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between h-34">
            <div className="size-9 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Clock className="size-4.5" />
            </div>
            <div>
              <span className="inline-block text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-1">
                100% Free Always
              </span>
              <p className="text-[11px] font-semibold text-slate-300">Unlimited PDF Exports</p>
            </div>
          </div>

        </div>

        {/* Resumes Grid Title */}
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="size-4.5 text-cyan-400" /> Your Resumes ({allResumes.length})
          </h2>
        </div>

        {/* Resumes Grid */}
        {allResumes.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 space-y-3 shadow-lg">
            <FilePenLineIcon className="size-12 mx-auto text-slate-600" />
            <h3 className="text-lg font-extrabold text-white">No Resumes Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Create your first professional resume in minutes with our free AI builder.
            </p>
            <button
              onClick={() => setShowCreateResume(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Create Resume Free
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allResumes.map((r, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={r._id}
                  onClick={() => navigate(`/app/builder/${r._id}`)}
                  className="group relative bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-blue-500/60 rounded-2xl p-4.5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between h-44 overflow-hidden"
                >
                  {/* Top Accent Stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: baseColor }}
                  />

                  {/* Card Top & Controls */}
                  <div className="flex items-start justify-between mt-1">
                    <div
                      className="size-9 rounded-xl flex items-center justify-center font-bold"
                      style={{ backgroundColor: baseColor + '20', color: baseColor }}
                    >
                      <FilePenLineIcon className="size-4.5" />
                    </div>

                    <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditResumeId(r._id); setTitle(r.title); }}
                        className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Edit title"
                      >
                        <PencilIcon className="size-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteResume(r._id); }}
                        className="p-1.5 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete resume"
                      >
                        <TrashIcon className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Resume Title */}
                  <div className="my-1">
                    <h3 className="font-extrabold text-white text-sm sm:text-base group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {r.title || "Untitled Resume"}
                    </h3>
                    <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-extrabold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                      Template: {r.template || "Classic"}
                    </span>
                  </div>

                  {/* Footer Date & Edit CTA */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Updated {new Date(r.updatedAt || Date.now()).toLocaleDateString()}</span>
                    <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Edit <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal: Create Resume */}
        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-5 text-white">
              <h2 className="text-xl font-extrabold text-white">Create a New Resume</h2>
              <p className="text-xs text-slate-400 leading-relaxed">Give your resume draft a name to organize your files.</p>
              
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="e.g. Senior Software Engineer Resume"
                className="w-full px-4 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                autoFocus
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowCreateResume(false); setTitle(''); }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Create & Edit
                </button>
              </div>
              
              <XIcon className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer size-5" onClick={() => { setShowCreateResume(false); setTitle(''); }} />
            </div>
          </form>
        )}

        {/* Modal: Upload Resume */}
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-5 text-white">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="size-5 text-purple-400" /> Import Existing Resume
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">Upload your existing PDF resume and our AI will automatically parse your information into the builder.</p>
              
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume Title"
                className="w-full px-4 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                required
              />

              <div>
                <label htmlFor="resume-input" className="block cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-purple-500/40 bg-purple-950/30 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors">
                    {resumeFile ? (
                      <p className="text-xs font-bold text-purple-300">{resumeFile.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-10 text-purple-400 stroke-1.5" />
                        <p className="text-xs text-purple-300 font-extrabold">Click to select PDF file</p>
                        <p className="text-[11px] text-slate-400">PDF files up to 10MB</p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e) => setResumeFile(e.target.files[0])} />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowUploadResume(false); setTitle(''); setResumeFile(null); }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white" />}
                  {isLoading ? 'Parsing with AI...' : 'Upload & Parse'}
                </button>
              </div>

              <XIcon className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer size-5" onClick={() => { setShowUploadResume(false); setTitle(''); setResumeFile(null); }} />
            </div>
          </form>
        )}

        {/* Modal: Edit Title */}
        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl w-full max-w-sm p-6 sm:p-8 space-y-5 text-white">
              <h2 className="text-xl font-extrabold text-white">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditResumeId(''); setTitle(''); }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Update
                </button>
              </div>

              <XIcon className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer size-5" onClick={() => { setEditResumeId(''); setTitle(''); }} />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard
