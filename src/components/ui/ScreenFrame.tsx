"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ScreenFrame() {
    const { isDark } = useTheme();

    // Corner radius size
    const r = 28; // px

    return (
        <div className="pointer-events-none fixed inset-0 z-[99998] select-none overflow-hidden">
            {/* Subtle Viewport Border Outline */}
            <div 
                className="absolute inset-0 transition-colors duration-700 pointer-events-none"
                style={{
                    boxShadow: isDark
                        ? "inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 20px rgba(0,0,0,0.5)"
                        : "inset 0 0 0 1px rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(0,0,0,0.03)"
                }}
            />

            {/* Corner SVGs - Top Left */}
            <svg 
                className="absolute top-0 left-0 w-7 h-7 md:w-9 md:h-9" 
                viewBox="0 0 36 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M0 0 H36 C16.1178 0 0 16.1178 0 36 V0 Z" 
                    fill={isDark ? "#000000" : "#E8E4DA"} 
                    className="transition-colors duration-700"
                />
                <path 
                    d="M36 0 C16.1178 0 0 16.1178 0 36" 
                    stroke={isDark ? "rgba(201, 169, 110, 0.25)" : "rgba(0, 0, 0, 0.12)"} 
                    strokeWidth="1.5"
                    className="transition-colors duration-700"
                />
            </svg>

            {/* Corner SVGs - Top Right */}
            <svg 
                className="absolute top-0 right-0 w-7 h-7 md:w-9 md:h-9" 
                viewBox="0 0 36 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M36 0 H0 C19.8822 0 36 16.1178 36 36 V0 Z" 
                    fill={isDark ? "#000000" : "#E8E4DA"} 
                    className="transition-colors duration-700"
                />
                <path 
                    d="M0 0 C19.8822 0 36 16.1178 36 36" 
                    stroke={isDark ? "rgba(201, 169, 110, 0.25)" : "rgba(0, 0, 0, 0.12)"} 
                    strokeWidth="1.5"
                    className="transition-colors duration-700"
                />
            </svg>

            {/* Corner SVGs - Bottom Left */}
            <svg 
                className="absolute bottom-0 left-0 w-7 h-7 md:w-9 md:h-9" 
                viewBox="0 0 36 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M0 36 H36 C16.1178 36 0 19.8822 0 0 V36 Z" 
                    fill={isDark ? "#000000" : "#E8E4DA"} 
                    className="transition-colors duration-700"
                />
                <path 
                    d="M36 36 C16.1178 36 0 19.8822 0 0" 
                    stroke={isDark ? "rgba(201, 169, 110, 0.25)" : "rgba(0, 0, 0, 0.12)"} 
                    strokeWidth="1.5"
                    className="transition-colors duration-700"
                />
            </svg>

            {/* Corner SVGs - Bottom Right */}
            <svg 
                className="absolute bottom-0 right-0 w-7 h-7 md:w-9 md:h-9" 
                viewBox="0 0 36 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M36 36 H0 C19.8822 36 36 19.8822 36 0 V36 Z" 
                    fill={isDark ? "#000000" : "#E8E4DA"} 
                    className="transition-colors duration-700"
                />
                <path 
                    d="M0 36 C19.8822 36 36 19.8822 36 0" 
                    stroke={isDark ? "rgba(201, 169, 110, 0.25)" : "rgba(0, 0, 0, 0.12)"} 
                    strokeWidth="1.5"
                    className="transition-colors duration-700"
                />
            </svg>
        </div>
    );
}