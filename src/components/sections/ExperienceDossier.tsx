"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/experience";

export default function ExperienceDossier({ isDark }: { isDark: boolean }) {
    const accent = isDark ? "text-[#C88A6E]" : "text-[#B8445A]";
    const border = isDark ? "bg-[#C88A6E]" : "bg-[#B8445A]";
    const textMain = isDark ? "text-[#fdfdfd]" : "text-[#111111]";
    const textMuted = isDark ? "text-white/60" : "text-black/60";
    const borderMuted = isDark ? "border-white/10" : "border-black/10";

    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-24 py-16 flex flex-col items-center">
            <div className="w-full flex items-center gap-4 mb-16">
                <div className={`w-8 h-[1px] ${border}`} />
                <p className={`${accent} text-xs font-bold tracking-[0.3em] uppercase`}>Experience & Pedigree</p>
            </div>

            <div className="w-full flex flex-col gap-12">
                {EXPERIENCES.map((exp, idx) => (
                    <motion.div 
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className={`w-full flex flex-col md:flex-row gap-6 md:gap-12 border-l border-t-0 border-r-0 border-b-0 ${borderMuted} pl-6 md:pl-10 relative`}
                    >
                        <div className={`absolute left-0 top-0 w-[1px] h-full ${border} origin-top scale-y-0 transition-transform duration-700 hover:scale-y-100`} />
                        
                        <div className="md:w-1/3 flex flex-col pt-1">
                            <h3 className={`font-serif text-3xl md:text-4xl leading-tight ${textMain} mb-2`}>{exp.company}</h3>
                            <p className={`${accent} text-sm font-semibold tracking-widest uppercase mb-4`}>{exp.period}</p>
                        </div>

                        <div className="md:w-2/3 flex flex-col">
                            <h4 className={`text-xl md:text-2xl font-medium tracking-tight ${textMain} mb-4`}>{exp.role}</h4>
                            <p className={`${textMuted} font-light leading-relaxed mb-6`}>{exp.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {exp.stack.map(tech => (
                                    <span key={tech} className={`text-xs px-3 py-1 border ${borderMuted} ${textMuted} rounded-full uppercase tracking-wider`}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}