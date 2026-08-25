"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GoldenTrail from "@/components/visuals/GoldenTrail";
import { useTheme } from "@/hooks/useTheme";
import SelectedExperience from "@/components/sections/SelectedExperience";
import ProjectsTriptych from "@/components/sections/ProjectsTriptych";

export default function UnifiedProjectsPage() {
    const { isDark } = useTheme();

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

            <div className="unified-projects">
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

                    {/* Footer Section Space */}
                    <section className="h-[60vh] md:h-[80vh] flex items-center justify-center relative z-10 border-t" style={{ borderColor: t.border }}>
                        <div className="text-center px-6">
                            <p className="font-serif text-3xl md:text-5xl lg:text-7xl mb-8 opacity-85">
                                Let&apos;s build something <br />
                                <span className="italic" style={{ color: "var(--gold)" }}>extraordinary.</span>
                            </p>
                            <Link
                                href="mailto:subhamprojects99@gmail.com"
                                className="text-sm uppercase tracking-[0.3em] transition-colors relative z-20 inline-block py-2"
                                style={{ color: "var(--white)" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "var(--white)"}
                            >
                                subhamprojects99@gmail.com
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}