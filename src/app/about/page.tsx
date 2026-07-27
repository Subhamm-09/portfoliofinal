"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ─── Easing ────────────────────────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Variants ──────────────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: expo } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const staggerSlow = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const lineGrow = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.9, ease: expo } },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}

// ─── Stat item ─────────────────────────────────────────────────────────────────
function Stat({ num, label }: { num: string; label: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            className="border-t border-black/10 pt-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
        >
            <motion.span
                className="block text-[clamp(3rem,8vw,7rem)] font-display leading-none tracking-tighter text-black"
                variants={fadeUp}
            >
                {num}
            </motion.span>
            <motion.span
                className="block text-xs font-bold uppercase tracking-[0.25em] text-black/40 mt-2"
                variants={fadeUp}
            >
                {label}
            </motion.span>
        </motion.div>
    );
}

// ─── Skill row ─────────────────────────────────────────────────────────────────
function SkillRow({
    title,
    items,
    delay,
}: {
    title: string;
    items: string[];
    delay: number;
}) {
    return (
        <Reveal delay={delay}>
            <div className="group border-t border-black/10 py-8 grid grid-cols-12 gap-6 items-start">
                {/* Title */}
                <h3 className="col-span-4 text-sm font-bold uppercase tracking-widest text-black">
                    {title}
                </h3>
                {/* Tags */}
                <div className="col-span-8 flex flex-wrap gap-3">
                    {items.map((item) => (
                        <motion.span
                            key={item}
                            className="text-sm font-medium text-black/50 transition-colors duration-200"
                            whileHover={{ color: "#C9A96E" }}
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
                {/* Animated underline */}
                <motion.div
                    className="col-span-12 h-[1px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: expo, delay }}
                />
            </div>
        </Reveal>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function About() {
    const heroRef = useRef<HTMLElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Mouse parallax for hero h1
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Hero scroll parallax
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
    const ellipseY = useTransform(heroScroll, [0, 1], ["0%", "15%"]);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            // Custom cursor
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
            }
            // Parallax deltas
            const x = (window.innerWidth / 2 - e.clientX) / 80;
            const y = (window.innerHeight / 2 - e.clientY) / 80;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    // Cursor expand for interactive elements
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;
        const addExpand = () => cursor.classList.add("scale-[2.5]");
        const removeExpand = () => cursor.classList.remove("scale-[2.5]");
        const els = document.querySelectorAll("span, h1, h2, h3, p, a, button");
        els.forEach((el) => {
            el.addEventListener("mouseenter", addExpand);
            el.addEventListener("mouseleave", removeExpand);
        });
        return () => {
            els.forEach((el) => {
                el.removeEventListener("mouseenter", addExpand);
                el.removeEventListener("mouseleave", removeExpand);
            });
        };
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700;900&display=swap');

        .about-root *,
        .about-root *::before,
        .about-root *::after {
          box-sizing: border-box;
        }

        .about-root {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          color: #000000;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .font-display {
          font-family: 'Bebas Neue', sans-serif;
        }

        .ellipse-gradient {
          background: radial-gradient(50% 50% at 50% 0%, #000000 0%, #ffffff 100%);
        }

        /* Custom cursor */
        #about-cursor {
          position: fixed;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #000;
          pointer-events: none;
          z-index: 99999;
          top: 0;
          left: 0;
          transition: transform 0.25s ease, scale 0.25s ease;
          mix-blend-mode: difference;
          display: none;
        }

        @media (min-width: 768px) {
          #about-cursor { display: block; }
        }
      `}</style>

            {/* Custom cursor */}
            <div id="about-cursor" ref={cursorRef} />

            <div className="about-root selection:bg-black selection:text-white">

                {/* ── HERO ──────────────────────────────────────────────────────────────── */}
                <section
                    ref={heroRef}
                    className="relative h-screen w-full overflow-hidden bg-white"
                >
                    {/* Fixed nav */}
                    <nav className="fixed top-0 left-0 w-full px-10 pt-10 flex justify-between items-start z-50 pointer-events-none">
                        <div className="flex flex-col gap-0">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black">
                                Located
                            </span>
                            <span className="text-sm font-black uppercase text-black">
                                Bhubaneswar, IN
                            </span>
                        </div>
                        <div className="pointer-events-auto">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black">
                                About
                            </span>
                        </div>
                    </nav>

                    {/* ── LAYER 1: Ellipse stage ring — gold border, no fill ────────────────── */}
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-[140vw] h-[80vh] rounded-[100%] z-10"
                        style={{
                            top: "62vh",
                            y: ellipseY,
                            border: "1.5px solid rgba(201,169,110,0.55)",
                            background: "transparent",
                        }}
                    />

                    {/* ── LAYER 2: "Developer" label ──────────────────────────────── */}
                    {/* Sits high and clear — 13vh from top, always readable */}
                    <motion.div
                        className="absolute top-[13vh] left-0 right-0 flex justify-center z-40 pointer-events-none"
                        style={{ opacity: heroOpacity }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <p className="text-sm font-bold tracking-[0.8em] uppercase text-black">
                            Software Engineer
                        </p>
                    </motion.div>

                    {/* ── LAYER 2b: Giant SUBHAM name ──────────────────────────────────────── */}
                    {/* Anchored 19vh from top — label sits cleanly above this */}
                    <motion.div
                        className="absolute top-[19vh] left-0 right-0 flex justify-center z-20 pointer-events-none"
                        style={{ y: heroTextY, opacity: heroOpacity }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    >
                        <h1
                            className="font-display text-[28vw] leading-[0.82] uppercase select-none tracking-tighter text-black"
                            style={{
                                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            Subham
                        </h1>
                    </motion.div>

                    {/* ── LAYER 3: Person photo ─────────────────────────────────────────────── */}
                    {/* Anchored to bottom — head falls at ~28vh, overlapping mid-name */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                        style={{ opacity: heroOpacity }}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/mee.png"
                            alt="Subham"
                            className="h-[72vh] w-auto object-contain object-bottom select-none block"
                            draggable={false}
                            style={{
                                /* Contrast + saturation lift — punches out of the white */
                                filter: [
                                    "contrast(1.08)",
                                    "saturate(1.1)",
                                    /* Deep natural shadow — grounds the figure on the stage */
                                    "drop-shadow(0px 32px 48px rgba(0,0,0,0.40))",
                                    "drop-shadow(0px 8px 16px rgba(0,0,0,0.25))",
                                    /* Warm champagne-gold rim light — ties into the colour theme */
                                    "drop-shadow(0px 0px 28px rgba(201,169,110,0.22))",
                                ].join(" "),
                            }}
                        />
                    </motion.div>
                </section>

                {/* ── INTRO TEXT ────────────────────────────────────────────────────────── */}
                <section className="bg-black text-white px-8 lg:px-24 py-32">
                    <motion.div
                        className="max-w-5xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerSlow}
                    >
                        <motion.p
                            className="text-xs font-bold tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-10"
                            variants={fadeUp}
                        >
                            System Architecture
                        </motion.p>
                        {[
                            "I am a Machine Learning Engineer and Software Developer based in Bhubaneswar, India — specializing in distributed systems and intelligence infrastructure.",
                            "I architect robust backend ecosystems and deploy scalable deep learning models. From highly concurrent API gateways to real-time tensor operations, I engineer solutions where performance is non-negotiable.",
                        ].map((line, i) => (
                            <motion.p
                                key={i}
                                className="text-[clamp(1.4rem,3.5vw,3rem)] font-bold leading-tight tracking-tighter text-white mb-6"
                                variants={fadeUp}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </motion.div>
                </section>

                {/* ── STATS ─────────────────────────────────────────────────────────────── */}
                <section className="bg-white text-black px-8 lg:px-24 py-32">
                    <Reveal className="mb-16">
                        <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#C9A96E]/70">
                            Telemetry
                        </p>
                    </Reveal>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <Stat num="3+" label="Years Engineering" />
                        <Stat num="15+" label="Pipelines Shipped" />
                        <Stat num="<10" label="ms Avg Latency" />
                        <Stat num="99.9" label="% Uptime SLA" />
                    </div>
                </section>

                {/* ── APPROACH / BIO MARQUEE ────────────────────────────────────────────── */}
                <section className="bg-black text-white overflow-hidden py-16 relative">
                    <div className="marquee-outer flex whitespace-nowrap">
                        {[0, 1].map((idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center gap-12 pr-12"
                                animate={{ x: [0, "-50%"] }}
                                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                                style={{ willChange: "transform" }}
                            >
                                {[
                                    "Distributed Systems",
                                    "Machine Learning",
                                    "MLOps & CI/CD",
                                    "Software Architecture",
                                    "Cloud Infrastructure",
                                    "Deep Learning",
                                    "Computer Vision",
                                    "High-Performance Computing",
                                ].map((label, i) => (
                                    <span
                                        key={i}
                                        className="font-display text-[5rem] uppercase text-white/8 tracking-widest"
                                    >
                                        {label}&nbsp;<span style={{ color: '#C9A96E', opacity: 0.4 }}>·</span>
                                    </span>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </section>



                {/* ── CTA / CONTACT ─────────────────────────────────────────────────────── */}
                <section className="relative bg-white text-black overflow-hidden flex flex-col items-center justify-center py-48 px-8">
                    {/* Background oversized letter */}
                    <span className="font-display absolute text-[38vw] text-black/5 select-none leading-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        Execute
                    </span>

                    <motion.div
                        className="relative z-10 flex flex-col items-center text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerSlow}
                    >
                        <motion.p
                            className="text-xs font-bold tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-10"
                            variants={fadeUp}
                        >
                            Initialize Sequence
                        </motion.p>

                        <div className="overflow-hidden mb-4">
                            <motion.h2
                                className="font-display text-[clamp(5rem,15vw,14rem)] leading-none uppercase text-black"
                                variants={fadeUp}
                            >
                                Engineer
                            </motion.h2>
                        </div>
                        <div className="overflow-hidden mb-16">
                            <motion.h2
                                className="font-display text-[clamp(5rem,15vw,14rem)] leading-none uppercase text-black"
                                variants={fadeUp}
                            >
                                The Future.
                            </motion.h2>
                        </div>

                        <motion.a
                            href="mailto:hello@subham.dev"
                            className="group relative inline-flex items-center gap-4 border border-[#C9A96E] bg-[#C9A96E] text-black px-10 py-5 text-sm font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-[#C9A96E] hover:border-black transition-colors duration-300"
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get in Touch
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </motion.a>
                    </motion.div>

                    {/* Ellipse floor echo */}
                    <div className="absolute bottom-[-30vh] left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] ellipse-gradient rounded-[100%] opacity-30 pointer-events-none" />
                </section>

            </div>
        </>
    );
}
