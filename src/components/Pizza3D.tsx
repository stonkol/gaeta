import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// @ts-ignore
import * as THREE from 'three';
import { PizzaType, IndividualTopping } from '../types';
import { DoughType } from '../App';

// PizzaModel component that will be rendered inside Canvas
const PizzaModel: React.FC<{
    doughHeight: number;
    pizzaType?: string; // Add pizzaType prop
    toppings: IndividualTopping[];
}> = ({ doughHeight, pizzaType = '', toppings }) => {
    // Move ref declaration first
    const pizzaRef = useRef<THREE.Object3D>(null!);

    // Create a scene-wide rotation effect
    useFrame(({ clock }) => {
        if (pizzaRef.current) {
            // Make the pizza gently rotate with a slight wobble
            pizzaRef.current.rotation.y = clock.getElapsedTime() * 0.15; // Slower rotation
            pizzaRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.03; // Subtler wobble
        }
    });

    // Pizza rotation is now handled in the useFrame hook above

    // Helper function to get topping color based on name
    const getToppingColor = (toppingName: string): string => {
        const toppingColors: Record<string, string> = {
            pepperoni: '#d22',
            mushroom: '#a87',
            olive: '#333',
            pepper: '#2d2',
            onion: '#d9d',
            cheese: '#fd3',
            tomato: '#e33',
            garlic: '#ffe',
            basil: '#292',
            oregano: '#363',
            'spicy salami': '#911',
            gorgonzola: '#eef',
            fontina: '#ffc',
            parmesan: '#fec',
            'tomato sauce': '#c22',
            anchovies: '#667',
            // Add more toppings as needed
        };

        return toppingColors[toppingName.toLowerCase()] || '#d22'; // Default red
    };

    return (
        <group ref={pizzaRef} position={[0, 0, 0]}>
            {/* Dough */}
            {/* Pizza crust with improved material */}
            <mesh position={[0, doughHeight / 2, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[3, 3.2, doughHeight, 32]} />
                <meshPhysicalMaterial
                    color='#f0d080'
                    roughness={0.8}
                    metalness={0.1}
                    clearcoat={0.2}
                    clearcoatRoughness={0.4}
                />
            </mesh>

            {/* Pizza base (optional darker bottom) */}
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <cylinderGeometry args={[3.2, 3.2, 0.05, 32]} />
                <meshStandardMaterial color='#c09060' />
            </mesh>

            {/* Pizza top (sauce or cheese layer) */}
            <mesh position={[0, doughHeight + 0.01, 0]} receiveShadow>
                <cylinderGeometry args={[2.9, 2.9, 0.02, 32]} />
                <meshStandardMaterial
                    color={
                        pizzaType === 'Margherita' || pizzaType === 'Quattro Formaggi'
                            ? '#ffeebb'
                            : '#dd3311'
                    }
                    roughness={0.6}
                />
            </mesh>

            {/* Toppings */}
            {toppings.map((topping, index) => {
                // Calculate position on a circle for more realistic pizza topping distribution
                const angle = (index / toppings.length) * Math.PI * 2;
                const radius = 2.5 * Math.random() * 0.8; // Random radius but not too close to edge
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <mesh
                        key={index}
                        position={[
                            x + (Math.random() - 0.5) * 1.0, // Add some randomness
                            doughHeight + 0.05,
                            z + (Math.random() - 0.5) * 1.0,
                        ]}
                        rotation={[
                            Math.random() * Math.PI, // Random rotation for variety
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                        ]}
                        castShadow
                        receiveShadow
                    >
                        {/* Use a flatter geometry for certain toppings */}
                        {topping.name.toLowerCase().includes('cheese') ||
                        topping.name.toLowerCase().includes('sauce') ? (
                            <cylinderGeometry
                                args={[0.2 * topping.quantity, 0.2 * topping.quantity, 0.05, 8]}
                            />
                        ) : (
                            <sphereGeometry args={[0.15 * topping.quantity, 8, 8]} />
                        )}
                        <meshPhysicalMaterial
                            color={getToppingColor(topping.name)}
                            roughness={0.7}
                            clearcoat={0.1}
                            metalness={0.1}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};

type Pizza3DProps = {
    doughType: DoughType;
    pizzaType: PizzaType;
    toppings: IndividualTopping[];
};

const doughThicknessMap: Record<DoughType, number> = {
    thin: 0.1,
    thick: 0.3,
    sour: 0.2,
    default: 0.15,
};

// Simple component to check if WebGL is available
const WebGLCheck = () => {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            setIsWebGLAvailable(!!gl);
        } catch (e) {
            console.error('Error checking WebGL support:', e);
            setIsWebGLAvailable(false);
        }
    }, []);

    if (isWebGLAvailable === null) {
        return <div>Checking 3D capabilities...</div>;
    }

    if (!isWebGLAvailable) {
        return (
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#ffeeee',
                    border: '1px solid #ffcccc',
                    borderRadius: '5px',
                    textAlign: 'center',
                    margin: '20px',
                }}
            >
                <h3>3D Visualization Unavailable</h3>
                <p>
                    Your browser doesn't support WebGL, which is required for 3D pizza
                    visualization.
                </p>
                <p>Try using a modern browser like Chrome, Firefox, Safari, or Edge.</p>
            </div>
        );
    }

    return null;
};

const Pizza3D: React.FC<Pizza3DProps> = ({ doughType, pizzaType, toppings }) => {
    const [hasError, setHasError] = useState(false);

    // Placeholder: simple dough cylinder
    const doughHeight = doughThicknessMap[doughType] || 0.15;

    // Handle errors from three.js
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            console.error('Three.js error:', event);
            if (
                event.message.includes('three') ||
                event.message.includes('WebGL') ||
                event.message.includes('canvas')
            ) {
                setHasError(true);
            }
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    // Simple fallback component for rendering errors
    if (hasError) {
        return (
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#ffeeee', // Light pink background for error
                    border: '1px solid #ffcccc', // Light pink/red border
                    borderRadius: '5px',
                    textAlign: 'center',
                }}
            >
                <h3>3D Visualization Error</h3>
                <p>There was a problem rendering the 3D pizza.</p>
                <button
                    onClick={() => setHasError(false)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    // First check if WebGL is available
    return (
        <>
            <WebGLCheck />
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: 'white',
                        padding: '5px',
                        zIndex: 5,
                        fontSize: '12px',
                        display: 'none' /* Set to 'block' for debugging */,
                    }}
                >
                    Pizza: {pizzaType || 'None'} | Dough: {doughType} | Toppings: {toppings.length}
                </div>

                <ErrorBoundary
                    fallback={
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <h3>3D Rendering Error</h3>
                            <p>Sorry, we couldn't render your pizza in 3D.</p>
                        </div>
                    }
                >
                    <Canvas
                        shadows
                        camera={{
                            position: [0, 6, 10], // Positioned for 30-degree downward angle
                            fov: 40,
                            near: 0.1,
                            far: 100,
                        }}
                    >
                        {/* Ambient light for general illumination */}
                        <ambientLight intensity={0.3} />

                        {/* Main light source with shadows */}
                        <directionalLight
                            position={[5, 10, 5]}
                            intensity={1.5}
                            castShadow
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                            shadow-camera-far={50}
                            shadow-camera-left={-10}
                            shadow-camera-right={10}
                            shadow-camera-top={10}
                            shadow-camera-bottom={-10}
                        />

                        {/* Secondary light for better volume */}
                        <pointLight position={[-5, 5, -5]} intensity={0.5} />

                        {/* Warm front light to highlight pizza details */}
                        <spotLight
                            position={[0, 8, 15]}
                            angle={0.3}
                            penumbra={0.8}
                            intensity={1.2}
                            castShadow
                        />

                        <PizzaModel doughHeight={doughHeight} toppings={toppings} />

                        {/* Simple floor plane to catch shadows */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                            <planeGeometry args={[50, 50]} />
                            <shadowMaterial opacity={0.2} />
                        </mesh>
                    </Canvas>
                </ErrorBoundary>
            </div>
        </>
    );
};

// Simple Error Boundary class component
class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error in 3D rendering:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default Pizza3D;
