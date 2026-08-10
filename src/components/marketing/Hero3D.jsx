import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles } from '@react-three/drei';

const PRIMARY = '#6366f1';
const PRIMARY_LIGHT = '#a5b4fc';

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Scene() {
  const group = useRef(null);
  const core = useRef(null);
  const shell = useRef(null);
  const slow = useMemo(reducedMotion, []);

  useFrame((state, delta) => {
    const speed = slow ? 0.03 : 0.15;
    if (group.current) {
      group.current.rotation.y += delta * speed;

      const targetX = state.pointer.y * 0.25;
      const targetY = state.pointer.x * 0.35;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
      group.current.rotation.z += (targetY * 0.3 - group.current.rotation.z) * 0.03;
    }
    if (shell.current) shell.current.rotation.y -= delta * (slow ? 0.02 : 0.08);
    if (core.current) core.current.rotation.x += delta * (slow ? 0.05 : 0.2);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={80} color={PRIMARY_LIGHT} />
      <pointLight position={[-4, -3, -4]} intensity={40} color={PRIMARY} />

      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 4]} />
        <MeshDistortMaterial
          color={PRIMARY}
          distort={slow ? 0.15 : 0.35}
          speed={slow ? 0.4 : 1.4}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color={PRIMARY_LIGHT} wireframe transparent opacity={0.35} />
      </mesh>

      <Sparkles count={70} scale={4.2} size={2.4} speed={slow ? 0.1 : 0.4} color={PRIMARY_LIGHT} />
    </group>
  );
}

export default function Hero3D({ className }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
