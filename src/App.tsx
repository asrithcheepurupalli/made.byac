import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  ChevronRight,
  X,
  ArrowRight,
  Send,
  Sun,
  Moon,
  Info,
  Sparkles,
  Plus,
  CheckCircle,
  MessageSquare,
  Monitor,
  Compass,
  Mail,
  FileText,
  Sliders,
  Check,
  Globe,
  Grid,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS, CAPABILITIES, PROCESS_STEPS, TESTIMONIALS } from "./data";
import { Project, ContactSubmission } from "./types";
import { WorkIcon, StudioIcon, ApproachIcon, ContactIcon } from "./components/icons";
import { SENSORY_COLORS, INITIAL_POSTERS, getPosterSpecs, CLUSTER_PROJECTS } from "./posters";
import { StudioProvider, useStudio } from "./StudioContext";

function Shell() {
  const {
    viewMode,
    setViewMode,
    previousViewMode,
    setPreviousViewMode,
    isWorkHovered,
    setIsWorkHovered,
    isDetailGrayscale,
    setIsDetailGrayscale,
    handleSelectProject,
    isDarkMode,
    setIsDarkMode,
    ambientTemp,
    setAmbientTemp,
    selectedColor,
    setSelectedColor,
    heroMouse,
    setHeroMouse,
    isHeroHovered,
    setIsHeroHovered,
    posters,
    setPosters,
    hoveredPosterId,
    setHoveredPosterId,
    galleryMode,
    setGalleryMode,
    deskTilt,
    setDeskTilt,
    activeTilt,
    setActiveTilt,
    selectedPosterId,
    setSelectedPosterId,
    handleDeskMouseMove,
    handleDeskMouseLeave,
    projectFilter,
    setProjectFilter,
    selectedProject,
    setSelectedProject,
    contactForm,
    setContactForm,
    isSubmittingContact,
    setIsSubmittingContact,
    submittedInquiry,
    setSubmittedInquiry,
    inquiryLedger,
    setInquiryLedger,
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
    isTyping,
    setIsTyping,
    currentTime,
    setCurrentTime,
    vizagTime,
    setVizagTime,
    enterMainAndScroll,
    fetchSubmissions,
    handleContactSubmit,
    handleSendChat,
    filteredProjects,
    getAmbientBgClass,
  } = useStudio();

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode ? "dark" : ""} ${getAmbientBgClass()}`}>
      <AnimatePresence mode="wait">
        {viewMode === "splash" ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen w-full flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none"
          >
            {/* Top Bar Navigation (Symmetrical digital metadata header) */}
            <header className="w-full flex justify-between items-center z-10 font-mono text-xs tracking-widest text-neutral-900 dark:text-neutral-300">
              <div className="flex items-center gap-2.5">
                <span 
                  className="font-serif italic font-bold text-lg" 
                  style={{ color: selectedColor.hex }}
                >
                  made.
                </span>
                <span className="font-extrabold uppercase text-[10px] tracking-widest text-neutral-900 dark:text-neutral-100">by asrith cheepurupalli</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden sm:inline font-bold uppercase text-[10px] text-neutral-900 dark:text-neutral-300">{currentTime}</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-neutral-900 dark:text-neutral-100"
                  aria-label="Toggle visual contrast"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </header>

            {/* Symmetrical Gatekeeper Category Symbols Center Grid */}
            <div className="flex-1 flex flex-col justify-center items-center z-10 py-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 w-full max-w-4xl justify-center items-center px-4">
                
                {/* WORK */}
                <div 
                  onMouseEnter={() => setIsWorkHovered(true)}
                  onMouseLeave={() => setIsWorkHovered(false)}
                  className="relative group flex flex-col items-center justify-center cursor-pointer min-h-[140px]"
                >
                  <div 
                    onClick={() => enterMainAndScroll("work")}
                    className="flex flex-col items-center gap-6 text-center"
                  >
                    <div className="text-neutral-900 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                      <WorkIcon />
                    </div>
                    <span className="font-mono text-[11px] font-extrabold tracking-[0.4em] uppercase text-neutral-900 hover:text-black dark:text-neutral-100 dark:hover:text-white transition-colors mt-2">
                      Work
                    </span>
                  </div>

                  {/* Scattered interactive hover deck (constellation) */}
                  <AnimatePresence>
                    {isWorkHovered && (
                      <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
                        {CLUSTER_PROJECTS.map((clusterProj, index) => {
                          const projectItem = PROJECTS.find(p => p.id === clusterProj.id);
                          if (!projectItem) return null;
                          return (
                            <motion.div
                              key={clusterProj.id}
                              initial={{ 
                                opacity: 0, 
                                scale: 0.7, 
                                x: 0, 
                                y: 0,
                                rotate: 0 
                              }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                x: clusterProj.x, 
                                y: clusterProj.y,
                                rotate: clusterProj.rotate 
                              }}
                              exit={{ 
                                opacity: 0, 
                                scale: 0.7, 
                                x: 0, 
                                y: 0,
                                rotate: 0 
                              }}
                              transition={{ 
                                type: "spring", 
                                damping: 18, 
                                stiffness: 90, 
                                delay: index * 0.031
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectProject(projectItem);
                              }}
                              className={`absolute left-1/2 top-1/2 -ml-20 -mt-16 w-40 h-32 p-1.5 rounded-xl border shadow-xl cursor-pointer pointer-events-auto transition-all duration-300 bg-white/95 dark:bg-neutral-950/95 border-neutral-200/90 dark:border-neutral-800/90 hover:z-50 hover:scale-105`}
                            >
                              <div className="flex justify-between items-center px-1 mb-1 font-mono text-[8px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                <span className="truncate max-w-[105px] font-bold">{clusterProj.title}</span>
                                <svg className="w-2.5 h-2.5 opacity-65 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                              </div>
                              <div className="relative w-full h-[calc(100%-14px)] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-100/50 dark:border-neutral-800/50">
                                <img
                                  src={projectItem.imageUrl}
                                  alt={projectItem.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover grayscale contrast-115 hover:grayscale-0 hover:contrast-100 transition-all duration-500"
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* STUDIO */}
                <div 
                  onClick={() => enterMainAndScroll("about")}
                  className="group flex flex-col items-center gap-6 cursor-pointer text-center"
                >
                  <div className="text-neutral-900 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                    <StudioIcon />
                  </div>
                  <span className="font-mono text-[11px] font-extrabold tracking-[0.4em] uppercase text-neutral-900 group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white transition-colors mt-2">
                    Studio
                  </span>
                </div>

                {/* APPROACH */}
                <div 
                  onClick={() => enterMainAndScroll("process")}
                  className="group flex flex-col items-center gap-6 cursor-pointer text-center"
                >
                  <div className="text-neutral-900 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                    <ApproachIcon />
                  </div>
                  <span className="font-mono text-[11px] font-extrabold tracking-[0.4em] uppercase text-neutral-900 group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white transition-colors mt-2">
                    Approach
                </span>
                </div>

                {/* CONTACT */}
                <div 
                  onClick={() => enterMainAndScroll("contact")}
                  className="group flex flex-col items-center gap-6 cursor-pointer text-center"
                >
                  <div className="text-neutral-900 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                    <ContactIcon />
                  </div>
                  <span className="font-mono text-[11px] font-extrabold tracking-[0.4em] uppercase text-neutral-900 group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white transition-colors mt-2">
                    Contact
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom Section holding the MAD style curated aesthetic card + copyrights */}
            <div className="w-full flex flex-col md:flex-row justify-between items-end gap-10 z-10">
              
              {/* Halftone / Blob aesthetic publication card (bottom-left) - reduced size to max-w-[290px] and smaller padding */}
              <div className="w-full max-w-[290px]">
                <div className="p-4 bg-white dark:bg-[#1a1919] border border-neutral-250 dark:border-neutral-800 rounded-2xl shadow-lg flex flex-col gap-4 text-xs">
                  
                  {/* Organic halftone mesh container drawing */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-50 dark:bg-neutral-950 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800/60">
                    <svg className="w-full h-full" viewBox="0 0 200 150">
                      <defs>
                        <pattern id="cardPattern" width="7" height="7" patternUnits="userSpaceOnUse">
                          <circle cx="3.5" cy="3.5" r="1.2" className="fill-neutral-300 dark:fill-neutral-800" />
                        </pattern>
                      </defs>
                      {/* Grid background */}
                      <rect width="200" height="150" fill="url(#cardPattern)" />
                      {/* Fluid smooth blocky/wavy organic paths */}
                      <path d="M 0 150 Q 40 75 90 115 T 180 65 Q 210 35 220 0 L 220 150 Z" className="fill-neutral-950 dark:fill-[#eceae5]" />
                      <path d="M 0 0 Q 30 35 15 95 T 110 150 L 0 150 Z" className="fill-neutral-950 dark:fill-[#eceae5]" />
                      {/* Perfect white focal ring */}
                      <circle cx="102" cy="118" r="6" className="fill-white dark:fill-[#1a1919]" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10.5px] font-extrabold text-neutral-950 dark:text-white uppercase tracking-widest mb-1 shadow-none">
                      made. by asrith cheepurupalli®
                    </h3>
                    <p className="text-[10.5px] text-neutral-900 dark:text-neutral-300 leading-relaxed font-sans font-medium">
                      A visual personal workspace and design studio for strategic, human-first visual architecture. We design and construct clean digital organizing platforms that marry high-end typography with absolute systems thinking.
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[9.5px] text-neutral-950 dark:text-neutral-400 font-mono pt-2.5 border-t border-neutral-150 dark:border-neutral-800">
                    <span>Privacy | Legal</span>
                    <span className="font-bold">© 2018—2026</span>
                  </div>

                </div>
              </div>

              {/* Symmetrical metadata disclaimer (bottom-right) */}
              <div className="font-mono text-[10px] text-neutral-950 dark:text-neutral-300 uppercase tracking-widest hidden sm:block pb-1">
                <span>made with swiss precision &bull; 2026</span>
              </div>

            </div>

          </motion.div>
        ) : viewMode === "project-detail" && selectedProject ? (
          <motion.div
            key="project-detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen w-full flex flex-col justify-start p-6 md:p-12 relative overflow-y-auto"
          >
            {/* Design detail top bar */}
            <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200/60 dark:border-neutral-800/60 pb-6 mb-10 z-10">
              <div className="flex items-center gap-3">
                <span 
                  className="font-serif italic font-bold text-xl cursor-pointer" 
                  style={{ color: selectedColor.hex }}
                  onClick={() => {
                    setViewMode(previousViewMode);
                    setSelectedProject(null);
                  }}
                >
                  made.
                </span>
                <div className="flex flex-col font-mono text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                  <span>by asrith cheepurupalli®</span>
                  <span>DESIGN ENTRY SPEC-0{selectedProject.id.toUpperCase().slice(0, 8)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                {/* Dynamic timezone ticker */}
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold hidden md:inline">{currentTime}</span>

                <button
                  onClick={() => {
                    setViewMode(previousViewMode);
                    setSelectedProject(null);
                  }}
                  className="px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md flex items-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Return to {previousViewMode === "splash" ? "Splash" : "Studio"}</span>
                </button>
              </div>
            </header>

            {/* Immersive Grid Presentation */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-7xl mx-auto w-full z-10 pb-16">
              
              {/* Image Exhibition Board (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 p-4 md:p-6 shadow-2xl">
                  {/* Subtle paper grain element or lighting halo */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
                  
                  {/* Aspect constrained elegant canvas */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.altText}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isDetailGrayscale ? "grayscale contrast-[1.12]" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Aesthetics control dock */}
                <div className="flex flex-wrap justify-between items-center gap-4 p-4 border border-neutral-200/55 dark:border-neutral-850 bg-neutral-50/70 dark:bg-neutral-950/40 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 font-bold">AESTHETICS PRESENTATION MODE</span>
                    <span className="text-[11px] font-sans font-semibold text-neutral-700 dark:text-neutral-300">
                      {isDetailGrayscale ? "Pure Desaturated Specimen (Visually Uniform)" : "Original High-Definition Color Screen"}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsDetailGrayscale(true)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                        isDetailGrayscale
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-extrabold"
                          : "bg-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      B&amp;W Specimen
                    </button>
                    <button
                      onClick={() => setIsDetailGrayscale(false)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                        !isDetailGrayscale
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-extrabold"
                          : "bg-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      HD Art Color
                    </button>
                  </div>
                </div>
              </div>

              {/* Informational editorial description panel (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-450 dark:text-neutral-500 block mb-3 font-semibold">
                    {selectedProject.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight text-neutral-950 dark:text-white leading-[1.1] mb-5">
                    {selectedProject.title}
                  </h1>
                  <p className="text-sm text-neutral-650 dark:text-neutral-300 leading-relaxed font-sans font-medium">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Symmetrical core spec indicators */}
                <div className="grid grid-cols-2 gap-6 py-6 border-y border-neutral-200/60 dark:border-neutral-800/60 font-mono text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-1">CLIENT ACCOUNT</span>
                    <span className="font-bold text-neutral-850 dark:text-neutral-200 uppercase">{selectedProject.client || "Bespoke Portfolio"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-1">COLLECTION</span>
                    <span className="font-bold text-neutral-850 dark:text-neutral-200 uppercase">{selectedProject.collection || selectedProject.category}</span>
                  </div>
                  {selectedProject.activeSpecimenDossier && (
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-1">ACTIVE DOSSIER</span>
                      <span className="font-bold text-[#cfc4c5] font-mono">{selectedProject.activeSpecimenDossier}</span>
                    </div>
                  )}
                  {selectedProject.campaignType && (
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-1">CAMPAIGN TYPE</span>
                      <span className="font-bold text-neutral-850 dark:text-neutral-200 uppercase">{selectedProject.campaignType}</span>
                    </div>
                  )}
                  {selectedProject.distributionFormat && (
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-1">DISTRIBUTION</span>
                      <span className="font-bold text-neutral-850 dark:text-neutral-200 uppercase">{selectedProject.distributionFormat}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-450 dark:text-neutral-500 block mb-1">Timeline</span>
                    <span className="font-bold text-neutral-850 dark:text-neutral-200">{selectedProject.year || "2026"}</span>
                  </div>
                </div>

                {/* Conceptual Breakdown confortably explaining the design */}
                <div className="space-y-6">
                  {selectedProject.creativeDesignIntent ? (
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-mono text-[10.5px] font-extrabold tracking-widest text-[#cfc4c5]/95 uppercase">Creative Design Intent</h3>
                      <p className="text-sm text-neutral-650 dark:text-neutral-300 leading-relaxed font-sans font-medium">
                        {selectedProject.creativeDesignIntent}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-mono text-[10.5px] font-extrabold tracking-widest text-[#cfc4c5]/95 uppercase">01. Central Design Challenge</h3>
                        <p className="text-sm text-neutral-650 dark:text-neutral-300 leading-relaxed font-sans font-medium">
                          {selectedProject.challenge}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-mono text-[10.5px] font-extrabold tracking-widest text-[#cfc4c5]/95 uppercase">02. Elegant &amp; Critical Solution</h3>
                        <p className="text-sm text-neutral-650 dark:text-neutral-300 leading-relaxed font-sans font-medium">
                          {selectedProject.solution}
                        </p>
                      </div>
                    </>
                  )}
                  {selectedProject.visualStrategy && (
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-mono text-[10.5px] font-extrabold tracking-widest text-[#cfc4c5]/95 uppercase">Visual Strategy</h3>
                      <p className="text-sm text-neutral-650 dark:text-neutral-300 leading-relaxed font-sans font-medium">
                        {selectedProject.visualStrategy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sub specifications checklist */}
                {selectedProject.detailedSpecs && selectedProject.detailedSpecs.length > 0 && (
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900/40 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50">
                    <h4 className="font-mono text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 opacity-70" />
                      COMPOSITION PARAMETERS
                    </h4>
                    <ul className="space-y-3 font-mono text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-455">
                      {selectedProject.detailedSpecs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex gap-3 items-start">
                          <span className="text-[8px] font-sans font-extrabold bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500">
                            0{sIdx + 1}
                          </span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Interactive CTA to get a design composed */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      enterMainAndScroll("contact");
                    }}
                    className="w-full flex justify-between items-center px-6 py-4 rounded-xl font-mono text-[11px] font-extrabold uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-md bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:shadow-lg"
                  >
                    <span>Request Comparable Concept Composition</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 1. Header/Navigation Anchor Bar (Luxury Editorial Style) */}
            <nav id="nav-container" className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-500 ${
              isDarkMode 
                ? ambientTemp === "2700" ? "border-amber-950/20 bg-[#181512]/90" : ambientTemp === "6000" ? "border-blue-950/30 bg-[#0b0e14]/90" : "border-white/[0.07] bg-[#141414]/90" 
                : ambientTemp === "2700" ? "border-amber-200/20 bg-[#faf5eb]/90" : ambientTemp === "6000" ? "border-blue-100/30 bg-[#f1f4f8]/90" : "border-black/[0.05] bg-[#f9f7f4]/90"
            }`}>
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center text-xs tracking-widest font-mono">
                <div 
                  onClick={() => setViewMode("splash")}
                  className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
                  title="Return to gatekeeper splash"
                >
                  <span 
                    className="font-serif italic font-bold text-lg transition-colors duration-500" 
                    style={{ color: selectedColor.hex }}
                  >
                    made.
                  </span>
                  <span className="font-extrabold uppercase text-[11px] tracking-widest text-neutral-900 dark:text-white">by asrith cheepurupalli</span>
                </div>

                {/* Quick jump anchors for premium single-page flow */}
                <div className="hidden md:flex gap-8 uppercase font-semibold text-[11px]">
                  <button 
                    onClick={() => setViewMode("splash")} 
                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-indigo-600 dark:text-emerald-400 font-extrabold tracking-widest mr-2"
                  >
                    &larr; SPLASH
                  </button>
                  <a href="#work" className="hover:opacity-75 transition-opacity">Selected Work</a>
                  <a href="#process" className="hover:opacity-75 transition-opacity">Process</a>
                  <a href="#about" className="hover:opacity-75 transition-opacity">About & Studio</a>
                  <a href="#contact" className="hover:opacity-75 transition-opacity">Contact</a>
                </div>

                <div className="flex items-center gap-6">
                  <span className="hidden lg:inline text-secondary font-medium tracking-widest">{currentTime}</span>
                  <button
                    id="theme-toggle-btn"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors`}
                    aria-label="Toggle visual contrast"
                  >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </nav>

      {/* 2. Hero Section (Typographic Centerpiece & Sensory Workbench) */}
      <section 
        id="hero-section" 
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHeroMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative pt-12 pb-20 lg:py-24 max-w-7xl mx-auto px-6 md:px-12 border-b border-[#cfc4c5]/25 overflow-hidden transition-colors duration-1000"
      >
        {/* Soft, beautiful organic pulsing light halo roots that match chosen temps */}
        <div 
          className="absolute -left-24 -top-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none -z-10 transition-all duration-1000 opacity-50"
          style={{
            backgroundColor: ambientTemp === "2700" ? "rgba(245, 158, 11, 0.15)" : ambientTemp === "6000" ? "rgba(59, 130, 246, 0.12)" : `${selectedColor.hex}10`
          }}
        />
        <div 
          className="absolute -right-24 bottom-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10 transition-all duration-1000 opacity-40 animate-pulse"
          style={{
            backgroundColor: ambientTemp === "2700" ? "rgba(217, 119, 6, 0.1)" : ambientTemp === "6000" ? "rgba(30, 64, 175, 0.08)" : "rgba(16, 185, 129, 0.08)"
          }}
        />

        {/* Master architect drafting grid backdrop with soft fade-out edges */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Dynamic micro torch spotlight overlay that follows cursor */}
        {isHeroHovered && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out z-0 opacity-40 mix-blend-color-dodge dark:mix-blend-screen"
            style={{
              background: `radial-gradient(350px circle at ${heroMouse.x}px ${heroMouse.y}px, ${selectedColor.hex}15, transparent 80%)`
            }}
          />
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Centerpiece & Core Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status indicators */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/[0.03] dark:bg-white/[0.03] border border-[#cfc4c5]/15 rounded-full text-[10px] font-mono tracking-widest uppercase mb-6 shadow-sm">
              <span 
                className="w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-500"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="opacity-80">Available for select collaborations — 2026</span>
            </div>

            {/* Title with exquisite typography styling and variable font weights */}
            <h1 className="text-4xl sm:text-6xl md:text-[5.2rem] font-bold tracking-tighter leading-[0.95] text-neutral-900 dark:text-white uppercase mb-8 transition-colors duration-500">
              Designing <br />
              <span className="font-serif italic lowercase tracking-tight font-medium opacity-70">sensory</span> <br />
              systems that <br className="hidden md:inline" />
              <span className="relative inline-block">
                remember
                {/* Underlining dynamic accent bar */}
                <span 
                  className="absolute left-0 right-0 bottom-1 h-1.5 rounded-full opacity-35 transition-all duration-700" 
                  style={{ backgroundColor: selectedColor.hex }}
                />
              </span>.
            </h1>

            {/* Core manifesto with deep editorial spacing */}
            <p className="text-lg md:text-xl font-serif leading-relaxed text-neutral-600 dark:text-[#b4afaa] max-w-xl transition-colors duration-500">
              We craft ultra-premium visual brand systems, sensory digital interfaces, and physical confectionery packaging suites with absolute Swiss grid discipline.
            </p>

            {/* Action buttons styled with the selected color preset */}
            <div className="mt-10 flex flex-wrap gap-4 font-mono text-xs uppercase z-10">
              <a
                href="#work"
                className="px-6 py-3.5 rounded-lg font-bold text-white shadow-md hover:opacity-95 hover:-translate-y-[1px] transition-all flex items-center gap-2 select-none"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <span>Explore Selected Work</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] rounded-lg transition-colors flex items-center gap-2 select-none"
              >
                <span>Initiate Collaborative Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Physical Control Deck & Sensory Panel */}
          <div className="lg:col-span-5 bg-black/[0.015] dark:bg-black/[0.2] border border-[#cfc4c5]/20 p-6 md:p-8 rounded-3xl relative overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col gap-6 select-none">
            
            {/* Fine framing border indicator */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#cfc4c5]/20 pointer-events-none rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#cfc4c5]/20 pointer-events-none rounded-bl-3xl"></div>

            {/* Control Panel Section 1: Light Temperature Kelvin Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#cfc4c5] uppercase font-bold">AMBIENT DESK LIGHT TEMPERATURE</span>
                <span className="font-mono text-[10px] text-neutral-500">{ambientTemp}K</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 p-1 bg-black/[0.04] dark:bg-white/[0.03] rounded-xl border border-[#cfc4c5]/10 font-mono text-[10px]">
                {[
                  { value: "2700", label: "Amber 2700K", desc: "Nostalgic twilight" },
                  { value: "4000", label: "Paper 4000K", desc: "Calm studio neutral" },
                  { value: "6000", label: "Slate 6000K", desc: "Digital overcast" }
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setAmbientTemp(t.value as any)}
                    className={`py-2 px-1 rounded-lg transition-all text-center cursor-pointer font-bold ${
                      ambientTemp === t.value
                        ? "bg-[#1c1b1b] text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control Panel Section 2: Spot Ink Coating Palette */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#cfc4c5] uppercase font-bold">PRESTIGE SPOT INK SPECIFICATION</span>
                <span className="font-mono text-[9px] text-neutral-500 transition-colors" style={{ color: selectedColor.hex }}>
                  {selectedColor.cmyk}
                </span>
              </div>

              {/* Grid of tangible physical color chips */}
              <div className="flex gap-3 mb-4">
                {SENSORY_COLORS.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-xl cursor-pointer transition-all duration-300 relative ${
                        isSelected 
                          ? "scale-110 shadow-md ring-2 ring-neutral-400 dark:ring-neutral-600 ring-offset-2 ring-offset-neutral-100 dark:ring-offset-neutral-900" 
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic formula specifications panel */}
              <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] border border-[#cfc4c5]/10 rounded-xl font-mono text-[10px] text-neutral-500 dark:text-neutral-400 space-y-1.5 transition-all">
                <div className="flex justify-between">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">Formula Name:</span>
                  <span className="font-medium transition-colors duration-300" style={{ color: selectedColor.hex }}>
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon RGB Equivalent:</span>
                  <span>{selectedColor.rgb}</span>
                </div>
                <div className="flex justify-between">
                  <span>Print Lamination Type:</span>
                  <span>{selectedColor.description}</span>
                </div>
              </div>
            </div>

            {/* Control Panel Section 3: Technical Metrics Ledger */}
            <div className="pt-3 border-t border-[#cfc4c5]/15 grid grid-cols-3 gap-2 text-center text-neutral-500 font-mono text-[9px]">
              <div>
                <span className="block font-bold text-neutral-800 dark:text-neutral-200 text-xs font-sans">12</span>
                <span className="tracking-tight">Physical Specs</span>
              </div>
              <div className="border-x border-[#cfc4c5]/15">
                <span className="block font-bold text-neutral-800 dark:text-neutral-200 text-xs font-sans">100%</span>
                <span className="tracking-tight">Grid Perfect</span>
              </div>
              <div>
                <span className="block font-bold text-neutral-800 dark:text-neutral-200 text-xs font-sans">Matte</span>
                <span className="tracking-tight">Gilded Velvet</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Curated Spatial Archive Gallery Section */}
      <section id="gallery" className="py-24 border-b border-[#cfc4c5]/25 bg-[#faf8f5]/55 dark:bg-[#111111]/45 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl text-left">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-600 dark:text-emerald-400 font-bold mb-2 block">STUDIO DRAFTS DECK</span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                Tactile Specimen Scatter
              </h2>
              <p className="text-sm md:text-base text-neutral-550 dark:text-secondary mt-3 font-serif leading-relaxed">
                An interactive 3D light-table of curated brand prototypes, packaging sheets, and layouts. Hover to inspect material carrier details, client briefs, and debossed printing systems.
              </p>
            </div>

            {/* Layout Toggler Control Deck */}
            <div className="flex flex-wrap items-center gap-2 bg-neutral-200/50 dark:bg-neutral-900/60 p-1.5 rounded-xl border border-[#cfc4c5]/20 self-start lg:self-auto text-xs font-mono">
              <button
                onClick={() => setGalleryMode("scatter")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  galleryMode === "scatter"
                    ? "bg-neutral-900 text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                title="Organic physical drafts layout"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Desk Scatter</span>
              </button>
              <button
                onClick={() => setGalleryMode("grid")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  galleryMode === "grid"
                    ? "bg-neutral-900 text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                title="Perfect grid metrics alignment"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid Tray</span>
              </button>
              <button
                onClick={() => setGalleryMode("cascade")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  galleryMode === "cascade"
                    ? "bg-neutral-900 text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                title="Wavy chronologic stream flow"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Timeline Ribbon</span>
              </button>
            </div>
          </div>

          {/* Desktop Dual-Pane Layout Viewer (Visible on md and up) */}
          <div className="hidden md:grid grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive 3D Drawer Light Table - Span 8 */}
            <div className="col-span-8 flex flex-col">
              <div 
                onMouseMove={handleDeskMouseMove}
                onMouseLeave={handleDeskMouseLeave}
                className="relative w-full h-[680px] lg:h-[750px] rounded-3xl border overflow-hidden bg-neutral-100/40 dark:bg-neutral-950/20 border-[#cfc4c5]/20 shadow-inner select-none cursor-crosshair"
                style={{
                  perspective: "2000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Architectural workbench graticule layout */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.11] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none"></div>
                
                {/* Micro Ruler indicators along edges */}
                <div className="absolute left-4 top-0 bottom-0 w-2 flex flex-col justify-between py-6 pointer-events-none opacity-20 font-mono text-[7px] text-neutral-500">
                  <span>0mm</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span>
                </div>
                <div className="absolute top-3 left-0 right-0 h-2 flex justify-between px-8 pointer-events-none opacity-20 font-mono text-[7px] text-neutral-500">
                  <span>0mm</span><span>150</span><span>300</span><span>450</span><span>600</span><span>750</span><span>900</span>
                </div>

                {/* 3D Moving Lightboard Plate */}
                <div 
                  className="relative w-full h-full transition-transform duration-500 ease-out"
                  style={{
                    transform: `rotateX(${20 + deskTilt.y}deg) rotateY(${deskTilt.x}deg) scale(0.96)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  
                  {/* Map over original posters using modern layout math */}
                  {posters.map((post, idx) => {
                    const isHovered = hoveredPosterId === post.id;
                    const isSelected = selectedPosterId === post.id;
                    const isAnyHovered = hoveredPosterId !== null;

                    // Get coordinate set based on active galleryMode
                    let leftPercent = post.left ?? 50;
                    let topPercent = post.top ?? 50;
                    let defaultRot = post.rotate ?? 0;
                    let defaultRotX = post.rotateX ?? 0;
                    let defaultRotY = post.rotateY ?? 0;
                    let baseScale = 0.75;

                    if (galleryMode === "grid") {
                      const cols = 6;
                      const col = idx % cols;
                      const row = Math.floor(idx / cols);
                      leftPercent = 8 + col * 16.8;
                      topPercent = 15 + row * 26.5;
                      defaultRot = 0;
                      defaultRotX = 0;
                      defaultRotY = 0;
                      baseScale = 0.58;
                    } else if (galleryMode === "cascade") {
                      const cols = 6;
                      const col = idx % cols;
                      const row = Math.floor(idx / cols);
                      leftPercent = 9 + col * 16.4;
                      topPercent = 20 + row * 27 + Math.sin(col * 0.9) * 8;
                      defaultRot = (col - 2.5) * 4;
                      defaultRotX = -12;
                      defaultRotY = (col - 2.5) * 3;
                      baseScale = 0.58;
                    } else {
                      // Scatter mode safety clamping
                      leftPercent = 15 + ((post.left ?? 50) - 15) * 0.82;
                      topPercent = 12 + ((post.top ?? 50) - 12) * 0.82;
                    }

                    // Card tilt calculations
                    const isTiltActive = activeTilt && activeTilt.id === post.id;
                    const cTiltX = isTiltActive ? activeTilt.y * -16 : 0;
                    const cTiltY = isTiltActive ? activeTilt.x * 16 : 0;

                    const rx = isHovered ? cTiltX : defaultRotX;
                    const ry = isHovered ? cTiltY : defaultRotY;
                    const rz = isHovered ? 0 : defaultRot;

                    const heightLift = isHovered ? 140 : (isSelected ? 25 : 0);
                    const finalScale = isHovered ? 1.25 : (isSelected ? 0.86 : baseScale);
                    const transformExpr = `translate(-50%, -50%) translate3d(0px, 0px, ${heightLift}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${finalScale})`;

                    const spec = getPosterSpecs(post.id);

                    return (
                      <div
                        key={post.id}
                        onMouseEnter={() => {
                          setHoveredPosterId(post.id);
                          setSelectedPosterId(post.id);
                        }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                          const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                          setActiveTilt({ id: post.id, x, y });
                        }}
                        onMouseLeave={() => {
                          setActiveTilt(null);
                          setHoveredPosterId(null);
                        }}
                        onClick={() => setSelectedPosterId(post.id)}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${leftPercent}%`,
                          top: `${topPercent}%`,
                          transform: transformExpr,
                          zIndex: isHovered ? 200 : (isSelected ? 80 : 20 + idx),
                          opacity: isAnyHovered ? (isHovered ? 1 : 0.18) : 0.88,
                          transformStyle: "preserve-3d",
                          transition: isHovered
                            ? "left 800ms cubic-bezier(0.16, 1, 0.3, 1), top 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 150ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 400ms ease"
                            : "left 800ms cubic-bezier(0.16, 1, 0.3, 1), top 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease"
                        }}
                      >
                        {/* Premium Solid Material Carrier */}
                        <div 
                          className={`w-36 h-48 p-2 rounded-xl border flex flex-col justify-between transition-all duration-500 ${
                            isSelected && !isHovered
                              ? "bg-[#faf8f4] dark:bg-neutral-900 border-emerald-500/70 shadow-[0_12px_32px_rgba(16,185,129,0.15)] scale-[1.02]"
                              : isHovered
                                ? "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-[0_30px_60px_rgba(0,0,0,0.22)] scale-[1.02]"
                                : isDarkMode
                                  ? "bg-neutral-900/90 border-neutral-800/80 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                                  : "bg-white border-[#cfc4c5]/35 shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
                          }`}
                        >
                          {/* Image Box */}
                          <div className={`relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex-grow shadow-inner transition-all duration-500 ${
                            isHovered ? "ring-2 ring-emerald-500/10 dark:ring-white/5" : ""
                          }`}>
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ease-out ${
                                isHovered 
                                  ? "grayscale-0 contrast-100 brightness-100 opacity-100 scale-105" 
                                  : "grayscale contrast-[1.05] brightness-[1.01] opacity-90"
                              }`}
                            />
                            
                            {/* Debossed watermark identifier */}
                            <div className="absolute bottom-1 right-1 opacity-25 font-mono text-[5px] text-white">
                              SF: {idx + 1}
                            </div>
                          </div>

                          {/* Minimal Card Base Label */}
                          <div className="mt-2 text-left space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[6px] bg-neutral-150 dark:bg-neutral-800 text-neutral-550 dark:text-neutral-450 px-1 rounded-sm uppercase tracking-wider font-extrabold truncate max-w-[65px]">
                                {post.category}
                              </span>
                              <span className="font-mono text-[5px] text-neutral-400">
                                0{idx + 1}
                              </span>
                            </div>
                            <h5 className="font-sans font-bold text-[9px] text-neutral-900 dark:text-neutral-150 truncate leading-tight w-full">
                              {post.title}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>

            {/* Specimen Dossier Binder Sidebar - Span 4 */}
            <div className="col-span-4 flex flex-col justify-between">
              {(() => {
                const activePost = posters.find(p => p.id === selectedPosterId) || posters[0];
                const activeSpec = getPosterSpecs(activePost.id);
                return (
                  <div className="h-full flex flex-col justify-between border border-[#cfc4c5]/25 bg-[#faf8f5] dark:bg-[#151515] rounded-3xl p-6 shadow-sm relative overflow-hidden transition-colors duration-500">
                    
                    {/* Architectural stamp markings */}
                    <div className="absolute right-4 top-4 font-mono text-[7px] text-[#cfc4c5]/40 leading-none text-right pointer-events-none">
                      <span>FORM-CATALOGUE METRIC BLOCK</span><br />
                      <span>REF: DEC-2026/FLEX</span>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#cfc4c5]/20 pb-4">
                        <div className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>ACTIVE SPECIMEN DOSSIER</span>
                        </div>
                        <span className="font-mono text-[8px] text-neutral-400">CODE: {activePost.id.toUpperCase()}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-[#cfc4c5] block font-bold">
                          {activePost.category}
                        </span>
                        <h3 className="text-xl font-serif font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug">
                          {activePost.title}
                        </h3>
                        <p className="font-mono text-xs text-neutral-500">
                          Client Account: <span className="text-neutral-750 dark:text-neutral-250 font-medium">{activePost.client ?? "Studio Archive"}</span>
                        </p>
                      </div>

                      <div className="p-4 bg-neutral-200/20 dark:bg-neutral-900/30 rounded-xl border border-[#cfc4c5]/15">
                        <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider mb-1.5">CREATIVE DESIGN INTENT</span>
                        <p className="text-xs font-serif leading-relaxed text-neutral-600 dark:text-neutral-400 italic">
                          "{activeSpec.bio}"
                        </p>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider">CARRIER MATERIAL WEIGHT</span>
                          <span className="text-[11px] font-mono text-neutral-800 dark:text-neutral-300 font-medium">
                            {activeSpec.paper}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider">REPRODUCTION METHOD</span>
                          <span className="text-[11px] font-mono text-neutral-800 dark:text-neutral-300 font-medium">
                            {activeSpec.process}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider">STAGING RATIO</span>
                          <span className="text-[11px] font-mono text-neutral-800 dark:text-neutral-300 font-medium capitalize">
                            {activePost.aspect.replace("aspect-[", "").replace("]", "").replace("/", " : ")} (Standard Format)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer instructions */}
                    <div className="pt-6 border-t border-[#cfc4c5]/20 flex items-start gap-3 mt-6">
                      <Info className="w-4 h-4 text-emerald-500/80 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] font-mono text-neutral-500 leading-normal">
                        Use the arrangement selectors above the board to reorganize the workspace. Hovering on specimens exposes fine depth fields.
                      </p>
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>

          {/* Fluid Mobile Interactive Slider View (Visible under md) */}
          <div className="block md:hidden space-y-6">
            
            {/* Horizontal Scroll Track */}
            <div className="relative w-full overflow-x-auto pb-4 snap-x snap-mandatory flex gap-4 scrollbar-thin scrollbar-thumb-neutral-220">
              {posters.map((post, idx) => {
                const spec = getPosterSpecs(post.id);
                const isSelected = selectedPosterId === post.id;
                
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPosterId(post.id)}
                    className="w-60 flex-shrink-0 snap-center cursor-pointer"
                  >
                    <div 
                      className={`p-3 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                        isSelected 
                          ? "bg-white dark:bg-neutral-900 border-emerald-500 shadow-md"
                          : "bg-neutral-100/50 dark:bg-neutral-950/20 border-neutral-200 dark:border-neutral-800/80"
                      }`}
                    >
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-950 shadow-inner">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="mt-3 text-left">
                        <span className="font-mono text-[7px] bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded font-extrabold uppercase mb-1 inline-block">
                          {post.category}
                        </span>
                        <h4 className="font-sans font-bold text-xs text-neutral-950 dark:text-white truncate">
                          {post.title}
                        </h4>
                        <p className="font-mono text-[8px] text-neutral-400">
                          {post.client ?? "Studio Archive"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Selection Docket Summary Card */}
            {(() => {
              const activePost = posters.find(p => p.id === selectedPosterId) || posters[0];
              const activeSpec = getPosterSpecs(activePost.id);
              return (
                <div className="p-5 rounded-2xl border border-[#cfc4c5]/25 bg-[#faf8f5] dark:bg-neutral-900 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-200/50 dark:border-neutral-800/50 pb-2.5">
                    <span className="font-mono text-[8px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">SELECTED REPLICA</span>
                    <span className="font-mono text-[7px] text-neutral-400">{activePost.id.toUpperCase()}</span>
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-neutral-950 dark:text-white">{activePost.title}</h5>
                    <p className="text-[11px] font-serif italic text-neutral-600 dark:text-neutral-400 mt-1">
                      "{activeSpec.bio}"
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[9px] font-mono pt-1">
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[7px]">CARRIER</span>
                      <span className="text-neutral-800 dark:text-neutral-300 font-medium">{activeSpec.paper}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[7px]">METHOD</span>
                      <span className="text-neutral-800 dark:text-neutral-300 font-medium">{activeSpec.process}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* 3. Selected Works Section with Filtering */}
      <section id="work" className="py-20 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#cfc4c5]">SELECTED RECORD</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif tracking-tight mt-1">Design Archetypes</h2>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {["All", "Mithai Maharaja", "Innovolt", "Telyport", "Mr. Snapper International"].map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  projectFilter === cat
                    ? "text-white font-bold shadow-sm animate-none"
                    : "bg-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
                style={projectFilter === cat ? { backgroundColor: selectedColor.hex } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                isDarkMode ? "bg-[#1c1b1b]/60 border-neutral-800 hover:border-neutral-700" : "bg-white border-[#cfc4c5]/40 hover:border-black/30"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={proj.imageUrl}
                  alt={proj.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-neutral-950/95 text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-black/5 shadow-sm text-neutral-800 dark:text-neutral-300">
                  {proj.category}
                </div>

                {proj.metrics && (
                  <div className="absolute bottom-4 right-4 bg-black/85 text-white text-[9px] font-mono tracking-wider px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>{proj.metrics.split(',')[0]}</span>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-xs opacity-40 mt-1.5">{proj.year}</span>
                </div>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  {proj.description}
                </p>

                <div className="pt-4 border-t border-[#cfc4c5]/20 flex items-center justify-between text-xs font-mono">
                  <span className="opacity-40">STUDIO COHORT RECORD</span>
                  <div className="flex items-center gap-1 font-bold uppercase transition-transform group-hover:translate-x-1">
                    <span>EXPLORE BRIEF</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Deep-dive Case Study Overlay Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 25 }}
              transition={{ type: "spring", damping: 26, stiffness: 200 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col ${
                isDarkMode ? "bg-neutral-950 border border-neutral-800 text-[#eceae5]" : "bg-white border border-[#cfc4c5]/40 text-[#1c1b1b]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Banner */}
              <div className="relative aspect-[21/9] bg-neutral-900">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 md:p-8">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 mb-1">
                      {selectedProject.category} / CLIENT: {selectedProject.client || "Design Concept"}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Details Grid */}
              <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-[#cfc4c5]/20 text-xs font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block mb-1">CLIENT ACCOUNT</span>
                    <span className="font-bold">{selectedProject.client || "Mithai Maharaja"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block mb-1">COLLECTION</span>
                    <span className="font-bold">{selectedProject.collection || selectedProject.category}</span>
                  </div>
                  {selectedProject.activeSpecimenDossier ? (
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block mb-1">DOSSIER REF</span>
                      <span className="font-bold text-[#cfc4c5]">{selectedProject.activeSpecimenDossier}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block mb-1">PROJECT YEAR</span>
                      <span className="font-bold">{selectedProject.year || "2026"}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block mb-1">CAMPAIGN TYPE</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedProject.campaignType || "Pristine Launch"}</span>
                  </div>
                </div>

                {/* Narrative Paragraphs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm leading-relaxed">
                  <div className="md:col-span-2 space-y-6">
                    {selectedProject.creativeDesignIntent ? (
                      <div>
                        <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#cfc4c5] mb-2">CREATIVE DESIGN INTENT</h4>
                        <p className="opacity-90">{selectedProject.creativeDesignIntent}</p>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">01. THE HUMAN ANXIETY & CHALLENGE</h4>
                          <p className="opacity-90">{selectedProject.challenge}</p>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">02. INTENTIONAL CRITICAL SOLUTION</h4>
                          <p className="opacity-90">{selectedProject.solution}</p>
                        </div>
                      </>
                    )}

                    {selectedProject.visualStrategy && (
                      <div>
                        <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#cfc4c5] mb-2">VISUAL STRATEGY</h4>
                        <p className="opacity-90">{selectedProject.visualStrategy}</p>
                      </div>
                    )}
                  </div>

                  {/* Right specs checklist */}
                  <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-neutral-900/50 border-neutral-800" : "bg-neutral-100/55 border-[#cfc4c5]/40"}`}>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      COMPUTATION SPECIFIED
                    </h4>

                    <ul className="space-y-3.5 text-xs text-neutral-650 dark:text-neutral-350">
                      {(selectedProject.detailedSpecs || []).map((spec, index) => (
                        <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="text-[10px] font-mono opacity-50 bg-neutral-300 dark:bg-neutral-850 px-1 hover:opacity-100 rounded">
                            {index + 1}
                          </span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Chat CTA */}
                    <div className="mt-8 pt-4 border-t border-[#cfc4c5]/20">
                      <a
                        href="#contact"
                        onClick={() => setSelectedProject(null)}
                        className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 hover:scale-[1.01] transition-transform text-center text-[10px] font-mono uppercase rounded-lg block font-bold"
                      >
                        Initiate Similar Concept
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer file specs */}
              <div className={`px-6 py-4 border-t flex justify-between items-center text-xs font-mono ${isDarkMode ? "bg-neutral-900/60 border-neutral-800" : "bg-neutral-100/60 border-[#cfc4c5]/35"}`}>
                <span>STUDIO LOG FILE: ARCH-0{selectedProject.id.toUpperCase()}</span>
                <button onClick={() => setSelectedProject(null)} className="hover:underline font-extrabold cursor-pointer">
                  CLOSE CASE BRIEF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. DESIGN PROCESS STEPS (Geometric Grid) */}
      <section id="process" className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20 border-b border-[#cfc4c5]/25">
        <div className="max-w-xl mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#cfc4c5]">BLUEPRINT</span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-serif tracking-tight mt-1">Symmetrical Process</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Minimal luxury requires disciplined, transparent progression. We break every brief into 5 rigid client checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.id}
              className={`p-6 rounded-2xl border relative overflow-hidden transition-all duration-300 ${
                isDarkMode ? "bg-neutral-900/40 border-neutral-800 hover:border-neutral-700" : "bg-white border-[#cfc4c5]/30 hover:border-black/30"
              }`}
            >
              <div className="text-5xl font-mono text-neutral-400/20 font-black absolute top-2 right-2 select-none">
                {step.stepNumber}
              </div>
              <div className="text-xs font-mono text-neutral-400 mb-4">{step.stepNumber}. PHASE</div>
              <h4 className="text-lg font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">{step.title}</h4>
              <p className="text-xs text-neutral-550 dark:text-neutral-400 leading-relaxed font-serif">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ABOUT & STUDIO BIOGRAPHY SECTION */}
      <section id="about" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20 border-b border-[#cfc4c5]/25">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Biography content */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#cfc4c5] block">BIOGRAPHY & PRINCIPLES</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white">
              Exploring the intersection of geometry, computational UI, and calm luxury metrics.
            </h2>
            
            <div className="space-y-6 text-base text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed">
              <p>
                We are made. by ac — a design and development studio led by Asrith Cheepurupalli. Combining tactile design fundamentals with responsive full-stack technology, we believe interfaces should be highly responsive yet calm; respectful of human memory and emotional capacity.
              </p>
              
              <blockquote className="border-l-2 border-neutral-900 dark:border-white pl-4 italic text-sm text-neutral-650 dark:text-[#cfc4c5]">
                "Good design is not the amplification of volume, but the selection of spacious silence."
              </blockquote>
            </div>
          </div>

          {/* Visual Canvas Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] border border-[#cfc4c5]/20 bg-neutral-200 dark:bg-neutral-800 relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
                alt="Architect's draft table visual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-85 contrast-125 hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 font-mono">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  THE WORKSPACE ATMOSPHERE
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CONTACT SECTION (DESIGN WORKSHOP DISPATCH) */}
      <section id="contact" className="py-24 md:py-36 max-w-4xl mx-auto px-6 text-center scroll-mt-20">
        <div className="space-y-8">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#cfc4c5]">STUDIO INVITATION</span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-serif tracking-tight text-neutral-900 dark:text-white leading-tight">
            Let's build something people remember.
          </h2>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-serif max-w-2xl mx-auto">
            We are always open to discussing new brand systems, custom digital architectures, or computational UI design assignments. All dispatches are processed directly inside the studio.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 w-full">
            <a 
              href="mailto:asrithcheepurupalli@made-by-ac.com"
              className="group relative flex items-center gap-4 px-8 py-5 rounded-2xl border border-[#cfc4c5]/30 bg-white dark:bg-neutral-900 shadow-lg hover:shadow-xl hover:border-neutral-900 dark:hover:border-white transition-all duration-300 w-full sm:w-auto text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="font-mono">
                <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">Direct Dispatch</div>
                <div className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100 transition-colors group-hover:text-emerald-500">
                  asrithcheepurupalli@made-by-ac.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 px-8 py-5 rounded-2xl border border-[#cfc4c5]/20 bg-neutral-50/50 dark:bg-[#1c1b1b] w-full sm:w-auto text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Globe className="w-5 h-5" />
              </div>
              <div className="font-mono">
                <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">Global Travel Location</div>
                <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Asia-Pacific / Hybrid Base Vizag &amp; Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Minimalist Editorial Footer */}
      <footer className="pt-24 pb-16 mt-20 border-t border-[#cfc4c5]/20 bg-neutral-50 dark:bg-neutral-950/40 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center py-32 md:py-48">
          <div className="mb-6 px-3 py-1.5 rounded-full bg-neutral-200/50 dark:bg-neutral-900/60 border border-neutral-300/40 dark:border-neutral-800/40 text-neutral-550 dark:text-neutral-400 font-bold uppercase tracking-[0.25em] text-[9.5px] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Local Time &bull; {vizagTime || "IST"}</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-neutral-900 dark:text-neutral-100 tracking-tight font-extrabold leading-tight max-w-none md:whitespace-nowrap">
            Based in Vizag. Working globally.
          </h2>
          <p className="mt-6 text-neutral-400 dark:text-neutral-500 max-w-md text-[11px] uppercase tracking-wider leading-relaxed">
            Crafting strategic, human-centric design architectures &amp; interactive software frameworks.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-500 border-t border-[#cfc4c5]/10 pt-12">
          <div className="flex items-center gap-3">
            <span className="font-serif italic font-extrabold text-lg text-emerald-500">made. by ac</span>
            <span>© 2026 Asrith Cheepurupalli. Human-first digital architectures.</span>
          </div>

         
        </div>
      </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <Shell />
    </StudioProvider>
  );
}
