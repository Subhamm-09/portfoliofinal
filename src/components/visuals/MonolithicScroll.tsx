"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Center, Bounds, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

function PitchBlackStatue() {
  const obj = useLoader(OBJLoader, "/gallery_statue.obj");
  const groupRef = useRef<THREE.Group>(null);

  // High-end cinematic obsidian material with clearcoat gloss and rim reflection
  const pitchBlackMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#020202"),
        roughness: 0.18,
        metalness: 0.88,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
        reflectivity: 0.9,
      }),
    []
  );

  const cloned = useMemo(() => obj.clone(), [obj]);

  React.useLayoutEffect(() => {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = pitchBlackMaterial;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return () => {
      cloned.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
        }
      });
      pitchBlackMaterial.dispose();
    };
  }, [cloned, pitchBlackMaterial]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth continuous rotation in the lower center
      groupRef.current.rotation.y += delta * 0.4;
      // Subtle organic breathing oscillation on X axis
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
      // Gentle floating bob centered lower down
      groupRef.current.position.y = -0.68 + Math.sin(state.clock.elapsedTime * 1.0) * 0.04;
    }
  });

  return (
    <group>
      {/* ── CINEMATIC 5-POINT LIGHTING RIG ── */}
      
      {/* 1. Deep subtle ambient fill */}
      <ambientLight intensity={0.35} color="#150505" />
      
      {/* 2. Razor-sharp white key light from upper-left sculpting obsidian contours */}
      <directionalLight 
        position={[6, 9, 7]} 
        intensity={4.2} 
        color="#ffffff" 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* 3. Intense crimson rim back-light creating fiery silhouettes matching red.webp */}
      <spotLight 
        position={[-6, 5, -6]} 
        intensity={9.0} 
        color="#ff1a24" 
        angle={0.85} 
        penumbra={0.7} 
      />
      
      {/* 4. Secondary ruby edge light from right rear */}
      <spotLight 
        position={[6, 3, -5]} 
        intensity={7.0} 
        color="#ff3b20" 
        angle={0.9} 
        penumbra={0.8} 
      />

      {/* 5. Floor uplight reflecting red ground bounce onto lower anatomy */}
      <pointLight position={[0, -3.5, 2]} intensity={3.5} color="#ff2a14" distance={10} />
      
      {/* Front fill to retain subtle facial geometry in pure black */}
      <pointLight position={[0, 1.5, 4.5]} intensity={1.2} color="#f0e6df" distance={8} />

      <Bounds fit clip margin={1.35}>
        <Center position={[0, -0.62, 0]}>
          <group ref={groupRef}>
            <primitive object={cloned} />
          </group>
        </Center>
      </Bounds>

      {/* Contact shadow plane grounding the statue in physical space */}
      <ContactShadows
        position={[0, -2.15, 0]}
        opacity={0.65}
        scale={6}
        blur={2.5}
        far={4}
        color="#300000"
      />
    </group>
  );
}

export default function MonolithicScroll({ onClose }: { onClose: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full min-h-screen overflow-hidden bg-[#030202] select-none">
      
      {/* ── 1. BACKGROUND IMAGE WITH CINEMATIC DEPTH & PARALLAX ── */}
      <motion.div 
        className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] z-0 pointer-events-none"
        animate={{
          x: mouseOffset.x * -0.5,
          y: mouseOffset.y * -0.5,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.5 }}
      >
        <Image 
          src="/red.webp" 
          alt="Dimension Background"
          fill
          priority
          quality={100}
          className="object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </motion.div>

      {/* ── 2. VOLUMETRIC ATMOSPHERIC COLOR GRADING & LIGHT BEAM ── */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 50% 68%, rgba(255, 30, 30, 0.28) 0%, rgba(180, 10, 10, 0.12) 45%, transparent 75%),
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)
          `,
        }}
      />

      {/* ── 3. MONUMENTAL MAXIMALIST BRUTALIST TYPOGRAPHY ── */}
      <div className="absolute inset-0 z-15 flex flex-col items-center justify-start pt-[12vh] md:pt-[10vh] pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ 
            opacity: hasStarted ? 0.92 : 0, 
            y: hasStarted ? 0 : 40, 
            scale: hasStarted ? 1 : 0.96 
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col items-center text-center w-full leading-[0.8] tracking-[-0.04em]"
        >
          <span 
            className="font-black text-[10vw] md:text-[11.5vw] lg:text-[10.5vw] uppercase text-[#FAF0E6] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] transition-transform"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
          >
            COMING
          </span>
          <span 
            className="font-black text-[10vw] md:text-[11.5vw] lg:text-[10.5vw] uppercase text-[#FAF0E6] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] -mt-[1.5vw]"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
          >
            SOON
          </span>
        </motion.div>
      </div>

      {/* ── 4. 3D PITCH BLACK ROTATING SCULPTURE IN FOREGROUND ── */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0.1, 5.8], fov: 44 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <React.Suspense fallback={null}>
            <PitchBlackStatue />
            <OrbitControls 
              target={[0, -0.62, 0]}
              enableZoom={false} 
              enablePan={false}
              autoRotate={false}
              rotateSpeed={0.5}
            />
          </React.Suspense>
        </Canvas>
      </div>

      {/* ── 5. RETURN BUTTON ── */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-30 pointer-events-auto">
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: hasStarted ? 1 : 0, scale: hasStarted ? 1 : 0.9 }}
          whileHover={{ scale: 1.05, borderColor: "rgba(255,100,100,0.6)", boxShadow: "0 0 20px rgba(255,40,40,0.3)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={onClose}
          className="px-6 py-2.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl text-[#f3ece9] font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase hover:text-white transition-all cursor-pointer shadow-2xl"
        >
          RETURN [ ✕ ]
        </motion.button>
      </div>
      
      {/* ── 5. CINEMATIC FILM GRAIN ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ── 6. INTRO TRANSITION ── */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#000000] pointer-events-none flex items-center justify-center"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
