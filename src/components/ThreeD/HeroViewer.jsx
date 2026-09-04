import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

export default function HeroViewer() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.25, y: 0.2 });
  const currentRotationRef = useRef({ x: 0.25, y: 0.2 });
  const [activeMetal, setActiveMetal] = useState('gold');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcfd8dc, 2.5);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    const warmAccentLight = new THREE.PointLight(0xd4af37, 2.0, 10);
    warmAccentLight.position.set(0, -2, 3);
    scene.add(warmAccentLight);

    // 4. Hero Ring Geometry
    const ringGroup = new THREE.Group();

    // Metal Material
    const metalColor = activeMetal === 'rose' ? 0xde9888 : activeMetal === 'platinum' ? 0xe8ecf2 : 0xe5b83b;
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: metalColor,
      roughness: 0.16,
      metalness: 0.95,
      envMapIntensity: 2.2,
    });

    // Band
    const bandGeo = new THREE.TorusGeometry(1.3, 0.18, 32, 100);
    const bandMesh = new THREE.Mesh(bandGeo, metalMaterial);
    bandMesh.rotation.x = Math.PI / 2.2;
    ringGroup.add(bandMesh);

    // Prongs
    const prongGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.55, 12);
    const prongs = [
      [0.32, 1.6, 0.32],
      [-0.32, 1.6, 0.32],
      [0.32, 1.6, -0.32],
      [-0.32, 1.6, -0.32],
    ];
    prongs.forEach(([px, py, pz]) => {
      const prong = new THREE.Mesh(prongGeo, metalMaterial);
      prong.position.set(px, py, pz);
      ringGroup.add(prong);
    });

    // Halo Base
    const haloBase = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.45, 0.2, 24), metalMaterial);
    haloBase.position.set(0, 1.4, 0);
    ringGroup.add(haloBase);

    // Solitaire Gemstone
    const gemGeo = new THREE.OctahedronGeometry(0.58, 1);
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 0.98,
      transparent: true,
      roughness: 0.02,
      ior: 2.42,
      reflectivity: 0.98,
      clearcoat: 1.0,
      flatShading: true,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
    gemMesh.position.set(0, 1.7, 0);
    gemMesh.scale.set(1.1, 0.9, 1.1);
    ringGroup.add(gemMesh);

    // Halo micro stones
    const haloMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      transparent: true,
      roughness: 0.05,
      ior: 2.4,
    });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const micro = new THREE.Mesh(new THREE.OctahedronGeometry(0.07, 0), haloMat);
      micro.position.set(Math.cos(angle) * 0.62, 1.45, Math.sin(angle) * 0.62);
      ringGroup.add(micro);
    }

    scene.add(ringGroup);

    // 5. Floating Gold Dust Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5df99,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse Motion Tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
      targetRotationRef.current.y = x * 0.7 + 0.3;
      targetRotationRef.current.x = -y * 0.4 + 0.25;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationRef.current.y = x * 0.8 + 0.3;
      targetRotationRef.current.x = -y * 0.4 + 0.25;
    };

    // Scroll-based parallax
    const handleScroll = () => {
      const scrollY = window.scrollY;
      ringGroup.position.y = -scrollY * 0.0012;
      ringGroup.rotation.z = scrollY * 0.0008;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle luxury rotation
      targetRotationRef.current.y += 0.003;

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      ringGroup.rotation.x = currentRotationRef.current.x;
      ringGroup.rotation.y = currentRotationRef.current.y;
      ringGroup.position.y += Math.sin(elapsedTime * 1.8) * 0.002;

      // Particle subtle rotation
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 550;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeMetal]);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-gold-500/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-gold-400/10 blur-3xl pointer-events-none -z-10" />

      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-pointer" />

      {/* Floating Badge & Quick Metal Switcher */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-obsidian-900/80 border border-gold-400/30 backdrop-blur-xl shadow-xl">
          <button
            onClick={() => setActiveMetal('gold')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeMetal === 'gold'
                ? 'bg-gold-500 text-obsidian-950 font-semibold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-gold-200" />
            22K Yellow Gold
          </button>
          <button
            onClick={() => setActiveMetal('rose')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeMetal === 'rose'
                ? 'bg-[#de9888] text-obsidian-950 font-semibold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#f3c1b6]" />
            Rose Gold
          </button>
          <button
            onClick={() => setActiveMetal('platinum')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeMetal === 'platinum'
                ? 'bg-neutral-200 text-obsidian-950 font-semibold shadow-md'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Platinum
          </button>
        </div>
        <span className="text-[11px] text-neutral-400 font-sans tracking-widest uppercase flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
          Move mouse to interact with 3D ring
        </span>
      </div>
    </div>
  );
}
