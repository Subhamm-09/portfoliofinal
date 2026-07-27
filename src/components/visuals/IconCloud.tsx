"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  SiPython,
  SiPytorch,
  SiJavascript,
  SiNextdotjs,
  SiGit,
  SiDocker,
  SiLinux,
  SiReact,
  SiTensorflow,
  SiKubernetes,
  SiTypescript,
  SiCplusplus,
  SiRust,
  SiGo,
  SiRedis,
  SiPostgresql,
  SiNodedotjs,
  SiOpencv,
  SiScikitlearn
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

// 20 high-end engineering technologies
const icons = [
  <SiPython key="python" size={42} />,
  <SiPytorch key="pytorch" size={42} />,
  <SiJavascript key="js" size={42} />,
  <SiNextdotjs key="next" size={42} />,
  <SiGit key="git" size={42} />,
  <SiDocker key="docker" size={42} />,
  <SiLinux key="linux" size={42} />,
  <FaAws key="aws" size={42} />,
  <SiReact key="react" size={42} />,
  <SiTensorflow key="tf" size={42} />,
  <SiKubernetes key="k8s" size={42} />,
  <SiTypescript key="ts" size={42} />,
  <SiCplusplus key="cpp" size={42} />,
  <SiRust key="rust" size={42} />,
  <SiGo key="go" size={42} />,
  <SiRedis key="redis" size={42} />,
  <SiPostgresql key="postgres" size={42} />,
  <SiNodedotjs key="node" size={42} />,
  <SiOpencv key="opencv" size={42} />,
  <SiScikitlearn key="scikit" size={42} />
];

const RADIUS = 4.5;

function Cloud() {
  const groupRef = useRef<THREE.Group>(null);

  // Fibonacci sphere algorithm to distribute nodes evenly in 3D space
  const positions = useMemo(() => {
    const count = icons.length;
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i; 

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      pos.push(new THREE.Vector3(x * RADIUS, y * RADIUS, z * RADIUS));
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Base continuous slow rotation
    const time = state.clock.getElapsedTime();
    
    // Calculate target rotation from mouse (normalized -1 to 1 mapped to angles)
    const pointerX = (state.pointer.x * Math.PI) / 3;
    const pointerY = (state.pointer.y * Math.PI) / 3;
    
    // Smoothly interpolate towards mouse target combined with base rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (time * 0.15) + pointerX,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointerY * -1,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <IconNode key={i} position={pos} icon={icons[i]} />
      ))}
    </group>
  );
}

function IconNode({ position, icon }: { position: THREE.Vector3; icon: React.ReactNode }) {
  const meshRef = useRef<THREE.Group>(null);
  const domRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (meshRef.current && domRef.current) {
      // Get the absolute world position of this node to know its Z depth relative to camera
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      
      // Z goes from roughly -RADIUS to +RADIUS. 
      // Map it from 0 (back) to 1 (front)
      const normalizedZ = (worldPos.z + RADIUS) / (RADIUS * 2); 
      
      // Clamp and scale opacity so elements in the back fade out heavily
      const opacity = Math.max(0.3, Math.min(1, normalizedZ * 1.5 - 0.1));
      
      // Apply opacity directly to DOM node to avoid heavy React re-renders
      domRef.current.style.opacity = opacity.toString();
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <Html
        center
        transform
        sprite // Ensures the icon always faces the camera
        zIndexRange={[100, 0]} 
      >
        <div 
          ref={domRef}
          className="text-white/80 hover:!text-[#C9A96E] hover:scale-125 transition-all duration-300 ease-out cursor-pointer flex items-center justify-center p-4"
        >
          {icon}
        </div>
      </Html>
    </group>
  );
}

export default function IconCloud() {
  return (
    <div className="w-full h-full min-h-[40vh] md:min-h-[50vh] flex items-center justify-center pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 14], fov: 40 }}
        className="max-w-[800px] mx-auto"
      >
        <Cloud />
      </Canvas>
    </div>
  );
}
