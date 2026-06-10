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

export function Nav() {
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
  );
}
