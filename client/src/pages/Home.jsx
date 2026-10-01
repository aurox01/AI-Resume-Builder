import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import TrustBar from '../components/home/TrustBar'
import Features from '../components/home/Features'
import AICardSection from '../components/home/AICardSection'
import TemplateSection from '../components/home/TemplateSection'
import ATSSection from '../components/home/ATSSection'
import FreePDFSection from '../components/home/FreePDFSection'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="bg-slate-50/70 min-h-screen font-outfit text-slate-900 selection:bg-cyan-500 selection:text-white relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
      <Banner />
      <Hero />
      <TrustBar />
      <Features />
      <AICardSection />
      <TemplateSection />
      <ATSSection />
      <FreePDFSection />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
