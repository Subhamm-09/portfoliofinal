"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Icons
import { 
  SiPython, SiCplusplus, SiTypescript, SiJavascript, SiPytorch, SiScikitlearn, SiTensorflow, SiNumpy, SiPandas, SiOpencv, 
  SiHuggingface, SiNodedotjs, SiExpress, SiFastapi, SiMongodb, SiPostgresql, SiRedis, SiNextdotjs, SiReact, SiTailwindcss, 
  SiFramer, SiGreensock, SiDocker, SiGit, SiGithubactions, SiLinux, SiNginx, SiJupyter, SiGooglecolab, 
  SiPostman, SiFigma
} from "react-icons/si";
import { FaJava, FaDatabase, FaServer, FaLock, FaNetworkWired, FaTools, FaCodeBranch, FaAws } from "react-icons/fa";
import { BiNetworkChart, BiCodeAlt } from "react-icons/bi";
import { VscVscode } from "react-icons/vsc";
import { MdOutlineArchitecture, MdMemory } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

// --- Data Structures ---

const CATEGORIES = [
  "LANGUAGES",
  "MACHINE INTELLIGENCE",
  "BACKEND SYSTEMS",
  "FRONTEND",
  "CLOUD & DEVOPS",
  "COMPUTER SCIENCE",
  "TOOLS"
];

const BADGE_COLORS = {
  Production: { bg: "bg-[#d4af37]/10", border: "border-[#d4af37]/30", text: "text-[#d4af37]", glow: "shadow-[0_0_10px_rgba(212,175,55,0.3)]" },
  Advanced: { bg: "bg-[#9d4edd]/10", border: "border-[#9d4edd]/30", text: "text-[#9d4edd]", glow: "shadow-[0_0_10px_rgba(157,78,221,0.3)]" },
  Intermediate: { bg: "bg-[#3a86ff]/10", border: "border-[#3a86ff]/30", text: "text-[#3a86ff]", glow: "shadow-[0_0_10px_rgba(58,134,255,0.3)]" },
  Learning: { bg: "bg-[#38b000]/10", border: "border-[#38b000]/30", text: "text-[#38b000]", glow: "shadow-[0_0_10px_rgba(56,176,0,0.3)]" }
};

type Proficiency = keyof typeof BADGE_COLORS;

interface Skill {
  name: string;
  category: string;
  icon: React.ReactNode;
  desc: string;
  level: Proficiency;
  progress: number;
}

const SKILLS: Skill[] = [
  // LANGUAGES
  { name: "Python", category: "LANGUAGES", icon: <SiPython />, desc: "Building scalable AI systems, backend services, and intelligent automation.", level: "Production", progress: 95 },
  { name: "C++", category: "LANGUAGES", icon: <SiCplusplus />, desc: "Low-latency systems, memory-safe execution, and high-performance computing.", level: "Advanced", progress: 85 },
  { name: "Java", category: "LANGUAGES", icon: <FaJava />, desc: "Enterprise applications and robust object-oriented system architectures.", level: "Intermediate", progress: 70 },
  { name: "SQL", category: "LANGUAGES", icon: <FaDatabase />, desc: "Complex query optimization, relational database design, and data extraction.", level: "Production", progress: 90 },
  { name: "TypeScript", category: "LANGUAGES", icon: <SiTypescript />, desc: "Advanced type engineering and zero-runtime-error architectures.", level: "Production", progress: 92 },
  { name: "JavaScript", category: "LANGUAGES", icon: <SiJavascript />, desc: "Dynamic web applications and full-stack asynchronous logic.", level: "Production", progress: 95 },

  // MACHINE INTELLIGENCE
  { name: "PyTorch", category: "MACHINE INTELLIGENCE", icon: <SiPytorch />, desc: "Architecting custom neural networks and deploying optimized models.", level: "Production", progress: 90 },
  { name: "TensorFlow", category: "MACHINE INTELLIGENCE", icon: <SiTensorflow />, desc: "Building scalable machine learning pipelines and deep learning models.", level: "Advanced", progress: 85 },
  { name: "Scikit-learn", category: "MACHINE INTELLIGENCE", icon: <SiScikitlearn />, desc: "Statistical modeling, predictive analytics, and classical ML algorithms.", level: "Production", progress: 95 },
  { name: "NumPy", category: "MACHINE INTELLIGENCE", icon: <SiNumpy />, desc: "High-performance scientific computing and matrix operations.", level: "Production", progress: 95 },
  { name: "Pandas", category: "MACHINE INTELLIGENCE", icon: <SiPandas />, desc: "Complex data manipulation, cleaning, and exploratory data analysis.", level: "Production", progress: 95 },
  { name: "OpenCV", category: "MACHINE INTELLIGENCE", icon: <SiOpencv />, desc: "Real-time computer vision and image processing applications.", level: "Advanced", progress: 80 },
  { name: "Librosa", category: "MACHINE INTELLIGENCE", icon: <BiNetworkChart />, desc: "Audio and music signal analysis for machine learning workflows.", level: "Intermediate", progress: 70 },
  { name: "XGBoost", category: "MACHINE INTELLIGENCE", icon: <BiNetworkChart />, desc: "High-performance gradient boosting for structured tabular data.", level: "Advanced", progress: 85 },
  { name: "Hugging Face", category: "MACHINE INTELLIGENCE", icon: <SiHuggingface />, desc: "Implementing state-of-the-art transformer models for NLP and Vision.", level: "Production", progress: 90 },
  { name: "LangChain", category: "MACHINE INTELLIGENCE", icon: <BiCodeAlt />, desc: "Building agentic workflows and LLM orchestration systems.", level: "Advanced", progress: 85 },

  // BACKEND SYSTEMS
  { name: "Node.js", category: "BACKEND SYSTEMS", icon: <SiNodedotjs />, desc: "High-throughput, event-driven microservices and real-time WebSockets.", level: "Production", progress: 90 },
  { name: "Express.js", category: "BACKEND SYSTEMS", icon: <SiExpress />, desc: "Lightweight, scalable RESTful API architectures.", level: "Production", progress: 95 },
  { name: "REST APIs", category: "BACKEND SYSTEMS", icon: <FaNetworkWired />, desc: "Designing robust, stateless communication interfaces for web services.", level: "Production", progress: 95 },
  { name: "FastAPI", category: "BACKEND SYSTEMS", icon: <SiFastapi />, desc: "High-performance asynchronous APIs for machine learning serving.", level: "Advanced", progress: 85 },
  { name: "Authentication", category: "BACKEND SYSTEMS", icon: <FaLock />, desc: "Implementing secure JWT, OAuth2, and session-based auth strategies.", level: "Advanced", progress: 85 },
  { name: "Microservices", category: "BACKEND SYSTEMS", icon: <FaServer />, desc: "Designing scalable, decoupled, and highly available distributed systems.", level: "Advanced", progress: 80 },
  { name: "MongoDB", category: "BACKEND SYSTEMS", icon: <SiMongodb />, desc: "Flexible NoSQL database design and aggregation pipelines.", level: "Production", progress: 90 },
  { name: "PostgreSQL", category: "BACKEND SYSTEMS", icon: <SiPostgresql />, desc: "Relational data modeling, complex joins, and ACID compliance.", level: "Production", progress: 85 },
  { name: "Redis", category: "BACKEND SYSTEMS", icon: <SiRedis />, desc: "In-memory caching, message brokering, and high-speed data stores.", level: "Intermediate", progress: 75 },

  // FRONTEND
  { name: "Next.js", category: "FRONTEND", icon: <SiNextdotjs />, desc: "Server-side rendering, static site generation, and optimized web apps.", level: "Production", progress: 90 },
  { name: "React", category: "FRONTEND", icon: <SiReact />, desc: "Building interactive, component-driven user interfaces.", level: "Production", progress: 95 },
  { name: "Tailwind CSS", category: "FRONTEND", icon: <SiTailwindcss />, desc: "Utility-first rapid UI development and highly custom styling.", level: "Production", progress: 95 },
  { name: "Framer Motion", category: "FRONTEND", icon: <SiFramer />, desc: "Complex declarative animations and smooth layout transitions.", level: "Advanced", progress: 85 },
  { name: "GSAP", category: "FRONTEND", icon: <SiGreensock />, desc: "High-performance scroll-driven and timeline animations.", level: "Learning", progress: 60 },

  // CLOUD & DEVOPS
  { name: "Docker", category: "CLOUD & DEVOPS", icon: <SiDocker />, desc: "Containerizing applications for consistent deployment across environments.", level: "Advanced", progress: 85 },
  { name: "Git", category: "CLOUD & DEVOPS", icon: <SiGit />, desc: "Version control, branching strategies, and collaborative development.", level: "Production", progress: 95 },
  { name: "GitHub Actions", category: "CLOUD & DEVOPS", icon: <SiGithubactions />, desc: "Automating testing, building, and deployment workflows.", level: "Advanced", progress: 80 },
  { name: "Linux", category: "CLOUD & DEVOPS", icon: <SiLinux />, desc: "Server administration, shell scripting, and system management.", level: "Advanced", progress: 85 },
  { name: "AWS", category: "CLOUD & DEVOPS", icon: <FaAws />, desc: "Deploying and managing scalable cloud infrastructure (EC2, S3, RDS).", level: "Intermediate", progress: 70 },
  { name: "CI/CD", category: "CLOUD & DEVOPS", icon: <FaCodeBranch />, desc: "Continuous integration and continuous deployment pipelines.", level: "Advanced", progress: 80 },
  { name: "Nginx", category: "CLOUD & DEVOPS", icon: <SiNginx />, desc: "Reverse proxying, load balancing, and serving static assets.", level: "Intermediate", progress: 70 },

  // COMPUTER SCIENCE
  { name: "Data Structures", category: "COMPUTER SCIENCE", icon: <MdOutlineArchitecture />, desc: "Optimizing memory layout and data access patterns.", level: "Production", progress: 95 },
  { name: "Algorithms", category: "COMPUTER SCIENCE", icon: <BiCodeAlt />, desc: "Designing efficient solutions for complex computational problems.", level: "Production", progress: 90 },
  { name: "OOP", category: "COMPUTER SCIENCE", icon: <FaCodeBranch />, desc: "Object-oriented principles, design patterns, and SOLID architecture.", level: "Production", progress: 95 },
  { name: "Operating Systems", category: "COMPUTER SCIENCE", icon: <MdMemory />, desc: "Process management, concurrency, and memory allocation mechanics.", level: "Advanced", progress: 85 },
  { name: "DBMS", category: "COMPUTER SCIENCE", icon: <FaDatabase />, desc: "Database management systems theory, transactions, and indexing.", level: "Advanced", progress: 85 },
  { name: "Computer Networks", category: "COMPUTER SCIENCE", icon: <FaNetworkWired />, desc: "TCP/IP, HTTP protocols, routing, and network security fundamentals.", level: "Advanced", progress: 80 },
  { name: "System Design", category: "COMPUTER SCIENCE", icon: <FaServer />, desc: "Architecting large-scale, fault-tolerant, and distributed systems.", level: "Advanced", progress: 80 },

  // TOOLS
  { name: "VS Code", category: "TOOLS", icon: <VscVscode />, desc: "Primary integrated development environment with customized workflows.", level: "Production", progress: 95 },
  { name: "Jupyter Notebook", category: "TOOLS", icon: <SiJupyter />, desc: "Interactive computing, data visualization, and ML experimentation.", level: "Production", progress: 95 },
  { name: "Google Colab", category: "TOOLS", icon: <SiGooglecolab />, desc: "Cloud-based GPU accelerated machine learning model training.", level: "Advanced", progress: 90 },
  { name: "Postman", category: "TOOLS", icon: <SiPostman />, desc: "API development, testing, documentation, and mocking.", level: "Production", progress: 90 },
  { name: "Figma", category: "TOOLS", icon: <SiFigma />, desc: "UI/UX design, prototyping, and developer handoff.", level: "Intermediate", progress: 70 },
];

// --- Sub-components ---

// Mouse-tracking glow background
const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.03), transparent 40%)`,
      }}
    />
  );
};

// Parallax 3D Card
const SkillCard = ({ skill, index }: { skill: Skill, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const badge = BADGE_COLORS[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group bg-[#090909]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[280px] overflow-hidden hover:border-[#d4af37]/30 transition-colors duration-500"
    >
      {/* Internal hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Top Section */}
      <div className="z-10 flex justify-between items-start mb-4" style={{ transform: "translateZ(30px)" }}>
        <div className="w-12 h-12 bg-black/50 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500">
          <div className="text-2xl text-white/70 group-hover:text-[#d4af37] transition-colors duration-500">
            {skill.icon}
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-md border text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 ${badge.bg} ${badge.border} ${badge.text} ${badge.glow}`}>
          <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
          {skill.level}
        </div>
      </div>

      {/* Middle Section */}
      <div className="z-10 flex-1" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors mb-2">
          {skill.name}
        </h3>
        <p className="text-xs text-white/40 leading-relaxed font-light line-clamp-3">
          {skill.desc}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="z-10 mt-4" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-end mb-2">
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">System_Ready</span>
          <span className="text-[10px] font-mono text-[#d4af37]/70 group-hover:text-[#d4af37] transition-colors">{skill.progress}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#d4af37]/50 to-[#d4af37]"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
          {/* Shine effect on hover */}
          <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </motion.div>
  );
};


// --- Main Component ---

export default function TechMatrix() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const filteredSkills = SKILLS.filter(skill => skill.category === activeTab);

  return (
    <section className="relative w-full min-h-screen bg-[#090909] text-white overflow-hidden flex flex-col items-center pt-24 pb-32">
      
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#090909] via-transparent to-[#090909] pointer-events-none" />
      
      <MouseGlow />

      <div className="w-full max-w-[1400px] px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/20">
              MATRIX.
            </h1>
            <div className="flex gap-4 md:gap-8 items-center text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/40">
              <span>Systems.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/50" />
              <span>Skills.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/50" />
              <span>Intelligence.</span>
            </div>
          </div>

          {/* Premium Resume Button */}
          <button className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs uppercase tracking-widest overflow-hidden rounded-full bg-[#111] border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 w-max">
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-3 text-white/70 group-hover:text-[#d4af37] transition-colors">
              <FiDownload className="text-lg" />
              Premium Resume
            </span>
          </button>
        </div>

        {/* Category Navigation (Horizontal Pill Scroll) */}
        <div className="w-full overflow-x-auto pb-4 mb-12 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-6 py-3 rounded-full border text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-500 ${
                    isActive 
                      ? "border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/5" 
                      : "border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
                    {cat}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 border border-[#d4af37] rounded-full pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="min-h-[600px]">
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-[1000px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-wrap gap-6 justify-center text-[10px] font-mono tracking-widest uppercase">
          {Object.entries(BADGE_COLORS).map(([level, colors]) => (
            <div key={level} className="flex items-center gap-3">
              <div className={`px-2 py-1 rounded border ${colors.bg} ${colors.border} ${colors.text} flex items-center gap-1.5`}>
                <div className="w-1 h-1 rounded-full bg-current" />
                {level}
              </div>
              <span className="text-white/30">
                {level === "Production" ? "Built real systems" :
                 level === "Advanced" ? "Strong practical exp" :
                 level === "Intermediate" ? "Actively using" : "Currently exploring"}
              </span>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}
