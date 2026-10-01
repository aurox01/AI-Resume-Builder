import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, Check, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Layout, Palette, Save, Share2Icon, Sparkles, User, Monitor, Edit3 } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import CustomizationPanel from '../components/CustomizationPanel'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: 'Untitled Resume',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    font_family: "Outfit",
    font_size: "medium",
    spacing: "normal",
    header_style: "line",
    skill_style: "badge",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [saveStatus, setSaveStatus] = useState('saved') // 'saved', 'saving', 'unsaved'
  const [mobileTab, setMobileTab] = useState('edit') // 'edit', 'preview', 'customize'
  const [isDownloading, setIsDownloading] = useState(false)

  const sections = [
    { id: "personal", name: "Personal", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "template", name: "Templates", icon: Layout },
    { id: "customization", name: "Styling & Theme", icon: Palette },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    try {
      // 1. Check local storage fallback draft
      const localDraft = localStorage.getItem(`resume_draft_${resumeId}`)
      
      const { data } = await api.get('/api/resumes/get/' + resumeId, {
        headers: { Authorization: token }
      })

      if (data.resume) {
        // Use server data if newer or fallback to localDraft if present
        setResumeData(data.resume)
        document.title = `${data.resume.title || 'Resume'} | Builder`
      } else if (localDraft) {
        setResumeData(JSON.parse(localDraft))
      }
    } catch (error) {
      console.log("Loading error:", error.message)
      const localDraft = localStorage.getItem(`resume_draft_${resumeId}`)
      if (localDraft) {
        setResumeData(JSON.parse(localDraft))
      }
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  // Autosave to localStorage on state changes
  useEffect(() => {
    if (resumeData._id || resumeId) {
      localStorage.setItem(`resume_draft_${resumeId}`, JSON.stringify(resumeData))
      setSaveStatus('unsaved')
    }
  }, [resumeData])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      })

      setResumeData(prev => ({ ...prev, public: !prev.public }))
      toast.success(data.message || `Resume is now ${!resumeData.public ? 'Public' : 'Private'}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update visibility")
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({
        title: resumeData.title || "My Resume",
        text: "Check out my resume created with Resume Builder",
        url: resumeUrl,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(resumeUrl)
      toast.success("Link copied to clipboard!")
    }
  }

  const downloadResume = () => {
    setIsDownloading(true)
    toast.success("Preparing PDF download...")

    const previewEl = document.getElementById('resume-preview-container')
    if (!previewEl) {
      window.print()
      setIsDownloading(false)
      return
    }

    // 1. Create or get dedicated print container directly under document.body
    let printMount = document.getElementById('print-mount-root')
    if (!printMount) {
      printMount = document.createElement('div')
      printMount.id = 'print-mount-root'
      document.body.appendChild(printMount)
    }

    // 2. Clone the A4 resume preview node
    const clone = previewEl.cloneNode(true)
    
    // Remove interactive/preview-only elements from the clone
    const hiddenEls = clone.querySelectorAll('.print\\:hidden')
    hiddenEls.forEach(el => el.remove())

    // 3. Force clone height to be EXACTLY 296mm with 1mm safety buffer to prevent Chromium 1px page 2 overflow bug
    clone.style.minHeight = '296mm'
    clone.style.height = '296mm'
    clone.style.maxHeight = '296mm'
    clone.style.boxShadow = 'none'
    clone.style.border = 'none'
    clone.style.borderRadius = '0'
    clone.style.overflow = 'hidden'

    // 5. Mount clone into printRoot
    printMount.innerHTML = ''
    printMount.appendChild(clone)

    // 6. Trigger native browser print
    setTimeout(() => {
      window.print()
      setIsDownloading(false)
      
      // Clean up print mount after print dialog completes
      setTimeout(() => {
        if (printMount) {
          printMount.innerHTML = ''
        }
      }, 1000)
    }, 250)
  }

  const saveResume = async () => {
    setSaveStatus('saving')
    try {
      let updatedResumeData = structuredClone(resumeData)

      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes");
      
      if (typeof resumeData.personal_info.image === 'object' && resumeData.personal_info.image !== null) {
        formData.append("image", resumeData.personal_info.image)
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      })

      if (data.resume) {
        setResumeData(data.resume)
      }
      setSaveStatus('saved')
      toast.success("Saved successfully!")
    } catch (error) {
      setSaveStatus('unsaved')
      toast.error(error?.response?.data?.message || "Saved locally")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16 relative overflow-hidden font-outfit selection:bg-cyan-500 selection:text-white">
      
      {/* Background Mesh Glow Orbs & Dot Grid Pattern */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 size-[650px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 size-[550px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 size-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"></div>

      {/* Studio Workspace Header Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-5 pb-1 relative z-20">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-3.5 sm:p-4 rounded-3xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/app" className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-all">
              <ArrowLeftIcon className="size-4" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-white line-clamp-1">
                {resumeData.title || "Untitled Resume"}
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                {saveStatus === 'saving' && <span className="text-amber-400 font-bold">Saving...</span>}
                {saveStatus === 'saved' && <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="size-3 stroke-[3]" /> Saved</span>}
                {saveStatus === 'unsaved' && <span className="text-slate-400">Unsaved changes</span>}
              </div>
            </div>
          </div>

          {/* Desktop Control Bar */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={changeResumeVisibility}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                resumeData.public
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {resumeData.public ? <EyeIcon className="size-3.5" /> : <EyeOffIcon className="size-3.5" />}
              <span>{resumeData.public ? "Public" : "Private"}</span>
            </button>

            {resumeData.public && (
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-300 bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 rounded-xl transition-all cursor-pointer"
              >
                <Share2Icon className="size-3.5" /> Share
              </button>
            )}

            <button
              onClick={saveResume}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-300 bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 rounded-xl transition-all cursor-pointer"
            >
              <Save className="size-3.5 text-emerald-400" /> Save
            </button>

            <button
              onClick={downloadResume}
              disabled={isDownloading}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-95 shadow-lg shadow-emerald-600/30 rounded-xl transition-all cursor-pointer"
            >
              <DownloadIcon className="size-4" /> Download PDF
            </button>
          </div>

          {/* Mobile Download Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={saveResume}
              className="p-2 text-slate-200 bg-slate-800 border border-slate-700 rounded-xl"
              title="Save"
            >
              <Save className="size-4" />
            </button>
            <button
              onClick={downloadResume}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-md"
            >
              <DownloadIcon className="size-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* Mobile View Tab Selector */}
        <div className="flex lg:hidden border-t border-slate-800 bg-slate-900 rounded-2xl mt-3 overflow-hidden">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'edit' ? "bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400" : "text-slate-400"
            }`}
          >
            <Edit3 className="size-3.5" /> Form Editor
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'preview' ? "bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400" : "text-slate-400"
            }`}
          >
            <Monitor className="size-3.5" /> Live Preview
          </button>
          <button
            onClick={() => setMobileTab('customize')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'customize' ? "bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400" : "text-slate-400"
            }`}
          >
            <Palette className="size-3.5" /> Customize
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Editor Column */}
          <div className={`lg:col-span-5 ${mobileTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden relative text-slate-900">
              {/* Stepper Progress Bar */}
              <div className="w-full bg-slate-100 h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 h-2 transition-all duration-300"
                  style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }}
                />
              </div>

              {/* Section Quick Pills */}
              <div className="p-3.5 border-b border-slate-200/80 bg-slate-50/90 flex items-center gap-1.5 overflow-x-auto">
                {sections.map((sec, i) => {
                  const Icon = sec.icon;
                  const isActive = activeSectionIndex === i;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionIndex(i)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{sec.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Section Header Navigation */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200/80 bg-white">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Step {activeSectionIndex + 1} of {sections.length}: <strong className="text-slate-900">{activeSection.name}</strong>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                    disabled={activeSectionIndex === 0}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <ChevronLeft className="size-4" /> Prev
                  </button>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info || {}}
                    onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary || ""}
                    onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                  />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                  />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.project || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))}
                  />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills || []}
                    onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                  />
                )}
                {activeSection.id === 'template' && (
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                    inline={true}
                  />
                )}
                {activeSection.id === 'customization' && (
                  <CustomizationPanel
                    selectedColor={resumeData.accent_color}
                    onColorChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                    selectedFont={resumeData.font_family}
                    onFontChange={(font) => setResumeData(prev => ({ ...prev, font_family: font }))}
                    selectedFontSize={resumeData.font_size}
                    onFontSizeChange={(size) => setResumeData(prev => ({ ...prev, font_size: size }))}
                    selectedSpacing={resumeData.spacing}
                    onSpacingChange={(sp) => setResumeData(prev => ({ ...prev, spacing: sp }))}
                    selectedHeaderStyle={resumeData.header_style}
                    onHeaderStyleChange={(hs) => setResumeData(prev => ({ ...prev, header_style: hs }))}
                    selectedSkillStyle={resumeData.skill_style}
                    onSkillStyleChange={(ss) => setResumeData(prev => ({ ...prev, skill_style: ss }))}
                    inline={true}
                  />
                )}

                {/* Bottom Action Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <button
                    onClick={saveResume}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl hover:from-emerald-500 hover:to-teal-500 shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="size-4" /> Save Changes
                  </button>

                  {activeSectionIndex < sections.length - 1 && (
                    <button
                      onClick={() => setActiveSectionIndex(prev => prev + 1)}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Next Section <ChevronRight className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right / Live Preview Column */}
          <div className={`lg:col-span-7 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-20 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-300 text-xs font-extrabold shadow-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <Monitor className="size-4 text-cyan-400" /> A4 Live Document Preview
                </span>
                
                {/* Direct quick access buttons to switch editor to section 7 (Templates) & 8 (Styling) */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      setActiveSectionIndex(6)
                      setMobileTab('edit')
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Layout className="size-3.5 text-cyan-400" /> Switch Template
                  </button>

                  <button
                    onClick={() => {
                      setActiveSectionIndex(7)
                      setMobileTab('edit')
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-purple-300 font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Palette className="size-3.5 text-purple-400" /> Tweak Styling
                  </button>
                </div>
              </div>

              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>

          {/* Mobile Customize Tab Column */}
          <div className={`lg:hidden ${mobileTab === 'customize' ? 'block' : 'hidden'}`}>
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl text-white">
              <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3">
                Customize Template & Theme
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Template
                </label>
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Styling & Typography
                </label>
                <CustomizationPanel
                  selectedColor={resumeData.accent_color}
                  onColorChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                  selectedFont={resumeData.font_family}
                  onFontChange={(font) => setResumeData(prev => ({ ...prev, font_family: font }))}
                  selectedFontSize={resumeData.font_size}
                  onFontSizeChange={(size) => setResumeData(prev => ({ ...prev, font_size: size }))}
                  selectedSpacing={resumeData.spacing}
                  onSpacingChange={(sp) => setResumeData(prev => ({ ...prev, spacing: sp }))}
                  selectedHeaderStyle={resumeData.header_style}
                  onHeaderStyleChange={(hs) => setResumeData(prev => ({ ...prev, header_style: hs }))}
                  selectedSkillStyle={resumeData.skill_style}
                  onSkillStyleChange={(ss) => setResumeData(prev => ({ ...prev, skill_style: ss }))}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
