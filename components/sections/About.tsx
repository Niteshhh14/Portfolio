"use client";

import { motion, Variants } from "framer-motion";
import { DiplomaIcon as GraduationCap, Award01Icon as Award, BookOpen01Icon as BookOpen, CpuIcon as Cpu, Share01Icon as Network } from "hugeicons-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const STATS = [
  {
    icon: GraduationCap,
    label: "Education",
    title: "ECE + AI Minor",
    description: "B.Tech student at Anurag University, bridging communication electronics with modern machine learning systems.",
    highlight: "Anurag University",
    glowColor: "blue" as const,
  },
  {
    icon: Award,
    label: "Academic Record",
    title: "CGPA: 8.79",
    description: "Consistent performance focusing on digital systems, signal processing, and AI architectures.",
    highlight: "8.79 / 10.0",
    glowColor: "green" as const,
  },
  {
    icon: BookOpen,
    label: "Scientific Paper",
    title: "Published Paper",
    description: "Co-authored research analyzing torque and control loops for self-balancing vehicles using C programming.",
    highlight: "C-Control / Vehicle Dynamics",
    glowColor: "purple" as const,
  },
  {
    icon: Cpu,
    label: "Intellectual Property",
    title: "Patent Filed",
    description: "Co-invented an AI-enabled safety monitoring and smart parking automation system for closed vehicle spaces.",
    highlight: "Closed-Space IoT Safety",
    glowColor: "orange" as const,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-bg-secondary/35 to-transparent">
      <div className="absolute top-[30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">
            01 / Background
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-[2px] bg-accent-blue mt-4" />
        </div>

        {/* Narrative & Exploring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-5">
              I&apos;m Nitesh, an ECE student at Anurag University with a minor in AI. I got into engineering to understand how things work at a fundamental level - and that curiosity eventually pulled me toward writing code just as much as working with hardware.
            </p>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-5">
              I enjoy building things - web applications, AI integrations, automation workflows, and occasionally systems that cross into hardware. I&apos;ve always wanted to understand how things work underneath, not just on the surface. That&apos;s what drew me to ECE in the first place, and it&apos;s still what drives how I approach problems today. That curiosity hasn&apos;t gone away.
            </p>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              I&apos;ve co-authored a research paper, filed a patent, and done real frontend work during an internship. Still a fresher, still learning - but I build things and I figure stuff out.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full glass-panel rounded-2xl p-6 border border-surface-2 bg-gradient-to-br from-surface-1/30 to-surface-2/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan mt-1">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-primary text-sm tracking-wide uppercase mb-2">
                    Core Technical Interests
                  </h3>
                  <ul className="space-y-2.5 font-mono text-xs text-text-muted">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      Software Development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      System Design & Automation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      Networking & Systems
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      Embedded Systems & C++
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="w-full h-full"
              >
                <GlowCard
                  customSize={true}
                  glowColor={stat.glowColor}
                  className="p-6 group hover:translate-y-[-3px] transition-transform duration-300 cursor-default w-full h-full"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase">
                        {stat.label}
                      </span>
                      <Icon className="w-4.5 h-4.5 text-accent-cyan group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="font-heading font-semibold text-text-primary text-sm tracking-tight mb-2 group-hover:text-accent-cyan transition-colors duration-200">
                      {stat.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-3 border-t border-surface-1/50 flex justify-between items-center">
                    <span className="font-mono text-[9px] text-accent-blue font-semibold uppercase tracking-wider">
                      {stat.highlight}
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
