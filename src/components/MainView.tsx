import { motion } from "motion/react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Gallery } from "./Gallery";
import { Work } from "./Work";
import { CaseStudyModal } from "./CaseStudyModal";
import { Process } from "./Process";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export function MainView() {
  return (
    <motion.div
      key="main"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Nav />
      <Hero />
      <Gallery />
      <Work />
      <CaseStudyModal />
      <Process />
      <About />
      <Contact />
      <Footer />
    </motion.div>
  );
}
