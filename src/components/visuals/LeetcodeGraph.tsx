"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LeetcodeData {
    easy: number;
    medium: number;
    hard: number;
    total: number;
    ranking: number;
}

export default function LeetcodeGraph({ username = "Subham9928", isDark = true }: { username?: string, isDark?: boolean }) {
    const [data, setData] = useState<LeetcodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetch(`/api/leetcode?username=${username}`)
            .then(res => res.json())
            .then(res => {
                const stats = res?.data?.matchedUser?.submitStats?.acSubmissionNum;
                const ranking = res?.data?.matchedUser?.profile?.ranking;
                
                if (stats) {
                    const total = stats.find((s: any) => s.difficulty === "All")?.count || 0;
                    const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
                    const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
                    const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
                    
                    setData({ total, easy, medium, hard, ranking });
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [username]);

    const bg = isDark ? "bg-[#111110]" : "bg-[#FAF9F5]";
    const border = isDark ? "border-white/10" : "border-black/10";
    const textMain = isDark ? "text-white" : "text-black";
    const textSub = isDark ? "text-white/60" : "text-black/60";
    const accent = isDark ? "text-[#C88A6E]" : "text-[#B8445A]";
    const accentHex = isDark ? "#C88A6E" : "#B8445A";

    return (
        <motion.div 
            className={`w-full max-w-6xl mx-auto flex flex-col items-center justify-center ${bg} rounded-2xl border ${border} p-8 md:p-12 relative overflow-hidden transition-colors duration-700 mt-12`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
            <div className="w-full flex flex-col items-center relative z-10">
                <h3 className={`${textMain} text-lg md:text-xl font-light tracking-[0.25em] uppercase mb-16 transition-colors duration-700`}>
                    Leet<span className={`font-medium ${accent}`}>Code</span>
                </h3>
                
                {loading ? (
                    <div className={`${textSub} text-xs tracking-widest uppercase flex items-center gap-3 py-12 font-mono`}>
                        <span className={`w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin ${accent}`} />
                        Loading LeetCode Statistics...
                    </div>
                ) : data ? (
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                        
                        {/* TOTAL SOLVED (Hero Stat) */}
                        <div className={`col-span-1 md:col-span-1 flex flex-col items-center justify-center p-8 rounded-xl border ${border} ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"} relative overflow-hidden`}>
                            <span className={`${textSub} text-[10px] font-mono tracking-[0.2em] uppercase mb-4`}>Total Solved</span>
                            <span className={`font-serif text-6xl md:text-7xl font-light italic ${textMain}`}>{data.total}</span>
                        </div>
                        
                        {/* DIFFICULTY BREAKDOWN */}
                        <div className={`col-span-1 md:col-span-3 grid grid-cols-3 gap-4 rounded-2xl border ${border} ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"} backdrop-blur-sm p-6 md:p-10`}>
                            
                            <div className="flex flex-col gap-3 justify-center items-center md:items-start border-r border-current/10">
                                <span className="text-[#00b8a3] text-[10px] font-mono tracking-[0.2em] uppercase">Easy</span>
                                <span className={`font-serif text-4xl md:text-5xl ${textMain}`}>{data.easy}</span>
                            </div>
                            
                            <div className="flex flex-col gap-3 justify-center items-center md:items-start border-r border-current/10 pl-2 md:pl-6">
                                <span className="text-[#ffc01e] text-[10px] font-mono tracking-[0.2em] uppercase">Medium</span>
                                <span className={`font-serif text-4xl md:text-5xl ${textMain}`}>{data.medium}</span>
                            </div>
                            
                            <div className="flex flex-col gap-3 justify-center items-center md:items-start pl-2 md:pl-6">
                                <span className="text-[#ff375f] text-[10px] font-mono tracking-[0.2em] uppercase">Hard</span>
                                <span className={`font-serif text-4xl md:text-5xl ${textMain}`}>{data.hard}</span>
                            </div>

                        </div>
                        
                    </div>
                ) : (
                    <div className={`${textSub} text-sm tracking-widest uppercase`}>
                        Telemetry unavailable
                    </div>
                )}
            </div>
        </motion.div>
    );
}
