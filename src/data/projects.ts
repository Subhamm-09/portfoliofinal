export type Project = {
    id: number;
    title: string;
    category: string;
    subtitle?: string;
    desc: string;
    color: string;
    textColor: string;
    img: string;
    cardImg?: string;
    details: string;
    tags: string[];
    github?: string;
    live?: string;
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Underwater Acoustic Classifier",
        category: "MACHINE LEARNING",
        subtitle: "Perception & Signal Processing",
        desc: "Deep learning pipeline for real-time marine acoustic classification, processing noisy underwater sensor streams to detect and categorize subsea anomalies.",
        details: "This project leverages state-of-the-art Convolutional Neural Networks (CNNs) and recurrent architectures to analyze complex acoustic waveforms in real-time. By processing hydrophone data through custom signal-processing pipelines and spectrogram conversions, the system effectively distinguishes between biological signals, ambient ocean noise, and anthropogenic disturbances (such as submarines or vessels) with over 94% accuracy in high-noise environments. Built with Python, PyTorch, Librosa, and deployed on edge computing devices.",
        color: "#EAE6DE",
        textColor: "#111111",
        img: "/deep_ocean.png",
        cardImg: "/project_card_1.png",
        tags: ["PyTorch", "Librosa", "Signal Processing", "Deep Learning"]
    },
    {
        id: 2,
        title: "Competitive Engineering Intelligence System",
        category: "DATA ENGINEERING",
        subtitle: "Competitive Intelligence Platform",
        desc: "An automated intelligence platform that ingests, processes, and analyzes competitive engineering data to drive strategic architecture and business decisions.",
        details: "Jarvis is an automated intelligence platform and academic analytics system developed as an end-to-end data pipeline. It ingests, structures, and cross-references performance metrics, technical publications, and curriculum benchmarks. Utilizing advanced Natural Language Processing and heuristic ranking models, Jarvis provides predictive academic trajectories and automated guidance. Built with Python, FastAPI, PostgreSQL, and modern reactive dashboards.",
        color: "#080718",
        textColor: "#fdfdfd",
        img: "/grid_sentinel.png",
        cardImg: "/project_card_2.png",
        tags: ["NLP", "FastAPI", "ETL Pipelines", "PostgreSQL"]
    },
    {
        id: 3,
        title: "ML-Based Surrogate Modeling for Chemical Reactor Yield Prediction",
        category: "PREDICTIVE AI",
        subtitle: "Chemical Reactor Yield Prediction",
        desc: "Machine learning-based surrogate modeling for chemical reactors, significantly reducing computational overhead for complex fluid dynamics simulations and yield prediction.",
        details: "Traditional Computational Fluid Dynamics (CFD) simulations for chemical reactor optimization can take days to compute. This project developed a machine learning surrogate model—using Physics-Informed Neural Networks (PINNs)—that approximates the underlying Navier-Stokes equations and chemical kinetics. The result is a system capable of predicting temperature distribution, pressure drops, and product yields in seconds with less than 2% deviation from full-scale CFD simulations.",
        color: "#EAE6DE",
        textColor: "#111111",
        img: "/neural_vision.png",
        cardImg: "/project_card_3.png",
        tags: ["TensorFlow", "PINNs", "Simulation", "Optimization"]
    },
    {
        id: 4,
        title: "Anomaly Architect",
        category: "CYBERSECURITY AI",
        subtitle: "Substation Anomaly Detection",
        desc: "A neural anomaly detection system for power grid substations, utilizing autoencoders to identify cyber-physical intrusions.",
        details: "Critical infrastructure is highly vulnerable to sophisticated zero-day cyber-physical attacks. Anomaly Architect uses unsupervised deep learning (specifically variational autoencoders) trained on months of normal SCADA network traffic and sensor telemetry. Built with TensorFlow and Kafka.",
        color: "#0a0a0a",
        textColor: "#fdfdfd",
        img: "/4.jpg",
        tags: ["Autoencoders", "SCADA", "Cybersecurity", "Kafka"]
    },
    {
        id: 5,
        title: "Distributed API Gateway",
        category: "SYSTEMS ENGINEERING",
        subtitle: "High-Throughput Gateway",
        desc: "High-performance distributed rate limiter and API Gateway built with Go and Redis for enterprise traffic management.",
        details: "Designed to handle microservice architectures at scale, this API gateway serves as the primary ingress point for thousands of requests per second. Written purely in Go to exploit its high-concurrency goroutine model.",
        color: "#181818",
        textColor: "#fdfdfd",
        img: "/5.jpg",
        tags: ["Go", "Redis", "Distributed Systems", "Concurrency"]
    }
];