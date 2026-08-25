"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function GoldenTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isDark } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;

        // Colors
        const rgb = isDark ? "201, 169, 110" : "184, 68, 90";

        // Trail physics configuration
        const trailLength = 80;
        const trail = new Array(trailLength)
            .fill(0)
            .map(() => ({ x: 0, y: 0, dx: 0, dy: 0 }));

        let mouse = { x: 0, y: 0 };
        let isMouseMoved = false;

        const resize = () => {
            if (!canvas.parentElement) return;
            const scale = window.devicePixelRatio || 1;
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.scale(scale, scale);
        };

        window.addEventListener("resize", resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (!isMouseMoved) {
                trail.forEach((t) => {
                    t.x = x;
                    t.y = y;
                });
                isMouseMoved = true;
            }
            mouse.x = x;
            mouse.y = y;
        };

        window.addEventListener("mousemove", onMouseMove);

        const spring = 0.4;
        const friction = 0.5;

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            if (isMouseMoved) {
                let px = mouse.x;
                let py = mouse.y;

                for (let i = 0; i < trailLength; i++) {
                    const p = trail[i];
                    p.dx += (px - p.x) * spring;
                    p.dy += (py - p.y) * spring;
                    p.dx *= friction;
                    p.dy *= friction;
                    p.x += p.dx;
                    p.y += p.dy;

                    px = p.x;
                    py = p.y;
                }

                ctx.lineCap = "round";
                ctx.lineJoin = "round";

                // Luxurious glowing aura
                ctx.shadowBlur = 25;
                ctx.shadowColor = `rgba(${rgb}, 0.6)`;

                for (let i = 0; i < trailLength - 1; i++) {
                    const p1 = trail[i];
                    const p2 = trail[i + 1];
                    const ratio = 1 - i / trailLength;

                    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                    // Only draw visible moving segments to prevent artifacting when still
                    if (dist > 0.05) {
                        // Core aura
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${rgb}, ${ratio * 0.6})`;
                        ctx.lineWidth = 5 * ratio + 1;
                        ctx.stroke();

                        // Inner bright highlight for a silky neon effect
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${ratio * 0.4})`;
                        ctx.lineWidth = 1.5 * ratio;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none touch-none"
        />
    );
}
