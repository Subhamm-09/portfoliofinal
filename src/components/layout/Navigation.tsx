"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/resume.pdf" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState("");
    const { isDark, toggle } = useTheme();

    useEffect(() => {
        setActiveItem(pathname);
        window.addEventListener("hashchange", () => setActiveItem(pathname));
        return () => window.removeEventListener("hashchange", () => setActiveItem(pathname));
    }, [pathname]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === "/" && pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveItem("/");
        }
    };

    return (
        <>
            <style>{`
                .pill-nav {
                    position: fixed;
                    top: 1.75rem;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 0.4rem 1.5rem;
                    border-radius: 100px;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                    animation: pill-nav-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
                    transition: background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
                }

                .pill-nav.dark {
                    background: rgba(12, 12, 12, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }

                .pill-nav.light {
                    background: rgba(255, 255, 255, 0.95);
                    border: 1px solid rgba(201, 169, 110, 0.4);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }

                @keyframes pill-nav-in {
                    from { opacity: 0; transform: translateX(-50%) translateY(-14px); }
                    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
                }

                .pill-nav ul {
                    display: flex;
                    list-style: none;
                    gap: 2.5rem;
                    margin: 0;
                    padding: 0;
                }

                .pill-nav a {
                    text-decoration: none;
                    font-family: var(--font-inter, 'Inter', sans-serif);
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    font-weight: 500;
                    position: relative;
                    padding-bottom: 3px;
                    transition: color 0.4s ease;
                }

                .pill-nav.dark a { color: rgba(245, 243, 239, 0.85); }
                .pill-nav.light a { color: rgba(10, 10, 10, 0.85); }

                .pill-nav a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0%;
                    height: 1px;
                    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .pill-nav.dark a::after  { background: #B89355; }
                .pill-nav.light a::after { background: #C9A96E; }

                .pill-nav a:hover::after,
                .pill-nav a.pill-active::after { width: 100%; }

                .pill-nav.dark a.pill-active,
                .pill-nav.dark a:hover { color: rgba(245, 243, 239, 0.95); }

                .pill-nav.light a.pill-active,
                .pill-nav.light a:hover { color: rgba(10, 10, 10, 0.9); }

                .theme-toggle {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    transition: all 0.4s ease;
                    flex-shrink: 0;
                    font-size: 0.55rem;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    font-weight: 500;
                }

                .pill-nav.dark .theme-toggle { color: #C99F55; }
                .pill-nav.light .theme-toggle { color: #D4AF37; }

                .pill-nav.dark .theme-toggle:hover { color: #e6b865; text-shadow: 0 0 12px rgba(201,159,85,0.5); }
                .pill-nav.light .theme-toggle:hover { color: #e6b865; text-shadow: 0 0 12px rgba(212,175,55,0.5); }

                .pill-nav .divider {
                    width: 1px;
                    height: 14px;
                    flex-shrink: 0;
                    transition: background 0.5s ease;
                }

                .pill-nav.dark .divider  { background: rgba(255,255,255,0.1); }
                .pill-nav.light .divider { background: rgba(0,0,0,0.1); }
            `}</style>

            <nav className={`pill-nav ${isDark ? "dark" : "light"}`} suppressHydrationWarning>
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className={activeItem === item.href ? "pill-active" : ""}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="divider" />

                <button
                    className="theme-toggle"
                    onClick={toggle}
                    aria-label="Toggle theme"
                    suppressHydrationWarning
                >
                    {isDark ? (
                        <>
                            {/* Sun icon (click to go light) */}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"/>
                                <line x1="12" y1="1" x2="12" y2="3"/>
                                <line x1="12" y1="21" x2="12" y2="23"/>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                <line x1="1" y1="12" x2="3" y2="12"/>
                                <line x1="21" y1="12" x2="23" y2="12"/>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                            <span>Light</span>
                        </>
                    ) : (
                        <>
                            {/* Moon icon (click to go dark) */}
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                            <span>Dark</span>
                        </>
                    )}
                </button>
            </nav>
        </>
    );
}
