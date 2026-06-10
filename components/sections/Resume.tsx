"use client";

import { Download, FileText, ExternalLink } from "lucide-react";
import canvasConfetti from "canvas-confetti";
import { GlowCard } from "@/components/ui/spotlight-card";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Resume() {
  const handleDownload = () => {
    // 1. Confetti burst on download click
    canvasConfetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#3B82F6", "#6366F1", "#8B5CF6"],
    });
  };

  return (
    <section id="resume" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-bg-secondary/35 to-transparent">
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[95px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-blue uppercase tracking-widest mb-3">
            07 / Credentials
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Curriculum Vitae
          </h2>
          <div className="w-12 h-[2px] bg-accent-blue mt-4" />
        </div>

        {/* Resume Callout Card using GlowCard */}
        <GlowCard
          customSize={true}
          glowColor="blue"
          className="p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center gap-8 cursor-default w-full relative overflow-hidden min-h-[460px] group"
        >
          {/* Animated Gradient Background inside the card */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
            <AnimatedGradientBackground 
              startingGap={100}
              Breathing={true}
              animationSpeed={0.015}
              breathingRange={6}
              topOffset={10}
            />
            {/* Subtle overlay to make sure text is super readable */}
            <div className="absolute inset-0 bg-bg-primary/45 group-hover:bg-bg-primary/35 transition-colors duration-300" />
          </div>

          {/* Centered Lottie Cat Animation (offset to the right to visually center the cat's body due to its long tail on the right) */}
          <div 
            style={{ transform: "translateX(var(--cat-shift, 44px))" }}
            className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 -mt-4 flex items-center justify-center overflow-hidden [--cat-shift:32px] sm:[--cat-shift:46px]"
          >
            <DotLottieReact
              src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Details */}
          <div className="relative z-10 max-w-xl flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-blue" />
              <span className="font-heading font-semibold text-text-primary text-xl sm:text-2xl tracking-tight">
                Nitesh - B.Tech ECE
              </span>
            </div>
            
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-md">
              Recruiter-ready resume outlining academic milestones, project histories, research works, and practical engineering skills in hardware systems and software automation.
            </p>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0 justify-center items-center">
            <a
              href="/Nitesh_Resume_n.pdf"
              download="Nitesh_Resume.pdf"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent-blue text-text-primary text-xs font-mono font-medium tracking-wider uppercase hover:bg-accent-blue/80 hover:shadow-lg hover:shadow-accent-blue/15 transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            
            <a
              href="#about"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-surface-2 hover:border-text-muted/20 text-text-primary text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer w-full sm:w-auto text-center animate-none"
            >
              View Focus Areas
              <ExternalLink className="w-4 h-4 text-text-muted" />
            </a>
          </div>
        </GlowCard>

      </div>
    </section>
  );
}
