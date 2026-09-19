"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";

const FEATURED_PROJECTS = [
    {
        ...PROJECTS[0],
        cardImg: "/Card_1.png",
        bgMode: "light"
    },
    {
        ...PROJECTS[1],
        cardImg: "/Card_2.png",
        bgMode: "dark"
    },
    {
        ...PROJECTS[2],
        cardImg: "/Card_3.png",
        bgMode: "light"
    }
];

function InteractiveCard({
    proj,
    isDark,
    accent,
    t
}: {
    proj: typeof FEATURED_PROJECTS[0];
    isDark: boolean;
    accent: string;
    t: any;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic mouse coordinates for 3D tilt & cursor spotlight
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Spring physics configuration
    const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // 3D Rotations
    const rotateX = useTransform(springY, [0, 1], [6, -6]);
    const rotateY = useTransform(springX, [0, 1], [-6, 6]);

    // Counter-parallax on image inside card frame
    const imgTranslateX = useTransform(springX, [0, 1], [10, -10]);
    const imgTranslateY = useTransform(springY, [0, 1], [10, -10]);

    // Title & badge depth translation
    const titleTranslateX = useTransform(springX, [0, 1], [-4, 4]);
    const titleTranslateY = useTransform(springY, [0, 1], [-4, 4]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const pxX = e.clientX - rect.left;
        const pxY = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${pxX}px`);
        cardRef.current.style.setProperty("--mouse-y", `${pxY}px`);

        const x = pxX / rect.width;
        const y = pxY / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
    }, [mouseX, mouseY]);

    return (
        <Link
            href={`/projects/${proj.id}`}
            className="group relative w-full max-w-[340px] block cursor-pointer perspective-[1200px]"
            data-cursor="project"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={{
                    y: isHovered ? -12 : 0,
                    scale: isHovered ? 1.015 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[290/660] rounded-2xl overflow-hidden border transition-shadow duration-500"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    borderColor: isHovered
                        ? (isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)")
                        : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"),
                    boxShadow: isHovered
                        ? (isDark
                            ? "0 30px 60px -15px rgba(0,0,0,0.85), 0 0 25px rgba(201,169,110,0.18)"
                            : "0 25px 50px -12px rgba(0,0,0,0.16), 0 0 25px rgba(184,68,90,0.12)")
                        : (isDark
                            ? "0 10px 30px rgba(0,0,0,0.5)"
                            : "0 10px 25px rgba(0,0,0,0.05)"),
                }}
            >
                {/* ── Layer 1: High-res Card Poster Graphic with Counter Parallax ── */}
                <motion.div
                    className="absolute -inset-4"
                    style={{
                        x: imgTranslateX,
                        y: imgTranslateY,
                    }}
                >
                    <Image
                        src={proj.cardImg}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                    />
                </motion.div>

                {/* ── Layer 2: Subtle Film Noise Texture Overlay ── */}
                <div
                    className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />

                {/* ── Layer 3: Interactive Specular Glare / Light Reflection ── */}
                <motion.div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 80%)`,
                        mixBlendMode: "overlay",
                    }}
                />

                {/* ── Layer 4: Luxury Editorial Typography (Top Floating Layer) ── */}
                <motion.div
                    className="absolute inset-x-0 top-0 p-5 sm:p-6 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-10 flex flex-col gap-1.5 pointer-events-none"
                    style={{
                        x: titleTranslateX,
                        y: titleTranslateY,
                        translateZ: "30px",
                    }}
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="w-3.5 h-[1px] transition-all duration-300 group-hover:w-6"
                            style={{ backgroundColor: accent }}
                        />
                        <span className="text-[9px] tracking-[0.28em] uppercase font-mono font-medium text-white/75">
                            {proj.category}
                        </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-white tracking-wide leading-tight drop-shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                        {proj.title}
                    </h3>
                </motion.div>

                {/* ── Layer 5: Minimalist "VIEW PROJECT →" Reveal Badge (Bottom) ── */}
                <div className="absolute inset-x-0 bottom-0 p-4 pt-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white z-20 pointer-events-none">
                    <motion.div
                        className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg transition-all duration-400"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 8,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[9.5px] tracking-[0.25em] uppercase font-mono font-semibold text-white/95">
                            VIEW PROJECT
                        </span>
                        <span
                            className="text-sm font-light transform transition-transform duration-300 group-hover:translate-x-1"
                            style={{ color: accent }}
                        >
                            →
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function ProjectsTriptych({ isDark, t }: { isDark: boolean; t: any }) {
    const accent = isDark ? "#C88A6E" : "#B8445A";

    return (
        <section className="py-24 md:py-36 relative transition-colors duration-700">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b"
                    style={{ borderColor: t.border }}
                >
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-8 h-[1px]" style={{ backgroundColor: accent }} />
                            <span className="text-[11px] tracking-[0.3em] uppercase font-mono" style={{ color: t.textSub }}>
                                Featured Works
                            </span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-light" style={{ color: t.text }}>
                            Selected Projects
                        </h2>
                    </div>
                </motion.div>

                {/* 3-Card Interactive 3D Triptych Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center justify-center max-w-6xl mx-auto">
                    {FEATURED_PROJECTS.map((proj, idx) => (
                        <motion.div
                            key={proj.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full flex justify-center"
                        >
                            <InteractiveCard
                                proj={proj}
                                isDark={isDark}
                                accent={accent}
                                t={t}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}