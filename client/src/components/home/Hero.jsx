import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Download, FileText, Check, Save } from 'lucide-react';

const Hero = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Animated Typing Effect for Job Title
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = "Senior Software Engineer";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const current = fullTitle.slice(0, index);
      setTypedTitle(current);

      if (!isDeleting && index < fullTitle.length) {
        index++;
        timer = setTimeout(type, 100);
      } else if (!isDeleting && index === fullTitle.length) {
        timer = setTimeout(() => { isDeleting = true; type(); }, 3000);
      } else if (isDeleting && index > 0) {
        index--;
        timer = setTimeout(type, 50);
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        timer = setTimeout(type, 500);
      }
    };

    type();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-slate-50 min-h-screen overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-100/60 via-cyan-50/40 to-transparent blur-3xl pointer-events-none"></div>

      {/* Modern Floating Sticky Glass Navbar */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg border border-slate-200/80' : 'bg-white/50 backdrop-blur-xs border border-transparent'
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Resume Builder Logo" className="h-9 w-auto" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-700">
              <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#templates" className="hover:text-blue-600 transition-colors">Templates</a>
              <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
            </div>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-3">
              {!user ? (
                <>
                  <Link to="/app?state=login" className="hidden sm:block text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2">
                    Login
                  </Link>
                  <Link
                    to="/app"
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-extrabold text-xs rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Create Resume Free</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/app"
                  className="px-6 py-2.5 bg-gradient-to-r from-slate-900 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md md:hidden flex flex-col p-6 text-white pt-24" onClick={() => setMenuOpen(false)}>
          <div className="flex flex-col gap-5 text-base font-bold" onClick={e => e.stopPropagation()}>
            <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#templates" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition-colors">Templates</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition-colors">Testimonials</a>
            <Link
              to="/app"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-white shadow-lg"
            >
              Create Resume Free
            </Link>
          </div>
        </div>
      )}

      {/* Split Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small AI Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-extrabold shadow-2xs">
              <Sparkles className="size-3.5 text-blue-600" />
              <span>AI-Powered Resume Builder</span>
            </div>

            {/* Headline with Gradient Highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Build a Resume That{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Gets You Noticed.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Create a professional, ATS-friendly resume in minutes with AI-powered writing assistance, beautiful templates, live preview, and completely free PDF export.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/app"
                className="group px-8 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Resume Free</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#templates"
                className="px-7 py-4 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="size-4 text-blue-600" />
                <span>Explore Templates</span>
              </a>
            </div>

            {/* Checklist Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-bold text-slate-700 border-t border-slate-200/70">
              <span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600 stroke-[3]" /> Free PDF Export</span>
              <span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600 stroke-[3]" /> No Watermark</span>
              <span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600 stroke-[3]" /> ATS-Friendly</span>
              <span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600 stroke-[3]" /> No Credit Card</span>
            </div>
          </div>

          {/* RIGHT SIDE REALISTIC INTERACTIVE PREVIEW */}
          <div className="lg:col-span-6 relative">
            
            {/* Floating Badges */}
            <div className="absolute -top-4 -left-4 z-20 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 text-xs font-bold text-slate-800 animate-bounce duration-1000">
              <span className="size-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold">94</span>
              <div>
                <div className="text-[11px] font-extrabold text-slate-900">ATS Score 94/100</div>
                <div className="text-[9px] text-emerald-600 font-semibold">High Match Rate</div>
              </div>
            </div>

            <div className="absolute top-1/3 -right-5 z-20 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles className="size-4 text-purple-600" />
              <span>AI Suggestions ✓</span>
            </div>

            <div className="absolute -bottom-4 -left-2 z-20 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 text-xs font-bold text-slate-800">
              <Download className="size-4 text-blue-600" />
              <span>PDF Ready ✓</span>
            </div>

            <div className="absolute -bottom-4 -right-2 z-20 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 text-xs font-bold text-slate-800">
              <Save className="size-4 text-emerald-600" />
              <span>Saved Automatically</span>
            </div>

            {/* Realistic Mini Application Window Mockup */}
            <div className="group bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-400">
              {/* Window Header */}
              <div className="bg-slate-900 rounded-2xl p-3 text-white flex items-center justify-between text-xs mb-3">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500"></div>
                  <div className="size-3 rounded-full bg-amber-500"></div>
                  <div className="size-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-2 font-mono text-[11px] text-slate-400">Resume Builder ● Live Preview</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Active Editor
                </span>
              </div>

              {/* Realistic Resume Preview Canvas */}
              <div className="bg-slate-100/80 rounded-2xl p-5 sm:p-7 border border-slate-200 text-left space-y-4 font-outfit">
                <div className="border-b border-slate-300 pb-3 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Alex Morgan</h3>
                    <div className="text-xs font-bold text-blue-600 min-h-[18px]">
                      {typedTitle}<span className="animate-pulse">|</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-400 bg-white px-2 py-1 rounded shadow-2xs border border-slate-200">
                    Classic Template
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700">EXPERIENCE</div>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-900">Senior Product Designer</span>
                    <span className="text-[10px] text-slate-500">2021 – Present</span>
                  </div>
                  <div className="text-[11px] text-blue-700 font-semibold">Tech Corp Inc.</div>
                  <div className="space-y-1 pt-1">
                    <div className="h-1.5 bg-slate-300 rounded w-full"></div>
                    <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700">CORE SKILLS</div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold rounded">UI/UX</span>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold rounded">React.js</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold rounded">Figma</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold rounded">AWS</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
