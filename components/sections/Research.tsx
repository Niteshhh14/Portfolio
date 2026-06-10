"use client";

import { motion } from "framer-motion";
import { FileText, Lightbulb, GraduationCap, ChevronRight } from "lucide-react";
import canvasConfetti from "canvas-confetti";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function Research() {
  const triggerConfetti = () => {
    canvasConfetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#3B82F6", "#22D3EE", "#8B5CF6"],
    });
  };

  return (
    <section id="research" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-bg-secondary/35 to-transparent">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-purple uppercase tracking-widest mb-3">
            05 / Achievements
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Research & Projects
          </h2>
          <div className="w-12 h-[2px] bg-accent-purple mt-4" />
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Research Paper */}
          <GlowCard
            customSize={true}
            glowColor="purple"
            className="p-6 sm:p-8 group cursor-default"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple group-hover:scale-102 transition-transform duration-300">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple uppercase tracking-wider">
                  Published Paper
                </span>
              </div>
              
              <h3 className="font-heading font-bold text-text-primary text-lg tracking-tight mb-3 group-hover:text-accent-purple transition-colors duration-200">
                Tilt-Based Control: Torque and RPM Analysis for Self-Balancing Vehicles Using C Programming
              </h3>
              
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-6">
                Published research exploring self-balancing vehicle dynamics using torque calculation, gyroscopic principles, and C-programming-based control logic.
              </p>
            </div>

            <div>
              <button
                onClick={triggerConfetti}
                className="flex items-center gap-1 text-[10px] font-mono font-medium text-accent-purple hover:text-text-primary hover:translate-x-1 transition-all duration-200 cursor-pointer uppercase tracking-wider z-10 relative"
              >
                Read Paper Details
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlowCard>

          {/* Card 2: Patent */}
          <GlowCard
            customSize={true}
            glowColor="blue"
            className="p-6 sm:p-8 group cursor-default"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan group-hover:scale-102 transition-transform duration-300">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan uppercase tracking-wider">
                  Patent Filed
                </span>
              </div>

              <h3 className="font-heading font-bold text-text-primary text-lg tracking-tight mb-3 group-hover:text-accent-cyan transition-colors duration-200">
                AI-Enabled Smart Parking & Safety System for Closed Spaces
              </h3>

              <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-6">
                Worked on an AI-enabled smart parking and safety monitoring system focused on closed-space vehicle environments and automation.
              </p>
            </div>

            <div>
              <button
                onClick={triggerConfetti}
                className="flex items-center gap-1 text-[10px] font-mono font-medium text-accent-cyan hover:text-text-primary hover:translate-x-1 transition-all duration-200 cursor-pointer uppercase tracking-wider z-10 relative"
              >
                View Patent Details
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlowCard>

        </div>

        {/* Footer highlight */}
        <div className="glass-panel rounded-2xl p-6 border border-surface-2 bg-gradient-to-r from-surface-1/20 to-surface-2/5 flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-surface-1 border border-surface-2 text-accent-blue shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <p className="text-text-muted text-xs leading-relaxed">
            By bridging ECE foundations with Artificial Intelligence courses, I aim to create projects that connect physical dynamics with software processing loops.
          </p>
        </div>

      </div>
    </section>
  );
}
