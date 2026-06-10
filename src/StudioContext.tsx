// Studio-wide state, handlers and derived values for made. by ac.
// Lifted out of App.tsx so view sections can be split into their own components.
import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, ContactSubmission } from "./types";
import { PROJECTS } from "./data";
import { INITIAL_POSTERS } from "./posters";

function useStudioValue() {
  // Navigation mode (Gatekeeper splash vs deep content vs dedicated detail page)
  const [viewMode, setViewMode] = useState<"splash" | "main" | "project-detail">("splash");
  const [previousViewMode, setPreviousViewMode] = useState<"splash" | "main">("splash");
  const [isWorkHovered, setIsWorkHovered] = useState<boolean>(false);
  const [isDetailGrayscale, setIsDetailGrayscale] = useState<boolean>(false);

  const handleSelectProject = (proj: Project) => {
    setPreviousViewMode(viewMode === "project-detail" ? previousViewMode : viewMode);
    setSelectedProject(proj);
    setViewMode("project-detail");
  };

  // Theme state (Warm default editorial vs stark dark minimal)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Sensory Workspace Parameters
  const [ambientTemp, setAmbientTemp] = useState<"2700" | "4000" | "6000">("4000"); // 2700K (Golden Hour), 4000K (Warm Paper), 6000K (Overcast Screen)
  const [selectedColor, setSelectedColor] = useState({
    name: "Imperial Crest Gold",
    hex: "#D4AF37",
    rgb: "212, 175, 55",
    description: "Traditional hot-deboss foil standard",
    cmyk: "C18, M30, Y88, K0"
  });
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Poster design scatter states
  const [posters, setPosters] = useState(INITIAL_POSTERS);
  const [hoveredPosterId, setHoveredPosterId] = useState<string | null>(null);
  const [galleryMode, setGalleryMode] = useState<"scatter" | "grid" | "cascade">("scatter");
  const [deskTilt, setDeskTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeTilt, setActiveTilt] = useState<{ id: string; x: number; y: number } | null>(null);
  const [selectedPosterId, setSelectedPosterId] = useState<string | null>("royal-kaju-katli");

  const handleDeskMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setDeskTilt({ x: x * 6, y: y * -6 }); // subtle 3D tilt
  };

  const handleDeskMouseLeave = () => {
    setDeskTilt({ x: 0, y: 0 });
    setHoveredPosterId(null);
    setActiveTilt(null);
  };

  // Active filter for Selected Works
  const [projectFilter, setProjectFilter] = useState<string>("All");

  // Selected project for Case Study view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmittingContact, setIsSubmittingContact] = useState<boolean>(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactSubmission | null>(null);
  const [inquiryLedger, setInquiryLedger] = useState<ContactSubmission[]>([]);

  // Studio Telemetry Chat State (Generic & elegant assistant, unrelated to any system brand)
  const [chatMessages, setChatMessages] = useState([
    {
      role: "model",
      text: "How may we help guide your design and computational goals today? Ask us about our typographic grid, selected case studies, or design estimations."
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Dynamic Workspace Clock
  const [currentTime, setCurrentTime] = useState<string>("");
  const [vizagTime, setVizagTime] = useState<string>("");

  const enterMainAndScroll = (anchorId: string) => {
    setViewMode("main");
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + " UTC");
      
      try {
        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).formatToParts(now);
        const hour = parts.find(p => p.type === 'hour')?.value || "";
        const minute = parts.find(p => p.type === 'minute')?.value || "";
        setVizagTime(`${hour} ${minute} IST`);
      } catch (err) {
        setVizagTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) + " IST");
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync / Load submissions from simple Express backend
  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/contact/submissions");
      if (res.ok) {
        const data = await res.json();
        setInquiryLedger(data);
      }
    } catch (e) {
      console.warn("Telemetry ledger unavailable.", e);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Submit contact form to Express server api
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmittingContact(true);
    setSubmittedInquiry(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        const data = await response.json();
        setSubmittedInquiry(data.submission);
        setContactForm({ name: "", email: "", message: "" });
        fetchSubmissions();
      } else {
        throw new Error("Local ledger connection timeout.");
      }
    } catch (err) {
      // Offline fallback
      const offlineInquiry: ContactSubmission = {
        id: "offline-" + Math.random().toString(36).substr(2, 6),
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
        timestamp: new Date().toISOString(),
        aiFeedback: "Thank you for sharing your thoughts. Your query was recorded locally on your device. Let us connect soon."
      };
      setSubmittedInquiry(offlineInquiry);
      setContactForm({ name: "", email: "", message: "" });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Virtual twin chat pipeline
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const currentInput = chatInput;
    setChatInput("");

    setChatMessages(prev => [...prev, { role: "user", text: currentInput }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...chatMessages.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: currentInput }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { role: "model", text: data.text }]);
      } else {
        throw new Error("Chat api failed");
      }
    } catch (err) {
      // Elegant fallback response matching Asrith's tranquility profile
      setChatMessages(prev => [
        ...prev,
        {
          role: "model",
          text: `Thank you for your interest in our design cohorts. To activate real-time intelligence grids, enter your GEMINI_API_KEY in the Settings menu of the builder dashboard. We would love to shape this idea with you.`
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const filteredProjects = projectFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.client === projectFilter || p.category === projectFilter);

  const getAmbientBgClass = () => {
    if (isDarkMode) {
      if (ambientTemp === "2700") return "bg-[#181512] text-[#eee5d8] selection:bg-amber-800/30";
      if (ambientTemp === "6000") return "bg-[#0b0e14] text-[#dce4f0] selection:bg-blue-800/30";
      return "bg-[#141414] text-[#eceae5] selection:bg-neutral-800";
    } else {
      if (ambientTemp === "2700") return "bg-[#faf5eb] text-[#241f17] selection:bg-amber-200/50";
      if (ambientTemp === "6000") return "bg-[#f1f4f8] text-[#1a2333] selection:bg-blue-200/50";
      return "bg-[#f9f7f4] text-[#1c1b1b] selection:bg-neutral-200";
    }
  };

  return {
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
  };
}

type StudioContextValue = ReturnType<typeof useStudioValue>;

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const value = useStudioValue();
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return ctx;
}
