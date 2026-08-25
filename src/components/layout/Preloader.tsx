"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const power4Out: [number, number, number, number] = [0.25, 1, 0.5, 1];
const power4In: [number, number, number, number] = [0.895, 0.03, 0.685, 0.22];

interface PreloaderProps {
    onComplete: () => void;
    isReady?: boolean;
}

export default function Preloader({ onComplete, isReady = true }: PreloaderProps) {
    const [lifting, setLifting] = useState(false);
    const [gone, setGone] = useState(false);
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);

    useEffect(() => {
        // Fast elegant delay so the logo is crisp
        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    // Fallback timer: never keep user waiting more than 1.2s total
    useEffect(() => {
        const fallbackTimer = setTimeout(() => {
            setLifting(true);
        }, 1200);
        return () => clearTimeout(fallbackTimer);
    }, []);

    useEffect(() => {
        if (minTimeElapsed && isReady) {
            setLifting(true);
        }
    }, [minTimeElapsed, isReady]);

    const handleLiftComplete = () => {
        setGone(true);
        onComplete();
    };

    if (gone) return null;

    return (
        <AnimatePresence>
            {!gone && (
                <motion.div
                    key="curtain"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
                    initial={{ opacity: 1 }}
                    animate={lifting ? { opacity: 0 } : { opacity: 1 }}
                    transition={
                        lifting
                            ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                            : { duration: 0 }
                    }
                    onAnimationComplete={lifting ? handleLiftComplete : undefined}
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* ── Brand Text ─────────────────────────────────────────────── */}
                        <motion.h1
                            className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-[0.2em] uppercase font-light"
                            style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)" }}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                            animate={
                                lifting 
                                    ? { opacity: 0, scale: 1.05, filter: "blur(8px)" } 
                                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                            }
                            transition={{ 
                                duration: 1.2, 
                                ease: power4Out 
                            }}
                        >
                            Subham Panda
                        </motion.h1>

                        {/* ── Metadata Label ──────────────────────────────────── */}
                        <motion.span
                            className="font-mono text-[9px] tracking-[0.4em] uppercase"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                                lifting
                                    ? { opacity: 0, y: -10 }
                                    : { opacity: 1, y: 0 }
                            }
                            transition={{ 
                                duration: lifting ? 0.8 : 1.5, 
                                delay: lifting ? 0 : 0.4,
                                ease: power4Out 
                            }}
                        >
                            INITIALIZING
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
