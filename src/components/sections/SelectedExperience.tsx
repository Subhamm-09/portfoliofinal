"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCES } from "@/data/experience";
import { useState } from "react";

export default function SelectedExperience({ isDark, t }: { isDark: boolean; t: any }) {
    const accent = isDark ? "#C88A6E" : "#B8445A";
    const [activeIdx, setActiveIdx] = useState(0);
    const exp = EXPERIENCES[activeIdx];

    return (
        <section
            className="py-24 md:py-40 relative border-t transition-colors duration-700"
            style={{ backgroundColor: isDark ? t.bg : "#faf9f6", borderColor: t.border }}
        >
            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">

                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex items-center gap-4 mb-16"
                >
                    <div className="w-8 h-[1px]" style={{ backgroundColor: accent }} />
                    <span className="text-[11px] tracking-[0.3em] uppercase font-mono" style={{ color: t.textSub }}>
                        Selected Experience
                    </span>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    {/* LEFT: Full-bleed cinematic image card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="lg:col-span-7 relative rounded-2xl overflow-hidden"
                        style={{ minHeight: "520px" }}
                    >
                        {/* Image layer */}
                        <AnimatePresence mode="wait">
                            {exp?.img && (
                                <motion.img
                                    key={exp.img}
                                    src={exp.img}
                                    alt={exp.company}
                                    initial={{ opacity: 0, scale: 1.06 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{
                                        filter: isDark
                                            ? "grayscale(80%) contrast(130%) brightness(0.55)"
                                            : "grayscale(20%) contrast(115%) brightness(0.88) sepia(15%)"
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Film grain texture */}
                        <div
                            className="absolute inset-0 z-10 opacity-25 pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                            }}
                        />

                        {/* Top-left: Company + Period */}
                        <div className="absolute top-8 left-8 z-20">
                            <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-white/60 mb-2">Internship</p>
                            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">{exp?.company}</h2>
                        </div>

                        {/* Bottom: Description + Stack */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`desc-${activeIdx}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-10"
                            >
                                <p className="text-sm md:text-base font-light leading-relaxed text-white/85 max-w-xl" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
                                    {exp?.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* RIGHT: Minimal index list */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="lg:col-span-5 flex flex-col justify-between py-4 lg:py-6"
                    >
                        {/* Top meta block */}
                        <div>
                            <p className="text-[10px] tracking-[0.35em] uppercase font-mono mb-2" style={{ color: t.textSub }}>
                                Period
                            </p>
                            <p className="font-serif text-4xl md:text-5xl mb-8" style={{ color: accent }}>
                                {exp?.period}
                            </p>

                            <div className="h-[1px] w-full mb-8" style={{ backgroundColor: t.border }} />

                            <p className="text-[10px] tracking-[0.35em] uppercase font-mono mb-3" style={{ color: t.textSub }}>
                                Role
                            </p>
                            <p className="text-xl md:text-2xl font-light mb-4 leading-snug" style={{ color: t.text }}>
                                {exp?.role}
                            </p>
                            <p className="text-sm md:text-base font-light leading-relaxed mb-8" style={{ color: t.textSub }}>
                                Built an end-to-end ML pipeline classifying underwater sound recordings into Biological, Vessel and Ambience categories.
                            </p>

                            <div className="h-[1px] w-full mb-6" style={{ backgroundColor: t.border }} />

                            <p className="text-[10px] tracking-[0.35em] uppercase font-mono mb-4" style={{ color: t.textSub }}>
                                Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {exp?.stack?.map(tech => (
                                    <span
                                        key={tech}
                                        className="text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border"
                                        style={{ borderColor: t.border, color: t.textSub }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Bottom: Experience list nav (for multiple internships later) */}
                        <div className="flex flex-col gap-0">
                            <p className="text-[10px] tracking-[0.35em] uppercase font-mono mb-4" style={{ color: t.textSub }}>
                                Companies
                            </p>
                            {EXPERIENCES.map((e, idx) => (
                                <button
                                    key={e.id}
                                    onMouseEnter={() => setActiveIdx(idx)}
                                    onClick={() => setActiveIdx(idx)}
                                    className="group text-left py-5 border-t flex items-center justify-between transition-all duration-300"
                                    style={{ borderColor: t.border }}
                                >
                                    <span
                                        className="font-serif text-2xl md:text-3xl transition-all duration-300"
                                        style={{ color: activeIdx === idx ? t.text : t.textMuted }}
                                    >
                                        {e.company}
                                    </span>
                                    <motion.span
                                        animate={{ x: activeIdx === idx ? 0 : -8, opacity: activeIdx === idx ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-xl"
                                        style={{ color: accent }}
                                    >
                                        →
                                    </motion.span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}