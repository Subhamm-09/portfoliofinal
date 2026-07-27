"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RenderTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ─── WebGL detection ──────────────────────────────────────────────────────────
function isWebGLAvailable(): boolean {
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
    } catch {
        return false;
    }
}

// ─── 3D Tunnel geometry (only rendered when WebGL is available) ───────────────
function TunnelGeometry() {
    const textRef = useRef<THREE.Texture>(null);
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.wrapS = THREE.RepeatWrapping;
            textRef.current.wrapT = THREE.RepeatWrapping;
            textRef.current.repeat.set(4, 4);
            textRef.current.needsUpdate = true;
        }
    }, []);

    useFrame((state, delta) => {
        if (textRef.current) {
            textRef.current.offset.x -= delta * 0.2;
            textRef.current.offset.y -= delta * 0.1;
        }
        if (groupRef.current) {
            groupRef.current.rotation.z += delta * 0.1;
            groupRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
        }
    });

    return (
        <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
                <cylinderGeometry args={[10, 10, 50, 32, 1, true]} />
                <meshBasicMaterial side={THREE.BackSide} transparent opacity={1}>
                    <RenderTexture attach="map" ref={textRef} anisotropy={16}>
                        <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 5]} />
                        <color attach="background" args={["#000000"]} />
                        <Text
                            fontSize={1.5}
                            fontWeight="bold"
                            color="#FF5F1F"
                            lineHeight={0.9}
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                        >
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN{"\n"}
                            WEB DESIGN WEB DESIGN
                        </Text>
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
        </group>
    );
}

// ─── Premium CSS fallback tunnel (rendered when WebGL is unavailable) ─────────
function CSSFallbackTunnel() {
    return (
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center">
            {/* Animated perspective rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((ring) => (
                    <div
                        key={ring}
                        className="absolute rounded-full border border-[#FF5F1F]/20"
                        style={{
                            width: `${ring * 14}vw`,
                            height: `${ring * 14}vw`,
                            animation: `tunnelPulse ${2 + ring * 0.35}s ease-in-out infinite alternate`,
                            animationDelay: `${ring * 0.18}s`,
                            opacity: Math.max(0.03, 0.22 - ring * 0.022),
                        }}
                    />
                ))}
            </div>

            {/* Slowly rotating conic gradient disc — premium depth light */}
            <div
                className="absolute rounded-full"
                style={{
                    width: "80vw",
                    height: "80vw",
                    background: "conic-gradient(from 0deg, transparent 0%, rgba(255,95,31,0.04) 20%, transparent 40%)",
                    animation: "tunnelRotate 12s linear infinite",
                    opacity: 0.8,
                }}
            />

            {/* Central radial orange glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,95,31,0.07) 0%, transparent 70%)",
                }}
            />

            <style>{`
                @keyframes tunnelPulse {
                    0%   { transform: scale(0.94); }
                    100% { transform: scale(1.06); }
                }
                @keyframes tunnelRotate {
                    0%   { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function KineticTunnel() {
    const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

    useEffect(() => {
        // Detect on client mount — server always yields null (SSR-safe)
        setWebGLSupported(isWebGLAvailable());
    }, []);

    // Server-side or before detection: render a solid black placeholder
    if (webGLSupported === null) {
        return <div className="absolute inset-0 w-full h-full bg-black" />;
    }

    // GPU not available: CSS animated fallback
    if (!webGLSupported) {
        return <CSSFallbackTunnel />;
    }

    // Full WebGL 3D tunnel
    return (
        <div className="absolute inset-0 w-full h-full z-0 bg-black overflow-hidden">
            <Canvas
                shadows={false}
                camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, 5] }}
                gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
            >
                <fog attach="fog" args={["#000000", 2, 30]} />
                <TunnelGeometry />
            </Canvas>
        </div>
    );
}
