"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textParallax = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen w-full flex flex-col justify-end pb-20 md:pb-28 overflow-hidden"
        >
            <motion.div
                style={{ y: textParallax }}
                className="w-full flex flex-col justify-end pl-6 md:pl-10 pr-6 z-20"
            >
                <div className="relative w-full h-full flex items-end justify-between">
                    {/* Image Layer - Back/Right bleeding off the bottom */}
                    <motion.div
                        className="absolute bottom-[-10vh] right-0 w-[60%] md:w-[45%] h-[90%] md:h-[110%] z-10 pointer-events-none origin-bottom"
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
                    >
                        <div className="relative w-full h-full">
                            {/* Assuming hero.png is a cut-out or has a clean background for this editorial effect. 
                                We will use object-contain and bottom alignment so it bleeds naturally. */}
                            <img
                                src="/hero.png"
                                alt="Subham Portrait"
                                className="object-cover md:object-contain object-bottom w-full h-full mix-blend-multiply opacity-90 contrast-[1.05]"
                            />
                            {/* Sophisticated Warm Gradient Integration to help it melt into the warm bg */}
                            <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent pointer-events-none" />
                            {/* Slow organic drift highlight overlay */}
                            <motion.div
                                className="absolute top-1/4 right-1/4 w-32 h-32 bg-amber-100/10 rounded-full blur-3xl"
                                animate={{
                                    x: [0, 30, -20, 0],
                                    y: [0, -40, 20, 0],
                                    scale: [1, 1.2, 0.9, 1]
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </motion.div>

                    {/* Text Layer - Left side overlapping image */}
                    <div className="relative flex flex-col justify-end w-full max-w-[80vw] z-20 mix-blend-hard-light md:mix-blend-color-burn">

                        {/* Main headline */}
                        <motion.h1
                            className="font-serif font-light text-primary tracking-tight leading-[1.02] mb-6 md:mb-8"
                            style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.14, delayChildren: 0.4 }
                                }
                            }}
                        >
                            <motion.div variants={{
                                hidden: { opacity: 0, y: 36 },
                                visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
                            }}>
                                Building the
                            </motion.div>

                            <motion.div variants={{
                                hidden: { opacity: 0, y: 36 },
                                visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
                            }}>
                                <span className="italic">
                                    <span className="relative inline-block">
                                        Future
                                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] overflow-hidden">
                                            <motion.span
                                                className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-transparent via-[#FF5F1F] to-transparent"
                                                animate={{ x: ["-100%", "300%"] }}
                                                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                                            />
                                        </span>
                                    </span>
                                    {" of"}
                                </span>
                            </motion.div>

                            <motion.div variants={{
                                hidden: { opacity: 0, y: 36 },
                                visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
                            }}>
                                the Web.
                            </motion.div>
                        </motion.h1>

                        {/* Thin editorial divider */}
                        <motion.div
                            className="w-full md:w-3/4 h-px bg-primary/10 mb-6 md:mb-8"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* Bottom body text */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
                            className="pb-4"
                        >
                            <p className="font-sans font-light text-primary/70 md:text-primary/50 leading-relaxed max-w-[26rem] text-sm md:text-base tracking-normal bg-base/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded-md">
                                Computer science student designing high-performance web experiences where engineering meets design intent.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
