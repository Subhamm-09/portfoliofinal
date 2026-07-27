"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollLogo() {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const contactSection = document.getElementById("contact");

            const startShrinkAt = 10;
            const finishShrinkAt = 300;
            const maxScale = 1;
            const minScale = 0.35;

            let currentScale = minScale;

            // Handle Hero Shrinking
            if (scrollY <= startShrinkAt) {
                currentScale = maxScale;
            } else if (scrollY > startShrinkAt && scrollY < finishShrinkAt) {
                const progress = (scrollY - startShrinkAt) / (finishShrinkAt - startShrinkAt);
                currentScale = maxScale - (progress * (maxScale - minScale));
            }

            // Handle Contact Expansion & Shrinking Back
            if (contactSection) {
                const contactRect = contactSection.getBoundingClientRect();
                const contactTop = contactRect.top;
                const contactBottom = contactRect.bottom;
                const windowHeight = window.innerHeight;

                const startExpandAt = windowHeight * 0.85;
                const finishExpandAt = windowHeight * 0.2;

                const startShrinkBackAt = windowHeight + 350;
                const finishShrinkBackAt = windowHeight;

                if (contactTop < startExpandAt) {
                    if (contactBottom < startShrinkBackAt) {
                        if (contactBottom <= finishShrinkBackAt) {
                            currentScale = minScale;
                        } else {
                            const shrinkProgress = (startShrinkBackAt - contactBottom) / (startShrinkBackAt - finishShrinkBackAt);
                            currentScale = maxScale - (shrinkProgress * (maxScale - minScale));
                        }
                    } else if (contactTop <= finishExpandAt) {
                        currentScale = maxScale;
                    } else {
                        const expandProgress = (startExpandAt - contactTop) / (startExpandAt - finishExpandAt);
                        currentScale = minScale + (expandProgress * (maxScale - minScale));
                    }
                }
            }

            setScale(currentScale);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
            <motion.div
                animate={{ scale, originX: 0, originY: 0 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }} // Let the scroll interpolation math handle the curve directly
                className="absolute top-0 left-0 w-full p-0 font-fascinate font-normal text-[16vw] md:text-[11rem] leading-[0.8] tracking-tighter uppercase text-black opacity-80"
            >
                <span className="hidden md:inline">SUBHAM</span>
                <span className="inline md:hidden leading-[0.8] block">
                    SUB<br />HAM
                </span>
            </motion.div>
        </div>
    );
}
