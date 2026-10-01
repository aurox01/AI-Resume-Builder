import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

const Banner = () => {
  return ( 
    <div className="w-full py-2.5 px-4 font-semibold text-xs text-white text-center bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-blue-800/40 shadow-xs flex items-center justify-center gap-2">
      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-cyan-300 bg-blue-500/20 border border-cyan-400/30 flex items-center gap-1">
        <Sparkles className="size-3 text-cyan-300" /> New
      </span>
      <span className="text-slate-200">
        AI-Powered Resume Enhancement & 100% Free A4 PDF Export Added!
      </span>
      <Link to="/app" className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition-colors">
        <span>Build Resume Free</span>
        <ArrowRight className="size-3" />
      </Link>
    </div>
  )
}

export default Banner
