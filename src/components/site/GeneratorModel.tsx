import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Text } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="red" wireframe />
          </mesh>
          <Text position={[0, 1.5, 0]} fontSize={0.3} color="red" anchorX="center" anchorY="middle">
            Model Corrupted
          </Text>
          <Text position={[0, -1.5, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
            Please check the model file.
          </Text>
        </group>
      );
    }
    return this.props.children;
  }
}

function Model() {
  const gltf = useLoader(GLTFLoader, "/models/realistic.glb", (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  
  const modelRef = useRef<THREE.Group>(null);

  // Traverse the model to configure meshes once it loads
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        // Check if the child is a mesh and has a material
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          // You can modify materials here if needed
          if (mesh.material) {
            // (mesh.material as THREE.MeshStandardMaterial).color.set("#ffb000");
          }
        }
      });
    }
  }, [gltf.scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={modelRef} dispose={null}>
      <primitive object={gltf.scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

export function GeneratorModel() {
  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <hemisphereLight args={["#ddeeff", "#443322", 0.5]} />
        
        <ErrorBoundary>
          <Suspense fallback={
            <Text position={[0, 0, 0]} fontSize={0.3} color="white">
              Loading Model...
            </Text>
          }>
            <Model />
          </Suspense>
        </ErrorBoundary>
        
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
