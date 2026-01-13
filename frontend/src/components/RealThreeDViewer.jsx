import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Maximize2, RotateCw, Loader2 } from 'lucide-react';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

const RealThreeDViewer = ({ modelUrl }) => {
    if (!modelUrl) return null;

    return (
        <div className='w-full aspect-square md:aspect-[4/3] bg-gradient-to-b from-gray-50 to-amber-50 rounded-3xl overflow-hidden relative border-2 border-amber-100 shadow-inner group'>
            <Suspense fallback={
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-sm z-20'>
                    <Loader2 className='w-12 h-12 text-amber-600 animate-spin' />
                    <p className='text-amber-900 font-bold uppercase tracking-widest text-xs'>Initializing 3D Engine...</p>
                </div>
            }>
                <Canvas shadows camera={{ position: [0, 0, 150], fov: 40 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

                    <Stage environment="city" intensity={0.6} contactShadow={false}>
                        <Model url={modelUrl} />
                    </Stage>

                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                        <planeGeometry args={[10, 10]} />
                        <shadowMaterial transparent opacity={0.2} />
                    </mesh>

                    <OrbitControls
                        makeDefault
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableDamping
                        dampingFactor={0.05}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>
            </Suspense>

            {/* Interactive Controls Overlay */}
            <div className='absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                <div className='bg-amber-800 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                    Hardware Accelerated 3D
                </div>
            </div>

            <div className='absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0'>
                <div className='bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-amber-100 flex items-center gap-4'>
                    <div className='flex flex-col'>
                        <p className='text-[10px] font-black text-amber-900 uppercase'>Controls</p>
                        <p className='text-[9px] text-amber-700'>Left Click: Rotate • Scroll: Zoom</p>
                    </div>
                    <div className='h-8 w-[1px] bg-amber-200' />
                    <RotateCw className='text-amber-800 animate-spin-slow' size={20} />
                </div>
            </div>

            {/* Viewer Hint */}
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none'>
                <p className='text-[10px] font-bold text-amber-900/40 uppercase tracking-[0.3em]'>
                    Shoplex Interactive Reality Engine
                </p>
            </div>
        </div>
    );
};

export default RealThreeDViewer;
