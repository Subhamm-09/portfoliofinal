"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Icons
import { 
  SiPython, SiCplusplus, SiTypescript, SiJavascript, SiPytorch, SiScikitlearn, SiTensorflow, SiNumpy, SiPandas, SiOpencv, 
  SiNodedotjs, SiExpress, SiFastapi, SiMongodb, SiPostgresql, SiNextdotjs, SiReact, SiTailwindcss, 
  SiFramer, SiGreensock, SiDocker, SiGit, SiGithubactions, SiLinux, SiThreedotjs
} from "react-icons/si";
import { FaJava, FaDatabase, FaNetworkWired, FaAws, FaMicrochip, FaCodeBranch, FaGithub } from "react-icons/fa";
import { BiNetworkChart, BiCodeAlt } from "react-icons/bi";
import { MdOutlineArchitecture, MdMemory, MdAccountTree } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { TbCube } from "react-icons/tb";

// --- Categories ---

const CATEGORIES = [
  "01 — LANGUAGES",
  "02 — AI / MACHINE LEARNING",
  "03 — FULL-STACK ENGINEERING",
  "04 — CREATIVE FRONTEND",
  "05 — SYSTEMS & INFRASTRUCTURE",
  "06 — CORE COMPUTER SCIENCE"
];

// --- Grounded Proficiency Tiers ---

const BADGE_COLORS = {
  Primary: { 
    bg: "bg-[#d4af37]/10", 
    border: "border-[#d4af37]/35", 
    text: "text-[#d4af37]", 
    glow: "shadow-[0_0_10px_rgba(212,175,55,0.25)]",
    label: "Primary Stack" 
  },
  Proficient: { 
    bg: "bg-[#818cf8]/10", 
    border: "border-[#818cf8]/35", 
    text: "text-[#818cf8]", 
    glow: "shadow-[0_0_10px_rgba(129,140,248,0.25)]",
    label: "Proficient" 
  },
  Familiar: { 
    bg: "bg-[#34d399]/10", 
    border: "border-[#34d399]/35", 
    text: "text-[#34d399]", 
    glow: "shadow-[0_0_10px_rgba(52,211,153,0.25)]",
    label: "Familiar" 
  }
};

type Proficiency = keyof typeof BADGE_COLORS;

interface Skill {
  name: string;
  category: string;
  icon: React.ReactNode;
  desc: string;
  level: Proficiency;
}

const SKILLS: Skill[] = [
  // 01 — LANGUAGES
  { name: "Python", category: "01 — LANGUAGES", icon: <SiPython />, desc: "Core language for AI/ML pipelines, audio processing, backend APIs, and automation.", level: "Primary" },
  { name: "C++", category: "01 — LANGUAGES", icon: <SiCplusplus />, desc: "High-performance systems programming, memory management, and competitive programming.", level: "Primary" },
  { name: "JavaScript", category: "01 — LANGUAGES", icon: <SiJavascript />, desc: "Modern interactive web development, asynchronous execution, and full-stack logic.", level: "Primary" },
  { name: "TypeScript", category: "01 — LANGUAGES", icon: <SiTypescript />, desc: "Static typing, strict interface definitions, and scalable application architecture.", level: "Proficient" },
  { name: "SQL", category: "01 — LANGUAGES", icon: <FaDatabase />, desc: "Relational database queries, schema design, table joins, and indexing strategies.", level: "Primary" },
  { name: "Java", category: "01 — LANGUAGES", icon: <FaJava />, desc: "Object-oriented programming, data structures, and enterprise backend fundamentals.", level: "Proficient" },

  // 02 — AI / MACHINE LEARNING
  { name: "PyTorch", category: "02 — AI / MACHINE LEARNING", icon: <SiPytorch />, desc: "Neural network architectures, custom training loops, and tensor computation.", level: "Primary" },
  { name: "Scikit-learn", category: "02 — AI / MACHINE LEARNING", icon: <SiScikitlearn />, desc: "Classification, regression, clustering, preprocessing, and model evaluation pipelines.", level: "Primary" },
  { name: "Librosa", category: "02 — AI / MACHINE LEARNING", icon: <BiNetworkChart />, desc: "Audio signal processing, spectrogram extraction, and feature engineering for acoustic models.", level: "Primary" },
  { name: "NumPy", category: "02 — AI / MACHINE LEARNING", icon: <SiNumpy />, desc: "Multidimensional arrays, linear algebra, and high-performance numerical computing.", level: "Primary" },
  { name: "Pandas", category: "02 — AI / MACHINE LEARNING", icon: <SiPandas />, desc: "Tabular data ingestion, cleaning, exploratory analysis, and feature transformations.", level: "Primary" },
  { name: "XGBoost", category: "02 — AI / MACHINE LEARNING", icon: <BiNetworkChart />, desc: "Gradient boosting algorithms for high-accuracy predictions on structured tabular data.", level: "Proficient" },
  { name: "TensorFlow", category: "02 — AI / MACHINE LEARNING", icon: <SiTensorflow />, desc: "Deep learning workflows, model training, and surrogate modeling experimentation.", level: "Proficient" },
  { name: "OpenCV", category: "02 — AI / MACHINE LEARNING", icon: <SiOpencv />, desc: "Computer vision pipelines, image transformations, filtering, and matrix representations.", level: "Proficient" },

  // 03 — FULL-STACK ENGINEERING
  { name: "React", category: "03 — FULL-STACK ENGINEERING", icon: <SiReact />, desc: "Component-driven architecture, custom hooks, reactive state, and modern interfaces.", level: "Primary" },
  { name: "Next.js", category: "03 — FULL-STACK ENGINEERING", icon: <SiNextdotjs />, desc: "Full-stack App Router, server-side rendering, static generation, and optimized web apps.", level: "Primary" },
  { name: "FastAPI", category: "03 — FULL-STACK ENGINEERING", icon: <SiFastapi />, desc: "High-performance asynchronous Python REST APIs, Pydantic validation, and ML serving.", level: "Primary" },
  { name: "PostgreSQL", category: "03 — FULL-STACK ENGINEERING", icon: <SiPostgresql />, desc: "Relational database modeling, complex indexing, queries, and ACID transactions.", level: "Primary" },
  { name: "REST APIs", category: "03 — FULL-STACK ENGINEERING", icon: <FaNetworkWired />, desc: "Stateless HTTP interface design, clean endpoint structuring, and JSON payload handling.", level: "Primary" },
  { name: "Node.js", category: "03 — FULL-STACK ENGINEERING", icon: <SiNodedotjs />, desc: "Asynchronous runtime for backend servers, tooling, and backend services.", level: "Proficient" },
  { name: "Express.js", category: "03 — FULL-STACK ENGINEERING", icon: <SiExpress />, desc: "Lightweight routing, middleware integration, and RESTful API endpoints.", level: "Proficient" },
  { name: "MongoDB", category: "03 — FULL-STACK ENGINEERING", icon: <SiMongodb />, desc: "Document-based NoSQL storage, schema flexibility, and aggregation pipelines.", level: "Proficient" },

  // 04 — CREATIVE FRONTEND
  { name: "Three.js", category: "04 — CREATIVE FRONTEND", icon: <SiThreedotjs />, desc: "WebGL rendering, 3D scene construction, cameras, lighting rigs, and geometry shaders.", level: "Proficient" },
  { name: "React Three Fiber", category: "04 — CREATIVE FRONTEND", icon: <TbCube />, desc: "Declarative 3D scene graphs, custom shader materials, and interactive canvas components.", level: "Proficient" },
  { name: "Framer Motion", category: "04 — CREATIVE FRONTEND", icon: <SiFramer />, desc: "Physics-based spring animations, layout transitions, and interactive gesture states.", level: "Primary" },
  { name: "Tailwind CSS", category: "04 — CREATIVE FRONTEND", icon: <SiTailwindcss />, desc: "Utility-first CSS architecture, responsive design tokens, and fluid typography.", level: "Primary" },
  { name: "GSAP", category: "04 — CREATIVE FRONTEND", icon: <SiGreensock />, desc: "Timeline-based micro-interactions, smooth tweens, and scroll-driven animation logic.", level: "Proficient" },

  // 05 — SYSTEMS & INFRASTRUCTURE
  { name: "Git", category: "05 — SYSTEMS & INFRASTRUCTURE", icon: <SiGit />, desc: "Version control, branching strategies, commit history, and collaborative codebases.", level: "Primary" },
  { name: "GitHub", category: "05 — SYSTEMS & INFRASTRUCTURE", icon: <FaGithub />, desc: "Repository management, code reviews, pull requests, and open-source workflows.", level: "Primary" },
  { name: "Docker", category: "05 — SYSTEMS & INFRASTRUCTURE", icon: <SiDocker />, desc: "Containerizing applications and services for reproducible runtime environments.", level: "Proficient" },
  { name: "Linux", category: "05 — SYSTEMS & INFRASTRUCTURE", icon: <SiLinux />, desc: "Command-line administration, Bash scripting, system processes, and environments.", level: "Proficient" },
  { name: "GitHub Actions", category: "05 — SYSTEMS & INFRASTRUCTURE", icon: <SiGithubactions />, desc: "Automated CI/CD workflows, build pipelines, and automated test runs.", level: "Proficient" },
  { name: "AWS", category: "05 — SYSTEMS & INFRASTRUCTURE", icon: <FaAws />, desc: "Core cloud fundamentals, compute instances, and cloud object storage deployments.", level: "Familiar" },

  // 06 — CORE COMPUTER SCIENCE
  { name: "Data Structures & Algorithms", category: "06 — CORE COMPUTER SCIENCE", icon: <MdOutlineArchitecture />, desc: "Arrays, trees, graphs, dynamic programming, and asymptotic complexity analysis.", level: "Primary" },
  { name: "Object-Oriented Programming", category: "06 — CORE COMPUTER SCIENCE", icon: <FaCodeBranch />, desc: "Encapsulation, inheritance, polymorphism, abstraction, and SOLID design principles.", level: "Primary" },
  { name: "Database Systems", category: "06 — CORE COMPUTER SCIENCE", icon: <FaDatabase />, desc: "Relational schema design, normalization, ACID properties, indexing, and transactions.", level: "Primary" },
  { name: "Operating Systems", category: "06 — CORE COMPUTER SCIENCE", icon: <MdMemory />, desc: "Processes, threads, concurrency, deadlocks, memory management, and CPU scheduling.", level: "Proficient" },
  { name: "Computer Networks", category: "06 — CORE COMPUTER SCIENCE", icon: <FaNetworkWired />, desc: "OSI model, TCP/IP stack, HTTP/HTTPS protocols, DNS, and socket communication.", level: "Proficient" },
  { name: "Computer Architecture", category: "06 — CORE COMPUTER SCIENCE", icon: <FaMicrochip />, desc: "CPU execution cycles, memory hierarchy, caching, pipelining, and instruction sets.", level: "Proficient" },
  { name: "System Design", category: "06 — CORE COMPUTER SCIENCE", icon: <MdAccountTree />, desc: "Scalability, client-server models, caching tiers, load balancing, and rate limiting.", level: "Proficient" }
];

const DEVELOPER_TOOLS = [
  "Git", "GitHub", "Docker", "VS Code", "Jupyter Notebook", "Google Colab", "Postman", "Figma"
];

// --- Sub-components ---

const MouseGlow = ({ isDark }: { isDark: boolean }) => {
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
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? "rgba(212, 175, 55, 0.03)" : "rgba(184, 68, 90, 0.03)"}, transparent 40%)`,
      }}
    />
  );
};

const SkillCard = ({ skill, index, isDark }: { skill: Skill; index: number; isDark: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

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

  const badge = (skill?.level && BADGE_COLORS[skill.level]) ? BADGE_COLORS[skill.level] : BADGE_COLORS.Primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${isDark ? "bg-[#090909]/80 border-white/5" : "bg-white/60 border-black/5"} backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between h-[270px] overflow-hidden ${isDark ? "hover:border-[#d4af37]/30" : "hover:border-[#B8445A]/30"} transition-colors duration-500`}
    >
      {/* Internal hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? "from-[#d4af37]/0 via-[#d4af37]/[0.03]" : "from-[#B8445A]/0 via-[#B8445A]/[0.03]"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

      {/* Top Section */}
      <div className="z-10 flex justify-between items-start mb-4" style={{ transform: "translateZ(25px)" }}>
        <div className={`w-11 h-11 ${isDark ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"} rounded-xl border flex items-center justify-center shrink-0 ${isDark ? "group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "group-hover:border-[#B8445A]/40 group-hover:shadow-[0_0_15px_rgba(184,68,90,0.15)]"} transition-all duration-500`}>
          <div className={`text-2xl ${isDark ? "text-white/70" : "text-black/70"} ${isDark ? "group-hover:text-[#d4af37]" : "group-hover:text-[#B8445A]"} transition-colors duration-500`}>
            {skill.icon}
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-md border text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 ${badge.bg} ${badge.border} ${badge.text} ${badge.glow}`}>
          <div className="w-1 h-1 rounded-full bg-current" />
          {skill?.level || "Primary"}
        </div>
      </div>

      {/* Middle Section */}
      <div className="z-10 flex-1" style={{ transform: "translateZ(30px)" }}>
        <h3 className={`text-xl font-bold tracking-tight ${isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"} transition-colors mb-2`}>
          {skill.name}
        </h3>
        <p className={`text-xs ${isDark ? "text-white/50" : "text-black/55"} leading-relaxed font-light line-clamp-3`}>
          {skill.desc}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="z-10 mt-4 pt-3 border-t" style={{ transform: "translateZ(15px)", borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
        <div className="flex items-center">
          <span className={`text-[9px] font-mono ${isDark ? "text-white/30" : "text-black/30"} uppercase tracking-[0.2em]`}>
            {skill.category.split(" — ")[1] || skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function TechMatrix({ isDark = true }: { isDark?: boolean }) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const filteredSkills = SKILLS.filter(skill => skill.category === activeTab);

  return (
    <section className={`relative w-full min-h-screen ${isDark ? "bg-[#090909] text-white" : "bg-transparent text-black"} overflow-hidden flex flex-col items-center pt-24 pb-32 transition-colors duration-1000`}>
      
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className={`absolute inset-0 z-0 ${isDark ? "bg-gradient-to-b from-[#090909] via-transparent to-[#090909]" : "bg-gradient-to-b from-[#F4F2EC] via-transparent to-[#F4F2EC]"} pointer-events-none transition-colors duration-1000`} />
      
      <MouseGlow isDark={isDark} />

      <div className="w-full max-w-[1400px] px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className={`text-[11px] font-mono uppercase tracking-[0.35em] block mb-3 ${isDark ? "text-[#d4af37]" : "text-[#B8445A]"}`}>
              Capabilities &bull; Stack
            </span>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-transparent bg-clip-text ${isDark ? "bg-gradient-to-br from-white via-white/90 to-white/30" : "bg-gradient-to-br from-black via-black/90 to-black/30"}`}>
              ENGINEERING STACK.
            </h1>
            <p className={`text-sm md:text-base font-light max-w-xl ${isDark ? "text-white/50" : "text-black/60"} leading-relaxed`}>
              Technologies and computer science foundations I use to build software, intelligent systems, and interactive digital experiences.
            </p>
          </div>

          {/* Resume Download Action */}
          <a
            href="/Subham_Resume_Updated.docx"
            download="Subham_Resume_Updated.docx"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs uppercase tracking-widest overflow-hidden rounded-full border transition-all duration-300 w-max shrink-0 ${isDark ? "bg-[#111] border-white/10 hover:border-[#d4af37]/50" : "bg-white border-black/10 hover:border-[#B8445A]/50"}`}
          >
            <span className={`absolute inset-0 bg-gradient-to-r ${isDark ? "from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0" : "from-[#B8445A]/0 via-[#B8445A]/10 to-[#B8445A]/0"} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out`} />
            <span className={`relative flex items-center gap-3 ${isDark ? "text-white/70" : "text-black/70"} ${isDark ? "group-hover:text-[#d4af37]" : "group-hover:text-[#B8445A]"} transition-colors`}>
              <FiDownload className="text-lg" />
              Download Resume
            </span>
          </a>
        </div>

        {/* Category Navigation (Horizontal Pill Tabs) */}
        <div className="w-full overflow-x-auto pb-4 mb-12 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-5 py-2.5 rounded-full border text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-500 ${
                    isActive 
                      ? isDark ? "border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/5" : "border-[#B8445A]/50 text-[#B8445A] bg-[#B8445A]/5" 
                      : isDark ? "border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5" : "border-black/5 text-black/40 hover:text-black/80 hover:border-black/20 hover:bg-black/5"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" : "bg-[#B8445A] shadow-[0_0_8px_rgba(184,68,90,0.8)]"}`} />}
                    {cat}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeStackTab"
                      className={`absolute inset-0 border ${isDark ? "border-[#d4af37]" : "border-[#B8445A]"} rounded-full pointer-events-none`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="min-h-[580px]">
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-[1000px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} isDark={isDark} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Legend & Developer Tools Ribbon */}
        <div className="mt-20 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-8" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
          
          {/* Proficiency Legend */}
          <div className="flex flex-wrap gap-6 items-center text-[10px] font-mono tracking-widest uppercase">
            {Object.entries(BADGE_COLORS).map(([level, colors]) => (
              <div key={level} className="flex items-center gap-2.5">
                <div className={`px-2 py-0.5 rounded border ${colors.bg} ${colors.border} ${colors.text} flex items-center gap-1.5`}>
                  <div className="w-1 h-1 rounded-full bg-current" />
                  {level}
                </div>
                <span className={isDark ? "text-white/35" : "text-black/40"}>
                  {level === "Primary" ? "Core Daily Driver" :
                   level === "Proficient" ? "Deep Working Knowledge" : "Familiar & Applied"}
                </span>
              </div>
            ))}
          </div>

          {/* Tools Ribbon */}
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-wider uppercase">
            <span className={isDark ? "text-white/30" : "text-black/35"}>Tools:</span>
            <div className="flex flex-wrap gap-1.5">
              {DEVELOPER_TOOLS.map((tool) => (
                <span 
                  key={tool} 
                  className={`px-2.5 py-1 rounded-md border text-[9px] ${isDark ? "bg-white/[0.03] border-white/10 text-white/60" : "bg-black/[0.03] border-black/10 text-black/60"}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

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
      `}} />
    </section>
  );
}