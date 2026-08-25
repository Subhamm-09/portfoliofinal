"use client";

import { motion } from "framer-motion";

export default function TopBar() {
    return (
        <motion.a
            href="/Subham_Resume_Updated.docx"
            download="Subham_Resume_Updated.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-6 right-6 md:top-8 md:right-10 z-[9999] bg-[#fdfdfd] text-[#080808] border border-[#C9A96E] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-8 py-3.5 rounded-full shadow-xl hover:bg-[#C9A96E] hover:text-white hover:scale-105 transition-all duration-300"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
            Resume
        </motion.a>
    );
}
