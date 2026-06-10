"use client";

import CardStack from "@/components/ui/card-stack";

const PROJECTS = [
  {
    id: 1,
    title: "SkipQ",
    category: "Full Stack Development",
    description: "Retail queue management and shopping assistance platform built to help stores manage orders and reduce customer waiting time.",
    keyWork: [
      "Built frontend and backend integration",
      "Implemented REST APIs and order workflows",
      "Configured PostgreSQL database deployment",
      "Worked on cloud deployment and production debugging",
    ],
    tags: ["React.js", "Spring Boot", "PostgreSQL", "Render Deployment"],
    github: "#",
    demo: "#",
    glowColor: "blue" as const,
  },
  {
    id: 2,
    title: "Explainable CNN–Transformer for Speech/Dysarthria Screening",
    category: "Deep Learning & Speech",
    description: "Hybrid deep learning project focused on speech analysis and dysarthria screening using CNN and Transformer architectures.",
    keyWork: [
      "Worked on speech-based feature analysis",
      "Explored explainable AI concepts",
      "Implemented hybrid model architecture for classification tasks",
    ],
    tags: ["Python", "TensorFlow", "Deep Learning"],
    github: "#",
    demo: "#",
    glowColor: "purple" as const,
  },
  {
    id: 3,
    title: "Echoes Of Rampage",
    category: "Game Development",
    description: "2D cinematic action platformer developed from scratch using Godot 4.x.",
    keyWork: [
      "Designed gameplay mechanics and movement systems",
      "Built enemy encounters and boss fight sequences",
      "Implemented level progression and cinematic scenes",
      "Developed the game without using templates",
    ],
    tags: ["Godot Engine", "GDScript"],
    github: "#",
    demo: "#",
    glowColor: "orange" as const,
  },
  {
    id: 4,
    title: "Environmental Air Quality Monitoring & Hotspot Prediction",
    category: "Data Analytics",
    description: "Interactive Power BI dashboard project focused on analyzing air quality trends and identifying AQI hotspots.",
    keyWork: [
      "Worked on data cleaning and dashboard visualization",
      "Analyzed pollutant trends and AQI patterns",
      "Explored DAX functions and data storytelling techniques",
    ],
    tags: ["Power BI", "Data Analytics"],
    github: "#",
    demo: "#",
    glowColor: "green" as const,
  },
  {
    id: 5,
    title: "STFT-Based Volcanic Eruption Detection Using Kalman Filtering",
    category: "Signal Processing",
    description: "Research-focused signal processing project using seismic data analysis.",
    keyWork: [
      "Applied STFT for time-frequency analysis",
      "Explored Kalman filtering techniques",
      "Analyzed seismic signal behavior for eruption detection",
    ],
    tags: ["MATLAB", "Signal Processing"],
    github: "#",
    demo: "#",
    glowColor: "red" as const,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 items-center text-center">
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-3">
            04 / Portfolio
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-[2px] bg-accent-cyan mt-4 animate-pulse" />
        </div>

        {/* Projects Stack Layout */}
        <div className="flex items-center justify-center w-full mt-8">
          <CardStack initialProjects={PROJECTS} />
        </div>

      </div>
    </section>
  );
}
