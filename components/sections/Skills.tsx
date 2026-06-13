"use client";

import { motion, Variants } from "framer-motion";
import { BrainIcon as Brain, CpuIcon as Cpu, LayerIcon as Layers, SourceCodeIcon as Terminal } from "hugeicons-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const SKILL_CATEGORIES = [
  {
    title: "AI/ML",
    icon: Brain,
    accent: "text-accent-purple bg-accent-purple/10 border-accent-purple/20",
    glowColor: "purple" as const,
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "Scikit-Learn",
      "CNN Architectures",
      "Transformer Models",
      "Deep Learning",
    ],
  },
  {
    title: "Robotics & Embedded Systems",
    icon: Cpu,
    accent: "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20",
    glowColor: "blue" as const,
    skills: [
      "C / C++",
      "Arduino SDK",
      "Raspberry Pi Board",
      "Microcontrollers",
      "UART / I2C / SPI Protocols",
      "Hardware Debugging",
      "Sensor Integration",
    ],
  },
  {
    title: "Full Stack Development",
    icon: Layers,
    accent: "text-accent-blue bg-accent-blue/10 border-accent-blue/20",
    glowColor: "green" as const,
    skills: [
      "TypeScript",
      "JavaScript",
      "Next.js 14 (App Router)",
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "MongoDB",
      "RESTful APIs",
    ],
  },
  {
    title: "Tools & Automation Platforms",
    icon: Terminal,
    accent: "text-text-primary bg-surface-1/40 border-surface-2",
    glowColor: "orange" as const,
    skills: [
      "Linux (Ubuntu/Debian)",
      "Git & GitHub",
      "Docker Containers",
      "MATLAB & Simulink",
      "Shell Scripting",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants: Variants = {
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

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-purple uppercase tracking-widest mb-3">
            02 / Capabilities
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Technical Skills
          </h2>
          <div className="w-12 h-[2px] bg-accent-purple mt-4" />
        </div>

        {/* Skill Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={categoryVariants}
                className="w-full h-full"
              >
                <GlowCard
                  customSize={true}
                  glowColor={category.glowColor}
                  className="p-6 cursor-default w-full h-full"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-1/50">
                      <div className={`p-2.5 rounded-xl border ${category.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-semibold text-text-primary text-base tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill, sIdx) => (
                        <motion.span
                          key={sIdx}
                          variants={pillVariants}
                          whileHover={{
                            y: -2,
                            scale: 1.03,
                            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.08)",
                            borderColor: "rgba(59, 130, 246, 0.3)",
                          }}
                          className="px-3.5 py-1.5 rounded-full border border-surface-1/80 bg-surface-1/30 text-text-primary font-mono text-[11px] font-medium tracking-wide transition-all duration-200 cursor-default hover:bg-surface-1/50 z-10"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
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
