"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Particles Geometry
    const particleCount = 30; // Keep it low for performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spread particles in a 3D box
      positions[i] = (Math.random() - 0.5) * 60;     // X
      positions[i + 1] = (Math.random() - 0.5) * 60; // Y
      positions[i + 2] = (Math.random() - 0.5) * 40; // Z
      
      speeds[i / 3] = 0.02 + Math.random() * 0.03;   // Speed
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // 5. Particles Material
    // Create a circular particle texture using a canvas
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      color: 0x3b82f6, // accent-blue
      size: 0.8,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: texture,
    });

    // 6. Create Points Object
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 7. Animation Loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Update particles
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const array = positionAttr.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Slowly float upwards
        array[idx + 1] += speeds[i];
        
        // Wrap around boundaries
        if (array[idx + 1] > 30) {
          array[idx + 1] = -30;
          array[idx] = (Math.random() - 0.5) * 60;
        }
        
        // Subtle horizontal drift
        array[idx] += Math.sin(Date.now() * 0.001 + i) * 0.005;
      }
      
      positionAttr.needsUpdate = true;
      
      // Rotate particle group slightly
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden"
      style={{ opacity: 0.4 }}
    />
  );
}
