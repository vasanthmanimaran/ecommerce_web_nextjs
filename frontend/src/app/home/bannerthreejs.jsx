"use client";

import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// Planets (no name labels needed now)
const PLANETS = [
  { size: 2, color: "#61DAFB", orbitRadius: 15, speed: 0.04, tilt: 0 },
  { size: 2.5, color: "#ffffff", orbitRadius: 22, speed: 0.015, tilt: 15 },
  { size: 2.8, color: "#68A063", orbitRadius: 30, speed: 0.01, tilt: 10 },
  { size: 2.2, color: "#4DB33D", orbitRadius: 37, speed: 0.008, tilt: 5 },
  { size: 5, color: "#007ACC", orbitRadius: 48, speed: 0.004, tilt: 8 },
  { size: 4.5, color: "#FFAA00", orbitRadius: 60, speed: 0.003, tilt: 6 },
  { size: 3.5, color: "#38BDF8", orbitRadius: 72, speed: 0.002, tilt: 12 },
  { size: 3.5, color: "#aaaaaa", orbitRadius: 85, speed: 0.001, tilt: 14 }
];

function Planet({ size, color, orbitRadius, speed, tilt }) {
  const meshRef = useRef();
  const orbitRef = useRef(0);

  useFrame(() => {
    orbitRef.current += speed;
    const angle = orbitRef.current;
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;

    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += speed * 2;
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(tilt);
    }
  });

  return (
    <group>
      {/* Orbit Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={128}
            array={new Float32Array(
              Array.from({ length: 128 }, (_, i) => {
                const a = (i / 64) * Math.PI * 2;
                return [Math.cos(a) * orbitRadius, 0, Math.sin(a) * orbitRadius];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6ABCFD" transparent opacity={0.15} />
      </line>

      {/* Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

function Sun() {
  const sunRef = useRef();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshPhysicalMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={2}
        roughness={0.1}
        metalness={0.3}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
      <pointLight intensity={2} distance={200} decay={2} />
      <pointLight color="#FF4500" intensity={1.5} distance={150} decay={2} />
    </mesh>
  );
}

function Stars() {
  const starsRef = useRef();
  const count = 20000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = ["#ffffff", "#e6e6fa", "#87ceeb", "#fffacd", "#f5deb3"];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 500 + 100;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y += 0.0001;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SolarSystem() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 40, 160);
    camera.lookAt(0, 0, 0);

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;

      camera.position.z = 160 - progress * 60;
      camera.position.y = 40 - progress * 30;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <Sun />
      {PLANETS.map((planet, idx) => (
        <Planet key={idx} {...planet} />
      ))}
      <Stars />
    </>
  );
}

export default function ThreeJSBanner() {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50 z-10 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />
      <Canvas camera={{ fov: 60, near: 0.1, far: 1000 }} shadows>
        <Suspense fallback={null}>
          <SolarSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}
