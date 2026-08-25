"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = [
    { name: "HOME", href: "/" },
    { name: "WORK", href: "/projects" },
    { name: "SKILLS", href: "/skills" },
    { name: "ABOUT", href: "/about" },
    { name: "RESUME", href: "/Subham_Resume_Updated.docx" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark, toggle } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);

    const isGoldNav = pathname === "/projects" || pathname === "/skills" || pathname === "/projects/" || pathname === "/skills/";

    useEffect(() => {
        setActiveItem(pathname);
        window.addEventListener("hashchange", () => setActiveItem(pathname));
        return () => window.removeEventListener("hashchange", () => setActiveItem(pathname));
    }, [pathname]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Close on click outside
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isMobileMenuOpen]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsMobileMenuOpen(false);
        if (href === "/" && pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveItem("/");
        }
    };

    const accentColor = isDark ? "#C9A96E" : "#B8445A";

    return (
        <>
            <style>{`
                .editorial-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    pointer-events: none;
                }

                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 1.5rem 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    animation: nav-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
                }

                @media (min-width: 768px) {
                    .nav-container { padding: 3rem 3rem; }
                }

                @media (min-width: 1024px) {
                    .nav-container { padding: 3rem 6rem; }
                }

                @keyframes nav-in {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .brand-logo {
                    font-family: var(--font-cormorant, 'Cormorant Garamond', serif);
                    font-size: 1.15rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    font-weight: 600;
                    text-decoration: none;
                    transition: opacity 0.5s ease;
                    pointer-events: auto;
                }

                @media (min-width: 768px) {
                    .brand-logo { font-size: 1.25rem; letter-spacing: 0.3em; }
                }

                @media (min-width: 1024px) {
                    .brand-logo { font-size: 1.4rem; }
                }

                .editorial-header.dark .brand-logo { color: #E7E2D8; }
                .editorial-header.light .brand-logo { color: #1A1A1A; }

                .nav-group {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    pointer-events: auto;
                }

                @media (min-width: 768px) {
                    .nav-group { gap: 2.5rem; }
                }

                @media (min-width: 1024px) {
                    .nav-group { gap: 4rem; }
                }

                /* Desktop Nav Links */
                .desktop-nav-links {
                    display: none;
                    list-style: none;
                    gap: 1.5rem;
                    margin: 0;
                    padding: 0;
                }

                @media (min-width: 768px) {
                    .desktop-nav-links { display: flex; }
                }

                @media (min-width: 1024px) {
                    .desktop-nav-links { gap: 3rem; }
                }

                .desktop-nav-links a {
                    position: relative;
                    text-decoration: none;
                    font-family: var(--font-inter, 'Inter', sans-serif);
                    font-size: 0.65rem;
                    letter-spacing: 0.15em;
                    font-weight: 500;
                    display: flex;
                    gap: 0.5rem;
                    align-items: baseline;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    opacity: 0.7;
                }

                .desktop-nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: currentColor;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .editorial-header.dark .desktop-nav-links a { color: #E7E2D8; }
                .editorial-header.light .desktop-nav-links a { color: #1A1A1A; }

                .editorial-header.dark .desktop-nav-links a:hover, 
                .editorial-header.dark .desktop-nav-links a.pill-active { 
                    opacity: 1; 
                    transform: translateY(-1px);
                    letter-spacing: 0.18em;
                }
                
                .editorial-header.light .desktop-nav-links a:hover,
                .editorial-header.light .desktop-nav-links a.pill-active { 
                    opacity: 1;
                    color: #B8445A !important;
                    transform: translateY(-1px);
                    letter-spacing: 0.18em;
                }

                .desktop-nav-links a:hover::after, .desktop-nav-links a.pill-active::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                .editorial-header.light .desktop-nav-links a::after {
                    background-color: #B8445A;
                }

                /* Theme Toggle Pill Button */
                .theme-toggle-btn {
                    position: relative;
                    background: ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)"};
                    border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)"};
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.45rem 0.85rem;
                    border-radius: 9999px;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                    font-size: 0.6rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-weight: 600;
                    backdrop-filter: blur(12px);
                    pointer-events: auto;
                }

                .editorial-header.dark .theme-toggle-btn {
                    color: #E7E2D8;
                }
                .editorial-header.dark .theme-toggle-btn:hover {
                    border-color: #C9A96E;
                    color: #C9A96E;
                }

                .editorial-header.light .theme-toggle-btn {
                    color: #1A1A1A;
                }
                .editorial-header.light .theme-toggle-btn:hover {
                    border-color: #B8445A;
                    color: #B8445A;
                }

                /* Mobile Menu Dropdown Toggle Pill */
                .mobile-menu-toggle {
                    display: flex;
                    align-items: center;
                    gap: 0.45rem;
                    padding: 0.45rem 0.9rem;
                    border-radius: 9999px;
                    font-size: 0.6rem;
                    letter-spacing: 0.2em;
                    font-weight: 600;
                    text-transform: uppercase;
                    background: ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)"};
                    border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)"};
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(12px);
                    pointer-events: auto;
                }

                @media (min-width: 768px) {
                    .mobile-menu-toggle { display: none; }
                }

                .editorial-header.dark .mobile-menu-toggle {
                    color: #E7E2D8;
                }
                .editorial-header.light .mobile-menu-toggle {
                    color: #1A1A1A;
                }

                .mobile-menu-toggle:hover {
                    border-color: ${accentColor};
                    color: ${accentColor};
                }

                /* Dynamic Gold Override */
                .editorial-header.gold .brand-logo { color: #C9A34A !important; }
                .editorial-header.gold .desktop-nav-links a { color: #C9A34A !important; }
                .editorial-header.gold .desktop-nav-links a::after { background-color: #C9A34A !important; }
            `}</style>

            <header className={`editorial-header ${isDark ? "dark" : "light"} ${isGoldNav ? "gold" : ""}`} suppressHydrationWarning>
                <div className="nav-container">
                    {/* BRAND LOGO */}
                    <Link href="/" className="brand-logo">
                        Subham Panda
                    </Link>

                    {/* NAVIGATION & ACTION CONTROLS */}
                    <div className="nav-group" ref={menuRef}>
                        {/* Desktop Links (Hidden on Mobile) */}
                        <ul className="desktop-nav-links">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    {item.name === "RESUME" ? (
                                        <a
                                            href={item.href}
                                            download="Subham_Resume_Updated.docx"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span>{item.name}</span>
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={(e) => handleClick(e, item.href)}
                                            className={activeItem === item.href ? "pill-active" : ""}
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Separate Light / Dark Mode Toggle Button */}
                        <button
                            className="theme-toggle-btn"
                            onClick={toggle}
                            aria-label="Toggle light/dark theme"
                            suppressHydrationWarning
                        >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                            <span>{isDark ? "LIGHT" : "DARK"}</span>
                        </button>

                        {/* Mobile Menu Dropdown Button */}
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation dropdown menu"
                        >
                            <span>{isMobileMenuOpen ? "CLOSE" : "MENU"}</span>
                            <span className="text-[9px] transition-transform duration-300" style={{ transform: isMobileMenuOpen ? "rotate(180deg)" : "none" }}>
                                ▼
                            </span>
                        </button>

                        {/* Floating Mobile Dropdown Menu */}
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute top-[calc(100%+0.5rem)] right-4 w-60 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl border z-[10000] md:hidden"
                                    style={{
                                        backgroundColor: isDark ? "rgba(12, 12, 16, 0.94)" : "rgba(252, 251, 249, 0.95)",
                                        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
                                        color: isDark ? "#fdfdfd" : "#111111"
                                    }}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="px-3 py-2 text-[9px] font-mono tracking-[0.25em] uppercase opacity-40 border-b mb-1" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
                                            Navigation
                                        </div>

                                        {NAV_ITEMS.map((item) => {
                                            const isActive = activeItem === item.href;
                                            return (
                                                <div key={item.href}>
                                                    {item.name === "RESUME" ? (
                                                        <a
                                                            href={item.href}
                                                            download="Subham_Resume_Updated.docx"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                                                            style={{ color: isDark ? "#fdfdfd" : "#111111" }}
                                                        >
                                                            <span>{item.name}</span>
                                                            <span className="text-xs opacity-50">↓</span>
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            href={item.href}
                                                            onClick={(e) => handleClick(e, item.href)}
                                                            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                                                            style={{
                                                                color: isActive ? accentColor : (isDark ? "#fdfdfd" : "#111111"),
                                                                fontWeight: isActive ? "700" : "500"
                                                            }}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                {isActive && (
                                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                                                                )}
                                                                {item.name}
                                                            </span>
                                                            <span className="text-xs opacity-40">→</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    );
}