"use client";

import { useState, useEffect } from "react";

const THEME_KEY = "portfolio-theme";

export function useTheme() {
  const [isDark, setIsDark] = useState(true); // default dark

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const dark = stored !== "light";
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    // Broadcast so Navigation and page stay in sync
    window.dispatchEvent(new CustomEvent("themechange", { detail: { dark: next } }));
  };

  // Listen for changes dispatched by other components (e.g. Navigation)
  useEffect(() => {
    const handler = (e: CustomEvent) => setIsDark(e.detail.dark);
    window.addEventListener("themechange", handler as EventListener);
    return () => window.removeEventListener("themechange", handler as EventListener);
  }, []);

  return { isDark, toggle };
}
