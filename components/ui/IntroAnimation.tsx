"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    // Check localStorage
    const seen = localStorage.getItem("nitesh-intro-seen");
    if (seen) {
      onComplete();
      return;
    }

    // Increment progress bar to simulate loading
    const duration = 2200; // 2.2 seconds total duration
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        handleFinish();
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    localStorage.setItem("nitesh-intro-seen", "true");
    onComplete();
  };

  if (!isMounted) return null;

  // Render preloader overlay
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-blue/5 blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center max-w-xs w-full px-6 z-10">
        {/* Glowing Geometric SVG N Logo */}
        <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
          {/* Subtle outer glow ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-2xl border border-accent-blue/10 bg-surface-1/10 backdrop-blur-sm shadow-xl"
          />
          
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 relative z-10 filter drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          >
            {/* Draw Left Vert Stem */}
            <motion.path
              d="M 28 75 L 28 25"
              fill="none"
              stroke="url(#blue-cyan-gradient)"
              strokeWidth="6.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
            {/* Draw Diagonal */}
            <motion.path
              d="M 28 25 L 72 75"
              fill="none"
              stroke="url(#blue-cyan-gradient)"
              strokeWidth="6.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.8 }}
            />
            {/* Draw Right Vert Stem */}
            <motion.path
              d="M 72 75 L 72 25"
              fill="none"
              stroke="url(#blue-cyan-gradient)"
              strokeWidth="6.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="blue-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full text-center"
        >
          <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-text-muted tracking-widest uppercase">
            <span>Loading Core Systems</span>
            <span>{Math.round(progress)}%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-[2px] bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        onClick={handleFinish}
        className="absolute bottom-10 right-10 px-4 py-2 rounded-full border border-surface-1 font-mono text-[10px] text-text-muted uppercase tracking-widest hover:bg-surface-1/50 hover:text-text-primary transition-all duration-200 cursor-pointer"
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
}
