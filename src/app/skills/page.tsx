import TechMatrix from "@/components/sections/TechMatrix";
import GithubGraph from "@/components/visuals/GithubGraph";

export default function SkillsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
            
            <div className="w-full flex justify-center flex-col items-center">
                {/* ── TECHNICAL MATRIX ────────────────────────────────────────── */}
                <TechMatrix />

                {/* ── GITHUB CONTRIBUTION GRAPH ─────────────────────────────────── */}
                <div className="w-full max-w-7xl mx-auto px-4 lg:px-24 py-16 pb-32 flex flex-col items-center">
                    <div className="w-full flex items-center gap-4 mb-6">
                        <div className="w-8 h-[1px] bg-[#C9A96E]" />
                        <p className="text-[#C9A96E] text-xs font-bold tracking-[0.3em] uppercase">Open Source / Activity</p>
                    </div>
                    <GithubGraph username="subhamm-09" />
                </div>
            </div>

        </main>
    );
}
