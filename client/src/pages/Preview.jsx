import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon, DownloadIcon, Sparkles } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
      if (data.resume?.title) {
        document.title = `${data.resume.title} - Shared Resume`
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    window.print();
  }

  useEffect(() => {
    loadResume()
  }, [resumeId])

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      {/* Printable Control Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeftIcon className="size-4" /> Home
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/app" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all">
              <Sparkles className="size-3.5" /> Create Your Own Resume
            </Link>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <DownloadIcon className="size-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 px-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Resume Not Found</h2>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            This resume link may be private or might have been removed by the owner.
          </p>
          <Link to="/" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl px-6 py-3 shadow-xs flex items-center gap-2 transition-all">
            <ArrowLeftIcon className="size-4" /> Go to Home Page
          </Link>
        </div>
      )}
    </div>
  )
}

export default Preview
