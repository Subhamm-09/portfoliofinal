"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const COOKIE_KEY = "subham_cookie_consent";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_KEY);
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_KEY, "accepted");
        setIsVisible(false);
    };

    const handleDismiss = () => {
        localStorage.setItem(COOKIE_KEY, "essential");
        setIsVisible(false);
    };

    const accent = isDark ? "#C9A96E" : "#B8445A";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-sm z-[9990] p-6 rounded-2xl border shadow-2xl backdrop-blur-2xl"
                    style={{
                        backgroundColor: isDark ? "rgba(15, 14, 20, 0.92)" : "rgba(252, 251, 248, 0.94)",
                        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
                        color: isDark ? "#fdfdfd" : "#111111"
                    }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                        <span className="text-[10px] tracking-[0.25em] uppercase font-mono font-medium opacity-60">
                            Storage & Privacy
                        </span>
                    </div>

                    <p className="text-xs font-light leading-relaxed mb-5 opacity-80">
                        This site utilizes local storage and essential cookies to preserve your theme preferences, render graphics, and optimize your navigation experience.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleAccept}
                            className="px-5 py-2.5 rounded-full text-[10px] tracking-widest uppercase font-mono font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: accent,
                                color: isDark ? "#0a0a0a" : "#ffffff"
                            }}
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="px-4 py-2.5 rounded-full text-[10px] tracking-widest uppercase font-mono opacity-60 hover:opacity-100 transition-opacity"
                            style={{ color: isDark ? "#fdfdfd" : "#111111" }}
                        >
                            Essential Only
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}