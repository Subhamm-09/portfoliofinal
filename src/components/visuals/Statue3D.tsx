"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Center, Bounds, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { useTheme } from "@/hooks/useTheme";

function StatueModel() {
  const { isDark } = useTheme();
  
  const darkGltf = useGLTF("/apollo_dark.glb");
  const lightGltf = useGLTF("/apollo_light.glb");
  const textureDark = useLoader(THREE.TextureLoader, "/Meshy_AI_Fragmented_Apollo_0816202446_texture.png");
  const textureLight = useLoader(THREE.TextureLoader, "/Meshy_AI_Fragmented_Apollo_0816230746_texture.png");
  
  const darkGroupRef = useRef<THREE.Group>(null);
  const lightGroupRef = useRef<THREE.Group>(null);

  // Create a clipping plane that points UP (keeps everything above it).
  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.95), []);

  // High-quality PBR material using the native texture for dark mode
  const nativeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: textureDark,
        roughness: 0.3,
        metalness: 0.6,
        transparent: true,
        opacity: 0,
        clippingPlanes: [clipPlane],
      }),
    [textureDark, clipPlane]
  );

  // Light mode material — high roughness matte plaster/marble
  const nativeLightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: textureLight,
        roughness: 0.88,
        metalness: 0.0,
        transparent: true,
        opacity: 0,
        clippingPlanes: [clipPlane],
      }),
    [textureLight, clipPlane]
  );

  const clonedDark = useMemo(() => darkGltf.scene.clone(), [darkGltf.scene]);
  const clonedLight = useMemo(() => lightGltf.scene.clone(), [lightGltf.scene]);

  React.useLayoutEffect(() => {
    clonedDark.traverse((child) => {
      child.layers.set(1);
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = nativeMaterial;
        mesh.castShadow = true;
      }
    });
    clonedLight.traverse((child) => {
      child.layers.set(2);
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = nativeLightMaterial;
        mesh.castShadow = true;
      }
    });

    return () => {
      // Clean up geometries and materials on unmount
      clonedDark.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
        }
      });
      clonedLight.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
        }
      });
    };
  }, [clonedDark, clonedLight, nativeMaterial, nativeLightMaterial]);

  useFrame((state, delta) => {
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    
    const baseRotY = Math.sin(state.clock.elapsedTime * 0.3) * (Math.PI / 6);
    const targetRotY = baseRotY + pointerX * 0.8;
    const targetRotX = -pointerY * 0.4;
    
    const targetOpacityDark = isDark ? 1 : 0;
    const targetOpacityLight = isDark ? 0 : 1;
    const targetScaleDark = isDark ? 0.95 : 0.85; 
    const targetScaleLight = isDark ? 0.85 : 1.30; 

    nativeMaterial.opacity = targetOpacityDark;
    nativeLightMaterial.opacity = targetOpacityLight;

    if (darkGroupRef.current) {
      darkGroupRef.current.rotation.y = THREE.MathUtils.lerp(darkGroupRef.current.rotation.y, targetRotY, delta * 3);
      darkGroupRef.current.rotation.x = THREE.MathUtils.lerp(darkGroupRef.current.rotation.x, targetRotX, delta * 3);
      
      darkGroupRef.current.position.y = 0.15;
      const sDark = THREE.MathUtils.lerp(darkGroupRef.current.scale.x, targetScaleDark, delta * 4);
      darkGroupRef.current.scale.set(sDark, sDark, sDark);
      
      darkGroupRef.current.visible = isDark;
    }
    
    if (lightGroupRef.current) {
      lightGroupRef.current.rotation.y = THREE.MathUtils.lerp(lightGroupRef.current.rotation.y, targetRotY, delta * 3);
      lightGroupRef.current.rotation.x = THREE.MathUtils.lerp(lightGroupRef.current.rotation.x, targetRotX, delta * 3);

      lightGroupRef.current.position.y = -0.3;
      const sLight = THREE.MathUtils.lerp(lightGroupRef.current.scale.x, targetScaleLight, delta * 4);
      lightGroupRef.current.scale.set(sLight, sLight, sLight);

      lightGroupRef.current.visible = !isDark;
    }
  });

  return (
    <group>
        {/* 🌙 Dark Mode Lights — Layer 1 */}
        <spotLight position={[4, 6, 4]} angle={0.6} penumbra={0.2} intensity={100} color="#e2e8f0" distance={25} onUpdate={(self) => self.layers.set(1)} />
        <pointLight position={[-4, -2, 2]} intensity={1.5} color="#8C3A30" onUpdate={(self) => self.layers.set(1)} />
        <directionalLight position={[-3, 4, -6]} intensity={2.0} color="#a5d8ff" onUpdate={(self) => self.layers.set(1)} />
        <ambientLight intensity={0.05} onUpdate={(self) => self.layers.set(1)} />

        {/* ☀️ Light Mode Lights — Layer 2 */}
        <directionalLight
          position={[-5, 5, 5]}
          intensity={2.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={30}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.001}
          shadow-radius={4}
          onUpdate={(self) => self.layers.set(2)}
        />
        <pointLight position={[4, -1, 3]} intensity={1.2} color="#f0f5ff" onUpdate={(self) => self.layers.set(2)} />
        <spotLight position={[-2, 4, -6]} angle={0.8} penumbra={0.5} intensity={80} color="#ffffff" onUpdate={(self) => self.layers.set(2)} />
        <ambientLight intensity={0.3} color="#ffffff" onUpdate={(self) => self.layers.set(2)} />

      <Bounds fit clip margin={1.5}>
        <Center>
          <group ref={darkGroupRef}>
            <primitive object={clonedDark} />
          </group>
          <group ref={lightGroupRef}>
            <primitive object={clonedLight} />
          </group>
        </Center>
      </Bounds>

      {!isDark && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2.35, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial transparent opacity={0.38} />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/apollo_dark.glb");
useGLTF.preload("/apollo_light.glb");

export default function Statue3D({ onLoaded, isVisible = true }: { onLoaded?: () => void, isVisible?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ alpha: true, antialias: !isMobile, localClippingEnabled: true, powerPreference: "high-performance" }}
        shadows
        frameloop={isVisible ? "always" : "never"}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        onCreated={({ camera }) => {
          camera.layers.enable(1);
          camera.layers.enable(2);
        }}
      >
        <React.Suspense fallback={null}>
          <ModelLoaderNotifier onLoaded={onLoaded}>
            <StatueModel />
          </ModelLoaderNotifier>
        </React.Suspense>
      </Canvas>
    </div>
  );
}

function ModelLoaderNotifier({ children, onLoaded }: { children: React.ReactNode, onLoaded?: () => void }) {
  React.useEffect(() => {
    if (onLoaded) {
      const timer = setTimeout(onLoaded, 80);
      return () => clearTimeout(timer);
    }
  }, [onLoaded]);
  return <>{children}</>;
}
