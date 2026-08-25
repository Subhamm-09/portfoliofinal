"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function GoldenTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isDark } = useTheme();

    useEffect(() => {
        // Disable on touch devices and reduced motion to preserve CPU/battery
        if (
            typeof window === "undefined" ||
            window.matchMedia("(pointer: coarse)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let scale = 1;

        const rgb = isDark ? "201, 169, 110" : "184, 68, 90";

        // Trail physics configuration
        const trailLength = 50; // Optimized particle count for 60-120fps smoothness
        const trail = new Array(trailLength)
            .fill(0)
            .map(() => ({ x: 0, y: 0, dx: 0, dy: 0 }));

        let mouse = { x: -100, y: -100 };
        let isMouseMoved = false;
        let isIdle = true;
        let idleTimer: NodeJS.Timeout;
        let isTabVisible = true;
        let isIntersecting = true;

        const resize = () => {
            if (!canvas.parentElement) return;
            scale = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        };

        window.addEventListener("resize", resize, { passive: true });
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
            isIdle = false;

            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                isIdle = true;
            }, 2500);

            if (!animationFrameId && isTabVisible && isIntersecting) {
                render();
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });

        const handleVisibilityChange = () => {
            isTabVisible = !document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const observer = new IntersectionObserver(
            ([entry]) => {
                isIntersecting = entry.isIntersecting;
                if (isIntersecting && !isIdle && !animationFrameId) {
                    render();
                }
            },
            { threshold: 0.05 }
        );
        observer.observe(canvas);

        const spring = 0.4;
        const friction = 0.5;

        let animationFrameId: number = 0;

        const render = () => {
            if (!isTabVisible || !isIntersecting) {
                animationFrameId = 0;
                return;
            }

            ctx.clearRect(0, 0, width, height);

            if (isMouseMoved) {
                let px = mouse.x;
                let py = mouse.y;
                let totalMovement = 0;

                for (let i = 0; i < trailLength; i++) {
                    const p = trail[i];
                    p.dx += (px - p.x) * spring;
                    p.dy += (py - p.y) * spring;
                    p.dx *= friction;
                    p.dy *= friction;
                    p.x += p.dx;
                    p.y += p.dy;

                    totalMovement += Math.abs(p.dx) + Math.abs(p.dy);
                    px = p.x;
                    py = p.y;
                }

                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.shadowBlur = 18;
                ctx.shadowColor = `rgba(${rgb}, 0.5)`;

                for (let i = 0; i < trailLength - 1; i++) {
                    const p1 = trail[i];
                    const p2 = trail[i + 1];
                    const ratio = 1 - i / trailLength;

                    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                    if (dist > 0.1) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${rgb}, ${ratio * 0.6})`;
                        ctx.lineWidth = 4 * ratio + 1;
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${ratio * 0.4})`;
                        ctx.lineWidth = 1.2 * ratio;
                        ctx.stroke();
                    }
                }

                // If movement has settled and mouse is idle, pause render loop to save CPU
                if (isIdle && totalMovement < 0.2) {
                    ctx.clearRect(0, 0, width, height);
                    animationFrameId = 0;
                    return;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            observer.disconnect();
            clearTimeout(idleTimer);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none touch-none"
        />
    );
}
