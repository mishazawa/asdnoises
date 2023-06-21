import { CameraControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector2, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
export function Canv() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 1.0, 0]} />
      <Box position={[1.2, 1.0, 0]} />
      <FPV />
      <Plane rotation={[degToRad(-90), 0, 0]} args={[100, 100, 1, 1]} />
    </Canvas>
  );
}

function FPV() {
  const fpvRef = useRef(null!);
  const controls = useThree((state) => state.controls);
  useEffect(() => {
    if (!fpvRef.current) return;
    fpvRef.current.reset(false);
    fpvRef.current.elevate(1, false);

    // fpvRef.current.position.set(0, 10, 0);
  }, [controls]);

  return (
    <group position={[0, 0, 0]}>
      <CameraControls
        makeDefault
        maxDistance={1}
        minDistance={1}
        azimuthRotateSpeed={-1}
        polarRotateSpeed={-1}
        truckSpeed={10}
        smoothTime={0}
        ref={fpvRef}
      >
        <PerspectiveCamera position={[0, 0, 0.00001]} />
      </CameraControls>
    </group>
  );
}
