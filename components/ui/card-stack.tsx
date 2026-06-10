"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Folder } from 'lucide-react';
import { GlowCard } from './spotlight-card';

const GithubIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ArrowUpRightIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  keyWork?: string[];
  tags: string[];
  github: string;
  demo: string;
  glowColor: 'blue' | 'purple' | 'green' | 'red' | 'orange';
}

interface CardStackProps {
  initialProjects: Project[];
}

export default function CardStack({ initialProjects }: CardStackProps) {
  const [cards, setCards] = useState<Project[]>(initialProjects);
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  // Sizing & styling config
  const offset = 8;
  const scaleStep = 0.05;
  const dimStep = 0.12;
  const stiff = 170;
  const damp = 26;
  const swipeThreshold = 60;

  const spring = {
    type: 'spring' as const,
    stiffness: stiff,
    damping: damp
  };

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % initialProjects.length);
  };

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + initialProjects.length) % initialProjects.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offset < 0 || velocity < 0) {
        setDragDirection('up');
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection('down');
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none py-12">
      
      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-6 pointer-events-none z-20">
        <motion.button
          onClick={moveToStart}
          className="p-3 sm:p-4 rounded-full bg-surface-1/80 hover:bg-surface-2/80 border border-surface-2 text-white backdrop-blur-sm transition-colors duration-200 pointer-events-auto cursor-pointer shadow-lg hover:shadow-accent-blue/5"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
        </motion.button>

        <motion.button
          onClick={moveToEnd}
          className="p-3 sm:p-4 rounded-full bg-surface-1/80 hover:bg-surface-2/80 border border-surface-2 text-white backdrop-blur-sm transition-colors duration-200 pointer-events-auto cursor-pointer shadow-lg hover:shadow-accent-blue/5"
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
        </motion.button>
      </div>

      {/* Card Stack Container */}
      <div className="relative w-[320px] sm:w-[380px] md:w-[410px] h-[460px] sm:h-[490px] md:h-[510px] overflow-visible z-10 mx-auto">
        <ul className="relative w-full h-full m-0 p-0">
          <AnimatePresence>
            {cards.map((project, i) => {
              const isFront = i === 0;
              const brightness = Math.max(0.4, 1 - i * dimStep);
              const baseZ = cards.length - i;

              return (
                <motion.li
                  key={project.id}
                  className="absolute w-full h-full list-none overflow-hidden"
                  style={{
                    cursor: isFront ? 'grab' : 'auto',
                    touchAction: 'none',
                    rotateX: isFront ? rotateX : 0,
                    transformPerspective: 1000
                  }}
                  animate={{
                    top: `${i * -offset}px`, // offset cards vertically
                    scale: 1 - i * scaleStep,
                    filter: `brightness(${brightness})`,
                    zIndex: baseZ,
                    opacity: dragDirection && isFront ? 0 : 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  transition={spring}
                  drag={isFront ? 'y' : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.7}
                  onDrag={(_, info) => {
                    if (isFront) {
                      dragY.set(info.offset.y);
                    }
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={
                    isFront
                      ? {
                          zIndex: cards.length + 1,
                          cursor: 'grabbing',
                          scale: 1.03,
                        }
                      : {}
                  }
                >
                  <GlowCard
                    customSize={true}
                    glowColor={project.glowColor}
                    className="w-full h-full p-6 sm:p-8"
                  >
                    <div 
                      style={{
                        opacity: isFront ? 1 : 0,
                        pointerEvents: isFront ? 'auto' : 'none',
                        transition: 'opacity 300ms ease-in-out'
                      }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Project Header Icons */}
                        <div className="flex justify-between items-center mb-6">
                          <div className="p-2.5 rounded-xl bg-surface-1 border border-surface-2 text-accent-cyan group-hover:text-accent-blue transition-colors duration-300">
                            <Folder className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-3">
                            <a
                              href={project.github}
                              className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-surface-1/50 transition-colors z-10 relative"
                              title="View Codebase"
                            >
                              <GithubIcon className="w-4 h-4" />
                            </a>
                            <a
                              href={project.demo}
                              className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-surface-1/50 transition-colors z-10 relative"
                              title="Live Demo"
                            >
                              <ArrowUpRightIcon className="w-4.5 h-4.5" />
                            </a>
                          </div>
                        </div>

                        {/* Info */}
                        <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-1">
                          {project.category}
                        </span>
                        <h3 className="font-heading font-semibold text-text-primary text-base sm:text-lg tracking-tight mb-3 group-hover:text-accent-cyan transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {project.keyWork && project.keyWork.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-surface-2/40">
                            <h4 className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider mb-2">
                              Key Contributions
                            </h4>
                            <ul className="space-y-1.5 list-none">
                              {project.keyWork.map((item, idx) => (
                                <li key={idx} className="text-text-muted text-[11px] sm:text-xs leading-relaxed flex items-start gap-2">
                                  <span className="text-accent-cyan/80 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-accent-cyan" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-surface-1/50">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full border border-surface-2 bg-surface-1/30 text-text-muted font-mono text-[9px] font-medium tracking-wide uppercase transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Progress Dots Indicator */}
      <div className="flex gap-2 mt-8 z-20">
        {initialProjects.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % initialProjects.length
                ? 'bg-accent-cyan w-8'
                : 'bg-gray-700 w-1.5'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Interaction Hint */}
      <p className="text-text-muted text-[10px] font-mono uppercase tracking-widest mt-4">
        ↕️ Swipe Card up/down • Navigation arrows • Card {currentIndex + 1} of {initialProjects.length}
      </p>

    </div>
  );
}
