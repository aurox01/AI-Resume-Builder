import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 text-xs">
        
        {/* Brand Left */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/">
            <img src="/logo.svg" alt="Resume Builder Logo" className="h-9 w-auto bg-white p-1 rounded-lg" />
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Build professional, ATS-friendly resumes in minutes with AI writing assistance, customizable themes, and completely free PDF export.
          </p>
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>
        </div>

        {/* Column 1: Product */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
          <ul className="space-y-2.5">
            <li><Link to="/app" className="hover:text-cyan-400 transition-colors">Create Resume Free</Link></li>
            <li><a href="#templates" className="hover:text-cyan-400 transition-colors">Resume Templates</a></li>
            <li><a href="#features" className="hover:text-cyan-400 transition-colors">AI Writing Assistant</a></li>
            <li><a href="#features" className="hover:text-cyan-400 transition-colors">Free PDF Export</a></li>
          </ul>
        </div>

        {/* Column 2: Resources */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
          <ul className="space-y-2.5">
            <li><a href="#features" className="hover:text-cyan-400 transition-colors">ATS Optimization</a></li>
            <li><a href="#testimonials" className="hover:text-cyan-400 transition-colors">User Testimonials</a></li>
            <li><Link to="/app" className="hover:text-cyan-400 transition-colors">My Resumes</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & Trust */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal & Privacy</h4>
          <ul className="space-y-2.5 mb-4">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
          </ul>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 text-[10px] font-bold">
            ✓ 100% Free & Private
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
