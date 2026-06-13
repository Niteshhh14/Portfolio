"use client";

import { useEffect, useRef, useState } from "react";
import { Loading01Icon as Loader2 } from "hugeicons-react";
import TetrisLoading from "@/components/ui/tetris-loader";

const TOTAL_FRAMES = 90;
const FRAME_RATE = 66; // ~15 FPS (0.066s delay)

export default function AvatarAnimator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Keep loaded images in a ref to avoid re-renders
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Animation state refs
  const currentFrameRef = useRef(55);
  const modeRef = useRef<"idle" | "lookup" | "lookdown">("lookup");
  const lastTimeRef = useRef(0);
  const isPlayingRef = useRef(true);

  // 1. Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(2, "0");
      img.src = `/avatar-frames/frame_${frameStr}.webp`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // 2. Control active animation playback based on load & flip state
  useEffect(() => {
    isPlayingRef.current = isLoaded && !isFlipped;
  }, [isLoaded, isFlipped]);

  // 3. Main animation loop
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const renderFrame = (timestamp: number) => {
      // Skip updates if not playing (e.g. card is flipped)
      if (!isPlayingRef.current) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= FRAME_RATE) {
        let currentFrame = currentFrameRef.current;
        const mode = modeRef.current;

        if (mode === "lookup") {
          currentFrame--;
          if (currentFrame < 24) {
            currentFrame = 24;
            modeRef.current = "lookdown";
          }
        } else if (mode === "lookdown") {
          currentFrame++;
          if (currentFrame > 55) {
            currentFrame = 56;
            modeRef.current = "idle";
          }
        } else if (mode === "idle") {
          currentFrame++;
          if (currentFrame > 80) {
            currentFrame = 56;
          }
        }

        currentFrameRef.current = currentFrame;
        lastTimeRef.current = timestamp - (elapsed % FRAME_RATE);

        // Draw image to canvas
        const activeImg = imagesRef.current[currentFrame];
        if (activeImg && activeImg.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(activeImg, 0, 0, canvas.width, canvas.height);
        }
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isLoaded]);

  // 4. Hover triggers waving sequence
  const handleMouseEnter = () => {
    setHovered(true);
    if (modeRef.current === "idle" && !isFlipped) {
      currentFrameRef.current = 55;
      modeRef.current = "lookup";
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => isLoaded && setIsFlipped(!isFlipped)}
      className="relative w-full aspect-square cursor-pointer group select-none max-w-[345px] sm:max-w-[385px] md:max-w-[410px] lg:max-w-[430px] xl:max-w-[450px] mx-auto avatar-card-glow ambient-glow-card"
      style={{ perspective: "1200px" }}
    >
      {/* Inner card containing front and back sides */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ================= FRONT SIDE (Interactive Canvas) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center border border-surface-2 bg-gradient-to-b from-surface-1/10 to-surface-2/5 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Loading Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-bg-secondary/95 z-20 flex flex-col items-center justify-center gap-4 p-4">
              <div className="scale-90 select-none pointer-events-none">
                <TetrisLoading size="sm" speed="fast" showLoadingText={false} />
              </div>
              <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider select-none">
                Initializing Avatar ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
              </div>
            </div>
          )}

          {/* Decorative border glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/0 via-accent-blue/0 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={640}
            height={640}
            className="w-full h-full object-cover scale-[1.02] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />

          {/* Subtle System Status Badge */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-bg-primary/70 backdrop-blur-sm border border-surface-1 py-1 px-3 rounded-full font-mono text-[9px] text-text-muted tracking-wider uppercase group-hover:text-accent-cyan transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {modeRef.current === "lookup" || modeRef.current === "lookdown"
              ? "SYS: GREETING"
              : "SYS: ACTIVE"}
          </div>

          {/* User hint */}
          {isLoaded && (
            <div className="absolute top-4 right-4 z-10 bg-bg-primary/80 backdrop-blur-sm border border-surface-1 py-1 px-3 rounded-full font-mono text-[9px] text-text-muted tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-2px] group-hover:translate-y-0 pointer-events-none">
              Click to view photo
            </div>
          )}
        </div>

        {/* ================= BACK SIDE (Real Photo) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center border border-surface-2 bg-gradient-to-b from-surface-1/10 to-surface-2/5 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Real profile photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nitesh-pfp.png"
            alt="Nitesh"
            className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Subtle dark overlay for premium lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent pointer-events-none" />

          {/* Static System Status Badge */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-bg-primary/70 backdrop-blur-sm border border-surface-1 py-1 px-3 rounded-full font-mono text-[9px] text-accent-blue tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            REAL_PROFILE: DISPLAYED
          </div>

          {/* User hint */}
          <div className="absolute top-4 right-4 z-10 bg-bg-primary/80 backdrop-blur-sm border border-surface-1 py-1 px-3 rounded-full font-mono text-[9px] text-text-muted tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-2px] group-hover:translate-y-0 pointer-events-none">
            Click to view avatar
          </div>
        </div>
      </div>
    </div>
  );
}
