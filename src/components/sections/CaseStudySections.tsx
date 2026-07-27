"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ─── Shared animation utilities ───────────────────────────────────────────────

type V = import("framer-motion").Variants;

const fadeUp: V = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }
    }
};

const stagger: V = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="text-[10px] uppercase tracking-[0.3em] text-[#FF5F1F] mb-4 font-mono">
        {children}
    </div>
);

const SectionHeading = ({ top, bottom }: { top: string; bottom?: string }) => (
    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-[1.05]">
        {top}
        {bottom && (
            <>
                <br />
                <span className="italic text-white/30">{bottom}</span>
            </>
        )}
    </h2>
);

// ─── Root export ──────────────────────────────────────────────────────────────

export default function CaseStudySections() {
    return (
        <div className="relative w-full bg-[#090909] text-white">
            <ProjectOverview />
            <DesignProcess />
            <VisualRationale />
            <TechnicalImplementation />
            <Outcome />
            <NextProject />
        </div>
    );
}

// ─── Section 2: Project Overview ──────────────────────────────────────────────

function ProjectOverview() {
    const pillars = [
        {
            label: "Objective",
            value: "Create a cinematic digital presence that communicates technical depth and design refinement simultaneously — at first glance."
        },
        {
            label: "Target Audience",
            value: "Deep tech companies, research labs, and engineering teams seeking a senior machine learning engineer and software architect."
        },
        {
            label: "Design Approach",
            value: "Editorial luxury meets experimental web. Minimal structure with maximal visual tension. Restraint as a signal of confidence."
        }
    ];

    return (
        <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.4fr] gap-16 md:gap-24 lg:gap-32">

                    {/* Left: pillars */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="flex flex-col gap-10"
                    >
                        {pillars.map((p) => (
                            <motion.div
                                key={p.label}
                                variants={fadeUp}
                                className="border-l border-[#FF5F1F]/25 pl-6 group hover:border-[#FF5F1F]/60 transition-colors duration-500"
                            >
                                <SectionLabel>{p.label}</SectionLabel>
                                <p className="text-white/55 font-light leading-relaxed text-sm md:text-base">
                                    {p.value}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: narrative summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col justify-center"
                    >
                        <SectionLabel>Overview</SectionLabel>
                        <p className="text-2xl md:text-3xl font-serif font-light text-white/85 leading-[1.5] tracking-tight mb-8">
                            A fully immersive portfolio built at the intersection of{" "}
                            <span className="italic text-white">engineering precision</span>{" "}
                            and{" "}
                            <span className="text-[#FF5F1F]">design intent.</span>
                        </p>
                        <p className="text-white/40 font-light leading-relaxed text-sm md:text-base">
                            Every component is deliberate. Every algorithmic choice communicates scalability.
                            The result is a digital body of work that commands attention through engineering —
                            relying on optimized data pipelines, computational physics, and robust architecture rather than decoration.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

// ─── Section 3: Design Process ────────────────────────────────────────────────

function DesignProcess() {
    const phases = [
        {
            number: "01",
            title: "Data Strategy",
            description: "Analyzed complex datasets from acoustic sensors and grid substations, engineering robust preprocessing pipelines to ensure high-fidelity inputs for deep learning models."
        },
        {
            number: "02",
            title: "Architecture",
            description: "Designed scalable, distributed backend architectures utilizing autoencoders and CNNs, prioritizing low-latency inference and optimized VRAM allocation for real-time processing."
        },
        {
            number: "03",
            title: "AI Integration",
            description: "Built custom streaming APIs and Server-Sent Events (SSE) interfaces to bridge heavy machine learning backends with fluid, real-time client applications."
        },
        {
            number: "04",
            title: "Development",
            description: "Built with Next.js App Router, Framer Motion spring physics, Three.js WebGL for depth effects, and Lenis for liquid scroll inertia — maintaining consistent 60fps across the board."
        }
    ];

    return (
        <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1 }}
                    className="mb-20 md:mb-28"
                >
                    <SectionLabel>Process</SectionLabel>
                    <SectionHeading top="Engineering" bottom="Process" />
                </motion.div>

                {/* 4-column grid separated by hairline borders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
                    {phases.map((phase, i) => (
                        <motion.div
                            key={phase.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#090909] p-8 md:p-10 lg:p-12 flex flex-col gap-8 hover:bg-white/[0.02] transition-colors duration-500 group"
                        >
                            <h3 className="text-xl md:text-2xl font-serif text-white/90">{phase.title}</h3>
                            <p className="text-white/40 font-light text-sm leading-relaxed mt-auto">{phase.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

// ─── Section 4: Visual Rationale ─────────────────────────────────────────────

function VisualRationale() {
    const decisions = [
        {
            label: "Typography",
            title: "Why Cormorant × Inter?",
            description: "The editorial serif creates warmth and perceived luxury. The geometric sans-serif provides technical credibility. Their contrast generates visual tension — the core mechanical force behind editorial design systems.",
            bgClass: "bg-gradient-to-br from-amber-950 via-orange-950/60 to-[#090909]",
            accentText: "Aa"
        },
        {
            label: "Color System",
            title: "Why Fluorescent Orange on Black?",
            description: "Pure near-black maximizes contrast and provides a cinema-level depth. Fluorescent #FF5F1F functions as a single electric signal — guiding attention without competing with content. One accent. Total control.",
            bgClass: "bg-gradient-to-br from-orange-950 via-red-950/40 to-[#090909]",
            accentText: "#FF"
        },
        {
            label: "Layout",
            title: "Why Asymmetric Grid?",
            description: "Symmetric grids signal safety and convention. Asymmetric layouts — heavy left columns with deliberate right tension — signal confidence and authority. The 60/40 split creates a natural vertical reading axis.",
            bgClass: "bg-gradient-to-br from-neutral-900 via-stone-900/60 to-[#090909]",
            accentText: "6/4"
        },
        {
            label: "Motion",
            title: "Why Physics-Based Animation?",
            description: "Spring physics with tuned mass and damping feel organic and human. Scroll-linked parallax creates genuine depth perception by differentiating layer velocities. The site feels physically present, not programmed.",
            bgClass: "bg-gradient-to-br from-purple-950 via-indigo-950/40 to-[#090909]",
            accentText: "∿"
        }
    ];

    return (
        <section className="w-full py-32 md:py-48 border-t border-white/[0.04]">

            {/* Heading */}
            <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-20 md:mb-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1 }}
                >
                    <SectionLabel>Decisions</SectionLabel>
                    <SectionHeading top="Visual" bottom="Rationale" />
                </motion.div>
            </div>

            {/* Full-bleed visual rows */}
            <div className="flex flex-col">
                {decisions.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9 }}
                        className="w-full"
                    >
                        {/* Full-width visual block */}
                        <div className={`w-full h-[45vh] md:h-[55vh] ${item.bgClass} relative overflow-hidden flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,95,31,0.06)_0%,transparent_70%)]" />
                            {/* Giant ghost typography in background */}
                            <div className="text-[12rem] md:text-[18rem] lg:text-[22rem] font-serif font-light text-white/[0.04] tracking-tighter select-none leading-none">
                                {item.accentText}
                            </div>
                            {/* Label overlay */}
                            <div className="absolute bottom-6 left-6 md:left-12 lg:left-24">
                                <div className="text-[9px] uppercase tracking-[0.35em] text-[#FF5F1F]/60">
                                    {item.label}
                                </div>
                            </div>
                        </div>

                        {/* Explanation text below visual */}
                        <div className="px-6 md:px-12 lg:px-24 py-10 md:py-14 grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6 md:gap-12 border-b border-white/[0.04] max-w-7xl mx-auto w-full">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-lg md:text-xl font-serif text-white/85"
                            >
                                {item.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-white/45 font-light leading-relaxed text-sm md:text-base"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ─── Section 5: Technical Implementation ─────────────────────────────────────

function TechnicalImplementation() {
    const stack = [
        {
            title: "Next.js 14",
            detail: "App Router architecture with server components and static generation — enabling sub-second page loads with zero layout shift."
        },
        {
            title: "Three.js / R3F",
            detail: "React Three Fiber powers the WebGL cylinder tunnel with real-time texture coordinate animation at 60fps using GPU-direct compositing."
        },
        {
            title: "Framer Motion",
            detail: "useScroll, useTransform, and spring physics for fluid scroll-linked animations. Hardware-accelerated via GPU transform compositing."
        },
        {
            title: "Lenis",
            detail: "Custom momentum-based smooth scroll providing liquid inertia across the entire site without janky frame drops or layout reflow."
        },
        {
            title: "Tailwind CSS",
            detail: "JIT utility styling enabling rapid typographic iteration and responsive breakpoint design without accumulated CSS dead weight."
        },
        {
            title: "TypeScript",
            detail: "Full type safety across all React components, custom hooks, and Three.js WebGL rendering interfaces."
        }
    ];

    const extras = [
        {
            title: "Performance Engineering",
            body: "WebGL DPR clamped to [1, 1.5] to prevent VRAM saturation on Retina displays. Antialiasing disabled on the kinetic tunnel — imperceptible during animation. All DOM animations use GPU-composited `will-change: transform`. Passive event listeners eliminate scroll blocking."
        },
        {
            title: "AI Integration & Tooling",
            body: "Custom Server-Sent Events (SSE) parser for real-time LLM streaming. Implemented function calling for intent classification and session hydration via native storage APIs, avoiding heavy third-party AI wrappers."
        }
    ];

    return (
        <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1 }}
                    className="mb-20 md:mb-28"
                >
                    <SectionLabel>Stack</SectionLabel>
                    <SectionHeading top="Technical" bottom="Implementation" />
                </motion.div>

                {/* Tech stack grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] mb-px">
                    {stack.map((tech, i) => (
                        <motion.div
                            key={tech.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#090909] p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-500 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-0.5 h-7 bg-[#FF5F1F]/20 group-hover:bg-[#FF5F1F] transition-colors duration-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="text-white font-medium mb-3 text-sm tracking-wide">{tech.title}</h3>
                                    <p className="text-white/35 font-light text-sm leading-relaxed">{tech.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Performance + Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
                    {extras.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.1 }}
                            className="bg-[#090909] p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500"
                        >
                            <SectionLabel>{item.title}</SectionLabel>
                            <p className="text-white/40 font-light leading-relaxed text-sm md:text-base">{item.body}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

// ─── Section 6: Outcome ───────────────────────────────────────────────────────

function Outcome() {
    const metrics = [
        {
            value: "10x",
            label: "Inference Speed",
            description: "Optimized tensor operations resulting in an order-of-magnitude reduction in latency."
        },
        {
            value: "99%",
            label: "System Uptime",
            description: "Robust architecture ensures high availability for mission-critical ML pipelines."
        },
        {
            value: "↑",
            label: "Engineering Depth",
            description: "Communicates deep technical capability while maintaining premium aesthetic standards."
        },
        {
            value: "60",
            label: "Performance",
            description: "Consistent 60fps across WebGL and DOM animation render layers, proving front-to-back optimization."
        }
    ];

    return (
        <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1 }}
                    className="mb-20 md:mb-28"
                >
                    <SectionLabel>Result</SectionLabel>
                    <SectionHeading top="Project" bottom="Outcome" />
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#090909] p-8 md:p-10 lg:p-12 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors duration-500"
                        >
                            <div className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#FF5F1F] leading-none mb-2">
                                {m.value}
                            </div>
                            <div className="text-[9px] uppercase tracking-[0.25em] text-white/50">{m.label}</div>
                            <p className="text-white/25 font-light text-xs md:text-sm leading-relaxed mt-auto">{m.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

// ─── Section 7: Next Project ──────────────────────────────────────────────────

function NextProject() {
    return (
        <section className="w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="text-[9px] uppercase tracking-[0.35em] text-white/20 mb-8 font-mono">Next</div>
                    <Link
                        href="/projects/engineering"
                        className="group flex items-end gap-4 md:gap-8"
                        data-cursor-hide="true"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-[8rem] xl:text-[10rem] font-serif font-light text-white/15 group-hover:text-white/90 tracking-tight leading-[1] transition-colors duration-700 ease-out">
                            Explore Next<br />Project
                        </h2>
                        <motion.span
                            className="text-3xl md:text-5xl text-[#FF5F1F] mb-2 md:mb-4 flex-shrink-0"
                            animate={{ x: [0, 0] }}
                            whileHover={{ x: 12 }}
                            transition={{ duration: 0.4 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
