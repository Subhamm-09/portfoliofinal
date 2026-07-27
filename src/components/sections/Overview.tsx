"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Overview() {

    // Stagger wrapper for the grid cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2, // Wait slightly before popping cards
            }
        }
    };

    // Card slide-up reveal
    const cardVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    return (
        <section id="overview" className="w-full bg-base py-32 md:py-48 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Editorial Magazine Section Heading - independent scroll reveal */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24 md:mb-32"
                >
                    <h2 className="text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] tracking-tighter text-primary">
                        <span className="font-serif font-medium block">Selected</span>
                        <span className="font-serif italic capitalize block text-secondary ml-4 md:ml-12 mt-2">Disciplines.</span>
                    </h2>
                </motion.div>

                {/* 
          Expansive 3-Column Asymmetrical Grid
          Triggers stagger when the grid enters the viewport.
        */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 auto-rows-[450px] md:auto-rows-[550px]"
                >

                    {/* Card 1: Web Design */}
                    <motion.div variants={cardVariants} className="md:col-span-2 h-full">
                        <Link
                            href="/projects/web-design"
                            className="group relative flex flex-col justify-between p-10 lg:p-14 border-[0.5px] border-accent/20 bg-base transition-all duration-[400ms] ease-out hover:-translate-y-2 hover:border-accent rounded-md h-full w-full"
                        >
                            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-light text-secondary">
                                Digital Craft
                            </div>

                            <div className="my-auto pt-8">
                                <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-primary leading-[1.05] tracking-tight">
                                    Web & Interface Design
                                </h3>
                            </div>

                            <div className="text-sm font-sans font-light tracking-wide text-secondary leading-relaxed max-w-sm mt-auto">
                                Focusing on high-performance, minimal, and highly interactive digital experiences.
                            </div>
                        </Link>
                    </motion.div>

                    {/* 
            Card 2: Personal Image Anchor
          */}
                    <motion.div variants={cardVariants} className="md:row-span-2 h-full">
                        <div className="group relative overflow-hidden bg-primary rounded-md h-full w-full border-[0.5px] border-accent/20">
                            {/* Image Placeholder */}
                            <div className="w-full h-full bg-[#1A1816] transition-transform duration-[400ms] ease-out group-hover:scale-[1.03] flex items-center justify-center relative">
                                <div className="absolute inset-0 opacity-10 flex flex-col justify-evenly">
                                    <div className="w-full h-px bg-base"></div>
                                    <div className="w-full h-px bg-base"></div>
                                </div>
                                <span className="text-base text-xs tracking-[0.3em] uppercase font-sans font-light opacity-30 origin-center -rotate-90 block">
                                    Portrait Placeholder
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Engineering */}
                    <motion.div variants={cardVariants} className="md:col-span-2 h-full">
                        <Link
                            href="/projects/engineering"
                            className="group relative flex flex-col justify-between p-10 lg:p-14 border-[0.5px] border-accent/20 bg-base transition-all duration-[400ms] ease-out hover:-translate-y-2 hover:border-accent rounded-md h-full w-full"
                        >
                            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-light text-secondary">
                                Systems Architecture
                            </div>

                            <div className="my-auto pt-8">
                                <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-primary leading-[1.05] tracking-tight">
                                    Software Engineering
                                </h3>
                            </div>

                            <div className="text-sm font-sans font-light tracking-wide text-secondary leading-relaxed max-w-sm mt-auto">
                                Building robust backend architectures, APIs, and scalable infrastructure.
                            </div>
                        </Link>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
