'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// 3D models configuration
const productModels = [
  { path: "/models/handcontrol.glb", name: "handcontrol", startPosition: [-12, -3, -50], endPosition: [-8, -2, 25], rotation: [0, 0.5, 0] },
  { path: "/models/Headphones.glb", name: "Headphones", startPosition: [-8, 6, -50], endPosition: [-4, 3, 25], rotation: [0, 0.8, 0] },
  { path: "/models/pc.glb", name: "pc", startPosition: [10, 2, -50], endPosition: [6, 1, 25], rotation: [0, -0.3, 0] },
  { path: "/models/vr.glb", name: "vr", startPosition: [8, -4, -50], endPosition: [5, -2, 25], rotation: [0, -0.6, 0] }
];

// Easing function
const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 3D Floating Model Component
const FloatingProductModel = ({ model, animationPhase, index }) => {
  const ref = useRef();
  const gltf = useGLTF(model.path);

  const scene = gltf.scene;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          metalness: 0.6,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();
    const modelStartTime = (index * 0.25) % 1;
    const modelPhase = (animationPhase - modelStartTime + 1) % 1;

    if (modelPhase >= 0 && modelPhase <= 1) {
      const progress = easeInOutCubic(modelPhase);
      const currentX = THREE.MathUtils.lerp(model.startPosition[0], model.endPosition[0], progress);
      const currentY = THREE.MathUtils.lerp(model.startPosition[1], model.endPosition[1], progress);
      const currentZ = THREE.MathUtils.lerp(model.startPosition[2], model.endPosition[2], progress);

      ref.current.position.set(
        currentX + Math.sin(t * 0.8 + index) * 0.3,
        currentY + Math.cos(t * 0.6 + index) * 0.2,
        currentZ
      );

      const scale = modelPhase < 0.3
        ? 0.1 + (modelPhase / 0.3) * 0.15
        : modelPhase < 0.7
        ? 0.25
        : 0.25 - ((modelPhase - 0.7) / 0.3) * 0.2;

      ref.current.scale.setScalar(scale);

      ref.current.rotation.set(
        model.rotation[0] + Math.sin(t * 0.4 + index) * 0.2,
        model.rotation[1] + t * 0.3 + modelPhase * Math.PI * 2,
        model.rotation[2] + Math.cos(t * 0.3 + index) * 0.1
      );

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = 0.9;
        }
      });
    } else {
      ref.current.scale.setScalar(0);
    }
  });

  return <primitive object={scene} ref={ref} dispose={null} />;
};

// Particle Background Component
const BackgroundParticles = () => {
  const particlesRef = useRef();
  const count = 1000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 100;
    positions[i3 + 1] = (Math.random() - 0.5) * 60;
    positions[i3 + 2] = Math.random() * -80 - 20;

    velocities[i3] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i3 + 2] = Math.random() * 0.1 + 0.05;

    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.4 + 0.55, Math.random() * 0.5 + 0.5, Math.random() * 0.4 + 0.6);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
      if (pos[i3 + 2] > 30) {
        pos[i3] = (Math.random() - 0.5) * 100;
        pos[i3 + 1] = (Math.random() - 0.5) * 60;
        pos[i3 + 2] = -80;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = Math.sin(t * 0.01) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} sizeAttenuation vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} />
    </points>
  );
};

// Scene Component
const Scene = () => {
  const { camera, gl } = useThree();
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    gl.setClearColor(new THREE.Color('#000510'), 1);
  }, [camera, gl]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    setAnimationPhase((t / 10) % 1);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 20]} intensity={1.5} castShadow color="#ffffff" />
      <pointLight position={[-10, 0, -5]} intensity={0.6} color="#9370DB" distance={30} decay={2} />
      <pointLight position={[10, 0, -5]} intensity={0.6} color="#FF6B6B" distance={30} decay={2} />

      <BackgroundParticles />

      {productModels.map((model, index) => (
        <Suspense key={model.name} fallback={null}>
          <FloatingProductModel model={model} animationPhase={animationPhase} index={index} />
        </Suspense>
      ))}
    </>
  );
};

// Main Banner Component
const ThreeJSBanner = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 z-10 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }} />
      <Canvas camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 100 }} shadows>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSBanner;
