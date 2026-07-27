"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GoldenTrail from "@/components/visuals/GoldenTrail";

type Project = {
    id: number;
    title: string;
    category: string;
    desc: string;
    color: string;
    textColor: string;
    img?: string;
    link?: string;
};

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Deep Ocean: Acoustic Classifier",
        category: "MACHINE LEARNING",
        desc: "Deep learning pipeline for real-time marine mammal acoustic classification from noisy underwater sensor streams.",
        color: "#0a0a0a",
        textColor: "#fdfdfd",
        img: "/1.jpg"
    },
    {
        id: 2,
        title: "Anomaly Architect",
        category: "CYBERSECURITY AI",
        desc: "A neural anomaly detection system for power grid substations, utilizing autoencoders to identify cyber-physical intrusions.",
        color: "#18181b",
        textColor: "#fdfdfd",
        img: "/2.jpg"
    },
    {
        id: 3,
        title: "Neural Vision",
        category: "COMPUTER VISION",
        desc: "High-throughput inference engine for early-stage pathology detection in high-resolution medical imaging.",
        color: "#fdfdfd",
        textColor: "#fdfdfd",
        img: "/3.jpg"
    },
    {
        id: 4,
        title: "Distributed API Gateway",
        category: "SYSTEMS ENGINEERING",
        desc: "High-performance distributed rate limiter and API Gateway built with Go and Redis for enterprise traffic management.",
        color: "#0a0a0a",
        textColor: "#fdfdfd",
        img: "/4.jpg"
    },
    {
        id: 5,
        title: "Federated Learning Mesh",
        category: "DISTRIBUTED AI",
        desc: "Decentralized model training architecture enabling privacy-preserving machine learning across edge devices.",
        color: "#181818",
        textColor: "#fdfdfd",
        img: "/5.jpg"
    }
];

const HorizontalScrollCarousel = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 px-4 sm:px-12 md:px-24">
                    {PROJECTS.map((project, index) => {
                        return <Card project={project} key={project.id} index={index + 1} total={PROJECTS.length} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ project, index, total }: { project: Project; index: number; total: number }) => {
    return (
        <div
            className="group relative h-[65vh] w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] overflow-hidden rounded-[2rem] flex flex-col justify-between p-8 md:p-12 transition-transform duration-500 ease-out hover:scale-[0.98]"
            style={{ backgroundColor: project.color, color: project.textColor }}
        >
            {/* Background Image if exists */}
            {project.img && (
                <div className="absolute inset-0 z-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100">
                    <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700" />
                </div>
            )}

            {/* Noise overlay for texture */}
            <div
                className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="relative z-20 flex justify-between items-start w-full">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#C9A96E]">
                    {project.category}
                </span>
                <span className="text-sm font-mono opacity-60 text-white">
                    {index.toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
                </span>
            </div>

            <div className="relative z-20 mt-auto">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6 transition-transform duration-500 group-hover:translate-x-2">
                    {project.title}
                </h2>
                <p className="text-lg md:text-xl font-light opacity-80 max-w-sm mb-8 transition-transform duration-500 group-hover:translate-x-2 delay-75">
                    {project.desc}
                </p>

                <Link href={project.link || "#"} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium group/link transition-transform duration-500 group-hover:translate-x-2 delay-100">
                    Explore Project
                    <span className="block transform transition-transform duration-300 group-hover/link:translate-x-2 group-hover/link:-translate-y-2">
                        ↗
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default function UnifiedProjectsPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');

        .unified-projects {
          --black: #080808;
          --white: #fdfdfd;
          --gold: #C9A96E;
          --font-serif: 'Cormorant Garamond', serif;
          --font-sans: 'Inter', sans-serif;
          background-color: var(--black);
          color: var(--white);
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          cursor: none;
        }

        .unified-projects * {
          cursor: none;
        }

        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          background-color: var(--gold);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
          mix-blend-mode: difference;
        }

        .custom-cursor.hovering {
          width: 80px;
          height: 80px;
          background-color: transparent;
          border: 1px solid var(--gold);
        }

        .hero-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: clamp(4rem, 10vw, 10rem);
          line-height: 0.9;
          font-weight: 300;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .hero-subtitle {
          margin-top: 2rem;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: var(--gold);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          opacity: 0.5;
        }
        
        .scroll-indicator span {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          writing-mode: vertical-rl;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--white), transparent);
          animation: drop 2s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>

            <div className="unified-projects">
                <motion.div
                    className={`custom-cursor ${isHovering ? "hovering" : ""}`}
                    animate={{
                        x: mousePosition.x,
                        y: mousePosition.y,
                    }}
                    transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
                />

                <main
                    onMouseEnter={() => setIsHovering(false)}
                    className="bg-black"
                >
                    {/* Intro Section */}
                    <section className="hero-section">
                        <GoldenTrail />
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-title relative z-10 pointer-events-none"
                        >
                            Technical<br />Case Studies
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="hero-subtitle relative z-10 pointer-events-none"
                        >
                            Machine Learning &times; Architecture
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="scroll-indicator"
                        >
                            <span>Scroll</span>
                            <div className="scroll-line" />
                        </motion.div>
                    </section>

                    {/* Immersive Horizontal Gallery */}
                    <div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <HorizontalScrollCarousel />
                    </div>

                    {/* Footer Section Space */}
                    <section className="h-screen flex items-center justify-center bg-black relative z-10">
                        <div className="text-center">
                            <p className="font-serif text-3xl md:text-5xl lg:text-7xl mb-8 opacity-80">
                                Let&apos;s build something <br />
                                <span className="text-[#C9A96E] italic">extraordinary.</span>
                            </p>
                            <Link
                                href="mailto:hello@subham.design"
                                className="text-sm uppercase tracking-[0.3em] hover:text-[#C9A96E] transition-colors"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                hello@subham.design
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
