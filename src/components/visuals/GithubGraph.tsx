"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

// Custom theme mapping to use the signature Pink/Gold colors
const customTheme = {
    light: ['#f5e9ec', '#eabdc8', '#d68399', '#B8445A', '#8c3344'],
    dark: ['#1c1c1c', '#332915', '#66512a', '#997a40', '#C88A6E'],
};

export default function GithubGraph({ username = "subhamm-09", isDark = true }: { username?: string, isDark?: boolean }) {
    const bg = isDark ? "bg-[#0d0d0d]" : "bg-white";
    const border = isDark ? "border-white/5" : "border-black/5";
    const textMain = isDark ? "text-white" : "text-black";
    const textSub = isDark ? "text-white/80" : "text-black/80";
    const accent = isDark ? "text-[#C88A6E]" : "text-[#B8445A]";

    return (
        <motion.div 
            className={`w-full max-w-6xl mx-auto flex flex-col items-center justify-center ${bg} rounded-3xl border ${border} p-8 md:p-12 relative overflow-hidden transition-colors duration-1000`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? "from-white/[0.03]" : "from-black/[0.03]"} to-transparent pointer-events-none`} />
            
            <div className="w-full flex flex-col items-center relative z-10">
                <h3 className={`${textMain} text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-12 transition-colors duration-1000`}>
                    Open Source <span className={accent}>Footprint</span>
                </h3>
                
                <div className={`w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 ${isDark ? "[&::-webkit-scrollbar-track]:bg-[#1c1c1c] [&::-webkit-scrollbar-thumb]:bg-[#C88A6E]" : "[&::-webkit-scrollbar-track]:bg-[#e5e5e5] [&::-webkit-scrollbar-thumb]:bg-[#B8445A]"} [&::-webkit-scrollbar-thumb]:rounded-full transition-colors duration-1000`}>
                    <div className={`w-full flex justify-center ${textSub}`}>
                        <GitHubCalendar 
                            username={username}
                            colorScheme={isDark ? "dark" : "light"}
                            theme={customTheme}
                            blockSize={14}
                            blockMargin={6}
                            fontSize={12}
                            transformData={(data) => {
                                const today = new Date();
                                const sixMonthsAgo = new Date();
                                sixMonthsAgo.setMonth(today.getMonth() - 6);
                                
                                return data.filter((activity) => {
                                    const date = new Date(activity.date);
                                    return date >= sixMonthsAgo && date <= today;
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
