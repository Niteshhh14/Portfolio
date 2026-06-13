"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/ui/preloader";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";

// Dynamic Imports
const ParticleBackground = dynamic(() => import("@/components/three/ParticleBackground"), { ssr: false });
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Research = dynamic(() => import("@/components/sections/Research"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const Resume = dynamic(() => import("@/components/sections/Resume"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Background Video ALWAYS renders so it buffers during intro */}
      <div className={`fixed inset-0 -z-20 w-full h-full overflow-hidden pointer-events-none [transform:translate3d(0,0,0)] [will-change:transform] transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-20 [transform:translate3d(0,0,0)] [will-change:transform]"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-bg-primary/65" />
      </div>

      <AnimatePresence mode="wait">
        {showIntro && (
          <Preloader key="intro" onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">

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
