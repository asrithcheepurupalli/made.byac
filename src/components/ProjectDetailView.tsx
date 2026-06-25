import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers, ChevronRight, X, ArrowRight, Send, Sun, Moon, Info, Sparkles, Plus,
  CheckCircle, MessageSquare, Monitor, Compass, Mail, FileText, Sliders, Check, Globe, Grid, Award
} from "lucide-react";
import { PROJECTS, CAPABILITIES, PROCESS_STEPS, TESTIMONIALS } from "../data";
import { Project, ContactSubmission } from "../types";
import { WorkIcon, StudioIcon, ApproachIcon, ContactIcon } from "./icons";
import { SENSORY_COLORS, INITIAL_POSTERS, getPosterSpecs, CLUSTER_PROJECTS } from "../posters";
import { useStudio } from "../StudioContext";

export function ProjectDetailView() {
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
          <motion.div
            key="project-detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[100svh] w-full flex flex-col justify-start p-6 md:p-12 relative overflow-y-auto"
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
  );
}
