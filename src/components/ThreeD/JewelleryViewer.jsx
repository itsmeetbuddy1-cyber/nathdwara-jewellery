import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Eye, RefreshCw } from 'lucide-react';

export const METALS = {
  yellowGold: {
    name: '22K Imperial Yellow Gold',
    label: 'Yellow Gold',
    color: 0xE8B83A,
    roughness: 0.18,
    metalness: 0.95,
    tag: '22KT / 916',
  },
  roseGold: {
    name: '18K Sunset Rose Gold',
    label: 'Rose Gold',
    color: 0xDE9888,
    roughness: 0.20,
    metalness: 0.92,
    tag: '18KT / 750',
  },
  platinum: {
    name: '950 Pure Platinum',
    label: 'Platinum',
    color: 0xE8ECF2,
    roughness: 0.12,
    metalness: 0.98,
    tag: '950 Pt',
  },
};

export const GEMSTONES = {
  diamond: {
    name: 'Solitaire Diamond (VVS1)',
    label: 'Diamond',
    color: 0xFFFFFF,
    emissive: 0x111122,
    transmission: 0.92,
    opacity: 0.95,
    roughness: 0.05,
    tag: 'Ideal Sparkle',
  },
  emerald: {
    name: 'Zambian Royal Emerald',
    label: 'Emerald',
    color: 0x0DAE62,
    emissive: 0x022510,
    transmission: 0.85,
    opacity: 0.92,
    roughness: 0.1,
    tag: 'Lush Green',
  },
  ruby: {
    name: 'Burmese Pigeon Blood Ruby',
    label: 'Ruby',
    color: 0xB3152B,
    emissive: 0x2A0005,
    transmission: 0.85,
    opacity: 0.92,
    roughness: 0.1,
    tag: 'Crimson Glow',
  },
  sapphire: {
    name: 'Kashmir Royal Sapphire',
    label: 'Sapphire',
    color: 0x1E3A8A,
    emissive: 0x050C24,
    transmission: 0.85,
    opacity: 0.92,
    roughness: 0.1,
    tag: 'Deep Blue',
  },
};

export default function JewelleryViewer({
  initialMetal = 'yellowGold',
  initialGem = 'diamond',
  interactive = true,
  autoRotateDefault = true,
  height = '520px',
  onCustomChange = null,
}) {
  const mountRef = useRef(null);
  const [activeMetalKey, setActiveMetalKey] = useState(initialMetal);
  const [activeGemKey, setActiveGemKey] = useState(initialGem);
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault);
  const [isLoaded, setIsLoaded] = useState(false);

  // Three.js internal references
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const ringGroupRef = useRef(null);
  const metalMeshesRef = useRef([]);
  const gemMeshRef = useRef(null);
  const haloGemMeshesRef = useRef([]);
  const cameraRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.35, y: 0.4 });
  const currentRotationRef = useRef({ x: 0.35, y: 0.4 });
  const targetZoomRef = useRef(5.5);
  const currentZoomRef = useRef(5.5);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight || 500;
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 100);
    camera.position.set(0, 0.8, 5.5);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and tone mapping for realistic jewelry shine (Optimized for mobile)
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting setup
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.8);
    scene.add(ambientLight);

    // Warm Key Light (Jeweller's lamp)
    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.8);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Rim/Specular Cold Light (creates diamond sparkle contrast)
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 2.2);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Bottom soft reflector light (gold reflections)
    const bounceLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. Build 3D Jewellery: Royal Solitaire Ring
    const ringGroup = new THREE.Group();
    ringGroupRef.current = ringGroup;
    metalMeshesRef.current = [];
    haloGemMeshesRef.current = [];

    const metalConfig = METALS[activeMetalKey] || METALS.yellowGold;
    const gemConfig = GEMSTONES[activeGemKey] || GEMSTONES.diamond;

    // Metal Material
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: metalConfig.color,
      roughness: metalConfig.roughness,
      metalness: metalConfig.metalness,
      envMapIntensity: 2.5,
    });

    // Ring Band: Elegant Torus
    const bandGeo = new THREE.TorusGeometry(1.35, 0.16, 32, 100);
    const bandMesh = new THREE.Mesh(bandGeo, metalMaterial);
    bandMesh.rotation.x = Math.PI / 2;
    ringGroup.add(bandMesh);
    metalMeshesRef.current.push(bandMesh);

    // Inner Comfort Core
    const innerBandGeo = new THREE.TorusGeometry(1.35, 0.14, 24, 80);
    const innerBandMesh = new THREE.Mesh(innerBandGeo, metalMaterial);
    innerBandMesh.rotation.x = Math.PI / 2;
    ringGroup.add(innerBandMesh);
    metalMeshesRef.current.push(innerBandMesh);

    // Crown / Cathedral Shoulder details
    const shoulderGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.65, 16);
    const shoulderLeft = new THREE.Mesh(shoulderGeo, metalMaterial);
    shoulderLeft.position.set(-0.6, 1.25, 0);
    shoulderLeft.rotation.z = Math.PI / 6;
    ringGroup.add(shoulderLeft);
    metalMeshesRef.current.push(shoulderLeft);

    const shoulderRight = new THREE.Mesh(shoulderGeo, metalMaterial);
    shoulderRight.position.set(0.6, 1.25, 0);
    shoulderRight.rotation.z = -Math.PI / 6;
    ringGroup.add(shoulderRight);
    metalMeshesRef.current.push(shoulderRight);

    // Crown Setting Platform (Halo base)
    const haloBaseGeo = new THREE.CylinderGeometry(0.68, 0.45, 0.22, 24);
    const haloBaseMesh = new THREE.Mesh(haloBaseGeo, metalMaterial);
    haloBaseMesh.position.set(0, 1.52, 0);
    ringGroup.add(haloBaseMesh);
    metalMeshesRef.current.push(haloBaseMesh);

    // 4 Elegant Prongs holding the central solitaire
    const prongGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.6, 12);
    const prongPositions = [
      [0.34, 1.75, 0.34],
      [-0.34, 1.75, 0.34],
      [0.34, 1.75, -0.34],
      [-0.34, 1.75, -0.34],
    ];
    prongPositions.forEach(([px, py, pz]) => {
      const prong = new THREE.Mesh(prongGeo, metalMaterial);
      prong.position.set(px, py, pz);
      prong.rotation.x = pz * 0.4;
      prong.rotation.z = -px * 0.4;
      ringGroup.add(prong);
      metalMeshesRef.current.push(prong);
    });

    // Central Gemstone Material
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: gemConfig.color,
      emissive: gemConfig.emissive,
      roughness: gemConfig.roughness,
      transmission: gemConfig.transmission,
      opacity: gemConfig.opacity,
      transparent: true,
      ior: 2.4,
      metalness: 0.05,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      flatShading: true,
    });

    // Central Faceted Solitaire: Double Octahedron Brilliant Cut
    const gemGeo = new THREE.OctahedronGeometry(0.55, 1);
    const gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
    gemMesh.position.set(0, 1.82, 0);
    gemMesh.scale.set(1.05, 0.85, 1.05);
    ringGroup.add(gemMesh);
    gemMeshRef.current = gemMesh;

    // Halo Micro-Diamonds around the head
    const haloDiamondGeo = new THREE.OctahedronGeometry(0.08, 0);
    const haloDiamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      transparent: true,
      roughness: 0.05,
      ior: 2.4,
      reflectivity: 0.9,
    });

    const haloCount = 14;
    const haloRadius = 0.65;
    for (let i = 0; i < haloCount; i++) {
      const angle = (i / haloCount) * Math.PI * 2;
      const hx = Math.cos(angle) * haloRadius;
      const hz = Math.sin(angle) * haloRadius;
      const microGem = new THREE.Mesh(haloDiamondGeo, haloDiamondMat);
      microGem.position.set(hx, 1.58, hz);
      ringGroup.add(microGem);
      haloGemMeshesRef.current.push(microGem);
    }

    // 6. Floating Gold Shimmer Particles (Optimized for mobile)
    const particleCount = isMobile ? 18 : 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf3e5ab,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(ringGroup);
    setIsLoaded(true);

    // Initial position
    ringGroup.rotation.x = currentRotationRef.current.x;
    ringGroup.rotation.y = currentRotationRef.current.y;

    // 7. Mouse and Touch Interaction Handlers
    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!interactive || !isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;

      // Clamp X rotation so it doesn't flip completely upside down
      targetRotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationRef.current.x));

      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e) => {
      if (!interactive || e.touches.length === 0) return;
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!interactive || !isDraggingRef.current || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x += deltaY * 0.01;

      targetRotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationRef.current.x));
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleWheel = (e) => {
      if (!interactive) return;
      e.preventDefault();
      targetZoomRef.current += e.deltaY * 0.003;
      targetZoomRef.current = Math.max(3.8, Math.min(7.5, targetZoomRef.current));
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Render Loop with Smooth Damping (Inertia) & IntersectionObserver
    let clock = new THREE.Clock();
    let isVisible = false;

    const animate = () => {
      if (!isVisible) {
        animationFrameIdRef.current = null;
        return;
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Auto rotation if not dragging and enabled
      if (isAutoRotating && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.004;
      }

      // Smooth interpolation for rotations
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (ringGroupRef.current) {
        ringGroupRef.current.rotation.x = currentRotationRef.current.x;
        ringGroupRef.current.rotation.y = currentRotationRef.current.y;
        // Subtle floating motion
        ringGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.06;
      }

      // Smooth zoom interpolation
      currentZoomRef.current += (targetZoomRef.current - currentZoomRef.current) * 0.08;
      if (cameraRef.current) {
        cameraRef.current.position.z = currentZoomRef.current;
      }

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    // Auto-pause when 3D Studio is scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameIdRef.current) {
          animate();
        } else if (!isVisible && animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  // Update Metal Material in real-time
  useEffect(() => {
    const metalConfig = METALS[activeMetalKey];
    if (!metalConfig || !metalMeshesRef.current.length) return;

    metalMeshesRef.current.forEach((mesh) => {
      mesh.material.color.setHex(metalConfig.color);
      mesh.material.roughness = metalConfig.roughness;
      mesh.material.metalness = metalConfig.metalness;
      mesh.material.needsUpdate = true;
    });

    if (onCustomChange) {
      onCustomChange({ metal: metalConfig, gem: GEMSTONES[activeGemKey] });
    }
  }, [activeMetalKey]);

  // Update Gemstone Material in real-time
  useEffect(() => {
    const gemConfig = GEMSTONES[activeGemKey];
    if (!gemConfig || !gemMeshRef.current) return;

    const mat = gemMeshRef.current.material;
    mat.color.setHex(gemConfig.color);
    mat.emissive.setHex(gemConfig.emissive);
    mat.roughness = gemConfig.roughness;
    mat.transmission = gemConfig.transmission;
    mat.opacity = gemConfig.opacity;
    mat.needsUpdate = true;

    if (onCustomChange) {
      onCustomChange({ metal: METALS[activeMetalKey], gem: gemConfig });
    }
  }, [activeGemKey]);

  // Zoom controls
  const handleZoomIn = () => {
    targetZoomRef.current = Math.max(3.8, targetZoomRef.current - 0.6);
  };
  const handleZoomOut = () => {
    targetZoomRef.current = Math.min(7.5, targetZoomRef.current + 0.6);
  };
  const handleResetView = () => {
    targetRotationRef.current = { x: 0.35, y: 0.4 };
    targetZoomRef.current = 5.5;
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-gold-400/25 shadow-2xl flex flex-col items-center justify-center select-none" style={{ minHeight: height }}>
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-gold-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-champagne border border-gold-400/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
          Interactive 3D WebGL Studio
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-white/5 text-neutral-400 border border-white/10 backdrop-blur-md">
          Drag to Rotate • Scroll to Zoom
        </span>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{ height }}
      />

      {/* Camera View Controls Bar */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title={isAutoRotating ? 'Pause Auto-Rotation' : 'Enable Auto-Rotation'}
          className={`p-2 rounded-full border backdrop-blur-md transition-all ${
            isAutoRotating
              ? 'bg-gold-500/25 border-gold-400/60 text-champagne'
              : 'bg-obsidian-900/80 border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 rounded-full bg-obsidian-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-gold-400/40 backdrop-blur-md transition-all"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 rounded-full bg-obsidian-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-gold-400/40 backdrop-blur-md transition-all"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset Camera View"
          className="p-2 rounded-full bg-obsidian-900/80 border border-white/10 text-neutral-300 hover:text-white hover:border-gold-400/40 backdrop-blur-md transition-all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Metal & Gemstone Customization Drawer */}
      <div className="w-full bg-obsidian-900/90 border-t border-gold-400/20 px-4 py-3 backdrop-blur-xl z-10 flex flex-wrap items-center justify-between gap-4">
        {/* Metal Finish Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Metal Finish:
          </span>
          <div className="flex items-center gap-1.5 bg-obsidian-950/80 p-1 rounded-xl border border-white/5">
            {Object.entries(METALS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveMetalKey(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeMetalKey === key
                    ? 'bg-gold-500/20 text-champagne border border-gold-400/50 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/40"
                  style={{
                    backgroundColor:
                      key === 'yellowGold' ? '#E8B83A' : key === 'roseGold' ? '#DE9888' : '#E8ECF2',
                  }}
                />
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gemstone Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Gemstone:</span>
          <div className="flex items-center gap-1.5 bg-obsidian-950/80 p-1 rounded-xl border border-white/5">
            {Object.entries(GEMSTONES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveGemKey(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeGemKey === key
                    ? 'bg-gold-500/20 text-champagne border border-gold-400/50 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      key === 'diamond'
                        ? '#FFFFFF'
                        : key === 'emerald'
                        ? '#0DAE62'
                        : key === 'ruby'
                        ? '#B3152B'
                        : '#1E3A8A',
                  }}
                />
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
