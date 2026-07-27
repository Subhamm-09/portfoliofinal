"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";

const projects = [
    {
        title: "Ethereal Aesthetic",
        description: "A showcase of minimalist design and high-end typography.",
        src: "https://img.recraft.ai/bn9Zl6Inpkv5ejFTLp-3mcKKy-MJacUOQZEb5-wXJ1A/raw:1/plain/abs://prod/images/48354a69-93c0-44d7-b59f-4e4c4c676cad"
    },
    {
        title: "Quantum Interface",
        description: "Exploring 3D interactions and WebGL rendering techniques.",
        src: "https://img.recraft.ai/VxdOXhfEd_Y0MnKgca4TFLrvv1UpT1B287bkQVNJdCY/raw:1/plain/abs://prod/images/48cbcfc1-3b79-4a84-b640-8f45941f158b"
    },
    {
        title: "Abstract Systems",
        description: "Fluid gradient designs and vibrant, holographic color schemes.",
        src: "https://img.recraft.ai/LmH0jGJ7v32_ZWJuEWe35DXkpQodMDBn8kvgt1wMNFU/raw:1/plain/abs://prod/images/b6aacb5c-977b-4df6-ad3c-2eb6e6934225"
    }
];

export default function StackedProjects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative w-full bg-[#0D0D0D] text-white">
            <div className="pt-24 pb-48">
                {projects.map((project, i) => {
                    const targetScale = 1 - (projects.length - i) * 0.05;
                    return (
                        <Card
                            key={i}
                            i={i}
                            {...project}
                            progress={scrollYProgress}
                            range={[i * (1 / projects.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}

const Card = ({ i, title, description, src, progress, range, targetScale }: any) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Container-level stacking scale / opacity (same as before)
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [1, 0.5]);

    // --- INNER PARALLAX ---
    // Each card gets its OWN scroll tracker so parallax is relative to that card's viewport entry
    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]   // Track from when card enters to when it leaves
    });

    // Image layer: moves upward SLOWLY (lags behind scroll → feels far away / deep)
    const imageY = useTransform(cardProgress, [0, 1], ["0%", "20%"]);

    // Title text: moves upward FAST (races ahead of scroll → feels close / floating)
    const titleY = useTransform(cardProgress, [0, 1], ["15%", "-20%"]);

    // Description text: medium speed (between image and title for 3 layers of depth)
    const descY = useTransform(cardProgress, [0, 1], ["10%", "-10%"]);

    // The 'Digital Artistry' Iridescent Glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div ref={cardRef} className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden">
            <motion.div
                style={{
                    scale,
                    opacity,
                    top: `calc(${i * 2}vh)`
                }}
                className="relative w-[90vw] md:w-[75vw] h-[80vh] bg-[#111] rounded-[24px] border border-white/10 overflow-hidden group shadow-[0_-10px_40px_rgba(0,0,0,0.5)] origin-top"
                onMouseMove={handleMouseMove}
            >
                {/* Iridescent Glow */}
                <motion.div
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(160,32,240,0.5), rgba(0,255,255,0.4), transparent 60%)`
                    }}
                />

                {/* Project Image Background — moves SLOWER than scroll (deepest layer) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                    <motion.img
                        src={src}
                        alt={title}
                        style={{ y: imageY }}
                        className="w-full h-[120%] object-cover opacity-80 -mt-[10%]"
                    />
                </div>

                {/* Content Layer — text layers move at DIFFERENT speeds for 3D depth */}
                <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 md:p-16 mb-8 md:mb-12">
                    {/* Title: fastest moving — appears closest to viewer */}
                    <motion.h2
                        style={{ y: titleY }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white tracking-tight leading-none mb-4 drop-shadow-2xl"
                    >
                        {title}
                    </motion.h2>

                    {/* Description: medium speed — floats at mid-depth */}
                    <motion.p
                        style={{ y: descY }}
                        className="text-white/80 font-light text-sm md:text-lg tracking-widest uppercase max-w-xl border-l-2 border-[#FF5F1F] pl-4"
                    >
                        {description}
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};
