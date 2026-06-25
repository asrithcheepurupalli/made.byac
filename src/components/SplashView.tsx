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

export function SplashView() {
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
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[100svh] w-full flex flex-col justify-between p-6 md:p-12 relative overflow-hidden select-none"
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
  );
}
