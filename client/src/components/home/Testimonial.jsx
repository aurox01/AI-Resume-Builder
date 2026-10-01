import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Senior Software Engineer",
      company: "Stripe",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      quote: "I updated my resume using the ATS template and AI bullet suggestions. Within 2 weeks of applying, I received interview invites from 4 tech companies!",
      rating: 5
    },
    {
      name: "Marcus Vance",
      role: "Product Designer",
      company: "Figma",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      quote: "The live preview and instant vector PDF export saved me so much time. Unlike other sites that force a subscription at the final step, this builder is genuinely free.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Data Analyst & Researcher",
      company: "Deloitte",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      quote: "The AI summary enhancer refined my rough background into a powerful 3-sentence summary. Recruiter response rate doubled compared to my old Word doc.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Marketing Specialist",
      company: "HubSpot",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      quote: "Clean, responsive, and easy to use on both phone and laptop. Custom font choices and color palettes give resumes a premium look without layout breaks.",
      rating: 5
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const active = testimonials[currentIndex];

  return (
    <div id="testimonials" className="py-20 bg-white scroll-mt-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 rounded-full px-4 py-1.5 mb-3">
          <Star className="size-3.5 fill-amber-500 text-amber-500" />
          <span>Loved by Job Seekers</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Helped 10,000+ Professionals Land Their Next Role
        </h2>

        {/* Carousel Container */}
        <div
          className="mt-12 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 relative shadow-lg touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Quote className="size-12 text-blue-500/20 absolute top-6 left-6 pointer-events-none" />

          <div className="flex justify-center gap-1 mb-6">
            {Array(active.rating).fill(0).map((_, i) => (
              <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed max-w-2xl mx-auto italic min-h-[90px] flex items-center justify-center">
            "{active.quote}"
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <img
              src={active.image}
              alt={active.name}
              className="size-12 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="text-left">
              <h4 className="font-bold text-slate-900 text-sm">{active.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{active.role} at <span className="text-blue-600 font-semibold">{active.company}</span></p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200/80">
            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} / {testimonials.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="size-10 rounded-full bg-white border border-slate-200 hover:border-slate-300 shadow-2xs flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={handleNext}
                className="size-10 rounded-full bg-white border border-slate-200 hover:border-slate-300 shadow-2xs flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonial;
