"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SelectedExperience({ isDark, t }: { isDark: boolean; t: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(false);

  // Dynamic Theme Accents: Gold in Dark Mode, Pink in Light Mode
  const accent = isDark ? "#d4af7a" : "#B8445A";
  const accentLight = isDark ? "#ede2cf" : "#8c3344";
  const accentMuted = isDark ? "#a48f70" : "rgba(184,68,90,0.85)";
  const accentRgb = isDark ? "212, 175, 122" : "184, 68, 90";

  // ── Interactive 3D Tilt and Mouse Spotlight ──────────────────────────────
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let bounds: DOMRect | null = null;

    function onMouseEnter() {
      if (card) bounds = card.getBoundingClientRect();
      isHoveredRef.current = true;
    }

    function onMouseMove(e: MouseEvent) {
      if (!card) return;
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      card.style.setProperty("--mouse-x", `${mouseX}px`);
      card.style.setProperty("--mouse-y", `${mouseY}px`);

      const xPercent = mouseX / bounds.width - 0.5;
      const yPercent = mouseY / bounds.height - 0.5;
      const rotateX = -yPercent * 5;
      const rotateY = xPercent * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
    }

    function onMouseLeave() {
      if (!card) return;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      isHoveredRef.current = false;
    }

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // ── Enhanced Canvas Waveform Rhythm & Acoustic Spectrogram Motion ────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    window.addEventListener("resize", resize);
    resize();

    let offset = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.44;
      const totalBars = 160;
      const step = width / totalBars;

      if (!isHoveredRef.current) {
        offset += 0.018;
      }

      // Draw multiple layered audio frequencies with staggered acoustic breathing
      for (let i = 0; i < totalBars; i++) {
        const x = i * step;

        const distanceToCenter = 1 - Math.abs(i / totalBars - 0.35) * 1.8;
        const envelope = Math.max(0.08, distanceToCenter);

        const sin1 = Math.sin(i * 0.18 + offset * 1.6);
        const sin2 = Math.cos(i * 0.07 - offset * 0.9);
        const sin3 = Math.sin(i * 0.42 + offset * 2.3);
        const breathing = Math.sin(offset * 1.2 + i * 0.04) * 0.18;

        const barHeight = Math.abs(sin1 * 0.5 + sin2 * 0.35 + sin3 * 0.2 + breathing) * 175 * envelope;

        const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);

        if (i % 2 === 0) {
          gradient.addColorStop(0, "rgba(88, 196, 220, 0.0)");
          gradient.addColorStop(0.3, "rgba(125, 211, 252, 0.55)");
          gradient.addColorStop(0.5, isDark ? "rgba(237, 226, 207, 0.9)" : "rgba(184, 68, 90, 0.9)");
          gradient.addColorStop(0.7, "rgba(125, 211, 252, 0.45)");
          gradient.addColorStop(1, "rgba(88, 196, 220, 0.0)");
        } else {
          gradient.addColorStop(0, `rgba(${accentRgb}, 0.0)`);
          gradient.addColorStop(0.4, `rgba(${accentRgb}, 0.45)`);
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.75)");
          gradient.addColorStop(0.6, "rgba(73, 160, 181, 0.35)");
          gradient.addColorStop(1, "rgba(73, 160, 181, 0.0)");
        }

        ctx.fillStyle = gradient;
        const barWidth = Math.max(1, step * 0.65);
        ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
      }

      // Horizontal baseline horizon line
      const horizGrad = ctx.createLinearGradient(0, centerY, width, centerY);
      horizGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      horizGrad.addColorStop(0.2, "rgba(125, 211, 252, 0.25)");
      horizGrad.addColorStop(0.4, isDark ? "rgba(245, 230, 208, 0.65)" : "rgba(184, 68, 90, 0.65)");
      horizGrad.addColorStop(0.8, "rgba(56, 189, 248, 0.2)");
      horizGrad.addColorStop(1, "rgba(56, 189, 248, 0)");

      ctx.strokeStyle = horizGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, accentRgb]);

  return (
    <section
      aria-label="Selected Work - Coratia Technologies Showcase"
      className="py-24 md:py-36 relative border-t transition-colors duration-700 overflow-hidden"
      style={{ backgroundColor: isDark ? t.bg : "#faf9f6", borderColor: t.border }}
    >
      {/* Styles scoped for ocean stage & animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ocean-stage {
          background: radial-gradient(ellipse at 40% 30%, rgba(13, 52, 65, 0.48) 0%, rgba(6, 20, 28, 0.85) 60%, rgba(5, 8, 11, 0.98) 100%),
                      radial-gradient(circle at 75% 45%, rgba(10, 32, 45, 0.5) 0%, transparent 55%),
                      #070a0e;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.9), 0 20px 50px -15px rgba(0, 0, 0, 0.7);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        @keyframes causticDrift {
          0%, 100% { opacity: 0.35; transform: scale(1) translateY(0px) rotate(0deg); }
          50% { opacity: 0.55; transform: scale(1.04) translateY(-8px) rotate(0.8deg); }
        }

        .animate-caustics {
          animation: causticDrift 9s ease-in-out infinite alternate;
        }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 122, 0.55); }
          70% { box-shadow: 0 0 0 7px rgba(212, 175, 122, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 122, 0); }
        }

        .active-milestone-ring {
          animation: pulseRing 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes whaleSwim {
          0% {
            transform: translate(320px, 248px) scale(1.04) rotate(-1.5deg);
          }
          25% {
            transform: translate(370px, 230px) scale(1.06) rotate(0.8deg);
          }
          50% {
            transform: translate(410px, 240px) scale(1.05) rotate(1.8deg);
          }
          75% {
            transform: translate(360px, 255px) scale(1.04) rotate(-0.5deg);
          }
          100% {
            transform: translate(320px, 248px) scale(1.04) rotate(-1.5deg);
          }
        }

        @keyframes tailFinWave {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-3.5deg);
          }
        }

        @keyframes pectoralGlide {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(2.5deg);
          }
        }

        .whale-swimming {
          animation: whaleSwim 14s ease-in-out infinite;
          will-change: transform;
        }

        .whale-tail {
          transform-origin: 440px 105px;
          animation: tailFinWave 5s ease-in-out infinite;
        }

        .whale-fin {
          transform-origin: 120px 120px;
          animation: pectoralGlide 6s ease-in-out infinite;
        }

        .ocean-stage:hover .hud-scanner,
        .ocean-stage:hover .animate-caustics,
        .ocean-stage:hover .whale-swimming,
        .ocean-stage:hover .whale-tail,
        .ocean-stage:hover .whale-fin {
          animation-play-state: paused !important;
        }

        .interactive-spotlight {
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(73, 160, 181, 0.16) 0%, rgba(212, 175, 122, 0.05) 30%, transparent 65%);
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .hud-scanner,
          .animate-caustics,
          .active-milestone-ring,
          .whale-swimming,
          .whale-tail,
          .whale-fin {
            animation: none !important;
          }
          .ocean-stage {
            transition: none !important;
            transform: none !important;
          }
        }
      `,
        }}
      />

      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-24 relative">
        {/* Top Introduction Header */}
        <header className="mb-10 lg:mb-14 relative z-10" data-purpose="section-header">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-[1px]" style={{ backgroundColor: accent }} />
            <span className="text-[11px] tracking-[0.28em] font-medium uppercase" style={{ color: accent }}>
              Selected Work
            </span>
          </div>
          <div className="flex items-center justify-between">
            {/* Main Section Title */}
            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-serif font-normal tracking-tight cursor-default transition-colors duration-300"
                style={{ color: isDark ? "#ede2cf" : "#111111" }}
              >
                Internship <span className="italic font-light" style={{ color: accent }}>Work.</span>
              </h2>
            </div>
          </div>
        </header>

        {/* Showcase Container (Card + Project Spec + Vertical Pagination) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Visual Card */}
          <div className="lg:col-span-8 relative" id="card-wrapper">
            <div
              ref={cardRef}
              className="ocean-stage relative rounded-2xl border border-[#262c35] overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] p-6 sm:p-8 flex flex-col justify-between group hover:border-[#384353] hover:shadow-[0_25px_60px_-15px_rgba(4,18,28,0.9),0_0_30px_rgba(73,160,181,0.12)] cursor-crosshair"
              id="interactive-card"
            >
              {/* Hover Image Overlay: coratia.svg with 100% opacity */}
              <div className="absolute inset-0 z-[15] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-[#070a0e]/80 backdrop-blur-sm overflow-hidden">
                <div className="relative w-44 h-44 md:w-56 md:h-56 drop-shadow-[0_0_35px_rgba(17,169,232,0.3)]">
                  <Image
                    src="/coratia.svg"
                    alt="Coratia Technologies"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Interactive Dynamic Mouse Spotlight Overlay */}
              <div className="interactive-spotlight absolute inset-0 opacity-0 group-hover:opacity-100 z-10" />
              {/* Underwater Ambient Lighting & Sunrays */}
              <div className="animate-caustics absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_35%_0%,rgba(125,211,252,0.35)_0%,transparent_65%)]" />
              {/* Audio Waveform / Spectrogram Canvas Visual */}
              <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90 z-10"
                id="spectrogram-canvas"
              />
              {/* SVG Backdrop: Whale Silhouette & Underwater Reef Ambience */}
              <svg
                className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-85 z-0"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1000 700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="oceanRays" x1="20%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="whaleSkin" x1="0%" x2="100%" y1="0%" y2="80%">
                    <stop offset="0%" stopColor="#1b303d" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#0e1a22" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#070c10" stopOpacity="0.98" />
                  </linearGradient>
                  <filter id="softMist">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>
                {/* Shafts of deep ocean light */}
                <polygon className="transition-opacity duration-700 group-hover:opacity-75" fill="url(#oceanRays)" points="180,0 280,0 440,700 240,700" />
                <polygon className="transition-opacity duration-700 group-hover:opacity-60" fill="url(#oceanRays)" points="320,0 410,0 600,700 480,700" />
                <polygon fill="url(#oceanRays)" opacity="0.6" points="70,0 150,0 260,700 120,700" />
                {/* Whale Silhouette Floating in Deep Water */}
                <g className="whale-swimming transition-transform duration-700 ease-out">
                  {/* Body */}
                  <path d="M-10,35 C50,-15 160,-25 280,25 C340,50 400,90 460,110 C440,118 390,122 340,115 C290,108 230,112 170,128 C110,144 40,148 -15,108 C-45,86 -50,56 -10,35 Z" fill="url(#whaleSkin)" />
                  {/* Fluke (Tail) */}
                  <path className="whale-tail" d="M440,105 C480,115 520,130 550,150 C540,130 520,100 470,95 C515,85 540,65 555,48 C525,65 480,88 440,98 Z" fill="#0c161d" opacity="0.9" />
                  {/* Pectoral Fin */}
                  <path className="whale-fin" d="M120,120 C140,170 175,225 210,240 C195,220 175,170 160,125 Z" fill="#0d1b22" opacity="0.85" />
                  {/* Throat Grooves (Baleen details) */}
                  <path d="M0,58 Q80,78 160,88" fill="none" opacity="0.3" stroke="#334b57" strokeWidth="1.2" />
                  <path d="M-5,70 Q75,90 150,98" fill="none" opacity="0.3" stroke="#334b57" strokeWidth="1.2" />
                  <path d="M-10,82 Q70,102 140,108" fill="none" opacity="0.25" stroke="#334b57" strokeWidth="1.2" />
                </g>
                {/* Silhouette of Oceanic Seabed / Coral Crags */}
                <path d="M-20,530 Q40,490 80,510 T180,480 T260,540 T370,490 T520,560 T680,510 T840,570 T1020,490 L1020,720 L-20,720 Z" fill="#050a0e" />
                <path d="M-20,570 Q60,530 140,560 T310,540 T460,590 T640,540 T810,610 T1020,550 L1020,720 L-20,720 Z" fill="#030608" opacity="0.8" />
              </svg>
              {/* Top Status Bar within Card */}
              <div className="relative z-20 flex items-center justify-end font-mono text-[11px] tracking-widest text-[#a8b3c2]/80">
                <div className="flex items-center space-x-3">
                  <span
                    className="tracking-[0.25em] text-[10px] uppercase text-[#a8b3c2]/90 transition-colors duration-300"
                    style={{ color: undefined }}
                  >
                    SUMMER 2026
                  </span>
                  <span
                    className="w-6 h-[1px] transition-all duration-300"
                    style={{ backgroundColor: isDark ? "rgba(97,108,124,0.6)" : "rgba(184,68,90,0.6)" }}
                  />
                </div>
              </div>

              {/* Bottom Micro-Copy within Card */}
              <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between pt-16 gap-4">
                <div>
                  <div className="w-8 h-[1px] mb-2 group-hover:w-12 transition-all duration-300" style={{ backgroundColor: accent }} />
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-[#93a0b1] group-hover:text-[#c5d0de] transition-colors duration-300">
                    Underwater Acoustic Classification
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif italic text-sm text-[#ccd5df] tracking-wide transition-colors duration-300 group-hover:text-[#ede2cf]">
                    Different sounds.
                  </p>
                  <p className="font-serif italic text-xs text-[#8c97a5] tracking-wide transition-colors duration-300 group-hover:text-[#adb9c7]">
                    A deeper world.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Project Specs */}
          <div className="lg:col-span-4 flex flex-col justify-center relative pl-0 lg:pl-3" data-purpose="project-details">
            {/* Category Pill/Tag */}
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-2.5" style={{ color: accent }}>
              INTERNSHIP
            </span>
            {/* Employer / Title */}
            <h3
              className="text-4xl sm:text-5xl font-serif font-normal tracking-tight leading-[1.05] mb-4 transition-colors duration-300"
              style={{ color: isDark ? "#ede2cf" : "#111111" }}
            >
              Coratia
              <br />
              Technologies
            </h3>
            {/* Hairline Divider */}
            <div className="w-10 h-[1px] mb-5" style={{ backgroundColor: isDark ? "#685843" : "rgba(184,68,90,0.3)" }} />
            {/* Role Subheading */}
            <h4
              className="text-base sm:text-[17px] font-normal tracking-wide mb-4"
              style={{ color: isDark ? "#e3e7ee" : "#222222" }}
            >
              Applied Technology Intern
            </h4>
            {/* Description */}
            <p
              className="text-[12.5px] leading-[1.8] font-light mb-8"
              style={{ color: isDark ? "#8e97a4" : "rgba(0,0,0,0.65)" }}
            >
              Built an end-to-end machine learning pipeline for underwater acoustic classification, categorizing marine sound recordings into Biological, Vessel and Ambience classes using signal processing and traditional ML models.
            </p>
            {/* Tech Stack Tags with Interactive Elevation & Border */}
            <div className="mb-10">
              <span
                className="text-[10px] tracking-[0.25em] font-medium uppercase block mb-3.5"
                style={{ color: isDark ? "#7d8897" : "rgba(0,0,0,0.5)" }}
              >
                TECH STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {["Python", "Librosa", "Scikit-learn", "Pandas", "Matplotlib", "XGBoost", "Signal Processing"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-sans border hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                    style={{
                      backgroundColor: isDark ? "#14171d" : "#FAF9F5",
                      borderColor: isDark ? "#262c37" : "rgba(0,0,0,0.1)",
                      color: isDark ? "#bec6d2" : "#333333",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Action Button */}
            <div>
              <Link
                href="/projects/1"
                className="inline-flex items-center justify-between gap-6 px-7 py-3 rounded-full border group active:scale-95 transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: isDark ? "rgba(164,143,112,0.5)" : "rgba(184,68,90,0.5)",
                  backgroundColor: isDark ? "rgba(17,19,23,0.6)" : "rgba(255,255,255,0.8)",
                }}
              >
                <span className="text-sm font-serif font-medium tracking-wider" style={{ color: accent }}>
                  View Case Study
                </span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-base" style={{ color: accent }}>
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Meta Accents */}
        <div
          className="mt-14 pt-8 border-t flex items-center justify-end text-xs"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
          data-purpose="footer-meta-accents"
        >
          <p className="font-serif italic text-sm sm:text-base tracking-wide transition-colors cursor-default" style={{ color: accent }}>
            “From noise, we find knowledge.”
          </p>
        </div>
      </div>
    </section>
  );
}