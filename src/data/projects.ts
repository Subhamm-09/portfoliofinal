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
        subtitle: "Deep Learning & Acoustic Signal Processing",
        desc: "End-to-end signal processing and machine learning pipeline for classifying underwater hydrophone recordings into Biological, Vessel, and Ambient soundscapes.",
        details: "An end-to-end audio classification system for underwater soundscapes. Audio is resampled to 16 kHz, normalized, and windowed into 3-second segments before extracting a 155-dimensional feature representation (MFCC, Mel Spectrogram, Chroma, Spectral Centroid, ZCR). Benchmarked across 5 classical ML models (Logistic Regression, KNN, SVM, Random Forest, XGBoost) and a pre-trained YAMNet deep learning transfer architecture achieving 94.8% accuracy. Deployed as a full-featured Streamlit application.",
        color: "#EAE6DE",
        textColor: "#111111",
        img: "/deep_ocean.png",
        cardImg: "/Card_1.png",
        tags: ["Python", "Librosa", "Audio DSP", "Scikit-Learn", "YAMNet", "TensorFlow", "Streamlit"],
        github: "https://github.com/Subhamm-09/Underwater-Accoustic-Classifier",
        live: "https://underwater-accoustic-classifier-fcw6yw5jmxbu84tvmzpwfk.streamlit.app/"
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
        cardImg: "/Card_2.png",
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
        cardImg: "/Card_3.png",
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
        img: "/grid_sentinel.png",
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
        img: "/neural_vision.png",
        tags: ["Go", "Redis", "Distributed Systems", "Concurrency"]
    }
];