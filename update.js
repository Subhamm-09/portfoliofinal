const fs = require('fs');
let code = fs.readFileSync('src/components/sections/TechMatrix.tsx', 'utf8');

code = code.replace('export default function TechMatrix() {', 'export default function TechMatrix({ isDark = true }: { isDark?: boolean }) {');

code = code.replace(
  'className="relative w-full min-h-screen bg-[#090909] text-white overflow-hidden flex flex-col items-center pt-24 pb-32"',
  'className={`relative w-full min-h-screen ${isDark ? "bg-[#090909] text-white" : "bg-transparent text-black"} overflow-hidden flex flex-col items-center pt-24 pb-32 transition-colors duration-1000`}'
);

code = code.replace(
  '<div className="absolute inset-0 z-0 bg-gradient-to-b from-[#090909] via-transparent to-[#090909] pointer-events-none" />',
  '<div className={`absolute inset-0 z-0 ${isDark ? "bg-gradient-to-b from-[#090909] via-transparent to-[#090909]" : "bg-gradient-to-b from-[#F4F2EC] via-transparent to-[#F4F2EC]"} pointer-events-none transition-colors duration-1000`} />'
);

code = code.split('<SkillCard key={skill.name} skill={skill} index={index} />').join('<SkillCard key={skill.name} skill={skill} index={index} isDark={isDark} />');

code = code.replace(
  'const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {',
  'const SkillCard = ({ skill, index, isDark }: { skill: Skill; index: number; isDark: boolean }) => {'
);

code = code.split('className="relative group bg-[#090909]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[280px] overflow-hidden hover:border-[#d4af37]/30 transition-colors duration-500"').join('className={`relative group ${isDark ? "bg-[#090909]/80 border-white/5" : "bg-white/50 border-black/5"} backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between h-[280px] overflow-hidden hover:border-[#d4af37]/30 transition-colors duration-500`}');

code = code.split('className="w-12 h-12 bg-black/50 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500"').join('className={`w-12 h-12 ${isDark ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"} rounded-xl border flex items-center justify-center shrink-0 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500`}');

code = code.split('className="text-2xl text-white/70 group-hover:text-[#d4af37] transition-colors duration-500"').join('className={`text-2xl ${isDark ? "text-white/70" : "text-black/70"} group-hover:text-[#d4af37] transition-colors duration-500`}');

code = code.split('className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors mb-2"').join('className={`text-2xl font-bold tracking-tight ${isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"} transition-colors mb-2`}');

code = code.split('className="text-xs text-white/40 leading-relaxed font-light line-clamp-3"').join('className={`text-xs ${isDark ? "text-white/40" : "text-black/40"} leading-relaxed font-light line-clamp-3`}');

code = code.split('className="text-[9px] font-mono text-white/30 uppercase tracking-widest"').join('className={`text-[9px] font-mono ${isDark ? "text-white/30" : "text-black/30"} uppercase tracking-widest`}');

code = code.split('className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative"').join('className={`w-full h-[2px] ${isDark ? "bg-white/5" : "bg-black/5"} rounded-full overflow-hidden relative`}');

code = code.split('className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100"').join('className={`absolute top-0 left-0 bottom-0 w-full ${isDark ? "bg-gradient-to-r from-transparent via-white/40 to-transparent" : "bg-gradient-to-r from-transparent via-black/20 to-transparent"} -translate-x-full group-hover:animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100`}');

code = code.split('className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/20"').join('className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6 text-transparent bg-clip-text ${isDark ? "bg-gradient-to-br from-white via-white/90 to-white/20" : "bg-gradient-to-br from-black via-black/90 to-black/20"}`}');

code = code.split('className="flex gap-4 md:gap-8 items-center text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/40"').join('className={`flex gap-4 md:gap-8 items-center text-xs md:text-sm font-mono tracking-[0.3em] uppercase ${isDark ? "text-white/40" : "text-black/40"}`}');

code = code.split('className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs uppercase tracking-widest overflow-hidden rounded-full bg-[#111] border border-white/10 hover:border-[#d4af37]/50 transition-all duration-300 w-max"').join('className={`group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs uppercase tracking-widest overflow-hidden rounded-full border transition-all duration-300 w-max ${isDark ? "bg-[#111] border-white/10 hover:border-[#d4af37]/50" : "bg-white border-black/10 hover:border-[#d4af37]/50"}`}');

code = code.split('className="relative flex items-center gap-3 text-white/70 group-hover:text-[#d4af37] transition-colors"').join('className={`relative flex items-center gap-3 ${isDark ? "text-white/70" : "text-black/70"} group-hover:text-[#d4af37] transition-colors`}');

code = code.split('? "border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/5"\n                      : "border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5"').join('? "border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/5" : (isDark ? "border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5" : "border-black/5 text-black/40 hover:text-black/80 hover:border-black/20 hover:bg-black/5")');

fs.writeFileSync('src/components/sections/TechMatrix.tsx', code);
console.log("Done");
