"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function Contact() {
    const containerVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const lineVariants: import("framer-motion").Variants = {
        hidden: { width: "0%" },
        visible: {
            width: "100%",
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    // Performance Mask states (60fps DOM injection, no React re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const maskRadius = useSpring(0, { stiffness: 400, damping: 35, mass: 0.8 });
    const clipPath = useMotionTemplate`circle(${maskRadius}px at ${mouseX}px ${mouseY}px)`;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="relative w-full" data-cursor-hide="true">
            {/* --- BASE LAYER --- */}
            <section id="contact" className="w-full bg-base relative z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* CRITICAL MASTHEAD SPACER */}
                    <div className="h-[35vh] md:h-[45vh] w-full pointer-events-none"></div>

                    {/* Structural Break line drawn in on scroll */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={lineVariants}
                        className="h-[1px] bg-[#FF5F1F]/20"
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="py-24 md:py-32 flex flex-col items-start"
                    >

                        <motion.div variants={itemVariants} className="text-[10px] md:text-xs font-sans font-light uppercase tracking-[0.3em] text-secondary mb-12">
                            Let&apos;s Connect
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tighter text-primary mb-12">
                            <span className="font-serif font-medium capitalize block mb-2">Start a</span>
                            <span className="font-serif italic capitalize block text-secondary">Dialogue.</span>
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-secondary font-sans font-light max-w-[600px] leading-relaxed tracking-wide mb-32">
                            Open for freelance opportunities and collaborations. Whether you have a specific project in mind or just want to discuss the future of digital product design, I&apos;m ready to listen.
                        </motion.p>

                        <motion.div variants={itemVariants} className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-16 border-t-[0.5px] border-[#FF5F1F]/20">

                            <div className="flex flex-col space-y-6">
                                <span className="text-[10px] md:text-xs font-sans uppercase font-light tracking-[0.2em] text-primary/40 mb-2">Socials</span>
                                <a
                                    href="#"
                                    onMouseEnter={() => maskRadius.set(48)}
                                    onMouseLeave={() => maskRadius.set(0)}
                                    className="group relative w-fit text-primary font-sans text-lg md:text-xl font-light tracking-wide overflow-hidden hover:translate-x-1 transition-transform duration-[400ms] ease-out"
                                >
                                    LinkedIn
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5F1F] -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out shadow-[0_0_8px_rgba(255,95,31,0.8)]"></span>
                                </a>
                                <a
                                    href="#"
                                    onMouseEnter={() => maskRadius.set(48)}
                                    onMouseLeave={() => maskRadius.set(0)}
                                    className="group relative w-fit text-primary font-sans text-lg md:text-xl font-light tracking-wide overflow-hidden hover:translate-x-1 transition-transform duration-[400ms] ease-out"
                                >
                                    GitHub
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5F1F] -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out shadow-[0_0_8px_rgba(255,95,31,0.8)]"></span>
                                </a>
                                <a
                                    href="#"
                                    onMouseEnter={() => maskRadius.set(48)}
                                    onMouseLeave={() => maskRadius.set(0)}
                                    className="group relative w-fit text-primary font-sans text-lg md:text-xl font-light tracking-wide overflow-hidden hover:translate-x-1 transition-transform duration-[400ms] ease-out"
                                >
                                    Twitter/X
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5F1F] -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out shadow-[0_0_8px_rgba(255,95,31,0.8)]"></span>
                                </a>
                            </div>

                            <div className="flex flex-col space-y-6">
                                <span className="text-[10px] md:text-xs font-sans uppercase font-light tracking-[0.2em] text-primary/40 mb-2">Contact</span>
                                <a
                                    href="mailto:hello@example.com"
                                    onMouseEnter={() => maskRadius.set(48)}
                                    onMouseLeave={() => maskRadius.set(0)}
                                    className="group relative w-fit text-primary font-sans text-lg md:text-xl font-light tracking-wide overflow-hidden hover:translate-x-1 transition-transform duration-[400ms] ease-out"
                                >
                                    hello@example.com
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5F1F] -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out shadow-[0_0_8px_rgba(255,95,31,0.8)]"></span>
                                </a>
                                <a
                                    href="tel:+910000000000"
                                    onMouseEnter={() => maskRadius.set(48)}
                                    onMouseLeave={() => maskRadius.set(0)}
                                    className="group relative w-fit text-secondary hover:text-primary transition-colors duration-[400ms] font-sans text-lg md:text-xl font-light tracking-wide hover:translate-x-1 transition-transform duration-[400ms] ease-out"
                                >
                                    +91 xxx xxx xxxx
                                </a>
                            </div>

                            <div className="flex flex-col space-y-6">
                                <span className="text-[10px] md:text-xs font-sans uppercase font-light tracking-[0.2em] text-primary/40 mb-2">Location</span>
                                <span className="text-primary font-sans text-lg md:text-xl font-light tracking-wide">
                                    Bhubaneswar
                                </span>
                                <span className="text-secondary font-sans text-lg md:text-xl font-light tracking-wide">
                                    India
                                </span>
                            </div>

                        </motion.div>

                        <motion.div variants={itemVariants} className="w-full flex justify-between items-center pt-24 pb-8 text-xs font-sans text-secondary tracking-wide">
                            <span>© {new Date().getFullYear()} Subham.</span>
                            <span>All Rights Reserved.</span>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* --- MASK REVEAL LAYER (z-[9990]) --- */}
            {/* This layer sits perfectly over the entire layout geometry but is physically clipped to the 60fps cursor coordinates */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[9990]"
                style={{ clipPath }}
            >
                {/* Solid Contact Background override (orange instead of parchment base) */}
                <div className="absolute inset-0 bg-[#FF5F1F]" />

                {/* Duplicated DOM structure completely synchronized to the base layout positions, but rendering inverse styles */}
                <section className="w-full h-full relative overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        {/* We use the identical spacer logic so the scroll coordinates line up exactly */}
                        <div className="h-[35vh] md:h-[45vh] w-full pointer-events-none"></div>

                        {/* Note we render the layout statically here since Framer has already fired on the base layer.
                            The mask is ONLY revealing a snapshot of the final structural outcome. */}
                        <div className="h-[1px] bg-[#EBE7E0]/40 w-full" />

                        <div className="py-24 md:py-32 flex flex-col items-start">
                            <div className="text-[10px] md:text-xs font-sans font-light uppercase tracking-[0.3em] text-[#EBE7E0] mb-12">
                                Let&apos;s Connect
                            </div>

                            <h2 className="text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tighter text-[#EBE7E0] mb-12">
                                <span className="font-serif font-medium capitalize block mb-2">Start a</span>
                                <span className="font-serif italic capitalize block text-[#EBE7E0]">Dialogue.</span>
                            </h2>

                            <p className="text-lg md:text-xl text-[#EBE7E0] font-sans font-light max-w-[600px] leading-relaxed tracking-wide mb-32">
                                Open for freelance opportunities and collaborations. Whether you have a specific project in mind or just want to discuss the future of digital product design, I&apos;m ready to listen.
                            </p>

                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-16 border-t-[0.5px] border-[#EBE7E0]/40">

                                <div className="flex flex-col space-y-6">
                                    <span className="text-[10px] md:text-xs font-sans uppercase font-light tracking-[0.2em] text-[#EBE7E0]/60 mb-2">Socials</span>
                                    {['LinkedIn', 'GitHub', 'Twitter/X'].map((social) => (
                                        <div key={social} className="w-fit text-[#EBE7E0] font-sans text-lg md:text-xl font-light tracking-wide">
                                            {social}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-6">
                                    <span className="text-[10px] md:text-xs font-sans uppercase font-light tracking-[0.2em] text-[#EBE7E0]/60 mb-2">Contact</span>
                                    <div className="w-fit text-[#EBE7E0] font-sans text-lg md:text-xl font-light tracking-wide">
                                        hello@example.com
                                    </div>
                                    <div className="w-fit text-[#EBE7E0] font-sans text-lg md:text-xl font-light tracking-wide">
                                        +91 xxx xxx xxxx
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-6">
                                    <span className="text-[10px] md:text-xs font-sans uppercase font-light tracking-[0.2em] text-[#EBE7E0]/60 mb-2">Location</span>
                                    <span className="text-[#EBE7E0] font-sans text-lg md:text-xl font-light tracking-wide">
                                        Bhubaneswar
                                    </span>
                                    <span className="text-[#EBE7E0] font-sans text-lg md:text-xl font-light tracking-wide">
                                        India
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex justify-between items-center pt-24 pb-8 text-xs font-sans text-[#EBE7E0] tracking-wide">
                                <span>© {new Date().getFullYear()} Subham.</span>
                                <span>All Rights Reserved.</span>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
