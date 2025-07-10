'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

// 1. Define a shader material with a hover uniform
const AnimatedMaterial = shaderMaterial(
  { uTime: 0, uHover: 0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      float glow = 0.5 + 0.5 * sin(uTime * 2.0 + vUv.x * 10.0);
      float pulse = mix(1.0, 2.0, uHover); // brighten on hover
      vec3 baseColor = mix(vec3(0.0, 0.5, 1.0), vec3(0.0, 1.0, 1.0), glow);
      vec3 finalColor = baseColor * pulse;
      gl_FragColor = vec4(finalColor, 0.85);
    }
  `
);

extend({ AnimatedMaterial });

function ShaderPlane({ hover }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = clock.elapsedTime;
      ref.current.material.uniforms.uHover.value = hover ? 1.0 : 0.0;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3, 1]} />
      <animatedMaterial ref={ref} />
    </mesh>
  );
}

export default function ShaderButton() {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => router.push('/allproducts')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-[220px] h-[64px] cursor-pointer select-none group rounded-md overflow-hidden border border-cyan-500 transition-transform duration-200 hover:scale-[1.03]"
    >
      {/* Three.js Canvas with hover prop */}
      <Canvas
        className="absolute inset-0 z-0"
        camera={{ position: [0, 0, 3], fov: 50 }}
      >
        <ShaderPlane hover={hover} />
      </Canvas>

      {/* Text Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <span className="text-cyan-100 font-bold uppercase tracking-wider text-sm group-hover:text-white transition">
          Show More
        </span>
      </div>
    </div>
  );
}
