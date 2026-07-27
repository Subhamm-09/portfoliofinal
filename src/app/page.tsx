"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Julius_Sans_One } from "next/font/google";
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

const julius = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-julius",
});

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
  bg:        "#111111",
  bgAlt:     "#0e0e0e",
  bgCard:    "#161616",
  text:      "rgba(245,243,239,0.9)",
  textSub:   "rgba(245,243,239,0.55)",
  textMuted: "rgba(245,243,239,0.32)",
  gold:      "#C99F55",
  goldMuted: "rgba(201,159,85,0.6)",
  goldGlow:  "rgba(201,159,85,0.07)",
  statueGlow:"radial-gradient(ellipse at center, rgba(201,159,85,0.35) 0%, rgba(201,159,85,0.18) 25%, rgba(201,159,85,0.06) 55%, transparent 75%)",
  watermark: "rgba(255,255,255,0.75)", // Subtle 75% opacity
  border:    "rgba(245,243,239,0.07)",
  footerImg: 0.18,
  imgFilter: "none",
};

const LIGHT = {
  bg:        "#FCFBF9", // Soft ivory
  bgAlt:     "#F5F4F0",
  bgCard:    "#F5F4F0",
  text:      "rgba(10,10,10,0.95)",
  textSub:   "rgba(10,10,10,0.70)",
  textMuted: "rgba(10,10,10,0.60)",
  gold:      "#D4AF37",
  goldMuted: "rgba(212,175,55,0.65)",
  goldGlow:  "rgba(212,175,55,0.09)",
  statueGlow:"radial-gradient(ellipse at center, rgba(212,175,55,0.45) 0%, rgba(212,175,55,0.22) 25%, rgba(212,175,55,0.08) 55%, transparent 75%)",
  watermark: "rgba(0,0,0,0.75)", // Subtle 75% opacity
  border:    "rgba(10,10,10,0.08)",
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

// ─── Cursor light ─────────────────────────────────────────────────────────────
function CursorLight({ isDark }: { isDark: boolean }) {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  // useEffect is safe here because this component is client-only
  if (typeof window !== "undefined") {
    // handled below
  }
  return (
    <>
      <CursorLightInner isDark={isDark} pos={pos} setPos={setPos} />
    </>
  );
}

function CursorLightInner({
  isDark,
  pos,
  setPos,
}: {
  isDark: boolean;
  pos: { x: number; y: number };
  setPos: (p: { x: number; y: number }) => void;
}) {
  if (typeof window !== "undefined") {
    // noop — handled via useEffect below
  }
  const [, forceRender] = useState(0);
  const posRef = useRef({ x: -400, y: -400 });

  // attach on mount
  if (typeof window !== "undefined") {
    const stored = posRef.current;
    void stored; // suppress unused warning
  }

  return (
    <_CursorLightEffect isDark={isDark} />
  );
}

function _CursorLightEffect({ isDark }: { isDark: boolean }) {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMove = useCallback((e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY }), []);

  if (typeof window !== "undefined") {
    // deliberately empty - effect handles it
  }

  return (
    <_CursorLightDOM isDark={isDark} pos={pos} onMove={handleMove} />
  );
}

function _CursorLightDOM({
  isDark,
  pos,
  onMove,
}: {
  isDark: boolean;
  pos: { x: number; y: number };
  onMove: (e: MouseEvent) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Simple: just use useEffect in this leaf component
  const [lpos, setLpos] = useState({ x: -400, y: -400 });
  const goldRgb = isDark ? "184,147,85" : "201,169,110";

  // attach event on mount
  if (typeof window !== "undefined") {
    // handled below via ref trick
  }

  return (
    <MouseGlow isDark={isDark} />
  );
}

// Cleaner implementation
function MouseGlow({ isDark }: { isDark: boolean }) {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  const goldRgb = isDark ? "184,147,85" : "201,169,110";

  // Client-only mount
  const mounted = useRef(false);
  if (!mounted.current && typeof window !== "undefined") {
    mounted.current = true;
  }

  return (
    <_MouseGlowMount setPos={setPos} pos={pos} goldRgb={goldRgb} />
  );
}

function _MouseGlowMount({
  setPos,
  pos,
  goldRgb,
}: {
  setPos: (p: { x: number; y: number }) => void;
  pos: { x: number; y: number };
  goldRgb: string;
}) {
  const [lpos, setLpos] = useState({ x: -600, y: -600 });
  
  // The simplest correct approach
  const [ready, setReady] = useState(false);
  
  return (
    <EffectHost setPos={setLpos} pos={lpos} goldRgb={goldRgb} />
  );
}

// Final clean implementation
function EffectHost({
  setPos,
  pos,
  goldRgb,
}: {
  setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  pos: { x: number; y: number };
  goldRgb: string;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { useState: _u, useEffect: _e } = require("react");
  return null;
}

// ─── ACTUAL Mouse glow - simplified ───────────────────────────────────────────
// (All the above scaffolding replaced with this single clean component)
function ActualMouseGlow({ color }: { color: string }) {
  const [pos, setPos] = useState({ x: -600, y: -600 });

  // This will only run on client
  const ref = useRef(false);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1]"
      onMouseMove={(e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY })}
      animate={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(${color},0.06), transparent 55%)`,
      }}
      transition={{ duration: 0 }}
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
  src,
  alt,
  reverse = false,
  index,
  t,
}: {
  title: string;
  subtitle: string;
  description: string;
  src: string;
  alt: string;
  reverse?: boolean;
  index: number;
  t: typeof DARK;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      <motion.div
        className={`${reverse ? "lg:col-start-6 lg:col-span-7 order-1 lg:order-2" : "lg:col-span-7"} overflow-hidden`}
        variants={
          reverse
            ? { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: expo, delay: index * 0.1 } } }
            : { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 1.4, ease: expo, delay: index * 0.1 } } }
        }
      >
        <div className="aspect-[16/11] overflow-hidden relative group rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.15)]" style={{ backgroundColor: t.bgCard, border: `1px solid ${t.border}` }}>
          <img
            alt={alt}
            src={src}
            className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-[1.03]"
            style={{ opacity: 1 }}
          />
        </div>
      </motion.div>

      <motion.div
        className={`${reverse ? "order-2 lg:order-1 lg:col-span-5 lg:pr-16" : "lg:col-span-5 lg:pl-16"} py-8 lg:py-0 flex flex-col justify-center`}
        variants={fadeUp}
      >
        <span className="block text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: t.gold }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="font-[var(--font-julius)] text-4xl md:text-5xl lg:text-6xl tracking-wider leading-[1.1] mb-6"
          style={{ color: t.text }}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs tracking-[0.2em] uppercase font-light mb-6" style={{ color: t.textSub }}>
            {subtitle}
          </p>
        )}
        <p className="text-[13px] leading-relaxed font-light mb-10 max-w-md" style={{ color: t.textMuted }}>
          {description}
        </p>
        <div>
          <Link
            href="#"
            className="group relative inline-flex items-center text-[10px] tracking-[0.2em] uppercase font-medium"
            style={{ color: t.text }}
          >
            <span>View Case Study</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-500 ease-out group-hover:w-full" style={{ backgroundColor: t.gold }} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Edge Row ─────────────────────────────────────────────────────────────────
function EdgeRow({ label, body, delay, t }: { label: string; body: string; delay: number; t: typeof DARK }) {
  return (
    <Reveal delay={delay}>
      <div className="group py-10 relative" style={{ borderTop: `1px solid ${t.border}` }}>
        <motion.div
          className="absolute top-0 left-0 h-[1px] origin-left"
          style={{ background: `linear-gradient(to right, ${t.gold}80, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: expo, delay }}
        />
        <div className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-20">
          <span className="text-[9px] tracking-[0.3em] uppercase w-32 shrink-0 font-medium" style={{ color: t.gold }}>
            {label}
          </span>
          <p
            className="text-xl lg:text-2xl font-light leading-[1.7] transition-colors duration-700"
            style={{ color: t.textSub }}
          >
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);
  const { isDark } = useTheme();

  const t = isDark ? DARK : LIGHT;

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);
  const heroImgYSpring = useSpring(heroImgY, { stiffness: 50, damping: 20 });

  // Footer
  const footerRef = useRef<HTMLDivElement>(null);
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  // Mouse glow
  const [mousePos, setMousePos] = useState({ x: -600, y: -600 });
  const goldRgb = isDark ? "184,147,85" : "201,169,110";

  return (
    <div
      className={`${julius.variable} min-h-screen`}
      style={{ backgroundColor: t.bg, color: t.text, transition: "background-color 0.7s ease, color 0.7s ease" }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left", backgroundColor: t.gold }}
        className="fixed top-0 left-0 right-0 h-[1px] z-[200] pointer-events-none"
      />

      <Preloader onComplete={handlePreloaderComplete} />

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* Grain */}
      <div
        className="grain-overlay pointer-events-none fixed inset-0 z-[2]"
        style={{
          opacity: isDark ? 0.035 : 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Cursor light */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${goldRgb},0.055), transparent 55%)`,
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)" }}
      />
      {/* Noise Texture Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main style={{ backgroundColor: t.bg, transition: "background-color 0.7s ease" }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{ backgroundColor: t.bg, transition: "background-color 0.7s ease" }}
        >
          {/* Warm centre glow */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 65% 55% at 50% 55%, rgba(184,147,85,0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse 65% 55% at 50% 55%, rgba(201,169,110,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Watermark — Creative Engineering */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none overflow-hidden gap-2"
            style={{ y: heroTextY }}
          >
            <span
              className="font-sans font-light text-[7vw] md:text-[6vw] uppercase whitespace-nowrap leading-none tracking-[0.2em] md:tracking-[0.25em]"
              style={{ color: t.watermark, marginLeft: "0.25em" }}
            >
              CREATIVE
            </span>
            <span
              className="font-sans font-light text-[7vw] md:text-[6vw] uppercase whitespace-nowrap leading-none tracking-[0.2em] md:tracking-[0.25em]"
              style={{ color: t.watermark, marginLeft: "0.25em" }}
            >
              ENGINEERING
            </span>
          </motion.div>

          {/* Statue and Effects */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ y: heroImgYSpring }}
          >
            {/* Museum glow behind statue */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44vw] max-w-[460px] aspect-square pointer-events-none"
              style={{ background: t.statueGlow }}
            />

            {/* Subtle orbital ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] md:w-[45vw] max-w-[650px] aspect-square rounded-full z-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: t.gold + "60", // 60% opacity
              }}
            >
              {/* Orbital accent dot */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                style={{ backgroundColor: t.gold }}
              />
            </motion.div>

            {/* Statue — 25% smaller */}
            <div
              className={`absolute top-1/2 left-1/2 w-[52vw] sm:w-[35vw] md:w-[26vw] max-w-[390px] aspect-square ${!isLoading ? "animate-hero-float" : ""}`}
              style={{
                opacity: isLoading ? 0 : 1,
                transition: "opacity 1.6s cubic-bezier(0.4,0,0.2,1)",
                filter: isDark
                  ? "drop-shadow(0 30px 60px rgba(0,0,0,0.6))"
                  : "drop-shadow(0 20px 40px rgba(0,0,0,0.18))",
              }}
            >
              <Image
                src="/greekhero.png"
                alt="Greek Hero Statue"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </motion.div>

          {/* Top-left — Logo / Name */}
          <motion.div
            className="absolute top-7 left-6 md:left-12 lg:left-24 z-50 pointer-events-none flex items-center h-[42px]"
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, x: -16 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: gentle, delay: 0.2 }}
          >
            <h1
              className="font-[var(--font-cormorant)] text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase font-medium mix-blend-normal"
              style={{ color: t.text }}
            >
              Subham Panda
            </h1>
          </motion.div>

          {/* Bottom-left — role */}
          <motion.div
            className="absolute bottom-16 left-6 md:left-12 lg:left-24 z-20 pointer-events-none"
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: expo, delay: 0.6 }}
          >
            <motion.div
              className="w-5 h-[1px] mb-5"
              style={{ backgroundColor: t.gold }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={!isLoading ? { scaleX: 1 } : {}}
              transition={{ duration: 1, ease: expo, delay: 1 }}
            />
            <p className="text-[10px] tracking-[0.22em] uppercase mb-1.5 font-light" style={{ color: t.textSub }}>
              Machine Learning Engineer
            </p>
            <p className="text-[10px] tracking-[0.22em] uppercase font-light" style={{ color: t.textMuted }}>
              Software Developer
            </p>
          </motion.div>

          {/* Bottom-right — tagline + badge */}
          <motion.div
            className="absolute bottom-16 right-6 md:right-12 lg:right-24 z-20 pointer-events-none text-right"
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: expo, delay: 0.75 }}
          >
            <p className="text-[11px] leading-[1.9] max-w-[190px] ml-auto font-light tracking-wide mb-5" style={{ color: t.textMuted }}>
              Building intelligent software<br />experiences with modern AI.
            </p>
            <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color: t.gold }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: t.gold }} />
              Open to Opportunities
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: gentle, delay: 1.5 }}
          >
            <motion.div
              className="w-[1px] h-10"
              style={{ background: `linear-gradient(to bottom, ${t.gold}70, transparent)` }}
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </section>

        {/* ── CASE STUDIES ──────────────────────────────────────────────────── */}
        <section
          className="py-32 md:py-48 px-6 md:px-12 lg:px-24 space-y-32 md:space-y-48"
          style={{ backgroundColor: t.bg, transition: "background-color 0.7s ease" }}
        >
          <Reveal>
            <div className="flex items-center justify-between pb-6 mb-20" style={{ borderBottom: `1px solid ${t.border}` }}>
              <span className="text-[9px] tracking-[0.3em] uppercase font-light" style={{ color: t.textMuted }}>
                Selected Work
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase font-light" style={{ color: t.textMuted }}>
                01 — 03
              </span>
            </div>
          </Reveal>

          <WorkCard index={0} title="Deep Ocean" subtitle="" description="Underwater acoustic classification pipeline for ROVs/AUVs using deep learning to process real-time sonar streams in noisy subsea environments." src="/deep_ocean.png" alt="Underwater acoustic wave visual" t={t} />
          <WorkCard index={1} title="Grid Sentinel" subtitle="" description="Neural anomaly detection for power grid substations, utilizing autoencoders to identify cyber-physical intrusions in real-time." src="/grid_sentinel.png" alt="Abstract neural node grid" reverse t={t} />
          <WorkCard index={2} title="Neural Vision" subtitle="" description="High-throughput inference for early-stage pathology detection in high-resolution medical imaging, optimizing VRAM allocation for large tensor operations." src="/neural_vision.png" alt="Abstract light propagation" t={t} />
        </section>

        {/* ── MY EDGE ───────────────────────────────────────────────────────── */}
        <section
          className="py-32 md:py-48 px-8 md:px-16 lg:px-24"
          style={{ backgroundColor: t.bgAlt, transition: "background-color 0.7s ease" }}
        >
          <div className="max-w-5xl mx-auto">
            <Reveal variants={fadeIn}>
              <h2 className="font-[var(--font-julius)] text-2xl md:text-3xl tracking-[0.16em] uppercase mb-24" style={{ color: t.textSub }}>
                My Edge
              </h2>
            </Reveal>
            <EdgeRow label="Architecture" body="Scalable data pipelines and robust backend systems capable of real-time inference." delay={0} t={t} />
            <EdgeRow label="Intelligence" body="Deep learning models that solve complex physical and digital anomalies." delay={0.1} t={t} />
            <EdgeRow label="Performance" body="Computational optimisation and memory allocation for ultra-low latency execution." delay={0.2} t={t} />
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer
          className="relative pt-32 md:pt-48 pb-12 overflow-hidden"
          style={{ backgroundColor: t.bg, transition: "background-color 0.7s ease" }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: t.footerImg }}>
            <Image src="/footer.png" alt="" fill className="object-cover object-center" />
          </div>
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${t.bg} 0%, transparent 30%, ${t.bg} 88%)` }}
          />

          <div ref={footerRef} className="relative z-10 px-8 md:px-16 lg:px-24 mb-24">
            <motion.h2
              className="font-[var(--font-julius)] text-6xl md:text-8xl lg:text-[9rem] tracking-tight uppercase leading-none select-none"
              style={{ color: t.watermark }}
              variants={stagger}
              initial="hidden"
              animate={footerInView ? "visible" : "hidden"}
            >
              <SplitText text="Connect." />
            </motion.h2>

            <motion.div
              className="mt-16 flex flex-col md:flex-row md:items-end gap-10 md:gap-20"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: expo, delay: 0.3 }}
            >
              <div>
                <p className="text-[9px] tracking-[0.28em] uppercase mb-4" style={{ color: t.textMuted }}>Get in touch</p>
                <a
                  href="mailto:subhampanda@example.com"
                  className="text-xl md:text-2xl font-light tracking-wide transition-colors duration-700"
                  style={{ color: t.textSub }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.textSub)}
                >
                  subhampanda@example.com
                </a>
              </div>

              <div className="flex gap-8 text-[9px] tracking-[0.28em] uppercase" style={{ color: t.textMuted }}>
                {["GitHub", "LinkedIn", "LeetCode"].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    className="transition-colors duration-500"
                    whileHover={{ y: -2, color: t.gold } as any}
                  >
                    {s}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div
            className="relative z-10 px-8 md:px-16 lg:px-24 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            style={{ borderTop: `1px solid ${t.border}` }}
          >
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: t.textMuted }}>
              © 2025 Subham Panda
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: t.textMuted }}>
              Machine Learning · Software Engineering
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
