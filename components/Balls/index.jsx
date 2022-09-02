import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import {
  Environment,
} from "@react-three/drei";
import { SSAOPass } from "three-stdlib";
// import HdrFile from "../../adamsbridge.hdr";
import styled from "styled-components";

extend({ SSAOPass });

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "#fff",
  roughness: 0.12,
  envMapIntensity: 0.2,
  emissive: "#14132d",
});

const Wrapper = styled.div`
  position: fixed;
  z-index: 12;
  top: 0;
  right: 0;

  width: 100vw;
  height: 100vh;

  opacity: 0;

  transition: 0s opacity, 11s transform;
  transition-delay: 0s;
  pointer-events: none;

  ${(props) =>
    props.isShow &&
    `opacity: 1;
      transition: .5s opacity, 1s transform;
      transition-delay: 1.5s;
      pointer-events: all;`}
`;

const Balls = ({ isShow }) => {
  function Clump({
    mat = new THREE.Matrix4(),
    vec = new THREE.Vector3(),
    ...props
  }) {
    const [ref, api] = useSphere(() => ({
      args: [1],
      mass: 1,
      angularDamping: 0.1,
      linearDamping: 0.65,
      position: [rfs(20), rfs(20), rfs(20)],
    }));
    useFrame((state) => {
      for (let i = 0; i < 40; i++) {
        // Get current whereabouts of the instanced sphere
        ref.current.getMatrixAt(i, mat);
        // Normalize the position and multiply by a negative force.
        // This is enough to drive it towards the center-point.
        api
          .at(i)
          .applyForce(
            vec
              .setFromMatrixPosition(mat)
              .normalize()
              .multiplyScalar(-50)
              .toArray(),
            [0, 0, 0]
          );
      }
    });
    return (
      <instancedMesh
        ref={ref}
        castShadow
        receiveShadow
        args={[null, null, 40]}
        geometry={sphereGeometry}
        material={baubleMaterial}
      />
    );
  }

  function Pointer() {
    const viewport = useThree((state) => state.viewport);
    const [, api] = useSphere(() => ({
      type: "Kinematic",
      args: [4],
      position: [0, 0, 0],
    }));
    return useFrame((state) =>
      api.position.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      )
    );
  }

  return (
    <Wrapper isShow={isShow}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 35, near: 1, far: 40 }}
      >
        <ambientLight intensity={0.25} />
        <spotLight
          intensity={1}
          angle={0.2}
          penumbra={1}
          position={[30, 30, 30]}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight
          intensity={5}
          position={[-10, -10, -10]}
          color="#1bbc9b"
        />
        <Physics gravity={[0, 2, 0]} iterations={20}>
          <Pointer />
          <Clump />
        </Physics>
        <Environment />
        {/*files={HdrFile}*/}
      </Canvas>
    </Wrapper>
  );
}

export default Balls;