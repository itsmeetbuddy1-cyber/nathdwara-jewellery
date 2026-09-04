import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RefreshCw } from 'lucide-react';

/**
 * Creates an ultra-luxury studio reflection environment map dynamically
 * Gives 22K Gold and Platinum photorealistic specular reflections with zero network delay.
 */
function createStudioEnvironment() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep obsidian luxury studio background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#0c0c0f');
  bgGrad.addColorStop(0.5, '#191820');
  bgGrad.addColorStop(1, '#08080a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Overhead Key Softbox (Bright champagne specular light)
  const softbox = ctx.createRadialGradient(512, 100, 15, 512, 100, 240);
  softbox.addColorStop(0, 'rgba(255, 252, 240, 1.0)');
  softbox.addColorStop(0.35, 'rgba(255, 238, 195, 0.85)');
  softbox.addColorStop(0.7, 'rgba(212, 175, 55, 0.3)');
  softbox.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
  ctx.fillStyle = softbox;
  ctx.fillRect(200, 0, 624, 260);

  // Warm Amber Rim Light (Right side)
  const rimRight = ctx.createRadialGradient(880, 240, 20, 880, 240, 180);
  rimRight.addColorStop(0, 'rgba(245, 205, 120, 0.95)');
  rimRight.addColorStop(0.5, 'rgba(180, 125, 30, 0.5)');
  rimRight.addColorStop(1, 'rgba(160, 110, 20, 0.0)');
  ctx.fillStyle = rimRight;
  ctx.fillRect(680, 80, 344, 320);

  // Cool Platinum/Diamond Specular Fill Light (Left side)
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

/**
 * Creates an authentic 57-facet Round Brilliant Cut Solitaire Diamond Geometry
 */
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

  // 1. Table Fan
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    vertices.push(...tableCenter, ...tableVerts[i], ...tableVerts[next]);
  }

  // 2. Crown Kite/Star Facets
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    vertices.push(...tableVerts[i], ...girdleVerts[i], ...girdleVerts[next]);
    vertices.push(...tableVerts[i], ...girdleVerts[next], ...tableVerts[next]);
  }

  // 3. Pavilion Facets
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    vertices.push(...culet, ...girdleVerts[next], ...girdleVerts[i]);
  }

  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.computeVertexNormals();
  return geo;
}

/**
 * Creates soft contact shadow texture underneath the floating ring
 */
function createShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
  grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.4)');
  grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

export default function HeroViewer() {
  const mountRef = useRef(null);
  const [activeMetal, setActiveMetal] = useState('gold');

  // Dragging and interaction refs
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const userRotationRef = useRef({ x: 0, y: 0 });
  const userVelocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 550;
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 5.4);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Dynamic Studio Environment Map
    const studioEnv = createStudioEnvironment();
    scene.environment = studioEnv;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xddeeff, 2.6);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const warmUnderLight = new THREE.PointLight(0xd4af37, 2.2, 12);
    warmUnderLight.position.set(0, -2.5, 2.5);
    scene.add(warmUnderLight);

    // 5. Metal Material Setup
    const metalColors = {
      gold: 0xe5b83b,     // 22K Imperial Yellow Gold
      rose: 0xde9888,     // 18K Sunset Rose Gold
      platinum: 0xe8ecf2, // 950 Pure Platinum
    };

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: metalColors[activeMetal] || metalColors.gold,
      roughness: 0.13,
      metalness: 0.96,
      envMapIntensity: 2.8,
    });

    // 6. Master Ring Assembly (Unified Cathedral Architecture)
    const ringGroup = new THREE.Group();

    // A. Main Shank (Band) - Upright in XY Plane
    const shankGeo = new THREE.TorusGeometry(1.22, 0.155, 32, 90);
    const shankMesh = new THREE.Mesh(shankGeo, metalMaterial);
    ringGroup.add(shankMesh);

    // B. Inner Comfort-Fit Bevel
    const innerGeo = new THREE.TorusGeometry(1.22, 0.135, 24, 70);
    const innerMesh = new THREE.Mesh(innerGeo, metalMaterial);
    ringGroup.add(innerMesh);

    // C. Cathedral Shoulders (Rising gracefully to meet the collet)
    const shoulderGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.58, 16);

    const shoulderLeft = new THREE.Mesh(shoulderGeo, metalMaterial);
    shoulderLeft.position.set(-0.46, 1.14, 0);
    shoulderLeft.rotation.z = Math.PI / 4.0;
    ringGroup.add(shoulderLeft);

    const shoulderRight = new THREE.Mesh(shoulderGeo, metalMaterial);
    shoulderRight.position.set(0.46, 1.14, 0);
    shoulderRight.rotation.z = -Math.PI / 4.0;
    ringGroup.add(shoulderRight);

    // D. Basket Collar & Collet Platform
    const colletGeo = new THREE.CylinderGeometry(0.50, 0.38, 0.18, 24);
    const colletMesh = new THREE.Mesh(colletGeo, metalMaterial);
    colletMesh.position.set(0, 1.24, 0);
    ringGroup.add(colletMesh);

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

      const tip = new THREE.Mesh(tipGeo, metalMaterial);
      tip.position.set(cx * 0.94, 1.72, cz * 0.94);
      ringGroup.add(tip);
    }

    // F. Solitaire Round Brilliant Cut Diamond
    const diamondGeo = createBrilliantDiamondGeo(0.68, 0.42, 0.22, 0.44);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.97,
      opacity: 1.0,
      transparent: true,
      roughness: 0.0,
      ior: 2.417, // True natural diamond refractive index
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      flatShading: true,
      envMapIntensity: 3.4,
    });
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    diamondMesh.position.set(0, 1.50, 0);
    ringGroup.add(diamondMesh);

    // G. Shoulder Micro-Pavé Accent Diamonds
    const paveMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      roughness: 0.04,
      ior: 2.4,
      flatShading: true,
    });
    const paveGeo = new THREE.OctahedronGeometry(0.048, 0);

    // 4 stones on left shoulder, 4 on right shoulder
    for (let i = 0; i < 4; i++) {
      const t = 0.25 + i * 0.14;
      const xL = -0.32 - i * 0.11;
      const xR = 0.32 + i * 0.11;
      const y = 1.20 - i * 0.07;

      const microL = new THREE.Mesh(paveGeo, paveMat);
      microL.position.set(xL, y, 0.08);
      ringGroup.add(microL);

      const microR = new THREE.Mesh(paveGeo, paveMat);
      microR.position.set(xR, y, 0.08);
      ringGroup.add(microR);
    }

    // Set initial showcase orientation
    ringGroup.rotation.x = 0.32;
    ringGroup.rotation.y = 0.45;
    scene.add(ringGroup);

    // 7. Dynamic Velvet Floor Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.65;
    scene.add(shadowMesh);

    // 8. Floating Gold Micro-Sparkle Particles
    const particleCount = isMobile ? 24 : 50;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5.0;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5df99,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Interactive Mouse & Touch Orbital Handlers
    const handleStart = (clientX, clientY) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: clientX, y: clientY };
      userVelocityRef.current = { x: 0, y: 0 };
    };

    const handleMove = (clientX, clientY) => {
      if (!isDraggingRef.current) return;
      const deltaX = clientX - prevMousePosRef.current.x;
      const deltaY = clientY - prevMousePosRef.current.y;

      userRotationRef.current.y += deltaX * 0.007;
      userRotationRef.current.x += deltaY * 0.007;

      userVelocityRef.current = {
        x: deltaY * 0.007,
        y: deltaX * 0.007,
      };

      prevMousePosRef.current = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleEnd();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 10. Master Cinematic Floating Choreography (Harmonic Multi-Axis Precession)
    let clock = new THREE.Clock();
    let animId = null;
    let isVisible = true;
    let baseYaw = 0.45;

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Inertia decay
      if (!isDraggingRef.current) {
        userVelocityRef.current.x *= 0.94;
        userVelocityRef.current.y *= 0.94;
        userRotationRef.current.x += userVelocityRef.current.x;
        userRotationRef.current.y += userVelocityRef.current.y;

        // Elegant continuous showcase orbit (harmonic yaw)
        baseYaw += 0.004 + Math.sin(elapsedTime * 0.6) * 0.002;
      }

      // Harmonic Multi-Axis Motion (True Luxury Jewellery Commercial Float)
      const cinematicPitch = 0.32 + Math.sin(elapsedTime * 0.75) * 0.12;
      const cinematicRoll = Math.cos(elapsedTime * 0.55) * 0.08;
      const cinematicHover = Math.sin(elapsedTime * 1.5) * 0.06;

      // Apply combined rotations smoothly
      const targetX = cinematicPitch + userRotationRef.current.x;
      const targetY = baseYaw + userRotationRef.current.y;
      const targetZ = cinematicRoll;

      ringGroup.rotation.x += (targetX - ringGroup.rotation.x) * 0.06;
      ringGroup.rotation.y += (targetY - ringGroup.rotation.y) * 0.06;
      ringGroup.rotation.z += (targetZ - ringGroup.rotation.z) * 0.06;

      // Weightless floating hover
      ringGroup.position.y = cinematicHover;

      // Dynamic shadow breathing
      shadowMesh.scale.setScalar(1.0 - ringGroup.position.y * 0.35);
      shadowMat.opacity = 0.42 - ringGroup.position.y * 0.18;

      // Slow particle drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    // 11. IntersectionObserver (Pauses 100% when offscreen to save mobile battery)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animate();
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 12. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 550;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      studioEnv.dispose();
      shadowMat.dispose();
      diamondMat.dispose();
      metalMaterial.dispose();
    };
  }, [activeMetal]);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-gold-500/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full bg-gold-400/10 blur-3xl pointer-events-none -z-10" />

      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating Badge & Quick Metal Switcher */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-obsidian-950/85 border border-gold-400/35 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setActiveMetal('gold')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeMetal === 'gold'
                ? 'bg-gold-500 text-obsidian-950 font-bold shadow-gold-sm'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gold-200 shadow-inner" />
            22K Yellow Gold
          </button>
          <button
            onClick={() => setActiveMetal('rose')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeMetal === 'rose'
                ? 'bg-[#de9888] text-obsidian-950 font-bold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#f8d4cb] shadow-inner" />
            Rose Gold
          </button>
          <button
            onClick={() => setActiveMetal('platinum')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeMetal === 'platinum'
                ? 'bg-neutral-100 text-obsidian-950 font-bold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-inner" />
            Platinum
          </button>
        </div>

        <span className="text-[11px] text-neutral-400 font-sans tracking-widest uppercase flex items-center gap-1.5 bg-obsidian-950/60 px-3 py-1 rounded-full border border-white/5">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          Drag or swipe 360° to explore royal craftsmanship
        </span>
      </div>
    </div>
  );
}
