const fs = require('fs');
let code = fs.readFileSync('src/components/sections/TechMatrix.tsx', 'utf8');

// Fix Pill Navigation Light Mode
code = code.replace(
  '"border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5"',
  'isDark ? "border-white/5 text-white/40 hover:text-white/80 hover:border-white/20 hover:bg-white/5" : "border-black/5 text-black/40 hover:text-black/80 hover:border-black/20 hover:bg-black/5"'
);

// Replace accent colors in active tab
code = code.replace(
  '"border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/5"', 
  'isDark ? "border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/5" : "border-[#B8445A]/50 text-[#B8445A] bg-[#B8445A]/5"'
);

code = code.split('bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]').join('${isDark ? "bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" : "bg-[#B8445A] shadow-[0_0_8px_rgba(184,68,90,0.8)]"}');

code = code.split('border border-[#d4af37] rounded-full').join('border ${isDark ? "border-[#d4af37]" : "border-[#B8445A]"} rounded-full');

// Fix button
code = code.split('bg-[#d4af37]/50').join('${isDark ? "bg-[#d4af37]/50" : "bg-[#B8445A]/50"}');
code = code.split('from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0').join('${isDark ? "from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0" : "from-[#B8445A]/0 via-[#B8445A]/10 to-[#B8445A]/0"}');
code = code.split('hover:border-[#d4af37]/50').join('${isDark ? "hover:border-[#d4af37]/50" : "hover:border-[#B8445A]/50"}');

// Fix SkillCard accents
code = code.split('hover:border-[#d4af37]/30').join('${isDark ? "hover:border-[#d4af37]/30" : "hover:border-[#B8445A]/30"}');
code = code.split('from-[#d4af37]/0 via-[#d4af37]/[0.03]').join('${isDark ? "from-[#d4af37]/0 via-[#d4af37]/[0.03]" : "from-[#B8445A]/0 via-[#B8445A]/[0.03]"}');
code = code.split('group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]').join('${isDark ? "group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "group-hover:border-[#B8445A]/40 group-hover:shadow-[0_0_15px_rgba(184,68,90,0.15)]"}');
code = code.split('group-hover:text-[#d4af37]').join('${isDark ? "group-hover:text-[#d4af37]" : "group-hover:text-[#B8445A]"}');
code = code.split('text-[#d4af37]/70').join('${isDark ? "text-[#d4af37]/70" : "text-[#B8445A]/70"}');
code = code.split('from-[#d4af37]/50 to-[#d4af37]').join('${isDark ? "from-[#d4af37]/50 to-[#d4af37]" : "from-[#B8445A]/50 to-[#B8445A]"}');

// Fix the radial gradient mouse glow
code = code.replace('rgba(212, 175, 55, 0.03)', '${isDark ? "rgba(212, 175, 55, 0.03)" : "rgba(184, 68, 90, 0.03)"}');

fs.writeFileSync('src/components/sections/TechMatrix.tsx', code);
console.log("Done");
