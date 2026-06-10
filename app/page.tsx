"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/ui/preloader";
import Navbar from "@/components/ui/Navbar";
import ParticleBackground from "@/components/three/ParticleBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import TechStack from "@/components/sections/TechStack";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <Preloader key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
          {/* Subtle Global Video Background */}
          <div className="fixed inset-0 -z-20 w-full h-full overflow-hidden pointer-events-none [transform:translate3d(0,0,0)] [will-change:transform]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-20 [transform:translate3d(0,0,0)] [will-change:transform]"
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-bg-primary/65" />
          </div>

          {/* Subtle Lazy-loaded Particle Background */}
          <ParticleBackground />

          {/* Fixed Sticky Header */}
          <Navbar />

          {/* Page Sections */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Research />
            <TechStack />
            <Resume />
            <Contact />
          </main>

          {/* Premium Recruiter Footer */}
          <footer className="py-8 px-6 border-t border-surface-1/50 bg-bg-primary text-center z-10">
            <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
              © {new Date().getFullYear()} Nitesh Reddy. All Rights Reserved. Built with Next.js 14, Framer Motion & Three.js.
            </p>
          </footer>
        </div>
      )}
    </>
  );
}
