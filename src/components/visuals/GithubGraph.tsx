"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, Activity } from "react-activity-calendar";
import { motion } from "framer-motion";

// Custom theme mapping to use the signature Champagne Gold color (#C9A96E)
const customTheme = {
    light: ['#ebebeb', '#e5dbcc', '#d1b88e', '#C9A96E', '#a88849'],
    dark: ['#1c1c1c', '#332915', '#66512a', '#997a40', '#C9A96E'],
};

const levelMap: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4
};

export default function GithubGraph({ username = "subhamm-09" }: { username?: string }) {
    const [data, setData] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://github-contributions-api.deno.dev/${username}.json`)
            .then(res => res.json())
            .then(res => {
                if (!res.contributions) throw new Error("Invalid format");
                
                // The API returns an array of weeks, so we must flatten it first
                const flatData = res.contributions.flat();
                
                // Map the data to react-activity-calendar format
                let mappedData: Activity[] = flatData.map((c: any) => ({
                    date: c.date,
                    count: c.contributionCount,
                    level: levelMap[c.contributionLevel] || 0
                }));
                
                // Filter to exactly the last 6 months of available data safely
                const validData = mappedData.filter(a => a.date);
                if (validData.length > 0) {
                    const lastDateStr = validData[validData.length - 1].date;
                    const lastDate = new Date(lastDateStr);
                    
                    if (!isNaN(lastDate.getTime())) {
                        const sixMonthsAgo = new Date(lastDate);
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                        
                        const filtered = validData.filter((activity) => {
                            const d = new Date(activity.date);
                            return !isNaN(d.getTime()) && d >= sixMonthsAgo;
                        });
                        
                        if (filtered.length > 0) {
                            mappedData = filtered;
                        }
                    }
                }
                
                setData(mappedData);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [username]);

    return (
        <motion.div 
            className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center bg-[#0d0d0d] rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Glossy background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
            
            <div className="w-full flex flex-col items-center relative z-10">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-12">
                    Open Source <span className="text-[#C9A96E]">Footprint</span>
                </h3>
                
                <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#1c1c1c] [&::-webkit-scrollbar-thumb]:bg-[#C9A96E] [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div className="min-w-[800px] flex justify-center text-white/80">
                        {loading ? (
                            <div className="text-white/50 text-sm tracking-widest uppercase flex items-center gap-3">
                                <span className="w-4 h-4 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
                                Initializing Telemetry...
                            </div>
                        ) : error ? (
                            <div className="text-red-500/80 text-sm tracking-widest uppercase">
                                Connection lost: Unable to fetch data
                            </div>
                        ) : data.length === 0 ? (
                            <div className="text-white/50 text-sm tracking-widest uppercase">
                                No contribution data found
                            </div>
                        ) : (
                            <ActivityCalendar 
                                data={data}
                                colorScheme="dark"
                                theme={customTheme}
                                blockSize={14}
                                blockMargin={6}
                                fontSize={12}
                            />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
