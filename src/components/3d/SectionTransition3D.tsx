import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * SectionTransition3D:
 * An haute-couture 3D spatial transition bridge across page sections.
 * Positioned in the outer architectural margins (z-0 behind content),
 * featuring 3 refined floating material specimens and a 3D architectural horizon grid
 * that choreographs perspective tilt, rotation, and lighting seamlessly as the user scrolls between sections.
 */
export default function SectionTransition3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Architectural Studio Chiaroscuro)
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff1dc, 2.2);
    dirLight1.position.set(8, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc5a880, 1.5);
    dirLight2.position.set(-8, -6, 6);
    scene.add(dirLight2);

    // 3. Materials
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.85,
      roughness: 0.25,
    });

    const darkOakMat = new THREE.MeshStandardMaterial({
      color: 0x3a2c20,
      metalness: 0.1,
      roughness: 0.7,
    });

    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      metalness: 0.05,
      roughness: 0.2,
    });

    // 4. Specimen 1: Fluted Architectural Column (Millwork & Casegoods)
    const columnGroup = new THREE.Group();
    const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.6, 24);
    const coreMesh = new THREE.Mesh(coreGeo, darkOakMat);
    columnGroup.add(coreMesh);

    // Fluted decorative slats around cylinder
    const slatCount = 12;
    const slatGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.6, 8);
    for (let i = 0; i < slatCount; i++) {
      const angle = (i / slatCount) * Math.PI * 2;
      const slat = new THREE.Mesh(slatGeo, i % 2 === 0 ? brassMat : darkOakMat);
      slat.position.set(Math.cos(angle) * 0.54, 0, Math.sin(angle) * 0.54);
      columnGroup.add(slat);
    }

    // Brass collars at top and bottom
    const collarGeo = new THREE.TorusGeometry(0.56, 0.04, 16, 28);
    const collarTop = new THREE.Mesh(collarGeo, brassMat);
    collarTop.rotation.x = Math.PI / 2;
    collarTop.position.y = 1.25;
    columnGroup.add(collarTop);

    const collarBottom = new THREE.Mesh(collarGeo, brassMat);
    collarBottom.rotation.x = Math.PI / 2;
    collarBottom.position.y = -1.25;
    columnGroup.add(collarBottom);

    columnGroup.scale.setScalar(0.7);
    scene.add(columnGroup);

    // 5. Specimen 2: Chamfered Natural Marble Slab (Stone Tabletops)
    const slabGroup = new THREE.Group();
    const slabGeo = new THREE.BoxGeometry(2.0, 0.22, 1.2);
    const slabMesh = new THREE.Mesh(slabGeo, marbleMat);
    slabGroup.add(slabMesh);

    // Fine brass undercarriage plate
    const plateGeo = new THREE.BoxGeometry(2.04, 0.03, 1.24);
    const plateMesh = new THREE.Mesh(plateGeo, brassMat);
    plateMesh.position.y = -0.12;
    slabGroup.add(plateMesh);

    slabGroup.scale.setScalar(0.75);
    scene.add(slabGroup);

    // 6. Specimen 3: Precision Joinery Ring & Coordinate Marker
    const ringGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(0.9, 0.05, 16, 36);
    const ringMesh = new THREE.Mesh(ringGeo, brassMat);
    ringGroup.add(ringMesh);

    const innerRingGeo = new THREE.TorusGeometry(0.55, 0.03, 16, 28);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, brassMat);
    innerRingMesh.rotation.x = Math.PI / 3;
    ringGroup.add(innerRingMesh);

    // Coordinate crosshair axes
    const axisGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.0, 8);
    const axisX = new THREE.Mesh(axisGeo, brassMat);
    axisX.rotation.z = Math.PI / 2;
    ringGroup.add(axisX);

    const axisY = new THREE.Mesh(axisGeo, brassMat);
    ringGroup.add(axisY);

    ringGroup.scale.setScalar(0.7);
    scene.add(ringGroup);

    // 7. Ambient Architectural Dust Particles
    const particleCount = 60;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 8. 3D Architectural Spatial Grid Horizon (Subtle perspective floor lines)
    const gridHelper = new THREE.GridHelper(30, 20, 0xc5a880, 0xe5d8c3);
    gridHelper.position.y = -6;
    gridHelper.rotation.x = 0;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.12;
    scene.add(gridHelper);

    // 9. Scroll & Mouse Tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    // 10. Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop with Section-Aware Margin Choreography
    let clock = 0;

    const animate = () => {
      clock += 0.01;

      // Smooth lerp damping
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const p = currentScrollProgress;

      // Camera parallax
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.3;
      camera.lookAt(0, 0, 0);

      // Section Transitions:
      // Keep specimens strictly in the spatial margins so they frame the content:
      // Right margin base: x = 7.5
      // Left margin base: x = -7.5

      // Specimen 1: Fluted Column (Right Margin)
      const colX = 7.2 + Math.sin(p * Math.PI * 2) * 1.0;
      const colY = Math.cos(p * Math.PI * 3) * 3.5;
      const colZ = Math.sin(p * Math.PI * 4) * 1.5;

      columnGroup.position.set(colX, colY, colZ);
      columnGroup.rotation.x = clock * 0.3 + p * Math.PI * 2;
      columnGroup.rotation.y = clock * 0.5 + p * Math.PI * 4;

      // Specimen 2: Marble Slab (Left Margin)
      const slabX = -7.2 - Math.cos(p * Math.PI * 2) * 0.8;
      const slabY = -Math.sin(p * Math.PI * 3) * 3.2;
      const slabZ = Math.cos(p * Math.PI * 3) * 1.5;

      slabGroup.position.set(slabX, slabY, slabZ);
      slabGroup.rotation.x = Math.PI * 0.15 + Math.sin(clock * 0.4 + p * 4) * 0.3;
      slabGroup.rotation.y = clock * 0.2 + p * Math.PI * 3;
      slabGroup.rotation.z = Math.sin(p * Math.PI * 2) * 0.3;

      // Specimen 3: Joinery Ring (Orbits gently between Left & Right across sections)
      // When transitioning across sections, glides gracefully through depth
      const ringX = Math.sin(p * Math.PI * 4) * 7.5;
      const ringY = Math.cos(p * Math.PI * 4) * 4.0;
      const ringZ = -1.5 + Math.sin(p * Math.PI * 3) * 2.0;

      ringGroup.position.set(ringX, ringY, ringZ);
      ringGroup.rotation.x = clock * 0.5 + p * Math.PI * 3;
      ringGroup.rotation.y = clock * 0.4 + p * Math.PI * 2.5;

      // Grid horizon tilt according to scroll progress
      gridHelper.position.y = -5.5 + Math.sin(p * Math.PI * 3) * 1.5;
      gridHelper.rotation.y = clock * 0.05 + p * 0.8;

      // Ambient particle drift
      particlePoints.rotation.y = clock * 0.04 + p * 0.4;
      particlePoints.rotation.x = Math.sin(clock * 0.02) * 0.1;

      // Lighting adjustments for dark mode sections
      const isDarkSection = p > 0.65 && p < 0.85;
      dirLight1.intensity = isDarkSection ? 2.8 : 2.2;
      dirLight2.intensity = isDarkSection ? 1.8 : 1.5;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // 12. Cleanup
    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      slatGeo.dispose();
      collarGeo.dispose();
      slabGeo.dispose();
      plateGeo.dispose();
      ringGeo.dispose();
      innerRingGeo.dispose();
      axisGeo.dispose();
      particleGeo.dispose();
      gridHelper.geometry.dispose();

      brassMat.dispose();
      darkOakMat.dispose();
      marbleMat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
