"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mail, ArrowRight } from "lucide-react";
import AvatarAnimator from "./AvatarAnimator";

const ROTATING_TITLES = [
  "Developer",
  "Problem Solver",
  "Systems Explorer",
  "Network & Automation Enthusiast",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden"
    >


      {/* 2. Background radial highlights */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[90px] pointer-events-none -z-10" />

      {/* 3. Hero Layout Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Greeting tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1/50 border border-surface-2 font-mono text-[9px] text-accent-cyan tracking-widest uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Hello World
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-none mb-2"
          >
            I&apos;m <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple bg-clip-text text-transparent">Nitesh</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-mono text-xs sm:text-sm text-accent-cyan tracking-wider mb-5"
          >
            ECE + AI Student @ Anurag University
          </motion.p>

          {/* Rotating Titles */}
          <div className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={titleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="font-heading font-medium text-lg sm:text-xl md:text-2xl text-text-muted tracking-wide"
              >
                {ROTATING_TITLES[titleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grounded Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl mb-10"
          >
            I build intelligent systems combining AI, software, electronics, and automation — with interests in networking, robotics, and real-world problem solving.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection("resume")}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-blue text-text-primary text-xs font-mono font-medium tracking-wider uppercase hover:bg-accent-blue/80 hover:shadow-lg hover:shadow-accent-blue/10 transition-all duration-200 cursor-pointer w-full sm:w-auto"
            >
              Download Resume
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-1 hover:bg-surface-2 border border-surface-2 hover:border-text-muted/20 text-text-primary text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer w-full sm:w-auto"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl hover:bg-surface-1/40 text-text-muted hover:text-text-primary text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer w-full sm:w-auto"
            >
              Contact Me
              <Mail className="w-4 h-4" />
            </button>
          </motion.div>

        </div>

        {/* Right Side: 3D Flip Card Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <div className="w-full max-w-md lg:max-w-none">
            <AvatarAnimator />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
