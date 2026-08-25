export type Experience = {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    stack: string[];
    img?: string;
};

export const EXPERIENCES: Experience[] = [
    {
        id: 1,
        role: "Applied Technology Intern",
        company: "Coratia Technologies",
        period: "SUMMER 2026",
        description: "Spearheaded the development of an end-to-end machine learning pipeline for marine acoustic classification. Engineered robust feature extraction protocols using Librosa to process raw hydrophone streams, and leveraged advanced data preprocessing and hyperparameter tuning to optimize model architecture. The resulting system successfully categorizes complex subsea anomalies in high-noise environments.",
        stack: ["Python", "Librosa", "Scikit-learn", "Pandas", "Matplotlib", "ML Pipelines"],
        img: "/coratia.svg"
    }
];