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

export function Gallery() {
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
      <section id="gallery" className="py-24 border-b border-[#cfc4c5]/25 bg-[#faf8f5]/55 dark:bg-[#111111]/45 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl text-left">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-600 dark:text-emerald-400 font-bold mb-2 block">STUDIO DRAFTS DECK</span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                Tactile Specimen Scatter
              </h2>
              <p className="text-sm md:text-base text-neutral-550 dark:text-secondary mt-3 font-serif leading-relaxed">
                An interactive 3D light-table of curated brand prototypes, packaging sheets, and layouts. Hover to inspect material carrier details, client briefs, and debossed printing systems.
              </p>
            </div>

            {/* Layout Toggler Control Deck */}
            <div className="flex flex-wrap items-center gap-2 bg-neutral-200/50 dark:bg-neutral-900/60 p-1.5 rounded-xl border border-[#cfc4c5]/20 self-start lg:self-auto text-xs font-mono">
              <button
                onClick={() => setGalleryMode("scatter")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  galleryMode === "scatter"
                    ? "bg-neutral-900 text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                title="Organic physical drafts layout"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Desk Scatter</span>
              </button>
              <button
                onClick={() => setGalleryMode("grid")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  galleryMode === "grid"
                    ? "bg-neutral-900 text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                title="Perfect grid metrics alignment"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid Tray</span>
              </button>
              <button
                onClick={() => setGalleryMode("cascade")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold ${
                  galleryMode === "cascade"
                    ? "bg-neutral-900 text-white dark:bg-[#eceae5] dark:text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
                title="Wavy chronologic stream flow"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Timeline Ribbon</span>
              </button>
            </div>
          </div>

          {/* Desktop Dual-Pane Layout Viewer (Visible on md and up) */}
          <div className="hidden md:grid grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive 3D Drawer Light Table - Span 8 */}
            <div className="col-span-8 flex flex-col">
              <div 
                onMouseMove={handleDeskMouseMove}
                onMouseLeave={handleDeskMouseLeave}
                className="relative w-full h-[680px] lg:h-[750px] rounded-3xl border overflow-hidden bg-neutral-100/40 dark:bg-neutral-950/20 border-[#cfc4c5]/20 shadow-inner select-none cursor-crosshair"
                style={{
                  perspective: "2000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Architectural workbench graticule layout */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.11] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none"></div>
                
                {/* Micro Ruler indicators along edges */}
                <div className="absolute left-4 top-0 bottom-0 w-2 flex flex-col justify-between py-6 pointer-events-none opacity-20 font-mono text-[7px] text-neutral-500">
                  <span>0mm</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span>
                </div>
                <div className="absolute top-3 left-0 right-0 h-2 flex justify-between px-8 pointer-events-none opacity-20 font-mono text-[7px] text-neutral-500">
                  <span>0mm</span><span>150</span><span>300</span><span>450</span><span>600</span><span>750</span><span>900</span>
                </div>

                {/* 3D Moving Lightboard Plate */}
                <div 
                  className="relative w-full h-full transition-transform duration-500 ease-out"
                  style={{
                    transform: `rotateX(${20 + deskTilt.y}deg) rotateY(${deskTilt.x}deg) scale(0.96)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  
                  {/* Map over original posters using modern layout math */}
                  {posters.map((post, idx) => {
                    const isHovered = hoveredPosterId === post.id;
                    const isSelected = selectedPosterId === post.id;
                    const isAnyHovered = hoveredPosterId !== null;

                    // Get coordinate set based on active galleryMode
                    let leftPercent = post.left ?? 50;
                    let topPercent = post.top ?? 50;
                    let defaultRot = post.rotate ?? 0;
                    let defaultRotX = post.rotateX ?? 0;
                    let defaultRotY = post.rotateY ?? 0;
                    let baseScale = 0.75;

                    if (galleryMode === "grid") {
                      const cols = 6;
                      const col = idx % cols;
                      const row = Math.floor(idx / cols);
                      leftPercent = 8 + col * 16.8;
                      topPercent = 15 + row * 26.5;
                      defaultRot = 0;
                      defaultRotX = 0;
                      defaultRotY = 0;
                      baseScale = 0.58;
                    } else if (galleryMode === "cascade") {
                      const cols = 6;
                      const col = idx % cols;
                      const row = Math.floor(idx / cols);
                      leftPercent = 9 + col * 16.4;
                      topPercent = 20 + row * 27 + Math.sin(col * 0.9) * 8;
                      defaultRot = (col - 2.5) * 4;
                      defaultRotX = -12;
                      defaultRotY = (col - 2.5) * 3;
                      baseScale = 0.58;
                    } else {
                      // Scatter mode safety clamping
                      leftPercent = 15 + ((post.left ?? 50) - 15) * 0.82;
                      topPercent = 12 + ((post.top ?? 50) - 12) * 0.82;
                    }

                    // Card tilt calculations
                    const isTiltActive = activeTilt && activeTilt.id === post.id;
                    const cTiltX = isTiltActive ? activeTilt.y * -16 : 0;
                    const cTiltY = isTiltActive ? activeTilt.x * 16 : 0;

                    const rx = isHovered ? cTiltX : defaultRotX;
                    const ry = isHovered ? cTiltY : defaultRotY;
                    const rz = isHovered ? 0 : defaultRot;

                    const heightLift = isHovered ? 140 : (isSelected ? 25 : 0);
                    const finalScale = isHovered ? 1.25 : (isSelected ? 0.86 : baseScale);
                    const transformExpr = `translate(-50%, -50%) translate3d(0px, 0px, ${heightLift}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${finalScale})`;

                    const spec = getPosterSpecs(post.id);

                    return (
                      <div
                        key={post.id}
                        onMouseEnter={() => {
                          setHoveredPosterId(post.id);
                          setSelectedPosterId(post.id);
                        }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                          const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                          setActiveTilt({ id: post.id, x, y });
                        }}
                        onMouseLeave={() => {
                          setActiveTilt(null);
                          setHoveredPosterId(null);
                        }}
                        onClick={() => setSelectedPosterId(post.id)}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${leftPercent}%`,
                          top: `${topPercent}%`,
                          transform: transformExpr,
                          zIndex: isHovered ? 200 : (isSelected ? 80 : 20 + idx),
                          opacity: isAnyHovered ? (isHovered ? 1 : 0.18) : 0.88,
                          transformStyle: "preserve-3d",
                          transition: isHovered
                            ? "left 800ms cubic-bezier(0.16, 1, 0.3, 1), top 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 150ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 400ms ease"
                            : "left 800ms cubic-bezier(0.16, 1, 0.3, 1), top 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease"
                        }}
                      >
                        {/* Premium Solid Material Carrier */}
                        <div 
                          className={`w-36 h-48 p-2 rounded-xl border flex flex-col justify-between transition-all duration-500 ${
                            isSelected && !isHovered
                              ? "bg-[#faf8f4] dark:bg-neutral-900 border-emerald-500/70 shadow-[0_12px_32px_rgba(16,185,129,0.15)] scale-[1.02]"
                              : isHovered
                                ? "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-[0_30px_60px_rgba(0,0,0,0.22)] scale-[1.02]"
                                : isDarkMode
                                  ? "bg-neutral-900/90 border-neutral-800/80 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                                  : "bg-white border-[#cfc4c5]/35 shadow-[0_10px_24px_rgba(0,0,0,0.03)]"
                          }`}
                        >
                          {/* Image Box */}
                          <div className={`relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex-grow shadow-inner transition-all duration-500 ${
                            isHovered ? "ring-2 ring-emerald-500/10 dark:ring-white/5" : ""
                          }`}>
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ease-out ${
                                isHovered 
                                  ? "grayscale-0 contrast-100 brightness-100 opacity-100 scale-105" 
                                  : "grayscale contrast-[1.05] brightness-[1.01] opacity-90"
                              }`}
                            />
                            
                            {/* Debossed watermark identifier */}
                            <div className="absolute bottom-1 right-1 opacity-25 font-mono text-[5px] text-white">
                              SF: {idx + 1}
                            </div>
                          </div>

                          {/* Minimal Card Base Label */}
                          <div className="mt-2 text-left space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[6px] bg-neutral-150 dark:bg-neutral-800 text-neutral-550 dark:text-neutral-450 px-1 rounded-sm uppercase tracking-wider font-extrabold truncate max-w-[65px]">
                                {post.category}
                              </span>
                              <span className="font-mono text-[5px] text-neutral-400">
                                0{idx + 1}
                              </span>
                            </div>
                            <h5 className="font-sans font-bold text-[9px] text-neutral-900 dark:text-neutral-150 truncate leading-tight w-full">
                              {post.title}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>

            {/* Specimen Dossier Binder Sidebar - Span 4 */}
            <div className="col-span-4 flex flex-col justify-between">
              {(() => {
                const activePost = posters.find(p => p.id === selectedPosterId) || posters[0];
                const activeSpec = getPosterSpecs(activePost.id);
                return (
                  <div className="h-full flex flex-col justify-between border border-[#cfc4c5]/25 bg-[#faf8f5] dark:bg-[#151515] rounded-3xl p-6 shadow-sm relative overflow-hidden transition-colors duration-500">
                    
                    {/* Architectural stamp markings */}
                    <div className="absolute right-4 top-4 font-mono text-[7px] text-[#cfc4c5]/40 leading-none text-right pointer-events-none">
                      <span>FORM-CATALOGUE METRIC BLOCK</span><br />
                      <span>REF: DEC-2026/FLEX</span>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#cfc4c5]/20 pb-4">
                        <div className="flex items-center gap-1.5 font-mono text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>ACTIVE SPECIMEN DOSSIER</span>
                        </div>
                        <span className="font-mono text-[8px] text-neutral-400">CODE: {activePost.id.toUpperCase()}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-[#cfc4c5] block font-bold">
                          {activePost.category}
                        </span>
                        <h3 className="text-xl font-serif font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug">
                          {activePost.title}
                        </h3>
                        <p className="font-mono text-xs text-neutral-500">
                          Client Account: <span className="text-neutral-750 dark:text-neutral-250 font-medium">{activePost.client ?? "Studio Archive"}</span>
                        </p>
                      </div>

                      <div className="p-4 bg-neutral-200/20 dark:bg-neutral-900/30 rounded-xl border border-[#cfc4c5]/15">
                        <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider mb-1.5">CREATIVE DESIGN INTENT</span>
                        <p className="text-xs font-serif leading-relaxed text-neutral-600 dark:text-neutral-400 italic">
                          "{activeSpec.bio}"
                        </p>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider">CARRIER MATERIAL WEIGHT</span>
                          <span className="text-[11px] font-mono text-neutral-800 dark:text-neutral-300 font-medium">
                            {activeSpec.paper}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider">REPRODUCTION METHOD</span>
                          <span className="text-[11px] font-mono text-neutral-800 dark:text-neutral-300 font-medium">
                            {activeSpec.process}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[7.5px] font-mono font-bold uppercase text-neutral-400 block tracking-wider">STAGING RATIO</span>
                          <span className="text-[11px] font-mono text-neutral-800 dark:text-neutral-300 font-medium capitalize">
                            {activePost.aspect.replace("aspect-[", "").replace("]", "").replace("/", " : ")} (Standard Format)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer instructions */}
                    <div className="pt-6 border-t border-[#cfc4c5]/20 flex items-start gap-3 mt-6">
                      <Info className="w-4 h-4 text-emerald-500/80 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] font-mono text-neutral-500 leading-normal">
                        Use the arrangement selectors above the board to reorganize the workspace. Hovering on specimens exposes fine depth fields.
                      </p>
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>

          {/* Fluid Mobile Interactive Slider View (Visible under md) */}
          <div className="block md:hidden space-y-6">
            
            {/* Horizontal Scroll Track */}
            <div className="relative w-full overflow-x-auto pb-4 snap-x snap-mandatory flex gap-4 scrollbar-thin scrollbar-thumb-neutral-220">
              {posters.map((post, idx) => {
                const spec = getPosterSpecs(post.id);
                const isSelected = selectedPosterId === post.id;
                
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPosterId(post.id)}
                    className="w-60 flex-shrink-0 snap-center cursor-pointer"
                  >
                    <div 
                      className={`p-3 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                        isSelected 
                          ? "bg-white dark:bg-neutral-900 border-emerald-500 shadow-md"
                          : "bg-neutral-100/50 dark:bg-neutral-950/20 border-neutral-200 dark:border-neutral-800/80"
                      }`}
                    >
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-950 shadow-inner">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="mt-3 text-left">
                        <span className="font-mono text-[7px] bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded font-extrabold uppercase mb-1 inline-block">
                          {post.category}
                        </span>
                        <h4 className="font-sans font-bold text-xs text-neutral-950 dark:text-white truncate">
                          {post.title}
                        </h4>
                        <p className="font-mono text-[8px] text-neutral-400">
                          {post.client ?? "Studio Archive"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Selection Docket Summary Card */}
            {(() => {
              const activePost = posters.find(p => p.id === selectedPosterId) || posters[0];
              const activeSpec = getPosterSpecs(activePost.id);
              return (
                <div className="p-5 rounded-2xl border border-[#cfc4c5]/25 bg-[#faf8f5] dark:bg-neutral-900 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-200/50 dark:border-neutral-800/50 pb-2.5">
                    <span className="font-mono text-[8px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">SELECTED REPLICA</span>
                    <span className="font-mono text-[7px] text-neutral-400">{activePost.id.toUpperCase()}</span>
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-neutral-950 dark:text-white">{activePost.title}</h5>
                    <p className="text-[11px] font-serif italic text-neutral-600 dark:text-neutral-400 mt-1">
                      "{activeSpec.bio}"
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[9px] font-mono pt-1">
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[7px]">CARRIER</span>
                      <span className="text-neutral-800 dark:text-neutral-300 font-medium">{activeSpec.paper}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[7px]">METHOD</span>
                      <span className="text-neutral-800 dark:text-neutral-300 font-medium">{activeSpec.process}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </section>
  );
}
