"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface ScrambleTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

export default function ScrambleText({ text, className = "", delay = 0, duration = 1500 }: ScrambleTextProps) {
    const [output, setOutput] = useState({ resolved: text, scrambled: "" });
    const isAnimating = useRef(false);

    useEffect(() => {
        let scrambleInterval: NodeJS.Timeout;
        let loopInterval: NodeJS.Timeout;
        let startTimeout: NodeJS.Timeout;

        const startScramble = () => {
            if (isAnimating.current) return;
            isAnimating.current = true;

            let frame = 0;
            const totalFrames = Math.round(duration / 30); // ~30ms per frame

            scrambleInterval = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;

                if (progress >= 1) {
                    clearInterval(scrambleInterval);
                    setOutput({ resolved: text, scrambled: "" });
                    isAnimating.current = false;
                    return;
                }

                // Calculate how many characters from the real text should be revealed
                const revealCount = Math.floor(progress * text.length);

                const scrambledPart = text
                    .substring(revealCount)
                    .split("")
                    .map((char) => {
                        if (char === " ") return " ";
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join("");

                setOutput({
                    resolved: text.substring(0, revealCount),
                    scrambled: scrambledPart
                });

            }, 30);
        };

        // Delay the first execution
        startTimeout = setTimeout(() => {
            startScramble();
            // Start the infinite loop exactly after the first one triggers
            loopInterval = setInterval(startScramble, 5000);
        }, delay * 1000);

        return () => {
            clearTimeout(startTimeout);
            clearInterval(scrambleInterval);
            clearInterval(loopInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, delay, duration]);

    return (
        <motion.span
            className={`inline-block ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay }} // Flash in right when animation starts
        >
            {output.resolved}
            {output.scrambled && (
                <span className="text-[#FF5F1F] drop-shadow-[0_0_12px_rgba(255,95,31,0.8)] font-mono tracking-tighter mix-blend-screen">
                    {output.scrambled}
                </span>
            )}
        </motion.span>
    );
}
