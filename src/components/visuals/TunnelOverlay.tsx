"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function TunnelOverlay() {

    // ── Cursor-reactive parallax ──────────────────────────────────────────────
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    // Smooth springs so the parallax feels physical, not snappy
    const springX = useSpring(rawX, { stiffness: 55, damping: 20, mass: 1 });
    const springY = useSpring(rawY, { stiffness: 55, damping: 20, mass: 1 });

    // Title layer — moves the most (closest perceived depth)
    const titleX = useTransform(springX, [-1, 1], [-14, 14]);
    const titleY = useTransform(springY, [-1, 1], [-8, 8]);

    // Meta layer — moves less (further away)
    const metaX = useTransform(springX, [-1, 1], [-5, 5]);
    const metaY = useTransform(springY, [-1, 1], [-3, 3]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        rawX.set(x);
        rawY.set(y);
    };

    return (
        <div
            className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none"
            onMouseMove={handleMouseMove}
            style={{ pointerEvents: "all" }}
        >

            {/* ── Radial vignette — dims the tunnel in the center for text legibility ── */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                }}
            />

            {/* ── Outer edge darkness — prevents corners from distracting ── */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.5) 100%)",
                }}
            />

            {/* ── Main content — cursor-parallax title layer ─────────────────────── */}
            <motion.div
                style={{ x: titleX, y: titleY }}
                className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full"
            >

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.05em" }}
                    animate={{ opacity: 1, letterSpacing: "0.42em" }}
                    transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
                    className="text-[9px] uppercase text-[#FF5F1F] mb-12 font-mono pointer-events-none select-none"
                >
                    Case Study
                </motion.div>

                {/* "Portfolio" — the undeniable focal point */}
                <div className="overflow-hidden mb-1">
                    <motion.h1
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif font-light text-white tracking-[-0.02em] leading-none select-none"
                        style={{
                            fontSize: "clamp(4.5rem, 13vw, 13rem)",
                            textShadow: "0 4px 60px rgba(0,0,0,0.6)",
                        }}
                    >
                        Portfolio
                    </motion.h1>
                </div>

                {/* "2025" — clearly secondary, italic, very muted */}
                <div className="overflow-hidden mb-16">
                    <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif italic font-light text-white/20 tracking-[-0.01em] leading-none select-none"
                        style={{ fontSize: "clamp(2rem, 5.5vw, 5.5rem)" }}
                    >
                        2025
                    </motion.div>
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 1.0, ease: "easeOut" }}
                    className="text-white/50 font-light text-[13px] md:text-sm max-w-[380px] leading-[1.75] tracking-wide mb-14 select-none"
                >
                    A cinematic digital presence built at the intersection of
                    design precision and engineering depth.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.25, ease: "easeOut" }}
                    className="flex items-center gap-4 mb-16 pointer-events-auto"
                >
                    {/* Primary CTA */}
                    <motion.button
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 0 28px rgba(255,95,31,0.45), 0 0 60px rgba(255,95,31,0.15)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="px-7 py-3 bg-[#FF5F1F] text-white text-[11px] uppercase tracking-[0.2em] rounded-full font-sans font-medium"
                        style={{ willChange: "transform" }}
                    >
                        View Case Study
                    </motion.button>

                    {/* Secondary CTA */}
                    <motion.button
                        whileHover={{
                            scale: 1.04,
                            borderColor: "rgba(255,255,255,0.4)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="px-7 py-3 border border-white/15 text-white/50 text-[11px] uppercase tracking-[0.2em] rounded-full font-sans font-light backdrop-blur-sm hover:text-white/80 transition-colors duration-300"
                        style={{ willChange: "transform" }}
                    >
                        All Projects
                    </motion.button>
                </motion.div>

            </motion.div>

            {/* ── Meta info — shallower parallax depth layer ─────────────────────── */}
            <motion.div
                style={{ x: metaX, y: metaY }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Tech stack */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                    className="flex flex-wrap items-center justify-center gap-5 md:gap-8 text-[9px] uppercase tracking-[0.28em] text-white/22 mb-6 select-none"
                >
                    {["Next.js", "Three.js", "Framer Motion", "TypeScript"].map((tech, i, arr) => (
                        <span key={tech} className="flex items-center gap-5 md:gap-8">
                            {tech}
                            {i < arr.length - 1 && (
                                <span className="text-[#FF5F1F]/30 ml-0">·</span>
                            )}
                        </span>
                    ))}
                </motion.div>

                {/* Role + Year */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.7 }}
                    className="flex items-center gap-5 text-[9px] uppercase tracking-[0.28em] text-white/18 select-none"
                >
                    <span>Designer &amp; Developer</span>
                    <span className="text-[#FF5F1F]/40">—</span>
                    <span>2025</span>
                </motion.div>
            </motion.div>

        </div>
    );
}
