import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt }, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
      toast.success("Summary enhanced with AI!")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Professional Summary</h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Highlight your key strengths and career objective.</p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300 rounded-xl transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow-2xs"
        >
          {isGenerating ? (<Loader2 className="size-4 animate-spin" />) : (<Sparkles className="size-4 text-purple-600" />)}
          {isGenerating ? "Enhancing with AI..." : "AI Enhance"}
        </button>
      </div>

      <div className="space-y-2">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-4 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-slate-900 placeholder-slate-400 leading-relaxed resize-none transition-all shadow-2xs"
          placeholder="Write a compelling professional summary that highlights your key skills, experience, and achievements..."
        />
        <p className="text-xs font-semibold text-slate-500 text-center">
          💡 <strong>Tip:</strong> Keep your summary concise (3–4 sentences) and focus on your top qualifications and career target.
        </p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
