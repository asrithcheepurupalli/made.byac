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

export function About() {
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
  );
}
