"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [hoverState, setHoverState] = useState<"default" | "hover" | "expand" | "hidden">("default");

    // Direct motion values completely bypass the React render cycle
    // This removes the "lag" effect and ties the graphics perfectly 1:1 with hardware inputs
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update coordinates directly, no easing delays
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.hasAttribute("data-cursor-hide") || target.closest("[data-cursor-hide]")) {
                setHoverState("hidden");
            } else if (target.closest("[data-cursor-expand]")) {
                // Expand state: solid filled dot (matches projects-page cursor balloon)
                setHoverState("expand");
            } else if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setHoverState("hover");
            } else {
                setHoverState("default");
            }
        };

        // Passive event listeners prevent main-thread scrolling blocks
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    const variants: import("framer-motion").Variants = {
        default: {
            scale: 1,
            opacity: 0.5,
            mixBlendMode: "difference",
            backgroundColor: "white",
            border: "0px solid transparent",
            width: "16px",
            height: "16px",
            transition: { duration: 0.15 }
        },
        hover: {
            scale: 1,
            opacity: 1,
            backgroundColor: "transparent",
            border: "1px solid #FFFFFF",
            mixBlendMode: "normal",
            width: "48px",
            height: "48px",
            transition: { duration: 0.15 }
        },
        expand: {
            // Solid black dot, always visible on white nav
            scale: 1,
            opacity: 1,
            backgroundColor: "#080808",
            border: "0px solid transparent",
            mixBlendMode: "normal",
            width: "60px",
            height: "60px",
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        },
        hidden: {
            scale: 0,
            opacity: 0,
            transition: { duration: 0.1 }
        }
    };

    return (
        <>
            {/* Force hide the native OS cursor everywhere */}
            <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
                variants={variants}
                animate={hoverState}
                style={{
                    x: mouseX,
                    y: mouseY,
                    // By shifting center 50% up and left natively, we don't need to manually map -8 or -24 bounds!
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
}
