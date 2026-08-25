"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CursorTrackingMaskProps {
  className?: string;
  isDark?: boolean;
}

const EYE_POSITIONS = {
  left: { x: 0.346, y: 0.467 },
  right: { x: 0.569, y: 0.467 },
};

const MAX_PUPIL_MOVEMENT = 14;
const SMOOTHING = 0.15;

export default function CursorTrackingMask({ className = "", isDark = false }: CursorTrackingMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);

  // Target positions (normalized -1 to 1)
  const target = useRef({ leftX: 0, leftY: 0, rightX: 0, rightY: 0 });
  
  // Current positions
  const current = useRef({ leftX: 0, leftY: 0, rightX: 0, rightY: 0 });

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion.current || isCoarse) return;

    let isVisible = true;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerX = rect.left;
      const containerY = rect.top;
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      // Absolute center coordinates of the eyes in the viewport
      const leftEyeCenterX = containerX + containerWidth * EYE_POSITIONS.left.x;
      const leftEyeCenterY = containerY + containerHeight * EYE_POSITIONS.left.y;
      
      const rightEyeCenterX = containerX + containerWidth * EYE_POSITIONS.right.x;
      const rightEyeCenterY = containerY + containerHeight * EYE_POSITIONS.right.y;

      // Calculate directional vectors
      const dxLeft = e.clientX - leftEyeCenterX;
      const dyLeft = e.clientY - leftEyeCenterY;
      const distLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft);
      
      const dxRight = e.clientX - rightEyeCenterX;
      const dyRight = e.clientY - rightEyeCenterY;
      const distRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight);

      // Normalize and scale by max movement
      if (distLeft > 0) {
        target.current.leftX = (dxLeft / distLeft) * Math.min(distLeft * 0.05, MAX_PUPIL_MOVEMENT);
        target.current.leftY = (dyLeft / distLeft) * Math.min(distLeft * 0.05, MAX_PUPIL_MOVEMENT);
      }
      
      if (distRight > 0) {
        target.current.rightX = (dxRight / distRight) * Math.min(distRight * 0.05, MAX_PUPIL_MOVEMENT);
        target.current.rightY = (dyRight / distRight) * Math.min(distRight * 0.05, MAX_PUPIL_MOVEMENT);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const animate = () => {
      if (isVisible) {
        // Lerp current towards target
        current.current.leftX += (target.current.leftX - current.current.leftX) * SMOOTHING;
        current.current.leftY += (target.current.leftY - current.current.leftY) * SMOOTHING;
        
        current.current.rightX += (target.current.rightX - current.current.rightX) * SMOOTHING;
        current.current.rightY += (target.current.rightY - current.current.rightY) * SMOOTHING;

        if (leftPupilRef.current) {
          leftPupilRef.current.style.transform = `translate3d(${current.current.leftX}px, ${current.current.leftY}px, 0) translate(-50%, -50%)`;
        }
        
        if (rightPupilRef.current) {
          rightPupilRef.current.style.transform = `translate3d(${current.current.rightX}px, ${current.current.rightY}px, 0) translate(-50%, -50%)`;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full max-w-[500px] aspect-square mx-auto pointer-events-none z-0 isolate ${className}`}
    >
      {/* Pupils are rendered first so they sit behind the image */}
      <div 
        ref={leftPupilRef}
        className={`absolute w-[20px] h-[20px] md:w-[24px] md:h-[24px] rounded-full blur-[0.5px] -z-10 transition-colors duration-1000 ${isDark ? "bg-[#EAE7DF] shadow-[0_0_12px_rgba(234,231,223,0.3)]" : "bg-[#050505]"}`}
        style={{
          left: `${EYE_POSITIONS.left.x * 100}%`,
          top: `${EYE_POSITIONS.left.y * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`absolute top-[25%] left-[25%] w-[25%] h-[25%] rounded-full blur-[0.5px] ${isDark ? "bg-black/30" : "bg-white/10"}`} />
      </div>

      <div 
        ref={rightPupilRef}
        className={`absolute w-[20px] h-[20px] md:w-[24px] md:h-[24px] rounded-full blur-[0.5px] -z-10 transition-colors duration-1000 ${isDark ? "bg-[#EAE7DF] shadow-[0_0_12px_rgba(234,231,223,0.3)]" : "bg-[#050505]"}`}
        style={{
          left: `${EYE_POSITIONS.right.x * 100}%`,
          top: `${EYE_POSITIONS.right.y * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`absolute top-[25%] left-[25%] w-[25%] h-[25%] rounded-full blur-[0.5px] ${isDark ? "bg-black/30" : "bg-white/10"}`} />
      </div>

      {/* Mask Image rendered on top */}
      <Image 
        src="/mfdoom.png"
        alt="Mask"
        fill
        className="object-cover z-20 drop-shadow-2xl"
        priority
      />
    </div>
  );
}
