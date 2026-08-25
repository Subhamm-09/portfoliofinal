"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 800, damping: 40, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<{
    variant: "default" | "project";
    isHovering: boolean;
    isVisible: boolean;
  }>({
    variant: "default",
    isHovering: false,
    isVisible: false,
  });

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCursorState((prev) => {
        if (!prev.isVisible) return { ...prev, isVisible: true };
        return prev;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isProject = target.closest("[data-cursor='project']");
      if (isProject) {
        setCursorState((prev) => ({ ...prev, variant: "project", isHovering: false }));
        return;
      }

      const isInteractive = target.closest("a, button, input, [role='button']");
      setCursorState((prev) => ({
        ...prev,
        variant: "default",
        isHovering: !!isInteractive,
      }));
    };

    const handleMouseOut = () => {
      setCursorState((prev) => ({ ...prev, variant: "default", isHovering: false }));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!cursorState.isVisible) return null;

  const isProject = cursorState.variant === "project";
  const size = isProject ? 80 : (cursorState.isHovering ? 48 : 12);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform, width, height",
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: isProject ? "transparent" : "#ffffff",
        border: isProject ? "1px solid #C9A96E" : "0px solid transparent",
        opacity: cursorState.isHovering ? 0.6 : 1,
      }}
      transition={{
        width: { duration: 0.2 },
        height: { duration: 0.2 },
        opacity: { duration: 0.2 },
      }}
    />
  );
}
