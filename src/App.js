import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PointCloud = () => {
  const points = useMemo(() => {
    const numPoints = 640 * 640;
    const positions = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const x = (i % 640) - 320;
      const y = Math.floor(i / 640) - 320;
      const z = 0;
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geom;
  }, [points]);

  const material = useMemo(() => new THREE.PointsMaterial({ size: 0.01, color: 0x888888 }), []);

  return <points geometry={geometry} material={material} />;
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 500], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <PointCloud />
      <OrbitControls enableDamping dampingFactor={0.05} rotateSpeed={0.5} />
    </Canvas>
  );
};

export default App;
