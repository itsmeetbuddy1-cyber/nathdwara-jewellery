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

function createStudioEnvironment() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#0c0c0f');
  bgGrad.addColorStop(0.5, '#191820');
  bgGrad.addColorStop(1, '#08080a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  const softbox = ctx.createRadialGradient(512, 100, 15, 512, 100, 240);
  softbox.addColorStop(0, 'rgba(255, 252, 240, 1.0)');
  softbox.addColorStop(0.35, 'rgba(255, 238, 195, 0.85)');
  softbox.addColorStop(0.7, 'rgba(212, 175, 55, 0.3)');
  softbox.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
  ctx.fillStyle = softbox;
  ctx.fillRect(200, 0, 624, 260);

  const rimRight = ctx.createRadialGradient(880, 240, 20, 880, 240, 180);
  rimRight.addColorStop(0, 'rgba(245, 205, 120, 0.95)');
  rimRight.addColorStop(0.5, 'rgba(180, 125, 30, 0.5)');
  rimRight.addColorStop(1, 'rgba(160, 110, 20, 0.0)');
  ctx.fillStyle = rimRight;
  ctx.fillRect(680, 80, 344, 320);

  const rimLeft = ctx.createRadialGradient(140, 240, 20, 140, 240, 180);
  rimLeft.addColorStop(0, 'rgba(235, 245, 255, 0.95)');
  rimLeft.addColorStop(0.5, 'rgba(100, 140, 190, 0.45)');
  rimLeft.addColorStop(1, 'rgba(40, 60, 90, 0.0)');
  ctx.fillStyle = rimLeft;
  ctx.fillRect(0, 80, 340, 320);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
}

function createBrilliantDiamondGeo(radius = 0.68, tableRadius = 0.40, crownHeight = 0.22, pavilionDepth = 0.44) {
  const geo = new THREE.BufferGeometry();
  const segments = 16;
  const vertices = [];

  const tableY = crownHeight;
  const girdleY = 0;
  const culetY = -pavilionDepth;

  const tableCenter = [0, tableY, 0];
  const culet = [0, culetY, 0];

  const tableVerts = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    tableVerts.push([Math.cos(a) * tableRadius, tableY, Math.sin(a) * tableRadius]);
  }

  const girdleVerts = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    girdleVerts.push([Math.cos(a) * radius, girdleY, Math.sin(a) * radius]);
  }

  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    vertices.push(...tableCenter, ...tableVerts[i], ...tableVerts[next]);
  }

  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    vertices.push(...tableVerts[i], ...girdleVerts[i], ...girdleVerts[next]);
    vertices.push(...tableVerts[i], ...girdleVerts[next], ...tableVerts[next]);
  }

  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    vertices.push(...culet, ...girdleVerts[next], ...girdleVerts[i]);
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.computeVertexNormals();
  return geo;
}

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

    // 3. Dynamic Studio Environment Map
    const studioEnv = createStudioEnvironment();
    scene.environment = studioEnv;

    // 4. Studio Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xddeeff, 2.6);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const bounceLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    bounceLight.position.set(0, -3, 2.5);
    scene.add(bounceLight);

    // 5. Build 3D Jewellery: Royal Solitaire Ring (Unified Cathedral Architecture)
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
      envMapIntensity: 2.8,
    });

    // A. Main Shank (Band) - Upright in XY plane
    const shankGeo = new THREE.TorusGeometry(1.22, 0.155, 32, 90);
    const shankMesh = new THREE.Mesh(shankGeo, metalMaterial);
    ringGroup.add(shankMesh);
    metalMeshesRef.current.push(shankMesh);

    // B. Inner Comfort-Fit Core
    const innerGeo = new THREE.TorusGeometry(1.22, 0.135, 24, 70);
    const innerMesh = new THREE.Mesh(innerGeo, metalMaterial);
    ringGroup.add(innerMesh);
    metalMeshesRef.current.push(innerMesh);

    // C. Cathedral Shoulders (Rising to collet base)
    const shoulderGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.58, 16);

    const shoulderLeft = new THREE.Mesh(shoulderGeo, metalMaterial);
    shoulderLeft.position.set(-0.46, 1.14, 0);
    shoulderLeft.rotation.z = Math.PI / 4.0;
    ringGroup.add(shoulderLeft);
    metalMeshesRef.current.push(shoulderLeft);

    const shoulderRight = new THREE.Mesh(shoulderGeo, metalMaterial);
    shoulderRight.position.set(0.46, 1.14, 0);
    shoulderRight.rotation.z = -Math.PI / 4.0;
    ringGroup.add(shoulderRight);
    metalMeshesRef.current.push(shoulderRight);

    // D. Basket Collar & Collet Platform
    const colletGeo = new THREE.CylinderGeometry(0.50, 0.38, 0.18, 24);
    const colletMesh = new THREE.Mesh(colletGeo, metalMaterial);
    colletMesh.position.set(0, 1.24, 0);
    ringGroup.add(colletMesh);
    metalMeshesRef.current.push(colletMesh);

    // E. 6 Sculpted Tulip Claw Prongs
    const clawCount = 6;
    const clawRadius = 0.44;
    const clawGeo = new THREE.CylinderGeometry(0.038, 0.048, 0.50, 12);
    const tipGeo = new THREE.SphereGeometry(0.045, 10, 10);

    for (let i = 0; i < clawCount; i++) {
      const angle = (i / clawCount) * Math.PI * 2;
      const cx = Math.cos(angle) * clawRadius;
      const cz = Math.sin(angle) * clawRadius;

      const claw = new THREE.Mesh(clawGeo, metalMaterial);
      claw.position.set(cx, 1.48, cz);
      claw.rotation.x = -cz * 0.28;
      claw.rotation.z = cx * 0.28;
      ringGroup.add(claw);
      metalMeshesRef.current.push(claw);

      const tip = new THREE.Mesh(tipGeo, metalMaterial);
      tip.position.set(cx * 0.94, 1.72, cz * 0.94);
      ringGroup.add(tip);
      metalMeshesRef.current.push(tip);
    }

    // F. Central Faceted Solitaire Gemstone (Brilliant Cut)
    const gemGeo = createBrilliantDiamondGeo(0.68, 0.42, 0.22, 0.44);
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: gemConfig.color,
      emissive: gemConfig.emissive,
      roughness: gemConfig.roughness,
      transmission: gemConfig.transmission,
      opacity: gemConfig.opacity,
      transparent: true,
      ior: 2.417,
      metalness: 0.05,
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      flatShading: true,
      envMapIntensity: 3.4,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
    gemMesh.position.set(0, 1.50, 0);
    ringGroup.add(gemMesh);
    gemMeshRef.current = gemMesh;

    // G. Shoulder Micro-Pavé Accent Diamonds
    const paveMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      roughness: 0.04,
      ior: 2.4,
      flatShading: true,
    });
    const paveGeo = new THREE.OctahedronGeometry(0.048, 0);

    for (let i = 0; i < 4; i++) {
      const xL = -0.32 - i * 0.11;
      const xR = 0.32 + i * 0.11;
      const y = 1.20 - i * 0.07;

      const microL = new THREE.Mesh(paveGeo, paveMat);
      microL.position.set(xL, y, 0.08);
      ringGroup.add(microL);
      haloGemMeshesRef.current.push(microL);

      const microR = new THREE.Mesh(paveGeo, paveMat);
      microR.position.set(xR, y, 0.08);
      ringGroup.add(microR);
      haloGemMeshesRef.current.push(microR);
    }

    // Contact floor shadow
    const shadowGeo = new THREE.PlaneGeometry(3.8, 3.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d');
    const sGrad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    sGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.35)');
    sGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    shadowCtx.fillStyle = sGrad;
    shadowCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.65;
    scene.add(shadowMesh);

    // Initial orientation
    ringGroup.rotation.x = 0.32;
    ringGroup.rotation.y = 0.45;

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

      // Auto rotation with Harmonic Multi-Axis Precession (Premium luxury motion)
      if (isAutoRotating && !isDraggingRef.current) {
        const cinematicPitch = 0.32 + Math.sin(elapsedTime * 0.75) * 0.12;
        targetRotationRef.current.x = cinematicPitch;
        targetRotationRef.current.y += 0.004 + Math.sin(elapsedTime * 0.6) * 0.002;
        if (ringGroupRef.current) {
          ringGroupRef.current.rotation.z = Math.cos(elapsedTime * 0.55) * 0.08;
        }
      }

      // Smooth interpolation for rotations
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (ringGroupRef.current) {
        ringGroupRef.current.rotation.x = currentRotationRef.current.x;
        ringGroupRef.current.rotation.y = currentRotationRef.current.y;
        // Weightless floating hover
        ringGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

        // Dynamic shadow breathing
        shadowMesh.scale.setScalar(1.0 - ringGroupRef.current.position.y * 0.35);
        shadowMat.opacity = 0.42 - ringGroupRef.current.position.y * 0.18;
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
