"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Julius_Sans_One } from "next/font/google";
import GoldenTrail from "@/components/visuals/GoldenTrail";
import { useTheme } from "@/hooks/useTheme";
import SelectedExperience from "@/components/sections/SelectedExperience";
import ProjectsTriptych from "@/components/sections/ProjectsTriptych";

const julius = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-julius",
});

// ─── Easing & Motion Variants ────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const gentle: [number, number, number, number] = [0.4, 0, 0.2, 1];

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

const letterVariant: Variants = {
  hidden: { opacity: 0, y: "110%", skewY: 5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.85, ease: expo } },
};

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

const DARK_FOOTER = {
  bg:        "#10100F",
  text:      "#E7E2D8",
  textSub:   "#8D8A82",
  textMuted: "rgba(231,226,216,0.32)",
  gold:      "#C9A34A",
  watermark: "rgba(201,163,74,0.75)",
  border:    "rgba(231,226,216,0.07)",
  footerImg: 0.18,
};

export default function UnifiedProjectsPage() {
    const { isDark } = useTheme();
    const footerRef = useRef<HTMLDivElement>(null);
    const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

    const t = isDark 
      ? { bg: "#080808", text: "#fdfdfd", gold: "#C9A96E", border: "rgba(255,255,255,0.1)", textSub: "#8a8a8a", textMuted: "#4a4a4a" }
      : { bg: "#FCFBF9", text: "rgba(10,10,10,0.95)", gold: "#B8445A", border: "rgba(0,0,0,0.1)", textSub: "rgba(0,0,0,0.6)", textMuted: "rgba(0,0,0,0.4)" };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

        .unified-projects {
          --black: ${t.bg};
          --white: ${t.text};
          --gold: ${t.gold};
          --font-serif: 'Cormorant Garamond', serif;
          --font-sans: 'Inter', sans-serif;
          background-color: var(--black);
          color: var(--white);
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          transition: background-color 0.7s ease, color 0.7s ease;
        }

        .hero-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(4rem, 10vw, 10rem);
          line-height: 0.9;
          font-weight: 300;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .hero-subtitle {
          margin-top: 2rem;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: var(--gold);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          opacity: 0.5;
        }
        
        .scroll-indicator span {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          writing-mode: vertical-rl;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--white), transparent);
          animation: drop 2s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>

            <div className={`${julius.variable} unified-projects`}>
                <main>
                    {/* Intro Section */}
                    <section className="hero-section">
                        <GoldenTrail />
                        <motion.h1 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-title relative z-10 pointer-events-none"
                        >
                            The<br />Archive
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="hero-subtitle relative z-10 pointer-events-none"
                        >
                            Machine Learning &times; Architecture
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="scroll-indicator"
                        >
                            <span>Scroll</span>
                            <div className="scroll-line" />
                        </motion.div>
                    </section>

                    {/* Internship / Selected Experience */}
                    <div className="w-full relative z-20 bg-transparent pt-12">
                        <SelectedExperience isDark={isDark} t={t} />
                    </div>

                    {/* 3-Project Triptych Showcase */}
                    <div className="w-full relative z-20 bg-transparent">
                        <ProjectsTriptych isDark={isDark} t={t} />
                    </div>

                    {/* ── FOOTER (Identical to Landing Page) ────────────────────────── */}
                    <footer
                      className="relative pt-32 md:pt-48 pb-12 overflow-hidden"
                      style={{ backgroundColor: DARK_FOOTER.bg, transition: "background-color 0.7s ease" }}
                    >
                      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: DARK_FOOTER.footerImg }}>
                        <Image src="/footer.png" alt="" fill className="object-cover object-center" />
                      </div>
                      <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{ background: `linear-gradient(to bottom, ${DARK_FOOTER.bg} 0%, transparent 30%, ${DARK_FOOTER.bg} 88%)` }}
                      />

                      <div ref={footerRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col mb-12">
                        <Reveal variants={fadeIn}>
                          <h2 className="text-[10px] tracking-[0.25em] uppercase font-medium mb-12" style={{ color: DARK_FOOTER.textMuted }}>
                            CONNECT
                          </h2>
                        </Reveal>
                        <motion.h2
                          className="font-[var(--font-julius)] text-[12vw] tracking-wider uppercase leading-none select-none mb-24"
                          style={{ color: DARK_FOOTER.watermark }}
                          variants={stagger}
                          initial="hidden"
                          animate={footerInView ? "visible" : "hidden"}
                        >
                          <SplitText text="Connect." />
                        </motion.h2>

                        <motion.div
                          className="mt-12 flex flex-col items-center text-center border-t pt-12"
                          style={{ borderColor: DARK_FOOTER.border }}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: expo, delay: 0.3 }}
                        >
                          <div>
                            <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium" style={{ color: DARK_FOOTER.textMuted }}>Get in touch</p>
                            <a
                              href="mailto:subhamprojects99@gmail.com"
                              className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide transition-colors duration-700 block mt-6"
                              style={{ color: DARK_FOOTER.textSub }}
                              onMouseEnter={e => (e.currentTarget.style.color = DARK_FOOTER.gold)}
                              onMouseLeave={e => (e.currentTarget.style.color = DARK_FOOTER.textSub)}
                            >
                              subhamprojects99@gmail.com
                            </a>
                          </div>
                        </motion.div>
                      </div>

                      <div
                        className="relative z-10 px-8 md:px-16 lg:px-24 pt-8 flex flex-col items-center justify-center gap-4"
                        style={{ borderTop: `1px solid ${DARK_FOOTER.border}` }}
                      >
                        <span className="text-[9px] tracking-[0.3em] uppercase text-center" style={{ color: DARK_FOOTER.textMuted }}>
                          Machine Learning & Software Engineering
                        </span>
                      </div>
                    </footer>
                </main>
            </div>
        </>
    );
}