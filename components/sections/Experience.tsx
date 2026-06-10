"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
  skills?: string[];
  glowColor: "blue" | "purple" | "green" | "red" | "orange";
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Technical Team Lead",
    company: "THINKCLOUD – Anurag University",
    location: "Hyderabad",
    duration: "Sep 2025 – Present",
    bullets: [
      "Coordinating with team members on technical projects and collaborative development activities.",
      "Exploring cloud-based modules, automation workflows, and practical implementation approaches.",
      "Assisting in project development, problem-solving, and technical learning initiatives within the team."
    ],
    glowColor: "purple" as const
  },
  {
    role: "Developer Intern",
    company: "SMARTZY Educations Pvt. Ltd.",
    location: "Hybrid, Hyderabad",
    duration: "Jul 2025 – Sep 2025",
    bullets: [
      "Worked on frontend development tasks using React and Tailwind CSS.",
      "Built and improved responsive UI components for web applications.",
      "Gained practical experience working with modern frontend workflows and reusable components."
    ],
    skills: ["React.js", "Tailwind CSS", "JavaScript", "Responsive Design"],
    glowColor: "green" as const
  },
  {
    role: "Technical Member",
    company: "GeeksforGeeks Student Chapter – Anurag University",
    location: "Hyderabad",
    duration: "May 2024 – May 2025",
    bullets: [
      "Participated in technical events, coding activities, and collaborative student projects.",
      "Contributed to chapter initiatives and engaged in peer learning activities.",
      "Explored problem-solving, development practices, and technical discussions with the community."
    ],
    skills: ["C++", "Python", "Problem Solving", "Git", "Team Collaboration"],
    glowColor: "orange" as const
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-bg-secondary/35 to-transparent">
      <div className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-accent-blue uppercase tracking-widest mb-3">
            03 / Timeline
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Experience
          </h2>
          <div className="w-12 h-[2px] bg-accent-blue mt-4" />
        </div>

        {/* Vertical Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-surface-1 pl-6 sm:pl-8 space-y-12"
        >
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-blue group-hover:border-accent-cyan transition-colors duration-300 flex items-center justify-center z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue group-hover:bg-accent-cyan scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>

              {/* Card container using GlowCard */}
              <GlowCard
                customSize={true}
                glowColor={exp.glowColor}
                className="p-6 cursor-default w-full"
              >
                <div>
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary text-base sm:text-lg group-hover:text-accent-blue transition-colors duration-200">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted mt-0.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    
                    {/* Meta badges */}
                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-text-muted">
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-1 border border-surface-2">
                        <Calendar className="w-3 h-3 text-accent-cyan" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-1 border border-surface-2">
                        <MapPin className="w-3 h-3 text-accent-purple" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5 text-text-muted text-xs sm:text-sm leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Skills Badges */}
                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-surface-1/50">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded bg-surface-1 border border-surface-2 text-text-muted font-mono text-[9px] font-medium tracking-wide uppercase group-hover:text-text-primary group-hover:border-surface-1 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
