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

export function Hero() {
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
  );
}
