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

export function CaseStudyModal() {
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
  );
}
