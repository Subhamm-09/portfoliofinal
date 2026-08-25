"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Julius_Sans_One, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  type Variants,
} from "framer-motion";
import "./home.css";
import Preloader from "@/components/layout/Preloader";
import { useTheme } from "@/hooks/useTheme";
import dynamic from "next/dynamic";
import EdgeSection from "@/components/sections/EdgeSection";
import { PROJECTS } from "@/data/projects";

const Statue3D = dynamic(() => import("@/components/visuals/Statue3D"), { ssr: false });

const julius = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-julius",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ─── Easing ───────────────────────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const gentle: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: expo } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.4, ease: gentle } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
};

const letterVariant: Variants = {
  hidden: { opacity: 0, y: "110%", skewY: 5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.85, ease: expo } },
};

// ─── Theme palettes ───────────────────────────────────────────────────────────
const DARK = {
  bg:        "#10100F",
  bgAlt:     "#0e0e0e",
  bgCard:    "#161616",
  text:      "#E7E2D8",
  textSub:   "#8D8A82",
  textMuted: "rgba(231,226,216,0.32)",
  gold:      "#C9A34A",
  goldMuted: "rgba(201,163,74,0.6)",
  goldGlow:  "rgba(201,163,74,0.07)",
  statueGlow:"radial-gradient(ellipse at center, rgba(201,163,74,0.2) 0%, rgba(201,163,74,0.08) 35%, transparent 75%)",
  watermark: "rgba(231,226,216,0.75)",
  border:    "rgba(231,226,216,0.07)",
  footerImg: 0.18,
  imgFilter: "none",
};

const LIGHT = {
  bg:        "#FCFBF9", // Soft ivory
  bgAlt:     "#F5F4F0",
  bgCard:    "#F5F4F0",
  text:      "rgba(10,10,10,0.95)",
  textSub:   "rgba(10,10,10,0.70)",
  textMuted: "rgba(10,10,10,0.55)",
  gold:      "#B8445A",        // Pink — richer, more saturated
  goldMuted: "rgba(184,68,90,0.60)",
  goldGlow:  "rgba(184,68,90,0.12)",
  statueGlow:"radial-gradient(ellipse at center, rgba(184,68,90,0.40) 0%, rgba(184,68,90,0.18) 30%, rgba(184,68,90,0.06) 60%, transparent 80%)",
  watermark: "rgba(0,0,0,0.72)",
  border:    "rgba(10,10,10,0.09)",
  footerImg: 0.12,
  imgFilter: "none",
};

// ─── Grain ────────────────────────────────────────────────────────────────────
function Grain({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="grain-overlay pointer-events-none fixed inset-0 z-[2]"
      style={{
        opacity: isDark ? 0.035 : 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

// ─── GPU-Accelerated Mouse Glow (Zero React Re-renders) ──────────────────────
function MouseGlow({ isDark }: { isDark: boolean }) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number = 0;
    let targetX = -600;
    let targetY = -600;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
          }
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const rgb = isDark ? "201, 163, 74" : "184, 68, 90";

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 -ml-[300px] -mt-[300px] w-[600px] h-[600px] rounded-full z-[1] transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle at center, rgba(${rgb}, ${isDark ? 0.05 : 0.04}) 0%, transparent 70%)`,
        willChange: "transform",
      }}
    />
  );
}

// ─── SplitText ────────────────────────────────────────────────────────────────
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Work Card ────────────────────────────────────────────────────────────────
function WorkCard({
  title,
  subtitle,
  description,
  tags = [],
  src,
  alt,
  reverse = false,
  index,
  projectId,
  t,
  isDark,
}: {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  src: string;
  alt: string;
  reverse?: boolean;
  index: number;
  projectId: number;
  t: typeof DARK;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  
  // Parallax Scrollytelling
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const s_imageY = useSpring(imageY, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-20 py-16 lg:py-24 border-b last:border-0"
      style={{ borderColor: t.border }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      <motion.div
        className={`${reverse ? "lg:col-start-7 lg:col-span-6 order-1 lg:order-2" : "lg:col-span-6"} w-full h-full`}
        variants={
          reverse
            ? { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: expo, delay: index * 0.1 } } }
            : { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: expo, delay: index * 0.1 } } }
        }
      >
        <div className="aspect-[4/3] overflow-hidden relative group border" style={{ backgroundColor: isDark ? t.bgCard : "#f7f7f5", borderColor: t.border }}>
          <motion.img
            alt={alt}
            src={src}
            className="w-full h-[112%] absolute left-0 top-[-6%] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ y: s_imageY }}
          />
        </div>
      </motion.div>

      <motion.div
        className={`${reverse ? "order-2 lg:order-1 lg:col-span-5 lg:pr-12" : "lg:col-start-8 lg:col-span-5"} py-8 lg:py-0 flex flex-col justify-center`}
        variants={fadeUp}
      >
        <span className="block text-[11px] tracking-widest uppercase font-mono mb-6" style={{ color: t.gold }}>
          {subtitle}
        </span>
        <h3 className="font-[var(--font-julius)] text-[clamp(2.25rem,4vw,3.25rem)] font-bold tracking-tight leading-[1.1] mb-6" style={{ color: isDark ? t.text : "#111111" }}>
          {title}
        </h3>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span key={tag}
                className="border px-3 py-1 text-[10px] font-medium tracking-widest uppercase"
                style={{
                  color: t.gold,
                  borderColor: t.gold + (isDark ? "30" : "40"),
                  backgroundColor: t.goldGlow,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-base leading-relaxed font-light mb-10 max-w-lg" style={{ color: isDark ? t.textSub : "#374151" }}>
          {description}
        </p>
        
        <div>
          <Link
            href={`/projects/${projectId}`}
            className="group relative inline-flex items-center gap-3 px-6 py-3 text-[11px] tracking-widest uppercase font-semibold transition-all duration-300"
            style={{
              color: t.gold,
              border: `1px solid ${t.gold + (isDark ? "50" : "60")}`,
              backgroundColor: t.goldGlow,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = t.gold; (e.currentTarget as HTMLElement).style.color = isDark ? "#10100F" : "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = t.goldGlow; (e.currentTarget as HTMLElement).style.color = t.gold; }}
          >
            <span>View Case Study</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Edge Row (Deprecated) ────────────────────────────────────────────────────
// Replaced by EdgeSection

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);
  const { isDark } = useTheme();

  const t = isDark ? DARK : LIGHT;

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // ── Hero Cinematic Parallax ────────────────────────────────────────────────
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Layer 1 — Background watermarks (fast, opposing directions = true parallax split)
  const heroCreativeY    = useTransform(heroScroll, [0, 1], ["0%", "-55%"]); // drifts UP
  const heroEngineeringY = useTransform(heroScroll, [0, 1], ["0%",  "55%"]); // drifts DOWN

  // Layer 2 — Statue (slower, heavier)
  const statueY       = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const statueScale   = useTransform(heroScroll, [0, 0.6, 1], [1, 0.98, 0.96]);
  const statueOpacity = useTransform(heroScroll, [0, 0.5, 0.85], [1, 1, 0]);
  const statueRotateY = useTransform(heroScroll, [0, 1], [0, -3]);
  const statueRotateX = useTransform(heroScroll, [0, 1], [0, 1.5]);

  // Layer 3 — Orbit ring (independent tilt & fade)
  const orbitY       = useTransform(heroScroll, [0, 1], ["-50%", "-35%"]);
  const orbitRotate  = useTransform(heroScroll, [0, 1], ["0deg", "30deg"]);
  const orbitOpacity = useTransform(heroScroll, [0, 0.35, 0.55], [1, 1, 0]);

  // Text opacity — slow fade, starts dissolving mid-scroll
  const heroTextOpacity = useTransform(heroScroll, [0, 0.4, 0.75], [1, 1, 0]);

  // Bottom strip opacity — quick exit on first scroll
  const metadataOpacity = useTransform(heroScroll, [0, 0.12], [1, 0]);

  // ── Spring configs — differentiated per layer ────────────────────────────
  // Text layers: very low friction, high mass feel = silky
  const textSpring   = { stiffness: 35, damping: 22, mass: 1.2 };
  // Statue: heavier, slower = physical weight
  const statueSpring = { stiffness: 28, damping: 30, mass: 1.6 };
  // Orbit: lightest, most responsive
  const orbitSpring  = { stiffness: 50, damping: 18, mass: 0.8 };

  const s_heroCreativeY    = useSpring(heroCreativeY, textSpring);
  const s_heroEngineeringY = useSpring(heroEngineeringY, textSpring);
  const s_statueY          = useSpring(statueY, statueSpring);
  const s_statueScale      = useSpring(statueScale, statueSpring);
  const s_statueRotateY    = useSpring(statueRotateY, statueSpring);
  const s_statueRotateX    = useSpring(statueRotateX, statueSpring);
  const s_orbitY           = useSpring(orbitY, orbitSpring);
  const s_orbitRotate      = useSpring(orbitRotate, orbitSpring);

  // Hero InView detection to freeze 3D canvas off-screen
  const isHeroInView = useInView(heroRef, { margin: "200px 0px" });

  // Footer
  const footerRef = useRef<HTMLDivElement>(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <div
      className={`${julius.variable} min-h-screen`}
      style={{ backgroundColor: t.bg, color: t.text, transition: "background-color 0.7s ease, color 0.7s ease" }}
    >
      {/* Dynamic ambient mouse glow */}
      <MouseGlow isDark={isDark} />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left", backgroundColor: t.gold }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none"
      />

      <Preloader onComplete={handlePreloaderComplete} isReady={isModelLoaded} />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Grain & Paper Texture */}
      <div
        className={`pointer-events-none fixed inset-0 z-[2] ${!isDark ? 'mix-blend-multiply' : ''}`}
        style={{
          opacity: isDark ? 0.035 : 0.6,
          backgroundImage: isDark
            ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='5' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0.85  0 1 0 0 0.82  0 0 1 0 0.78  0 0 0 0.12 0' in='noise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: isDark ? "repeat" : "repeat, repeat",
          backgroundSize: isDark ? "128px 128px" : "400px 400px, 128px 128px",
        }}
      />


      {/* Vignette - extremely subtle to frame the studio */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: isDark 
          ? "radial-gradient(ellipse 150% 150% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)"
          : "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 30%, rgba(220,215,205,0.3) 100%)"
        }}
      />

      <main style={{ backgroundColor: t.bg, transition: "background-color 0.7s ease" }}>

        {/* ── HERO CINEMATIC PARALLAX ──────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col overflow-hidden max-w-[1400px] mx-auto"
          style={{ backgroundColor: t.bg, transition: "background-color 0.7s ease" }}
        >
          {/* Soft Studio Environment Backdrop */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
            style={{
              opacity: heroTextOpacity,
              background: isDark
                ? "radial-gradient(circle at 45% 40%, #1a1917 0%, #10100F 70%)"
                : "radial-gradient(ellipse 60% 55% at 50% 52%, rgba(184,68,90,0.14) 0%, rgba(184,68,90,0.06) 45%, transparent 72%)",
            }}
          />

          {/* Physical Grounding Floor Shadow - Dark Mode Only */}
          <motion.div 
             className="absolute top-1/2 left-1/2 w-[40vw] max-w-[400px] aspect-square rounded-full z-0 pointer-events-none blur-[40px] transition-all duration-700"
             style={{ 
               opacity: isDark ? statueOpacity : 0,
               backgroundColor: isDark ? "#000000" : "transparent",
               transform: "translate(-50%, -50%) scaleY(0.2) translateY(550%)"
             }}
          />

          {/* Watermark BACK — CREATIVE: entrance from above, then scroll-driven */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ y: "-60%", opacity: 0 }}
            animate={isLoading ? { y: "-60%", opacity: 0 } : { y: "0%", opacity: 1 }}
            transition={{ duration: 1.6, ease: expo, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
              style={{ y: s_heroCreativeY, opacity: heroTextOpacity }}
            >
              <span
                className="font-sans font-light text-[8vw] md:text-[7.5vw] uppercase whitespace-nowrap leading-none -translate-y-[12vh]"
                style={{ color: t.watermark, letterSpacing: "0.25em" }}
              >
                CREATIVE
              </span>
            </motion.div>
          </motion.div>

          {/* Statue and Effects */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ y: s_statueY, scale: s_statueScale, opacity: statueOpacity, rotateY: s_statueRotateY, rotateX: s_statueRotateX }}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: expo, delay: 0.4 }}
          >
            {/* Subtle orbital ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[70vw] md:w-[50vw] max-w-[700px] aspect-square rounded-full z-0 pointer-events-none"
              style={{
                borderWidth: isDark ? "1px" : "1.5px",
                borderStyle: "solid",
                borderColor: t.gold + (isDark ? "40" : "70"),
                rotate: s_orbitRotate,
                y: s_orbitY,
                opacity: orbitOpacity,
              }}
            >
              {/* Orbital accent dot (continuously revolving) */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full animate-[spin_80s_linear_infinite]"
                style={{ backgroundColor: t.gold }}
              />
            </motion.div>

            {/* Statue */}
            <div
              className={`absolute top-1/2 left-1/2 w-[52vw] sm:w-[35vw] md:w-[26vw] max-w-[390px] aspect-square`}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <Statue3D onLoaded={() => setIsModelLoaded(true)} isVisible={isHeroInView} />
            </div>

          </motion.div>

          {/* Watermark FRONT — ENGINEERING: entrance from below, then scroll-driven */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ y: "60%", opacity: 0 }}
            animate={isLoading ? { y: "60%", opacity: 0 } : { y: "0%", opacity: 1 }}
            transition={{ duration: 1.6, ease: expo, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
              style={{ y: s_heroEngineeringY, opacity: heroTextOpacity }}
            >
              <span
                className="font-sans font-light text-[8vw] md:text-[7.5vw] uppercase whitespace-nowrap leading-none translate-y-[12vh]"
                style={{ color: t.watermark, letterSpacing: "0.25em" }}
              >
                ENGINEERING
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom — Role identity strip */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-24 pb-10"
            style={{ opacity: metadataOpacity }}
          >
            {/* Accent separator line */}
            <div className="w-full mb-6 relative" style={{ height: "1px", backgroundColor: t.border }}>
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ backgroundColor: t.gold, width: "60px" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: expo, delay: 1.2 }}
              />
            </div>

            <div className="flex items-center justify-between gap-6">
              {/* Left: Role tags as pill chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {["Developer", "AI / ML", "Full Stack", "DSA"].map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: expo, delay: 1.4 + i * 0.1 }}
                    className="text-[9px] tracking-[0.28em] uppercase font-medium px-3 py-1.5 border"
                    style={{
                      color: t.gold,
                      borderColor: t.gold + (isDark ? "35" : "45"),
                      backgroundColor: t.goldGlow,
                    }}
                  >
                    {role}
                  </motion.span>
                ))}
              </div>

              {/* Right: Status badge */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: expo, delay: 1.8 }}
                className="inline-flex items-center gap-2.5 text-[9px] tracking-[0.3em] uppercase font-medium shrink-0"
                style={{ color: t.textMuted }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.gold, animation: "pulse 3s infinite" }} />
                Available for work
              </motion.span>
            </div>
          </motion.div>
        </section>



        {/* ── CASE STUDIES ──────────────────────────────────────────────────── */}
        <section
          className="py-32 md:py-48 relative border-t transition-colors duration-700"
          style={{ backgroundColor: isDark ? t.bg : "#faf9f6", borderColor: t.border }}
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '24px 24px', color: isDark ? '#fff' : '#000' }} />

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
            <Reveal>
              <div className="flex items-center justify-between pb-8 mb-16 border-b" style={{ borderColor: t.border }}>
                <span className="text-[12px] tracking-widest uppercase font-mono" style={{ color: t.textSub }}>
                  SELECTED WORK
                </span>
                <Link
                  href="/projects"
                  className="text-[11px] tracking-widest uppercase font-mono transition-colors duration-300 hover:opacity-80"
                  style={{ color: t.gold }}
                >
                  View Full Archive ↗
                </Link>
              </div>
            </Reveal>

            {PROJECTS.slice(0, 3).map((project, idx) => (
              <WorkCard
                key={project.id}
                index={idx}
                projectId={project.id}
                title={project.title}
                subtitle={project.subtitle || project.category}
                tags={project.tags}
                description={project.desc}
                src={project.img}
                alt={project.title}
                reverse={idx % 2 === 1}
                t={t}
                isDark={isDark}
              />
            ))}
          </div>
        </section>

        {/* ── MY EDGE ───────────────────────────────────────────────────────── */}
        <EdgeSection />

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer
          className="relative pt-32 md:pt-48 pb-12 overflow-hidden"
          style={{ backgroundColor: DARK.bg, transition: "background-color 0.7s ease" }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: DARK.footerImg }}>
            <Image src="/footer.png" alt="" fill className="object-cover object-center" />
          </div>
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${DARK.bg} 0%, transparent 30%, ${DARK.bg} 88%)` }}
          />

          <div ref={footerRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col mb-12">
            <Reveal variants={fadeIn}>
              <h2 className="text-[10px] tracking-[0.25em] uppercase font-medium mb-12" style={{ color: DARK.textMuted }}>
                CONNECT
              </h2>
            </Reveal>
            <motion.h2
              className="font-[var(--font-julius)] text-[12vw] tracking-wider uppercase leading-none select-none mb-24"
              style={{ color: DARK.watermark }}
              variants={stagger}
              initial="hidden"
              animate={footerInView ? "visible" : "hidden"}
            >
              <SplitText text="Connect." />
            </motion.h2>

            <motion.div
              className="mt-12 flex flex-col items-center text-center border-t pt-12"
              style={{ borderColor: DARK.border }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: expo, delay: 0.3 }}
            >
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium" style={{ color: DARK.textMuted }}>Get in touch</p>
                <a
                  href="mailto:subhamprojects99@gmail.com"
                  className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide transition-colors duration-700 block mt-6"
                  style={{ color: DARK.textSub }}
                  onMouseEnter={e => (e.currentTarget.style.color = DARK.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = DARK.textSub)}
                >
                  subhamprojects99@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          <div
            className="relative z-10 px-8 md:px-16 lg:px-24 pt-8 flex flex-col items-center justify-center gap-4"
            style={{ borderTop: `1px solid ${DARK.border}` }}
          >
            <span className="text-[9px] tracking-[0.3em] uppercase text-center" style={{ color: DARK.textMuted }}>
              Machine Learning & Software Engineering
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
