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

export function Work() {
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
  );
}
