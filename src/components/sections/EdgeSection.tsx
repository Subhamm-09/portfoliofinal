"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useInView, Variants } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function EdgeCard({ 
  title, 
  subtitle, 
  tags,
  children, 
  isDark 
}: { 
  title: string, 
  subtitle: string, 
  tags: string[],
  children: React.ReactNode, 
  isDark: boolean 
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Dark matte graphite (#111215) / Light warm ivory (#F7F5F0)
  const bg = isDark ? "#111215" : "#F7F5F0";
  
  // Neumorphic depth with vertical elevation and glowing border on hover
  const shadowClass = isDark 
    ? "shadow-[8px_8px_20px_rgba(0,0,0,0.8),-8px_-8px_20px_rgba(255,255,255,0.02)] hover:shadow-[12px_12px_25px_rgba(0,0,0,0.9),-12px_-12px_25px_rgba(0,242,210,0.08)] hover:-translate-y-1.5" 
    : "shadow-[8px_8px_20px_rgba(200,195,185,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_25px_rgba(200,195,185,0.5),-12px_-12px_25px_rgba(0,242,210,0.15)] hover:-translate-y-1.5";

  const borderColor = isDark ? "rgba(200, 138, 110, 0.15)" : "rgba(200, 138, 110, 0.25)";
  const highlight = isDark ? "rgba(0, 242, 210, 0.08)" : "rgba(0, 242, 210, 0.05)";
  const accentColor = isDark ? "#C88A6E" : "#B8445A"; // Copper in dark, Pink in light

  return (
    <motion.div
      className={`group relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 p-8 lg:p-12 rounded-3xl border transition-all duration-700 overflow-hidden ${shadowClass}`}
      style={{ backgroundColor: bg, borderColor: borderColor }}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${highlight},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Glowing border overlay on hover */}
      <div className="absolute inset-0 rounded-3xl border border-[#00F2D2] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
      
      {/* Title & Tags */}
      <div className="lg:w-[40%] shrink-0 z-10 flex flex-col gap-4">
        <h3 className="text-[13px] tracking-[0.25em] uppercase font-bold" style={{ color: accentColor }}>
          {title}
        </h3>
        <p className="text-[14px] font-light leading-relaxed max-w-sm" style={{ color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.7)" }}>
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] font-mono tracking-widest px-3 py-1.5 rounded-full border bg-black/5" 
              style={{ borderColor: isDark ? "rgba(200,138,110,0.2)" : "rgba(200,138,110,0.3)", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full z-10 relative">
        {children}
      </div>
    </motion.div>
  );
}

const SystemsDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const steps = ["INGEST", "QUEUE", "WORKER", "CACHE"];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isActive, steps.length]);

  return (
    <div className="flex items-center justify-between w-full relative py-6">
      <div className="absolute left-6 right-6 top-[24px] h-[1px] bg-[#C88A6E]/20 z-0" />
      
      {steps.map((step, i) => {
        const isActiveStep = i === activeStep;
        const isPast = i <= activeStep;
        
        return (
          <div key={step} className="relative z-10 flex flex-col items-center gap-4">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border backdrop-blur-md 
                ${isActiveStep ? "border-[#00F2D2] shadow-[0_0_15px_rgba(0,242,210,0.4)] bg-[rgba(0,242,210,0.1)]" : "border-[#C88A6E]/30 bg-black/5"}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 
                ${isActiveStep ? "bg-[#00F2D2] shadow-[0_0_8px_#00F2D2] scale-125" : isPast ? "bg-[#C88A6E]/60" : "bg-[#C88A6E]/20"}`} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] font-mono transition-colors duration-500 ${isActiveStep ? "text-[#00F2D2]" : "text-[#C88A6E]/70"}`}>
                {step}
              </span>
              {step === "CACHE" && (
                <span className={`absolute -bottom-5 text-[9px] font-mono transition-opacity duration-500 ${isActiveStep ? "text-[#00F2D2] opacity-100 drop-shadow-[0_0_4px_#00F2D2]" : "opacity-0"}`}>
                  &lt;5ms
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const AlgorithmsDemo = ({ isActive = true }: { isActive?: boolean }) => {
  const [activeNodes, setActiveNodes] = useState<number[]>([0]);

  useEffect(() => {
    if (!isActive) return;
    // DFS traversal animation sequence
    const traversalPath = [
      [0], 
      [0, 1], 
      [0, 1, 3], 
      [0, 1, 4], 
      [0, 2], 
      [0, 2, 5], 
      [0, 2, 6]
    ];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % traversalPath.length;
      setActiveNodes(traversalPath[step]);
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const nodes = [
    { id: 0, x: "50%", y: "10%" },
    { id: 1, x: "25%", y: "50%" },
    { id: 2, x: "75%", y: "50%" },
    { id: 3, x: "10%", y: "90%" },
    { id: 4, x: "40%", y: "90%" },
    { id: 5, x: "60%", y: "90%" },
    { id: 6, x: "90%", y: "90%" },
  ];

  const edges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6]
  ];

  return (
    <div className="relative w-full h-32 flex items-center justify-center my-4">
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {edges.map(([from, to], i) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const isActiveEdge = activeNodes.includes(from) && activeNodes.includes(to);
          return (
            <line
              key={i}
              x1={fromNode.x} y1={fromNode.y}
              x2={toNode.x} y2={toNode.y}
              stroke={isActiveEdge ? "#00F2D2" : "rgba(200,138,110,0.2)"}
              strokeWidth={isActiveEdge ? 2 : 1}
              className="transition-colors duration-500"
            />
          )
        })}
      </svg>
      {nodes.map(node => {
        const isActive = activeNodes.includes(node.id);
        const isCurrent = activeNodes[activeNodes.length - 1] === node.id;
        return (
          <div
            key={node.id}
            className={`absolute w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${isActive ? "bg-[#00F2D2]" : "bg-[#C88A6E]/30"}`}
            style={{ 
              left: node.x, 
              top: node.y,
              boxShadow: isCurrent ? "0 0 15px 4px rgba(0,242,210,0.6)" : isActive ? "0 0 8px 1px rgba(0,242,210,0.3)" : "none"
            }}
          />
        )
      })}
    </div>
  )
}

const ProductionDemo = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="flex flex-col w-full cursor-default py-4 group/demo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-end font-mono text-[10px] tracking-widest text-[#C88A6E]/70 mb-3">
        <span>STANDARD LATENCY</span>
        <span>12ms</span>
      </div>
      <div className="w-full h-[3px] bg-[#C88A6E]/10 rounded-full overflow-hidden mb-8">
        <div className="w-[70%] h-full bg-[#C88A6E]/30 rounded-full" />
      </div>

      <div className="flex justify-between items-end font-mono text-[10px] tracking-widest mb-3">
        <span className="text-[#00F2D2] flex items-center gap-2 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2D2] animate-pulse shadow-[0_0_5px_#00F2D2]" />
          GPU-ACCELERATED EDGE
        </span>
        <span className="text-[#00F2D2] font-bold">0.8ms</span>
      </div>
      <div className="w-full h-[3px] bg-[#C88A6E]/10 rounded-full overflow-hidden relative">
         <motion.div 
           className="absolute left-0 top-0 bottom-0 bg-[#00F2D2] rounded-full shadow-[0_0_10px_rgba(0,242,210,0.8)]"
           animate={{ width: hovered ? "6%" : "70%" }}
           transition={{ duration: 0.8, ease: "circOut" }}
         />
      </div>
      <div className="mt-6 flex justify-end h-6">
         <motion.span 
           className="text-[10px] font-mono text-[#00F2D2] font-bold tracking-widest bg-[#00F2D2]/10 px-2.5 py-1.5 rounded border border-[#00F2D2]/30 shadow-[0_0_10px_rgba(0,242,210,0.2)]"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.9 }}
           transition={{ duration: 0.4 }}
         >
           93% BOOST
         </motion.span>
      </div>
    </div>
  )
}

export default function EdgeSection() {
  const { isDark } = useTheme();
  const sectionRef = React.useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "200px 0px" });
  
  // Background: Dark matte graphite (#111215) / Light warm cream (#F7F5F0)
  const bgColor = isDark ? "#111215" : "#F7F5F0";

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 transition-colors duration-700 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16 pb-6 border-b flex justify-between items-end"
          style={{ borderColor: isDark ? "rgba(200, 138, 110, 0.15)" : "rgba(200, 138, 110, 0.25)" }}
        >
          <h2 className="text-[11px] tracking-[0.3em] uppercase font-semibold" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#B8445A" }}>
            MY EDGE
          </h2>
          <span className="text-[9px] font-mono tracking-widest" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>
            CSE / SWE PROFILES
          </span>
        </motion.div>
        
        <div className="flex flex-col gap-8 lg:gap-12">
          <EdgeCard 
            title="Systems & Distributed Scale" 
            subtitle="Architecting concurrent microservices, distributed caches, and event-driven data pipelines."
            tags={["C++", "Go", "Kafka", "Redis", "Docker"]}
            isDark={isDark}
          >
            <SystemsDemo isActive={isSectionInView} />
          </EdgeCard>
          
          <EdgeCard 
            title="Algorithmic Rigor" 
            subtitle="Proven mastery in advanced data structures, graph theory, and memory-efficient execution."
            tags={["O(1) Lookups", "Dynamic Programming", "Concurrency"]}
            isDark={isDark}
          >
            <AlgorithmsDemo isActive={isSectionInView} />
          </EdgeCard>
          
          <EdgeCard 
            title="Full-Stack & Low-Latency UI" 
            subtitle="Building GPU-accelerated interactive web apps with sub-second execution and robust API integrations."
            tags={["Next.js", "WebGL", "Node.js", "REST/gRPC"]}
            isDark={isDark}
          >
            <ProductionDemo />
          </EdgeCard>
        </div>
      </div>
    </section>
  );
}
