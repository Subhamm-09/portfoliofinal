"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// power4.out easing — used for premium, silky reveals
const power4Out: [number, number, number, number] = [0.25, 1, 0.5, 1];
// power4.in — for the curtain lift (snappy start, smooth end)
const power4In: [number, number, number, number] = [0.895, 0.03, 0.685, 0.22];

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [count, setCount] = useState(0);
    const [lifting, setLifting] = useState(false);
    const [gone, setGone] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ── Count 0 → 100 then trigger curtain lift ─────────────────────────────
    useEffect(() => {
        let current = 0;
        const tick = () => {
            const remaining = 100 - current;
            const step = Math.max(1, Math.ceil(remaining * 0.055));
            current = Math.min(100, current + step);
            setCount(current);
            if (current >= 100) {
                clearInterval(intervalRef.current!);
                // Pause at 100% so user can register it, then lift curtain
                setTimeout(() => setLifting(true), 500);
            }
        };
        intervalRef.current = setInterval(tick, 40);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    const handleLiftComplete = () => {
        setGone(true);
        onComplete();
    };

    if (gone) return null;

    return (
        <AnimatePresence>
            {!gone && (
                <>
                    {/*
           * ── THE CURTAIN ────────────────────────────────────────────────
           * Full-screen #F9F9F9 panel that slides UP, revealing the
           * hero section underneath. No image here — the real hero image
           * is already rendered below and will be revealed by this lift.
           */}
                    <motion.div
                        key="curtain"
                        className="fixed inset-0 z-[9998] flex flex-col items-start justify-end px-10 pb-10 overflow-hidden"
                        style={{ background: "#F9F9F9", willChange: "transform" }}
                        animate={lifting ? { y: "-100%" } : { y: 0 }}
                        transition={
                            lifting
                                ? { duration: 1.1, ease: power4In }
                                : { duration: 0 }
                        }
                        onAnimationComplete={lifting ? handleLiftComplete : undefined}
                    >
                        {/* ── Counter ─────────────────────────────────────────────── */}
                        <motion.div
                            animate={lifting ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
                            transition={lifting ? { duration: 0.25, ease: power4Out } : {}}
                            className="select-none flex items-baseline gap-[0.15em]"
                        >
                            <span
                                style={{
                                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                                    fontSize: "clamp(5rem, 14vw, 11rem)",
                                    fontWeight: 100,
                                    letterSpacing: "-0.04em",
                                    color: "#0a0a0a",
                                    lineHeight: 1,
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {String(count).padStart(2, "0")}
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                                    fontWeight: 100,
                                    color: "#0a0a0a",
                                    opacity: 0.3,
                                    paddingBottom: "0.7em",
                                }}
                            >
                                %
                            </span>
                        </motion.div>

                        {/* ── Thin progress track ──────────────────────────────────── */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'rgba(201,169,110,0.15)' }}>
                            <motion.div
                                className="h-full origin-left"
                                style={{ scaleX: count / 100, background: '#C9A96E' }}
                                transition={{ ease: power4Out }}
                            />
                        </div>
                    </motion.div>

                    {/*
           * ── TOP SLIVER ─────────────────────────────────────────────────
           * A thin strip of #F9F9F9 that covers the very top of the screen
           * to prevent the hero from peeking through during the lift.
           * It slides up in sync with the main curtain.
           */}
                    <motion.div
                        key="curtain-top"
                        className="fixed top-0 left-0 right-0 h-2 z-[9999]"
                        style={{ background: "#F9F9F9", willChange: "transform" }}
                        animate={lifting ? { y: "-100vh" } : { y: 0 }}
                        transition={lifting ? { duration: 1.1, ease: power4In } : { duration: 0 }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}
