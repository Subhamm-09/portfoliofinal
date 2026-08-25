"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";

const FEATURED_PROJECTS = [
    {
        ...PROJECTS[0],
        cardImg: "/project_card_1.png",
        bgMode: "light"
    },
    {
        ...PROJECTS[1],
        cardImg: "/project_card_2.png",
        bgMode: "dark"
    },
    {
        ...PROJECTS[2],
        cardImg: "/project_card_3.png",
        bgMode: "light"
    }
];

export default function ProjectsTriptych({ isDark, t }: { isDark: boolean; t: any }) {
    const accent = isDark ? "#C88A6E" : "#B8445A";

    return (
        <section className="py-24 md:py-36 relative transition-colors duration-700">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
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

                {/* 3-Card Triptych Grid */}
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
                            <Link
                                href={`/projects/${proj.id}`}
                                className="group relative w-full max-w-[340px] block transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                                data-cursor="project"
                            >
                                {/* Card Frame */}
                                <div
                                    className="relative w-full aspect-[290/660] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl border"
                                    style={{
                                        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                                        boxShadow: isDark
                                            ? "0 10px 30px rgba(0,0,0,0.6)"
                                            : "0 10px 30px rgba(0,0,0,0.06)"
                                    }}
                                >
                                    {/* High-res Card Poster Graphic */}
                                    <Image
                                        src={proj.cardImg}
                                        alt={proj.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                        priority
                                    />

                                    {/* Subtle Glass Noise Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                                        }}
                                    />

                                    {/* Interactive Hover Reveal Banner at bottom */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white z-20">
                                        <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-medium">
                                            Explore Project
                                        </span>
                                        <span className="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                            ↗
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}