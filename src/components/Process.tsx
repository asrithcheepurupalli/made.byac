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

export function Process() {
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
  );
}
