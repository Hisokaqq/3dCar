import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Ground from './components/Ground';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { CarModel } from './Scene';
import { Car } from './components/CarModel';
import Rings from './components/Rings';
import Boxes from './components/Boxes';


import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { FloatingGrid } from './components/FloatingGrid';
function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
      <OrbitControls enableZoom={false} target={[0, .35, 0]} maxPolarAngle={Math.PI/2}/>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={90} />
        <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
        <color attach="background" args={[0, 0, 0]} />
        <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
        
        <Ground />
        <Rings />
        <FloatingGrid />
        <EffectComposer>
        <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} />
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
        <Boxes  />
      </Canvas>
    </Suspense>
  );
}

export default App;
