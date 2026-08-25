"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { useTheme } from "@/hooks/useTheme";
import CursorTrackingMask from "@/components/visuals/CursorTrackingMask";
import FilmGrain from "@/components/visuals/FilmGrain";
const MonolithicScroll = dynamic(() => import('@/components/visuals/MonolithicScroll'), { ssr: false });

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"], 
  style: ["normal", "italic"],
  variable: "--font-cormorant" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400", "500"], 
  variable: "--font-montserrat" 
});

function RevealText({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MethodItem({ title, desc, accent, isDark }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-4 border-b pb-8 transition-colors duration-700"
      style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
    >
        <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase font-medium">{title}</h4>
        <p className="font-serif text-xl md:text-2xl leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)" }}>
          {desc}
        </p>
    </motion.div>
  )
}



export default function AboutEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress: pageScroll } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const { scrollYProgress: heroScroll } = useScroll({ 
    target: heroRef,
    offset: ["start start", "end start"] 
  });
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const handleEnterWithMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
      setIsPlaying(true);
    }
    setHasEntered(true);
  };

  const handleEnterWithoutMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
    setHasEntered(true);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  
  // Smooth scroll progress
  const smoothHeroScroll = useSpring(heroScroll, { damping: 20, stiffness: 40 });
  const smoothPageScroll = useSpring(pageScroll, { damping: 20, stiffness: 40 });
  
  // Custom scroll transformations
  const heroY = useTransform(smoothHeroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(smoothHeroScroll, [0, 0.8], [1, 0]);
  const imageY = useTransform(smoothPageScroll, [0.2, 0.6], ["-10%", "10%"]);

  const { isDark } = useTheme();
  
  // Luxury Palette
  const bg = isDark ? "#0A0A0A" : "#F4F2EC";
  const textPrimary = isDark ? "#EAE7DF" : "#1A1816";
  const textMuted = isDark ? "rgba(234, 231, 223, 0.4)" : "rgba(26, 24, 22, 0.4)";
  const accent = isDark ? "#C88A6E" : "#B8445A"; // Match existing theme colors
  const borderLight = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  
  return (
    <div 
      ref={containerRef}
      className={`relative min-h-[400vh] w-full transition-colors duration-1000 ${cormorant.variable} ${montserrat.variable} selection:bg-[${accent}] selection:text-white font-sans`}
      style={{ backgroundColor: bg, color: textPrimary }}
    >
      <FilmGrain />
      <audio ref={audioRef} src="/mfdoom.mp3" loop preload="auto" />
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center cursor-pointer text-[#EAE7DF]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleEnterWithMusic}
          >
            <motion.h1 
               className="font-serif text-3xl md:text-5xl italic font-light tracking-wider"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
            >
              Click anywhere to enter
            </motion.h1>

            <motion.button
              onClick={handleEnterWithoutMusic}
              className="absolute bottom-12 font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Continue without music
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasEntered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            onClick={toggleAudio}
            className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[50000] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] mix-blend-difference opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: "#EAE7DF" }}
          >
            SOUND [{isPlaying ? "ON" : "OFF"}]
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── 1. HERO (INTENSE) ── */}
      <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
         {/* Subtle Background Elements */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5 mix-blend-overlay"
          style={{ y: heroY }}
        >
          {/* We remove the loud "SYSTEMS / SOFTWARE" text and just leave a quiet void */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        </motion.div>

        {/* The Tracking Mask */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-end pointer-events-none select-none z-10 pr-[5vw] lg:pr-[15vw]"
          style={{ y: heroY }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={hasEntered ? { opacity: 0.7, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
           <motion.div
              animate={hasEntered ? { x: mousePos.x * -30, y: mousePos.y * -30 } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 40, damping: 30 }}
              className="w-[80vw] md:w-[600px] lg:w-[700px] pointer-events-auto relative"
           >
              <CursorTrackingMask isDark={isDark} />
           </motion.div>
        </motion.div>

        {/* Foreground sharp layer — Editorial Freedom Layout */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none px-6 md:px-12 lg:px-24"
          style={{ y: heroY, transform: "translateZ(0)" }}
        >
          <motion.div 
            className="w-full max-w-[1200px] flex flex-col pointer-events-auto relative"
            animate={hasEntered ? { x: mousePos.x * -15, y: mousePos.y * -15 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 30 }}
          >
            
            {/* Massive Staggered Typography */}
            <motion.div 
              className="flex flex-col relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-[12vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase font-light ml-0 md:ml-12" style={{ color: textPrimary }}>
                Digital
              </h1>
              <h1 className="font-serif text-[12vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase font-light italic ml-12 md:ml-48 mt-2" style={{ color: accent }}>
                Canvas.
              </h1>
            </motion.div>

            {/* Comical Dialogue Box (CTA) */}
            <motion.div 
              className="absolute z-50 top-[-10%] md:top-[-5%] right-0 md:right-[5%] lg:right-[15%] cursor-pointer"
              initial={{ opacity: 0, scale: 0, rotate: 20 }}
              animate={hasEntered ? { opacity: 1, scale: 1, rotate: 6 } : { opacity: 0, scale: 0, rotate: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.8 }}
              onClick={() => setIsArchiveOpen(true)}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              <div 
                className={`relative px-5 py-3 md:px-8 md:py-4 border-2 md:border-[3px] rounded-[2rem] rounded-bl-sm transition-colors duration-500 ${
                  isDark 
                    ? "bg-[#0A0A0A] border-[#EAE7DF] shadow-[4px_4px_0_0_rgba(234,231,223,1)]" 
                    : "bg-white border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                }`}
              >
                <p 
                  className="font-sans font-black italic text-xs md:text-base tracking-[0.2em] uppercase whitespace-nowrap"
                  style={{ color: isDark ? "#EAE7DF" : "#000000" }}
                >
                  ENTER DIMENSION!
                </p>
              </div>
            </motion.div>
            
            {/* Bottom Info & Button */}
            <motion.div 
              className="mt-16 md:mt-24 flex flex-col ml-0 md:ml-12 lg:ml-24"
              initial={{ opacity: 0, y: 30 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-10 max-w-sm">
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: textPrimary }}>
                    Subham Panda
                  </p>
                  <p className="font-serif text-sm md:text-lg italic font-light leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>
                    Building software, exploring systems, and crafting thoughtful digital experiences. Computer Science, Software Engineering & Cybersecurity.
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
        
        {/* Abstract Greek Pillar / Vertical Line motif */}
        <motion.div 
           className="absolute bottom-0 w-[1px] h-[15vh]"
           style={{ backgroundColor: accent }}
           initial={{ scaleY: 0, originY: 1 }}
           animate={hasEntered ? { scaleY: 1 } : { scaleY: 0 }}
           transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 1.2 }}
        />
      </section>

      {/* ── 2. THE PERSON ── */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-24 py-32">
        <div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left gap-16">
          <RevealText>
            <h2 className="font-sans text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>The Person</h2>
          </RevealText>
          <div className="flex flex-col gap-8 font-serif text-2xl md:text-3xl leading-relaxed font-light" style={{ color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.85)" }}>
            <RevealText delay={0.1}>
              <p>I am a Computer Science student at OUTR, Bhubaneswar, with interests spanning software engineering, machine learning, cybersecurity, and core computer science.</p>
            </RevealText>
            <RevealText delay={0.2}>
              <p>I enjoy understanding how systems work beneath the abstractions — from algorithms and data structures to software architecture and intelligent applications. I learn best by combining foundational theory with hands-on experimentation and building.</p>
            </RevealText>
            <RevealText delay={0.3}>
              <p>My work so far has included machine learning applications, full-stack web development, interactive digital experiences, and academic exploration of core computing systems.</p>
            </RevealText>
            <RevealText delay={0.4}>
              <p>This portfolio is an evolving record of what I have built, what I have learned, and the engineering skills I am continuing to develop.</p>
            </RevealText>
          </div>
        </div>
      </section>

      {/* ── 3. THE ETHOS ── */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-24 py-32 border-t" style={{ borderColor: borderLight }}>
        <div className="max-w-5xl text-center flex flex-col items-center">
          <RevealText>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.3] font-light">
              &ldquo;I look beyond the abstraction to understand how systems work, why they work, and how they can be improved.<br/>
              Engineering, to me, is the discipline of turning <span className="italic" style={{ color: accent }}>curiosity into experimentation</span>, and experimentation into better solutions.&rdquo;
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="text-[9px] uppercase tracking-[0.4em] mt-24" style={{ color: textMuted }}>
              The Ethos
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── 4. WHAT I BUILD (EDITORIAL GRID) ── */}
      <section className="min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: borderLight }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-6 flex flex-col gap-12 order-2 lg:order-1">
             <RevealText>
               <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-light mb-8">
                 What I <span className="italic" style={{ color: textMuted }}>Build.</span>
               </h3>
             </RevealText>
             
             <div className="flex flex-col gap-10">
               <RevealText delay={0.1}>
                 <div className="flex flex-col gap-2">
                     <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase font-semibold">Software</h4>
                   <p className="font-sans text-sm font-light leading-relaxed mt-2" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>Algorithms, applications, systems, and engineering fundamentals.</p>
                   <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: textMuted }}>C++ · DSA · OOP · DBMS · Computer Networks</p>
                 </div>
               </RevealText>

               <RevealText delay={0.2}>
                 <div className="flex flex-col gap-2">
                     <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase font-semibold">Security</h4>
                   <p className="font-sans text-sm font-light leading-relaxed mt-2" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>Understanding how systems communicate, operate, and fail.</p>
                   <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: textMuted }}>Networking · Web Security · Cybersecurity Fundamentals</p>
                 </div>
               </RevealText>

               <RevealText delay={0.3}>
                 <div className="flex flex-col gap-2">
                     <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase font-semibold">Intelligence</h4>
                   <p className="font-sans text-sm font-light leading-relaxed mt-2" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>Exploration of applied ML, experimentation, and AI-assisted applications.</p>
                   <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: textMuted }}>Machine Learning · Applied ML · Experimentation</p>
                 </div>
               </RevealText>

               <RevealText delay={0.4}>
                 <div className="flex flex-col gap-2">
                     <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase font-semibold">Interfaces</h4>
                   <p className="font-sans text-sm font-light leading-relaxed mt-2" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>Web development, interactive interfaces, thoughtful UX, and visual experimentation.</p>
                   <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-2" style={{ color: textMuted }}>Web Development · Motion · Tactile UX</p>
                 </div>
               </RevealText>
             </div>
          </div>

          <div className="lg:col-span-6 relative h-[50vh] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden order-1 lg:order-2">
            <motion.div 
              className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
              style={{ 
                y: imageY,
                backgroundImage: 'url("https://images.unsplash.com/photo-1544252890-5028ce372579?q=80&w=2574&auto=format&fit=crop")',
                filter: isDark ? 'grayscale(100%) contrast(1.1) brightness(0.7)' : 'grayscale(100%) contrast(1.05) brightness(1.15)' 
              }}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}, transparent 15%)` }} />
          </div>

        </div>
      </section>

      {/* ── 5. THE PRAXIS (METHODOLOGY) ── */}
      <section className="min-h-screen w-full py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">
           
           <div className="lg:w-1/3 lg:sticky lg:top-32">
              <RevealText>
                <h3 className="font-serif text-5xl md:text-7xl font-light mb-8">
                  The<br/><span className="italic" style={{ color: accent }}>Praxis.</span>
                </h3>
              </RevealText>
              <RevealText delay={0.1}>
                <p className="font-serif text-xl leading-relaxed font-light" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)" }}>
                  Ideas become meaningful when they are put into practice. I approach engineering by combining strong fundamentals with hands-on experimentation — building, testing, breaking, and refining until the idea works beyond the abstraction.
                </p>
              </RevealText>
           </div>
           
           <div className="lg:w-1/2 flex flex-col gap-12 lg:mt-32">
              <MethodItem 
                title="Understand" 
                desc="Understand the problem space, the constraints, and the system architecture before reaching for the solution." 
                accent={accent} 
                isDark={isDark} 
              />
              <MethodItem 
                title="Build" 
                desc="Turn the idea into something tangible and testable. Write resilient, deterministic code to establish the core functionality." 
                accent={accent} 
                isDark={isDark} 
              />
              <MethodItem 
                title="Refine" 
                desc="Question the result, remove unnecessary complexity, optimize performance, and keep improving the design." 
                accent={accent} 
                isDark={isDark} 
              />
           </div>
           
        </div>
      </section>




      {/* FULL-SCREEN IMMERSIVE DIMENSION OVERLAY */}
      <AnimatePresence>
        {isArchiveOpen && (
          <div 
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            className="fixed inset-0 z-[99999] w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#030202]"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MonolithicScroll onClose={() => setIsArchiveOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 7. CURRENTLY & BEYOND ── */}
      <section className="py-32 px-6 md:px-12 lg:px-24 border-t" style={{ borderColor: borderLight }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          
          <div className="flex flex-col gap-16">
            <RevealText>
              <h3 className="font-sans text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>Currently</h3>
            </RevealText>
            <div className="flex flex-col gap-10">
              <RevealText delay={0.1}>
                <div className="flex flex-col gap-2">
                  <h4 className="font-serif italic text-2xl">Learning</h4>
                  <p className="font-sans text-sm font-light leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>Advanced DSA, computer science fundamentals, and systems.</p>
                </div>
              </RevealText>
              <RevealText delay={0.2}>
                <div className="flex flex-col gap-2">
                  <h4 className="font-serif italic text-2xl">Building</h4>
                  <p className="font-sans text-sm font-light leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>Personal software products and technically ambitious projects.</p>
                </div>
              </RevealText>
              <RevealText delay={0.3}>
                <div className="flex flex-col gap-2">
                  <h4 className="font-serif italic text-2xl">Exploring</h4>
                  <p className="font-sans text-sm font-light leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>Cybersecurity, AI integrations, and machine learning.</p>
                </div>
              </RevealText>
              <RevealText delay={0.4}>
                <div className="flex flex-col gap-2">
                  <h4 className="font-serif italic text-2xl">Moving Toward</h4>
                  <p className="font-sans text-sm font-light leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>Becoming a strong software engineer capable of building production-quality systems.</p>
                </div>
              </RevealText>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            <RevealText>
              <h3 className="font-sans text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>Beyond The Screen</h3>
            </RevealText>
            <div className="flex flex-col gap-8 font-serif text-xl md:text-2xl leading-relaxed font-light" style={{ color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.85)" }}>
              <RevealText delay={0.1}>
                <p>Technology is my primary medium, but my perspective is shaped by the world outside the editor.</p>
              </RevealText>
              <RevealText delay={0.2}>
                <p>I have a deep appreciation for visual design, photography, and the mechanics of filmmaking.</p>
              </RevealText>
              <RevealText delay={0.3}>
                <p>Whether it's traveling, experimenting with cameras, or working on motorcycles, I value the intersection of mechanics, aesthetics, and authentic experience.</p>
              </RevealText>
            </div>
          </div>

        </div>
      </section>

      {/* ── 8. THE DIRECTION ── */}
      <section className="py-32 px-6 md:px-24 border-t flex flex-col items-center text-center" style={{ borderColor: borderLight }}>
        <RevealText>
          <h3 className="font-sans text-[10px] tracking-[0.4em] uppercase mb-16" style={{ color: accent }}>The Direction</h3>
        </RevealText>
        <RevealText delay={0.1} className="max-w-4xl">
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.3] font-light">
            I am working toward becoming a strong software engineer with <span className="italic" style={{ color: accent }}>deep fundamentals,</span> rigorous problem-solving ability, and a nuanced understanding of cybersecurity and systems.
          </h2>
        </RevealText>
      </section>

      {/* ── 9. MANIFESTO ── */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] w-full text-center">
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-20%" }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="font-serif text-5xl md:text-7xl lg:text-9xl leading-[1.1] font-light"
           >
             Code as a <span className="italic" style={{ color: accent }}>craft.</span><br />
             Systems as <span className="italic" style={{ color: accent }}>art.</span>
           </motion.h2>
        </div>
      </section>

      {/* ── 10. FINAL SIGNATURE ── */}
      <section className="h-[60vh] w-full flex flex-col items-center justify-center relative overflow-hidden px-6 border-t" style={{ borderColor: borderLight }}>
        <RevealText>
           <h2 className="font-serif text-[10vw] leading-none tracking-tighter text-center">
             Built by <span className="italic" style={{ color: accent }}>Subham.</span>
           </h2>
        </RevealText>
        <RevealText delay={0.2}>
           <p className="font-sans text-[10px] tracking-[0.4em] uppercase mt-12" style={{ color: textMuted }}>
             2026
           </p>
        </RevealText>
      </section>
      
    </div>
  )
}
