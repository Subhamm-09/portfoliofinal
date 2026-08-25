"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ArtifactConfig {
  id: string;
  image: string;
  category: string;
}

const INSTALLATION: ArtifactConfig[] = [
  { id: "01", image: "/pic (1).jpeg", category: "OPERATION: DOOMSDAY" },
  { id: "02", image: "/pic (2).jpeg", category: "MADVILLAINY" },
  { id: "03", image: "/pic (3).jpeg", category: "MM..FOOD" },
  { id: "04", image: "/pic (4).jpeg", category: "VIKTOR VAUGHN" },
  { id: "05", image: "/pic (5).jpeg", category: "KING GEEDORAH" },
  { id: "06", image: "/pic (6).jpeg", category: "METAL FACE" },
  { id: "07", image: "/pic (7).jpeg", category: "THE MOUSE & THE MASK" },
  { id: "08", image: "/pic (8).jpeg", category: "BORN LIKE THIS" },
  { id: "09", image: "/pic (9).jpeg", category: "CZARFACE MEETS METAL FACE" },
  { id: "10", image: "/pic (10).jpeg", category: "SUPERVILLAIN" },
  { id: "11", image: "/pic (1).jpeg", category: "DOOMSDAY" },
  { id: "12", image: "/pic (2).jpeg", category: "THE ILLUSION OF TIME" },
];

export default function MonolithicScroll({ onClose }: { onClose: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-[#030202]">
      
      {/* Heavy CSS Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Intro Fade Sequence */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#000000] pointer-events-none flex items-center justify-center"
          />
        )}
      </AnimatePresence>

      {/* Return Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: hasStarted ? 0.3 : 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        onClick={onClose}
        className="fixed top-8 right-8 md:top-12 md:right-12 z-50 text-[#E0D7D3] font-mono text-[10px] tracking-widest hover:text-white transition-opacity mix-blend-difference"
      >
        RETURN
      </motion.button>

      {/* Monolithic Scroll Content */}
      <div className="relative z-20 w-full flex flex-col items-center pt-[30vh] pb-[30vh]">

        {INSTALLATION.map((artifact, index) => (
          <motion.div 
            key={artifact.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center mb-[25vh]"
          >
            {/* Massive Image Container */}
            <div className="w-full max-w-[1400px] px-6 md:px-12 relative group cursor-crosshair">
              {/* Rusted Frame Border Effect */}
              <div className="absolute inset-4 md:inset-8 border border-[#1a1210] opacity-50 transition-all duration-700 group-hover:border-[#8C3A30] group-hover:scale-[1.01] pointer-events-none z-10" />
              
              <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-[#050505]">
                <Image 
                  src={artifact.image} 
                  alt={`Archive Image ${artifact.id}`}
                  fill
                  className="object-cover md:object-contain grayscale-0 opacity-100 md:grayscale md:contrast-125 md:opacity-70 transition-all duration-1000 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  priority={index < 2}
                />
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
