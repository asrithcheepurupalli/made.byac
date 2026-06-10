import { AnimatePresence } from "motion/react";
import { StudioProvider, useStudio } from "./StudioContext";
import { SplashView } from "./components/SplashView";
import { ProjectDetailView } from "./components/ProjectDetailView";
import { MainView } from "./components/MainView";

function Shell() {
  const { viewMode, selectedProject, isDarkMode, getAmbientBgClass } = useStudio();

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode ? "dark" : ""} ${getAmbientBgClass()}`}>
      <AnimatePresence mode="wait">
        {viewMode === "splash" ? (
          <SplashView key="splash" />
        ) : viewMode === "project-detail" && selectedProject ? (
          <ProjectDetailView key="project-detail" />
        ) : (
          <MainView key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <Shell />
    </StudioProvider>
  );
}
