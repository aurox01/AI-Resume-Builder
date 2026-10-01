import { Lock, Mail, User2Icon, ArrowLeft, Sparkles, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = useState(urlState === 'register' ? 'register' : 'login')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const endpoint = state === 'login' ? '/api/users/login' : '/api/users/register'
      const { data } = await api.post(endpoint, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message || (state === 'login' ? "Welcome back!" : "Account created successfully!"))
      navigate('/app')
    } catch (error) {
      toast.error(error?.response?.data?.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-outfit relative overflow-hidden selection:bg-cyan-500 selection:text-white">
      
      {/* Dynamic Ambient Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-blue-600/25 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-[500px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Subtle Dot Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      {/* Container Card */}
      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl shadow-blue-950/50 overflow-hidden grid lg:grid-cols-12 min-h-[640px] relative z-10">
        
        {/* LEFT SIDE: AI Showcase (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950 p-10 text-white flex-col justify-between relative overflow-hidden border-r border-slate-800/80">
          
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 right-0 size-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Logo & Home Link */}
          <div className="flex items-center justify-between z-10">
            <Link to="/">
              <img src="/logo.svg" alt="Resume Builder" className="h-9 w-auto bg-white p-1 rounded-xl shadow-md" />
            </Link>
            <Link to="/" className="text-xs font-bold text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full">
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>

          {/* AI Headline & Feature Highlights */}
          <div className="space-y-6 z-10 my-auto py-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 shadow-2xs">
              <Sparkles className="size-3.5 text-cyan-400" /> Next-Gen AI Career Platform
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
              Build Your Dream Career with <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">AI Intelligence</span>
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed">
              Create ATS-optimized resumes in minutes. Customize designs, enhance summaries with AI, and download 100% free vector PDFs anytime.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3 text-xs font-semibold text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-cyan-400 shrink-0" /> AI Bullet Point & Summary Generator
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-cyan-400 shrink-0" /> 5 ATS Recruiter-Approved Templates
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-cyan-400 shrink-0" /> 100% Free PDF Downloads — Zero Watermarks
              </div>
            </div>
          </div>

          {/* Bottom Testimonial Snippet */}
          <div className="z-10 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-800 text-xs shadow-lg">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              ★★★★★
            </div>
            <p className="text-slate-300 italic text-[11px] leading-relaxed">
              "Updated my resume using the ATS template and AI suggestions. Got 4 tech interview invites in 2 weeks!"
            </p>
            <div className="text-[10px] text-cyan-400 font-bold mt-1.5">
              Sarah J. — Senior Engineer
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Authentication Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-slate-900/95 text-white">
          
          {/* Top Mobile Logo & Back Link */}
          <div className="flex lg:hidden items-center justify-between mb-6">
            <Link to="/">
              <img src="/logo.svg" alt="Resume Builder" className="h-8 w-auto bg-white p-1 rounded-lg" />
            </Link>
            <Link to="/" className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <ArrowLeft className="size-3.5" /> Home
            </Link>
          </div>

          <div className="max-w-md w-full mx-auto my-auto space-y-6">
            
            {/* Form Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {state === "login" ? "Welcome Back" : "Create Your Free Account"}
              </h1>
              <p className="text-xs text-slate-400 mt-1.5">
                {state === "login"
                  ? "Enter your credentials to access your saved resumes."
                  : "Start creating ATS-ready resumes in minutes for free."}
              </p>
            </div>

            {/* Login / Register Toggle Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setState('login')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  state === 'login'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setState('register')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  state === 'register'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Input (Only on Register) */}
              {state === "register" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User2Icon className="absolute left-3.5 size-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Morgan"
                      className="w-full pl-10 pr-4 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Address Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 size-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  {state === "login" && (
                    <button type="button" onClick={() => toast("Password reset link will be sent to your email.")} className="text-[11px] font-bold text-cyan-400 hover:underline">
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 size-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    {state === "login" ? "Sign In to Dashboard" : "Create Free Account"}
                    <ArrowRight className="size-4" />
                  </span>
                )}
              </button>
            </form>

            {/* Toggle State Footer */}
            <div className="text-center pt-2 text-xs text-slate-400">
              {state === "login" ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setState('register')}
                    className="font-bold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Sign up free
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setState('login')}
                    className="font-bold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>

          </div>

          {/* Privacy & Security Footer */}
          <div className="text-center text-[11px] text-slate-500 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2">
            <ShieldCheck className="size-3.5 text-cyan-400" />
            <span>256-bit Encrypted • 100% Free Resume Builder</span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login
