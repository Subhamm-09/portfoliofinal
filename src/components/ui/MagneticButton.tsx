"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ 
  children, 
  onClick, 
  className, 
  style 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
      style={style}
    >
      <motion.div 
        animate={{ x: x * 0.3, y: y * 0.3 }} 
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
