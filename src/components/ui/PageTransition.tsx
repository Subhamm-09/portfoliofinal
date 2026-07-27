"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Optional: Map specific routes to specific transition colors
const pathColors: Record<string, string> = {
    "/": "#EBE7E0", // base
    "/projects/web-design": "#FF5F1F", // accent
    "/projects/engineering": "#2B2926", // primary
    "/projects/designing": "#1A1816",
    "/about": "#2B2926",
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Determine the color based on the current path, default to a sophisticated dark slate
    const color = pathColors[pathname] || "#1A1816";

    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname}>
                {/* 
                  1. Scale up from bottom (Sweep IN when leaving the old page)
                  This needs to happen on 'exit' 
                */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-[100vh] z-[999] origin-bottom pointer-events-none"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundColor: color }}
                />

                {/* 
                  2. Scale down from top (Sweep OUT when entering the new page)
                  This needs to happen on 'initial' -> 'animate'
                */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-[100vh] z-[999] origin-top pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundColor: color }}
                />

                {/* The actual page content */}
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
