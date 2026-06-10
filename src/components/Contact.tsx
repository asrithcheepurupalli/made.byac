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

export function Contact() {
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
  );
}
