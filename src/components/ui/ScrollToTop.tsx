"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Disable the browser's native scroll position memory completely
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        // Every time the route changes, jump instantly to (0, 0)
        // Using behavior: "instant" so there's no smooth scroll animation on page load
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname]);

    // Renders nothing — purely a side-effect component
    return null;
}
