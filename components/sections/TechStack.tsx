"use client";

import { motion, Variants } from "framer-motion";
import { SourceCodeIcon as Terminal, CodeIcon as Code, CpuIcon as Cpu, HardDriveIcon as HardDrive } from "hugeicons-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const STACK_CATEGORIES = [
  {
    title: "Software & Frameworks",
    icon: Code,
    color: "text-accent-blue",
    glowColor: "blue" as const,
    items: [
      { name: "Python" },
      { name: "C / C++" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML5 / CSS3" },
      { name: "React.js" },
      { name: "Spring Boot" },
      { name: "Bootstrap" },
      { name: "PyTorch" },
      { name: "TensorFlow" },
    ],
  },
  {
    title: "Hardware & Simulation",
    icon: Cpu,
    color: "text-accent-cyan",
    glowColor: "orange" as const,
    items: [
      { name: "Arduino SDK" },
      { name: "Raspberry Pi" },
      { name: "ESP32 / ESP8266" },
      { name: "UART / I2C / SPI" },
      { name: "MATLAB & Simulink" },
    ],
  },
  {
    title: "Platforms & Database",
    icon: HardDrive,
    color: "text-accent-purple",
    glowColor: "green" as const,
    items: [
      { name: "Linux / Git" },
      { name: "Docker" },
      { name: "MongoDB / SQL" },
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[95px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">
            06 / Technology
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Technical Stack
          </h2>
          <div className="w-12 h-[2px] bg-accent-cyan mt-4" />
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {STACK_CATEGORIES.map((category, index) => {
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
                    {/* Category Title */}
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-surface-1/40">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                      <h3 className="font-heading font-semibold text-text-primary text-sm tracking-wide uppercase">
                        {category.title}
                      </h3>
                    </div>

                    {/* Stack Items */}
                    <div className="space-y-2.5">
                      {category.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex items-center py-1.5 px-2.5 rounded-lg hover:bg-surface-1/40 transition-colors duration-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60 mr-2.5 shrink-0" />
                          <span className="text-text-primary text-xs sm:text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
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
