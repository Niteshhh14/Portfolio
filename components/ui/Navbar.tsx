"use client";

import { useState, useEffect } from "react";
import { ArrowDown01Icon as ChevronDown, Cancel01Icon as X } from "hugeicons-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Track active section using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // focus on middle center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // height of navbar + spacing
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

  // Find active label for mobile collapsed trigger display
  const activeItem = NAV_ITEMS.find((item) => item.id === activeSection) || NAV_ITEMS[0];

  return (
    <motion.div
      initial={{ y: -50, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed top-5 left-1/2 z-50 pointer-events-none"
    >
      {/* Desktop Navbar (Horizontal Pill) */}
      <div className="hidden lg:block pointer-events-auto">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-500 shadow-lg ${
            isScrolled
              ? "bg-bg-primary/55 backdrop-blur-xl border-white/12 shadow-black/35 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)]"
              : "bg-surface-1/25 backdrop-blur-lg border-white/7 shadow-black/15 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-2 rounded-full font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-accent-cyan" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-surface-1/90 border border-surface-2/40 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 180, damping: 25 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Navbar (Expanding Compact Pill) */}
      <div className="lg:hidden pointer-events-auto">
        <motion.div
          animate={{
            width: mobileMenuOpen ? 210 : 160,
            height: mobileMenuOpen ? 310 : 42,
            borderRadius: mobileMenuOpen ? 20 : 9999,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className={`overflow-hidden border shadow-xl flex flex-col transition-colors duration-500 ${
            isScrolled || mobileMenuOpen
              ? "bg-bg-primary/65 backdrop-blur-xl border-white/12 shadow-black/40 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.5)]"
              : "bg-surface-1/30 backdrop-blur-lg border-white/7 shadow-black/20 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]"
          }`}
        >
          {/* Collapsed Trigger State */}
          {!mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-full h-full px-4 flex items-center justify-between text-text-primary cursor-pointer select-none"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent-cyan">
                {activeItem.label}
              </span>
              <ChevronDown className="w-4 h-4 text-text-muted animate-pulse" />
            </button>
          )}

          {/* Expanded Menu State */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="w-full h-full flex flex-col p-2.5 relative"
              >
                {/* Header inside expanded menu to close */}
                <div className="flex items-center justify-between px-3.5 py-2 mb-2 border-b border-white/5">
                  <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-text-muted">
                    Navigation
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-surface-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-1 overflow-y-auto">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full py-2 px-3.5 rounded-lg text-left font-mono text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                          isActive
                            ? "text-accent-cyan bg-surface-1/80 border-l-2 border-accent-cyan pl-4.5"
                            : "text-text-muted hover:text-text-primary hover:bg-surface-1/40 pl-3.5"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
