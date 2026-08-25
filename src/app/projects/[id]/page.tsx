"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { useTheme } from "@/hooks/useTheme";

export default function ProjectDetail() {
    const params = useParams();
    const router = useRouter();
    const { isDark } = useTheme();
    const [project, setProject] = useState(PROJECTS[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const id = parseInt(params.id as string);
        const found = PROJECTS.find(p => p.id === id);
        if (found) {
            setProject(found);
        } else {
            router.push("/projects");
        }
    }, [params.id, router]);

    if (!mounted) return null;

    const bg = isDark ? "#0a0a0a" : "#FCFBF9";
    const text = isDark ? "#fdfdfd" : "#111111";
    const muted = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 transition-colors duration-700" style={{ backgroundColor: bg, color: text }}>
            <motion.button 
                onClick={() => router.back()}
                className="mb-12 flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                ← Back to Archive
            </motion.button>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                <motion.div 
                    className="lg:col-span-6 flex flex-col justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <span className="text-sm font-medium tracking-[0.2em] uppercase mb-6 block" style={{ color: isDark ? "#C88A6E" : "#B8445A" }}>
                        {project.category}
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                        {project.title}
                    </h1>
                    <p className="text-lg md:text-xl font-light leading-relaxed mb-10" style={{ color: muted }}>
                        {project.desc}
                    </p>

                    <div className="h-px w-full mb-10" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />

                    <h3 className="font-sans text-xs tracking-[0.25em] uppercase mb-4 font-semibold text-neutral-400">Technical Overview</h3>
                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: muted }}>
                        {project.details}
                    </p>
                </motion.div>

                <motion.div 
                    className="lg:col-span-6 relative h-[65vh] lg:h-[80vh] w-full rounded-2xl overflow-hidden flex items-center justify-center border"
                    style={{
                        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                        backgroundColor: isDark ? "#06060c" : "#f0ede6"
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    {project.img && (
                        <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center">
                            <Image
                                src={project.img}
                                alt={project.title}
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    )}
                    {/* Noise Overlay */}
                    <div
                        className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}