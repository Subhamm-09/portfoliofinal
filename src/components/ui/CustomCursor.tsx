"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "project">("default");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isProject = target.closest("[data-cursor='project']");
      if (isProject) {
        setCursorVariant("project");
        setIsHovering(false);
        return;
      }
      
      setCursorVariant("default");
      const isInteractive = target.closest("a, button, input, [role='button']");
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isProject = cursorVariant === "project";
  const size = isProject ? 80 : (isHovering ? 48 : 12);
  const offset = size / 2;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full mix-blend-difference"
      animate={{
        x: mousePosition.x - offset,
        y: mousePosition.y - offset,
        width: size,
        height: size,
        backgroundColor: isProject ? "transparent" : "#ffffff",
        border: isProject ? "1px solid #C9A96E" : "0px solid transparent",
        opacity: isHovering ? 0.6 : (isProject ? 1 : 1),
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 40,
        mass: 0.5,
      }}
    />
  );
}
