"use client";

import { FaGithub, FaLinkedinIn, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Socials() {
    return (
        <div className="w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col items-center justify-center py-12 relative z-40">
            <div className="flex items-center gap-4 md:gap-6">
                <a href="https://github.com/subhamm-09" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center justify-center hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black hover:scale-110 transition-all duration-300">
                    <FaGithub size={22} />
                </a>
                <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center justify-center hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black hover:scale-110 transition-all duration-300">
                    <FaLinkedinIn size={20} />
                </a>
                <a href="#" aria-label="Telegram" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center justify-center hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black hover:scale-110 transition-all duration-300">
                    <FaTelegramPlane size={22} className="mr-0.5 mt-0.5" />
                </a>
                <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center justify-center hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black hover:scale-110 transition-all duration-300">
                    <FaTwitter size={20} />
                </a>
                <a href="#" aria-label="LeetCode" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white/80 flex items-center justify-center hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black hover:scale-110 transition-all duration-300">
                    <SiLeetcode size={20} />
                </a>
            </div>
            {/* Spacing to clear the floating bottom navigation pill */}
            <div className="h-24" />
        </div>
    );
}
