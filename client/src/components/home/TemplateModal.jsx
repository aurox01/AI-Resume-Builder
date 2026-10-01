import React, { useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../ResumePreview';
import { dummyResumeData } from '../../assets/assets';

const TemplateModal = ({ templateId, isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !templateId) return null;

  const handleUseTemplate = () => {
    onClose();
    navigate('/app');
  };

  const sampleData = {
    ...dummyResumeData,
    template: templateId,
    accent_color: templateId === 'modern' ? '#10B981' : templateId === 'ats' ? '#2563EB' : templateId === 'creative' || templateId === 'minimal-image' ? '#8B5CF6' : '#0F172A'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div
        className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              Full A4 Preview
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 capitalize mt-0.5">
              {templateId.replace('-', ' ')} Template
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleUseTemplate}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Use This Template</span>
              <ArrowRight className="size-4" />
            </button>

            <button
              onClick={onClose}
              className="size-9 rounded-full bg-slate-200/70 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with A4 Document Preview */}
        <div className="p-6 overflow-y-auto bg-slate-100/80 flex justify-center">
          <div className="w-full max-w-3xl transform scale-95 sm:scale-100 origin-top">
            <ResumePreview data={sampleData} template={templateId} accentColor={sampleData.accent_color} />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium text-emerald-600">
              <Check className="size-4" /> ATS Compliant
            </span>
            <span className="flex items-center gap-1 font-medium text-blue-600">
              <Check className="size-4" /> 100% Free Export
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
