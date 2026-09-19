"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { useTheme } from "@/hooks/useTheme";

// ─── Animation Variants ───────────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: expo } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// ─── Benchmarked Models (Transfer DL + Classical ML) ──────────────────────────
const MODEL_BENCHMARKS = [
    { 
        model: "YAMNet + Dense Neural Network", 
        type: "Deep Learning (Transfer)", 
        accuracy: "94.80%", 
        f1: "0.90", 
        accVal: 94.8, 
        highlight: true, 
        badge: "Production Model",
        note: "Pre-trained acoustic embedding backbone (1024-d) with custom dense classifier head. Exceptional noise resilience." 
    },
    { 
        model: "Logistic Regression", 
        type: "Classical ML (Linear)", 
        accuracy: "87.91%", 
        f1: "88.04%", 
        accVal: 87.91, 
        highlight: true, 
        badge: "Top Classical",
        note: "Strongest linear decision boundary on 155-d StandardScaler normalized feature space with fast inference." 
    },
    { 
        model: "k-Nearest Neighbors (KNN)", 
        type: "Classical ML (Instance)", 
        accuracy: "87.96%", 
        f1: "87.23%", 
        accVal: 87.96, 
        highlight: false, 
        note: "Effective local neighborhood density clustering in MFCC & Mel-spectrogram space (k=5)." 
    },
    { 
        model: "Support Vector Machine (SVM)", 
        type: "Classical ML (Kernel)", 
        accuracy: "84.87%", 
        f1: "84.76%", 
        accVal: 84.87, 
        highlight: false, 
        note: "Non-linear RBF kernel mapping on high-dimensional acoustic feature representations." 
    },
    { 
        model: "Random Forest", 
        type: "Classical ML (Ensemble)", 
        accuracy: "83.16%", 
        f1: "81.66%", 
        accVal: 83.16, 
        highlight: false, 
        note: "Ensemble of 100 decision trees with bootstrap aggregation and feature sub-sampling." 
    },
    { 
        model: "XGBoost", 
        type: "Classical ML (Boosting)", 
        accuracy: "82.88%", 
        f1: "81.47%", 
        accVal: 82.88, 
        highlight: false, 
        note: "Gradient boosted decision trees with regularized objective functions." 
    }
];

// ─── Acoustic Target Classes ──────────────────────────────────────────────────
const ACOUSTIC_CLASSES = [
    {
        name: "BIOLOGICAL",
        subtitle: "Marine-life acoustic activity",
        desc: "Cetacean vocalizations, echolocation click trains, and marine bio-acoustic signatures across varied water depths.",
        icon: "🐋",
        brandColor: "#7A6A9E",
        freqRange: "20 Hz – 24 kHz",
        sources: "NOAA Fisheries, Watkins Database, FishSounds"
    },
    {
        name: "VESSELS",
        subtitle: "Anthropogenic / maritime noise",
        desc: "Engine combustion harmonics, propeller cavitation, mechanical shaft rotation, and low-frequency hull resonance.",
        icon: "🚢",
        brandColor: "#B08D57",
        freqRange: "10 Hz – 10 kHz",
        sources: "Ocean Networks Canada, Kaggle, Soundcloud"
    },
    {
        name: "AMBIENCE",
        subtitle: "Background ocean environment",
        desc: "Sea-surface agitation, hydrodynamic wave turbulence, thermal noise, rain, and distant weather disturbances.",
        icon: "🌊",
        brandColor: "#5B8FA8",
        freqRange: "0.1 Hz – 50 kHz",
        sources: "Acoustics UK, Hydrophone Repositories"
    }
];

// ─── 155-Dimensional Feature Breakdown ────────────────────────────────────────
const FEATURE_COMPONENTS = [
    { name: "MFCCs (Coefficients 1–13)", dims: "13 dims", pct: "100%", desc: "Spectral timbre & vocal tract acoustic envelope" },
    { name: "Mel Spectrogram (Energy Bins)", dims: "128 dims", pct: "95%", desc: "128-band non-linear Mel auditory scale power (N_FFT=2048, Hop=512)" },
    { name: "Chroma STFT (Pitch Classes)", dims: "12 dims", pct: "75%", desc: "Harmonic energy distribution across 12 semitone chroma bins" },
    { name: "Spectral Centroid", dims: "1 dim", pct: "50%", desc: "Center of mass / brightness of acoustic frequency distribution" },
    { name: "Zero-Crossing Rate (ZCR)", dims: "1 dim", pct: "40%", desc: "Rate of sign-changes measuring signal noisiness & turbulence" }
];

export default function ProjectDetail() {
    const params = useParams();
    const router = useRouter();
    const { isDark } = useTheme();
    const [project, setProject] = useState(PROJECTS[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const id = parseInt(params.id as string);
        const found = PROJECTS.find(p => p.id === id);
        if (found) {
            setProject(found);
        } else {
            router.push("/projects");
        }
    }, [params.id, router]);

    if (!mounted) return null;

    const isProject1 = project.id === 1;
    const accent = isDark ? "#C9A96E" : "#B8445A";
    const bg = isDark ? "#0A0A09" : "#FCFBF9";
    const text = isDark ? "#fdfdfd" : "#111111";
    const textSub = isDark ? "#8D8A82" : "rgba(10,10,10,0.70)";
    const textMuted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
    const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
    const cardBg = isDark ? "#121211" : "#F6F5F1";

    const nextProject = PROJECTS.find(p => p.id === (project.id % PROJECTS.length) + 1) || PROJECTS[0];

    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-32 px-6 md:px-12 lg:px-24 transition-colors duration-700" style={{ backgroundColor: bg, color: text }}>
            <div className="max-w-6xl mx-auto">
                {/* ── Top Navigation Bar ───────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b" style={{ borderColor: border }}>
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] transition-colors duration-300"
                        style={{ color: textSub }}
                    >
                        <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5" style={{ color: accent }}>←</span>
                        <span>Back to Archive</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
                                style={{ borderColor: accent, color: accent, backgroundColor: `${accent}10` }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                                <span>Live Demo ↗</span>
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
                                style={{ borderColor: border, color: textSub }}
                            >
                                <span>GitHub ↗</span>
                            </a>
                        )}
                        <span className="text-[10px] tracking-[0.3em] font-mono uppercase" style={{ color: textMuted }}>
                            Case Study {project.id < 10 ? `0${project.id}` : project.id}
                        </span>
                    </div>
                </div>

                {/* ── Hero Section ────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
                    {/* Left Column: Title & Problem / Approach */}
                    <motion.div 
                        className="lg:col-span-7 flex flex-col justify-center"
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-[1px]" style={{ backgroundColor: accent }} />
                            <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>
                                {project.category} {isProject1 && "· DEEP LEARNING · ACOUSTIC DSP"}
                            </span>
                        </motion.div>

                        <motion.h1 
                            variants={fadeUp}
                            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight mb-8"
                        >
                            {project.title}
                        </motion.h1>

                        {/* Tags Pill Row */}
                        {project.tags && project.tags.length > 0 && (
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border"
                                        style={{
                                            borderColor: border,
                                            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                                            color: textSub,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        )}

                        {/* Direct Action Links (Mobile + Desktop Hero) */}
                        {(project.live || project.github) && (
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                        style={{
                                            backgroundColor: accent,
                                            color: isDark ? "#0A0A09" : "#FCFBF9"
                                        }}
                                    >
                                        <span>Launch Streamlit Web App</span>
                                        <span>↗</span>
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-medium border transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                            borderColor: border,
                                            backgroundColor: cardBg,
                                            color: text
                                        }}
                                    >
                                        <span>Source Code on GitHub</span>
                                        <span>↗</span>
                                    </a>
                                )}
                            </motion.div>
                        )}

                        {/* THE PROBLEM */}
                        <motion.div variants={fadeUp} className="mb-8 p-7 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor: border }}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold" style={{ color: accent }}>
                                    THE PROBLEM
                                </span>
                            </div>
                            <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: textSub }}>
                                {isProject1 
                                    ? "Underwater acoustic recordings are highly variable and often contain overlapping sources, background noise, and long periods of ambient sound. The goal was to build a classification pipeline capable of transforming raw hydrophone recordings into meaningful acoustic categories."
                                    : project.desc
                                }
                            </p>
                        </motion.div>

                        {/* THE APPROACH */}
                        <motion.div variants={fadeUp} className="p-7 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor: border }}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold" style={{ color: accent }}>
                                    THE APPROACH
                                </span>
                            </div>
                            <p className="text-base sm:text-lg leading-relaxed font-light" style={{ color: textSub }}>
                                {isProject1
                                    ? "Audio recordings were segmented into fixed-length windows and converted into a compact feature representation combining MFCCs, Mel-spectrogram features, Chroma, Spectral Centroid, and Zero-Crossing Rate. These features were then evaluated across multiple classical machine-learning classifiers, alongside a pre-trained YAMNet deep learning transfer architecture."
                                    : project.details
                                }
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: High-Res Visual Display Card */}
                    <motion.div 
                        className="lg:col-span-5 relative h-[540px] sm:h-[640px] w-full rounded-2xl overflow-hidden flex items-center justify-center border shadow-2xl sticky top-28"
                        style={{
                            borderColor: border,
                            backgroundColor: isDark ? "#06060c" : "#f0ede6"
                        }}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: expo }}
                    >
                        {(project.cardImg || project.img) && (
                            <div className="relative w-full h-full p-4 flex items-center justify-center">
                                <Image
                                    src={project.cardImg || project.img}
                                    alt={project.title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        )}
                        {/* Film Grain Noise */}
                        <div
                            className="absolute inset-0 z-10 opacity-15 pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                            }}
                        />
                    </motion.div>
                </div>

                {/* ── IF PROJECT 1: DEEP ML CASE STUDY EXPANSION ─────────────────── */}
                {isProject1 && (
                    <>
                        {/* ── SECTION 1: THE DATA & METRICS ─────────────────────── */}
                        <motion.section 
                            className="py-16 border-t"
                            style={{ borderColor: border }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-[1px]" style={{ backgroundColor: accent }} />
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>
                                    THE DATA
                                </span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-light mb-4">
                                Dataset Scale &amp; Target Classes
                            </motion.h2>

                            <motion.p variants={fadeUp} className="text-base font-light leading-relaxed mb-12 max-w-3xl" style={{ color: textSub }}>
                                Audio recordings were curated from multiple maritime research databases including NOAA Fisheries, Watkins Marine Database, FishSounds.net, and Ocean Networks Canada, encompassing diverse ocean environments and hydrophone depths.
                            </motion.p>

                            {/* 4 Stat Counters */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                {[
                                    { value: "212", label: "Unique recordings", note: "Hydrophone captures" },
                                    { value: "155", label: "Audio features", note: "Extracted per window" },
                                    { value: "3", label: "Acoustic classes", note: "Distinct sound categories" },
                                    { value: "94.8%", label: "Peak Model Accuracy", note: "YAMNet Deep Learning" }
                                ].map((stat) => (
                                    <motion.div
                                        key={stat.label}
                                        variants={fadeUp}
                                        className="p-6 rounded-2xl border flex flex-col justify-between"
                                        style={{ backgroundColor: cardBg, borderColor: border }}
                                    >
                                        <div>
                                            <span className="font-serif text-4xl sm:text-5xl font-light block mb-2" style={{ color: accent }}>
                                                {stat.value}
                                            </span>
                                            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: text }}>
                                                {stat.label}
                                            </h3>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: textMuted }}>
                                            {stat.note}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* 3 Acoustic Target Classes Showcase */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {ACOUSTIC_CLASSES.map((cls) => (
                                    <motion.div
                                        key={cls.name}
                                        variants={fadeUp}
                                        className="p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                                        style={{ backgroundColor: cardBg, borderColor: border }}
                                    >
                                        <div 
                                            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none"
                                            style={{ backgroundColor: cls.brandColor }}
                                        />
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-3xl">{cls.icon}</span>
                                            <span 
                                                className="text-[9.5px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border" 
                                                style={{ borderColor: `${cls.brandColor}50`, color: cls.brandColor, backgroundColor: `${cls.brandColor}15` }}
                                            >
                                                {cls.freqRange}
                                            </span>
                                        </div>
                                        <h4 className="font-serif text-2xl font-normal mb-1" style={{ color: text }}>
                                            {cls.name}
                                        </h4>
                                        <span className="text-xs font-mono uppercase tracking-wider block mb-4" style={{ color: cls.brandColor }}>
                                            {cls.subtitle}
                                        </span>
                                        <p className="text-sm font-light leading-relaxed mb-6" style={{ color: textSub }}>
                                            {cls.desc}
                                        </p>
                                        <div className="pt-4 border-t flex flex-col gap-1 text-[11px] font-mono" style={{ borderColor: border }}>
                                            <span style={{ color: textMuted }}>SOURCES:</span>
                                            <span style={{ color: textSub }}>{cls.sources}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* ── SECTION 2: THE PIPELINE ARCHITECTURE ──────────────── */}
                        <motion.section 
                            className="py-16 border-t"
                            style={{ borderColor: border }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-[1px]" style={{ backgroundColor: accent }} />
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>
                                    THE PIPELINE
                                </span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-light mb-12">
                                End-to-End Processing Architecture
                            </motion.h2>

                            {/* Linear Process Flow Badges */}
                            <motion.div 
                                variants={fadeUp}
                                className="flex flex-wrap items-center justify-between gap-3 p-5 rounded-2xl border mb-12"
                                style={{ backgroundColor: cardBg, borderColor: border }}
                            >
                                {[
                                    "RAW AUDIO",
                                    "PREPROCESSING",
                                    "WINDOWING",
                                    "FEATURE EXTRACTION",
                                    "DUAL-PATH CLASSIFIERS",
                                    "PREDICTION OUTPUT"
                                ].map((step, idx, arr) => (
                                    <div key={step} className="flex items-center gap-3">
                                        <span className="text-xs font-mono tracking-widest font-semibold uppercase" style={{ color: idx === arr.length - 1 ? accent : text }}>
                                            {step}
                                        </span>
                                        {idx < arr.length - 1 && (
                                            <span className="text-xs font-mono" style={{ color: accent }}>&rarr;</span>
                                        )}
                                    </div>
                                ))}
                            </motion.div>

                            {/* 4 Pipeline Stages Detail Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        step: "STAGE 01",
                                        title: "PREPROCESSING",
                                        points: [
                                            "Target 16 kHz audio resampling",
                                            "Mono channel format conversion",
                                            "Silence trimming via top_db=25 threshold",
                                            "DC offset elimination: y - mean(y)",
                                            "Peak amplitude normalization: y / max(|y|)"
                                        ]
                                    },
                                    {
                                        step: "STAGE 02",
                                        title: "WINDOWING",
                                        points: [
                                            "3.0-second continuous windows (WINDOW_SEC=3.0)",
                                            "1.5-second hop length (HOP_SEC=1.5)",
                                            "50% overlapping temporal stride",
                                            "Zero-padding boundary handling for short audio",
                                            "Multi-chunk aggregation for stream files"
                                        ]
                                    },
                                    {
                                        step: "STAGE 03",
                                        title: "FEATURE EXTRACTION",
                                        points: [
                                            "13 MFCC coefficients (mean)",
                                            "128 Mel frequency filterbanks (dB scale)",
                                            "12 Chroma STFT pitch classes (mean)",
                                            "1 Spectral Centroid frequency marker",
                                            "1 Zero-Crossing Rate (ZCR) mean",
                                            "Total 155-dimensional feature representation"
                                        ]
                                    },
                                    {
                                        step: "STAGE 04",
                                        title: "DUAL CLASSIFICATION",
                                        points: [
                                            "Path A: Classical ML (Logistic Reg, KNN, SVM, RF, XGBoost) on 155-d vectors",
                                            "Path B: Pre-trained YAMNet 1024-d Transfer Embeddings + Keras Dense Network",
                                            "Confidence distribution calculation",
                                            "Real-time Streamlit web deployment"
                                        ]
                                    }
                                ].map((item) => (
                                    <motion.div
                                        key={item.step}
                                        variants={fadeUp}
                                        className="p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                                        style={{ backgroundColor: cardBg, borderColor: border }}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-mono text-xs tracking-widest font-bold" style={{ color: accent }}>
                                                    {item.step}
                                                </span>
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                                            </div>
                                            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold mb-4" style={{ color: text }}>
                                                {item.title}
                                            </h3>
                                            <ul className="space-y-2">
                                                {item.points.map((pt) => (
                                                    <li key={pt} className="text-xs font-light leading-relaxed flex items-start gap-2" style={{ color: textSub }}>
                                                        <span className="text-[10px] mt-0.5" style={{ color: accent }}>&bull;</span>
                                                        <span>{pt}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* ── SECTION 3: AUDIO → FEATURES TRANSFORMATION VISUAL ─── */}
                        <motion.section 
                            className="py-16 border-t"
                            style={{ borderColor: border }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-[1px]" style={{ backgroundColor: accent }} />
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>
                                    FEATURE EXTRACTION VISUAL
                                </span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-light mb-12">
                                Audio Waveform &rarr; 155-d Feature Vector &rarr; Inference
                            </motion.h2>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                                {/* Stage 1 & 2: Real Audio Waveform & Real Spectrogram */}
                                <motion.div 
                                    variants={fadeUp}
                                    className="lg:col-span-6 p-7 rounded-2xl border flex flex-col justify-between"
                                    style={{ backgroundColor: cardBg, borderColor: border }}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold" style={{ color: accent }}>
                                                01 · HYDROPHONE TIME-SERIES WAVEFORM
                                            </span>
                                            <span className="text-[9px] font-mono uppercase text-neutral-400">16 kHz Sampled Stream</span>
                                        </div>

                                        {/* Real Waveform Image */}
                                        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 relative bg-white/5 mb-6 p-2 flex items-center justify-center">
                                            <div className="relative w-full h-36 sm:h-40">
                                                <Image
                                                    src="/waveform.png"
                                                    alt="Hydrophone Audio Waveform"
                                                    fill
                                                    className="object-contain rounded-lg"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold" style={{ color: accent }}>
                                                02 · 128-BAND MEL-SPECTROGRAM
                                            </span>
                                            <span className="text-[9px] font-mono uppercase text-neutral-400">0 Hz – 8.2 kHz Power (dB)</span>
                                        </div>

                                        {/* Real Spectrogram Image */}
                                        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 relative bg-[#05070a] p-2 flex items-center justify-center">
                                            <div className="relative w-full h-44 sm:h-48">
                                                <Image
                                                    src="/spectogram.png"
                                                    alt="Mel Spectrogram Density"
                                                    fill
                                                    className="object-contain rounded-lg"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: border, color: textMuted }}>
                                        <span>Window: 3.0s (48,000 samples)</span>
                                        <span>Hop: 1.5s (50% overlap)</span>
                                    </div>
                                </motion.div>

                                {/* Stage 3 & 4: 155-Dim Feature Vector & Predicted Output */}
                                <motion.div 
                                    variants={fadeUp}
                                    className="lg:col-span-6 p-7 rounded-2xl border flex flex-col justify-between"
                                    style={{ backgroundColor: cardBg, borderColor: border }}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold" style={{ color: accent }}>
                                                03 · 155-DIMENSIONAL FEATURE VECTOR
                                            </span>
                                            <span className="text-[9px] font-mono uppercase text-neutral-400">StandardScaler Normalized</span>
                                        </div>

                                        {/* Feature Components Breakdown Bars */}
                                        <div className="flex flex-col gap-3.5 mb-6">
                                            {FEATURE_COMPONENTS.map((f) => (
                                                <div key={f.name}>
                                                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                                                        <span style={{ color: text }}>{f.name}</span>
                                                        <span className="text-[10px] font-semibold" style={{ color: accent }}>{f.dims}</span>
                                                    </div>
                                                    <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/5">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-1000"
                                                            style={{
                                                                width: f.pct,
                                                                background: `linear-gradient(to right, ${accent}88, ${accent})`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold" style={{ color: accent }}>
                                                04 · CLASSIFIER INFERENCE
                                            </span>
                                            <span className="text-[9px] font-mono uppercase text-neutral-400">YAMNet Class Probabilities</span>
                                        </div>

                                        {/* Inference Results Pills */}
                                        <div className="grid grid-cols-3 gap-2.5">
                                            {[
                                                { label: "BIOLOGICAL", icon: "🐋", prob: "94.8%", color: "#7A6A9E", active: true },
                                                { label: "VESSELS", icon: "🚢", prob: "3.7%", color: "#B08D57", active: false },
                                                { label: "AMBIENCE", icon: "🌊", prob: "1.5%", color: "#5B8FA8", active: false },
                                            ].map((pred) => (
                                                <div
                                                    key={pred.label}
                                                    className="p-3.5 rounded-xl border text-center transition-all duration-300"
                                                    style={{
                                                        borderColor: pred.active ? pred.color : border,
                                                        backgroundColor: pred.active ? `${pred.color}18` : "transparent"
                                                    }}
                                                >
                                                    <span className="text-base block mb-1">{pred.icon}</span>
                                                    <span className="block text-[9px] font-mono uppercase tracking-wider mb-1" style={{ color: textSub }}>
                                                        {pred.label}
                                                    </span>
                                                    <span className="font-mono text-sm font-semibold" style={{ color: pred.active ? pred.color : textMuted }}>
                                                        {pred.prob}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: border, color: textMuted }}>
                                        <span>Latency: &lt;18ms / window</span>
                                        <span>Accuracy: 94.8% (Macro F1: 0.90)</span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>

                        {/* ── SECTION 4: MODEL EVALUATION & COMPARISON ─────────── */}
                        <motion.section 
                            className="py-16 border-t"
                            style={{ borderColor: border }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-[1px]" style={{ backgroundColor: accent }} />
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>
                                    MODEL EVALUATION
                                </span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl font-light mb-4">
                                Quantitative Benchmark Comparison
                            </motion.h2>

                            <motion.p variants={fadeUp} className="text-base font-light leading-relaxed mb-10 max-w-3xl" style={{ color: textSub }}>
                                Comprehensive evaluation comparing pre-trained Deep Learning transfer models with classical machine learning classifiers trained on 155 engineered features. The YAMNet backbone delivered superior generalization across diverse acoustic noise profiles.
                            </motion.p>

                            {/* Benchmark Comparison Table */}
                            <motion.div variants={fadeUp} className="rounded-2xl border overflow-hidden mb-12" style={{ backgroundColor: cardBg, borderColor: border }}>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b text-[10px] font-mono uppercase tracking-[0.25em]" style={{ borderColor: border, color: textMuted }}>
                                                <th className="p-5 pl-7">Model Architecture</th>
                                                <th className="p-5">Paradigm</th>
                                                <th className="p-5">Accuracy</th>
                                                <th className="p-5">Macro F1</th>
                                                <th className="p-5 hidden md:table-cell">Empirical Observations</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y text-xs font-mono" style={{ borderColor: border }}>
                                            {MODEL_BENCHMARKS.map((m) => (
                                                <tr 
                                                    key={m.model}
                                                    className="transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                                                    style={{ backgroundColor: m.highlight ? `${accent}08` : "transparent" }}
                                                >
                                                    <td className="p-5 pl-7 font-sans font-medium text-sm flex items-center gap-3" style={{ color: text }}>
                                                        {m.highlight && (
                                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                                                        )}
                                                        <div>
                                                            <span>{m.model}</span>
                                                            {m.badge && (
                                                                <span className="ml-2.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border" style={{ borderColor: accent, color: accent }}>
                                                                    {m.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-5 text-xs" style={{ color: textSub }}>
                                                        {m.type}
                                                    </td>
                                                    <td className="p-5 font-semibold text-sm" style={{ color: m.highlight ? accent : text }}>
                                                        {m.accuracy}
                                                    </td>
                                                    <td className="p-5 font-semibold text-sm" style={{ color: m.highlight ? accent : text }}>
                                                        {m.f1}
                                                    </td>
                                                    <td className="p-5 hidden md:table-cell font-sans font-light text-xs" style={{ color: textSub }}>
                                                        {m.note}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </motion.section>

                        {/* ── SECTION 5: INTERACTIVE DEMO & REPO ACCESS ─────────── */}
                        <motion.section 
                            className="py-16 border-t"
                            style={{ borderColor: border }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div 
                                variants={fadeUp}
                                className="p-8 sm:p-12 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                                style={{ 
                                    backgroundColor: cardBg, 
                                    borderColor: border,
                                    background: isDark 
                                        ? "radial-gradient(circle at 10% 20%, rgba(201,169,110,0.06) 0%, rgba(18,18,17,1) 80%)"
                                        : "radial-gradient(circle at 10% 20%, rgba(184,68,90,0.06) 0%, rgba(246,245,241,1) 80%)"
                                }}
                            >
                                <div className="max-w-xl">
                                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold block mb-3" style={{ color: accent }}>
                                        INTERACTIVE DEPLOYMENT
                                    </span>
                                    <h3 className="font-serif text-3xl font-light mb-4" style={{ color: text }}>
                                        Experience the Live Classifier
                                    </h3>
                                    <p className="text-sm font-light leading-relaxed mb-6" style={{ color: textSub }}>
                                        Test the acoustic classification models in real-time. Upload custom .wav audio recordings or evaluate test samples including biological vocalizations, ship engine noises, and ambient soundscapes.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href="https://underwater-accoustic-classifier-fcw6yw5jmxbu84tvmzpwfk.streamlit.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                                            style={{
                                                backgroundColor: accent,
                                                color: isDark ? "#0A0A09" : "#FCFBF9"
                                            }}
                                        >
                                            <span>Open Streamlit App</span>
                                            <span>↗</span>
                                        </a>
                                        <a
                                            href="https://github.com/Subhamm-09/Underwater-Accoustic-Classifier"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-medium border transition-all duration-300 hover:scale-105"
                                            style={{
                                                borderColor: border,
                                                backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                                                color: text
                                            }}
                                        >
                                            <span>GitHub Repository</span>
                                            <span>↗</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl border w-full md:w-80 flex flex-col gap-3 font-mono text-xs" style={{ borderColor: border, backgroundColor: isDark ? "#0E1420" : "#ffffff" }}>
                                    <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: border }}>
                                        <span className="text-[10px] uppercase tracking-wider text-neutral-400">Repository Status</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}20`, color: accent }}>Online</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span style={{ color: textMuted }}>Architecture:</span>
                                        <span style={{ color: text }}>YAMNet + ML</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span style={{ color: textMuted }}>Sampling Rate:</span>
                                        <span style={{ color: text }}>16,000 Hz</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span style={{ color: textMuted }}>Window Length:</span>
                                        <span style={{ color: text }}>3.0s (50% Hop)</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span style={{ color: textMuted }}>Feature Vector:</span>
                                        <span style={{ color: text }}>155 Dimensions</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.section>
                    </>
                )}

                {/* ── Footer Navigation Back ──────────────────────────────────── */}
                <div className="pt-16 border-t flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderColor: border }}>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] transition-colors duration-300 hover:opacity-80"
                        style={{ color: accent }}
                    >
                        <span>&larr; View All Projects</span>
                    </Link>

                    <Link
                        href={`/projects/${nextProject.id}`}
                        className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] transition-colors duration-300 hover:opacity-80"
                        style={{ color: text }}
                    >
                        <span>Next: {nextProject.title} &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}