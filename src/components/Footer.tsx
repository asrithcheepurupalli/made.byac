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

export function Footer() {
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
  );
}
