"use client";

import TechMatrix from "@/components/sections/TechMatrix";
import GithubGraph from "@/components/visuals/GithubGraph";
import LeetcodeGraph from "@/components/visuals/LeetcodeGraph";
import { useTheme } from "@/hooks/useTheme";

export default function SkillsPage() {
    const { isDark } = useTheme();
    const bg = isDark ? "bg-[#0a0a0a]" : "bg-[#F4F2EC]";
    const accent = isDark ? "text-[#C88A6E]" : "text-[#B8445A]";
    const border = isDark ? "bg-[#C88A6E]" : "bg-[#B8445A]";

    return (
        <main className={`min-h-screen ${bg} pt-32 pb-24 transition-colors duration-1000`}>
            
            <div className="w-full flex justify-center flex-col items-center">
                {/* ── TECHNICAL MATRIX ────────────────────────────────────────── */}
                <TechMatrix isDark={isDark} />

                {/* ── GITHUB CONTRIBUTION GRAPH ─────────────────────────────────── */}
                <div className="w-full max-w-7xl mx-auto px-4 lg:px-24 py-16 pb-32 flex flex-col items-center">
                    <div className="w-full flex items-center gap-4 mb-6">
                        <div className={`w-8 h-[1px] ${border}`} />
                        <p className={`${accent} text-xs font-bold tracking-[0.3em] uppercase`}>Open Source / Activity</p>
                    </div>
                    <GithubGraph username="subhamm-09" isDark={isDark} />
                    <LeetcodeGraph username="Subham9928" isDark={isDark} />
                </div>
            </div>

        </main>
    );
}
