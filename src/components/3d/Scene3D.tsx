import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createMonolithModel, MonolithMeshGroup } from './MonolithModel';
import { SCENE_SECTIONS } from './sceneConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff2db, 1.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xc5a880, 1.2, 10);
    rimLight.position.set(-3, 2, -1);
    scene.add(rimLight);

    // 3. Monolith Hero Model
    const monolith: MonolithMeshGroup = createMonolithModel();
    scene.add(monolith.group);

    // Apply initial Hero state
    const heroState = SCENE_SECTIONS[0];
    monolith.group.position.set(...heroState.monolith.position);
    monolith.group.rotation.set(...heroState.monolith.rotation);
    monolith.group.scale.set(...heroState.monolith.scale);
    monolith.setSeparation(heroState.monolith.separation);

    // Target interpolation state
    const targetState = {
      camX: heroState.camera.position[0],
      camY: heroState.camera.position[1],
      camZ: heroState.camera.position[2],
      lookX: heroState.camera.lookAt[0],
      lookY: heroState.camera.lookAt[1],
      lookZ: heroState.camera.lookAt[2],
      fov: heroState.camera.fov,
      mX: heroState.monolith.position[0],
      mY: heroState.monolith.position[1],
      mZ: heroState.monolith.position[2],
      rotX: heroState.monolith.rotation[0],
      rotY: heroState.monolith.rotation[1],
      rotZ: heroState.monolith.rotation[2],
      scale: heroState.monolith.scale[0],
      sep: heroState.monolith.separation,
      keyInt: heroState.lighting.keyIntensity,
      rimInt: heroState.lighting.rimIntensity,
      canvasOp: heroState.canvasOpacity,
      mode: heroState.monolith.materialMode,
    };

    // Current smoothed state
    const current = { ...targetState };

    // 4. Scroll Choreography with GSAP ScrollTrigger
    let triggers: ScrollTrigger[] = [];

    if (!prefersReducedMotion) {
      SCENE_SECTIONS.forEach((sec, idx) => {
        if (idx === 0) return; // Hero is baseline
        const el = document.getElementById(sec.sectionId);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            const prev = SCENE_SECTIONS[idx - 1];
            // Linear interpolate between prev and current section
            targetState.camX = THREE.MathUtils.lerp(prev.camera.position[0], sec.camera.position[0], p);
            targetState.camY = THREE.MathUtils.lerp(prev.camera.position[1], sec.camera.position[1], p);
            targetState.camZ = THREE.MathUtils.lerp(prev.camera.position[2], sec.camera.position[2], p);

            targetState.lookX = THREE.MathUtils.lerp(prev.camera.lookAt[0], sec.camera.lookAt[0], p);
            targetState.lookY = THREE.MathUtils.lerp(prev.camera.lookAt[1], sec.camera.lookAt[1], p);
            targetState.lookZ = THREE.MathUtils.lerp(prev.camera.lookAt[2], sec.camera.lookAt[2], p);

            targetState.mX = THREE.MathUtils.lerp(prev.monolith.position[0], sec.monolith.position[0], p);
            targetState.mY = THREE.MathUtils.lerp(prev.monolith.position[1], sec.monolith.position[1], p);
            targetState.mZ = THREE.MathUtils.lerp(prev.monolith.position[2], sec.monolith.position[2], p);

            targetState.rotX = THREE.MathUtils.lerp(prev.monolith.rotation[0], sec.monolith.rotation[0], p);
            targetState.rotY = THREE.MathUtils.lerp(prev.monolith.rotation[1], sec.monolith.rotation[1], p);
            targetState.rotZ = THREE.MathUtils.lerp(prev.monolith.rotation[2], sec.monolith.rotation[2], p);

            targetState.scale = THREE.MathUtils.lerp(prev.monolith.scale[0], sec.monolith.scale[0], p);
            targetState.sep = THREE.MathUtils.lerp(prev.monolith.separation, sec.monolith.separation, p);

            targetState.keyInt = THREE.MathUtils.lerp(prev.lighting.keyIntensity, sec.lighting.keyIntensity, p);
            targetState.rimInt = THREE.MathUtils.lerp(prev.lighting.rimIntensity, sec.lighting.rimIntensity, p);
            targetState.canvasOp = THREE.MathUtils.lerp(prev.canvasOpacity, sec.canvasOpacity, p);

            if (p > 0.5 && targetState.mode !== sec.monolith.materialMode) {
              targetState.mode = sec.monolith.materialMode;
              monolith.setMaterialMode(sec.monolith.materialMode);
            }
          },
        });
        triggers.push(trigger);
      });
    }

    // 5. Render Loop with Smooth Damping
    let animId: number;
    let clock = new THREE.Clock();

    const lookTarget = new THREE.Vector3();

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Damp values towards targets (60fps smooth easing)
      const damp = prefersReducedMotion ? 1 : 1 - Math.exp(-6 * delta);

      current.camX += (targetState.camX - current.camX) * damp;
      current.camY += (targetState.camY - current.camY) * damp;
      current.camZ += (targetState.camZ - current.camZ) * damp;

      current.lookX += (targetState.lookX - current.lookX) * damp;
      current.lookY += (targetState.lookY - current.lookY) * damp;
      current.lookZ += (targetState.lookZ - current.lookZ) * damp;

      current.mX += (targetState.mX - current.mX) * damp;
      current.mY += (targetState.mY - current.mY) * damp;
      current.mZ += (targetState.mZ - current.mZ) * damp;

      current.rotX += (targetState.rotX - current.rotX) * damp;
      current.rotY += (targetState.rotY - current.rotY) * damp;
      current.rotZ += (targetState.rotZ - current.rotZ) * damp;

      current.scale += (targetState.scale - current.scale) * damp;
      current.sep += (targetState.sep - current.sep) * damp;

      current.keyInt += (targetState.keyInt - current.keyInt) * damp;
      current.rimInt += (targetState.rimInt - current.rimInt) * damp;
      current.canvasOp += (targetState.canvasOp - current.canvasOp) * damp;

      // Apply to Three.js scene
      camera.position.set(current.camX, current.camY, current.camZ);
      lookTarget.set(current.lookX, current.lookY, current.lookZ);
      camera.lookAt(lookTarget);

      // Idle float breathing motion (very subtle)
      const idleFloat = Math.sin(clock.getElapsedTime() * 0.8) * 0.02;
      monolith.group.position.set(current.mX, current.mY + idleFloat, current.mZ);
      monolith.group.rotation.set(current.rotX, current.rotY, current.rotZ);
      monolith.group.scale.setScalar(current.scale);
      monolith.setSeparation(current.sep);

      keyLight.intensity = current.keyInt;
      rimLight.intensity = current.rimInt;

      if (container) {
        container.style.opacity = current.canvasOp.toFixed(2);
      }

      renderer.render(scene, camera);
    };

    tick();

    // 6. Responsive Resize Handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Mobile camera pull-back adaptor
      if (width < 768) {
        targetState.camZ = 6.0;
        targetState.mX = 0; // Center on mobile
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 7. Teardown & Garbage Collection
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      triggers.forEach((t) => t.kill());
      monolith.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500"
    />
  );
}
