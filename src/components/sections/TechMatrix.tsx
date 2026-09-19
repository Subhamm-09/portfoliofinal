"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    label: "Primary Stack" 
  },
  Proficient: { 
    bg: "bg-[#818cf8]/10", 
    border: "border-[#818cf8]/35", 
    text: "text-[#818cf8]", 
    label: "Proficient" 
  },
  Familiar: { 
    bg: "bg-[#34d399]/10", 
    border: "border-[#34d399]/35", 
    text: "text-[#34d399]", 
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


// --- Sub-components ---

const SkillCard = ({ skill, index, isDark }: { skill: Skill; index: number; isDark: boolean }) => {
  const badge = (skill?.level && BADGE_COLORS[skill.level]) ? BADGE_COLORS[skill.level] : BADGE_COLORS.Primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group ${isDark ? "bg-[#111110] border-white/10 hover:border-[#d4af37]/40" : "bg-[#FAF9F5] border-black/10 hover:border-[#B8445A]/40"} border rounded-xl p-6 flex flex-col justify-between h-[260px] transition-colors duration-300`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 ${isDark ? "bg-white/[0.04] border-white/10" : "bg-black/[0.04] border-black/10"} rounded-lg border flex items-center justify-center shrink-0 ${isDark ? "group-hover:border-[#d4af37]/40" : "group-hover:border-[#B8445A]/40"} transition-colors duration-300`}>
          <div className={`text-xl ${isDark ? "text-white/70 group-hover:text-[#d4af37]" : "text-black/70 group-hover:text-[#B8445A]"} transition-colors duration-300`}>
            {skill.icon}
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded border text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300 ${badge.bg} ${badge.border} ${badge.text}`}>
          <div className="w-1 h-1 rounded-full bg-current" />
          {skill?.level || "Primary"}
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-1">
        <h3 className={`text-lg font-medium tracking-tight ${isDark ? "text-white/90" : "text-black/90"} mb-2`}>
          {skill.name}
        </h3>
        <p className={`text-xs ${isDark ? "text-white/50" : "text-black/60"} leading-relaxed font-light line-clamp-3`}>
          {skill.desc}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
        <span className={`text-[9px] font-mono ${isDark ? "text-white/30" : "text-black/30"} uppercase tracking-[0.2em]`}>
          {skill.category.split(" — ")[1] || skill.category}
        </span>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function TechMatrix({ isDark = true }: { isDark?: boolean }) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const filteredSkills = SKILLS.filter(skill => skill.category === activeTab);

  return (
    <section className={`relative w-full min-h-screen ${isDark ? "bg-[#090909] text-white" : "bg-transparent text-black"} overflow-hidden flex flex-col items-center pt-24 pb-32 transition-colors duration-700`}>
      
      <div className="w-full max-w-[1400px] px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 pb-8 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-[0.35em] block mb-3 ${isDark ? "text-[#d4af37]" : "text-[#B8445A]"}`}>
              Capabilities &bull; Inventory
            </span>
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-4 ${isDark ? "text-white" : "text-black"}`}>
              ENGINEERING STACK
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
            className={`group relative inline-flex items-center justify-center px-7 py-3.5 font-mono text-xs uppercase tracking-widest rounded border transition-all duration-300 w-max shrink-0 ${isDark ? "bg-transparent border-white/15 hover:border-[#d4af37] hover:text-[#d4af37]" : "bg-transparent border-black/15 hover:border-[#B8445A] hover:text-[#B8445A]"}`}
          >
            <span className={`relative flex items-center gap-3 ${isDark ? "text-white/70" : "text-black/70"} ${isDark ? "group-hover:text-[#d4af37]" : "group-hover:text-[#B8445A]"} transition-colors`}>
              <FiDownload className="text-base" />
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
                  className={`relative px-4 py-2 rounded border text-[10px] md:text-[11px] font-mono uppercase tracking-widest transition-all duration-300 ${
                    isActive 
                      ? isDark ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5" : "border-[#B8445A] text-[#B8445A] bg-[#B8445A]/5" 
                      : isDark ? "border-white/10 text-white/40 hover:text-white/80 hover:border-white/20" : "border-black/10 text-black/40 hover:text-black/80 hover:border-black/20"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#d4af37]" : "bg-[#B8445A]"}`} />}
                    {cat}
                  </span>
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