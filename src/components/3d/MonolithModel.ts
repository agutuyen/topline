import * as THREE from 'three';

export interface MonolithMeshGroup {
  group: THREE.Group;
  topSlab: THREE.Mesh;
  brassTrim: THREE.Mesh;
  flutedBase: THREE.Group;
  internalTenons: THREE.Group;
  materials: {
    stone: THREE.MeshStandardMaterial;
    oak: THREE.MeshStandardMaterial;
    brass: THREE.MeshStandardMaterial;
    ebonized: THREE.MeshStandardMaterial;
  };
  setSeparation: (factor: number) => void;
  setMaterialMode: (mode: string) => void;
  dispose: () => void;
}

/**
 * Creates procedural luxury textures for stone and wood.
 * Uses high-efficiency 512x512 procedural canvas textures (zero network fetch lag).
 */
function createProceduralTextures() {
  // 1. Natural Stone procedural texture
  const stoneCanvas = document.createElement('canvas');
  stoneCanvas.width = 512;
  stoneCanvas.height = 512;
  const sCtx = stoneCanvas.getContext('2d')!;
  sCtx.fillStyle = '#22201F';
  sCtx.fillRect(0, 0, 512, 512);
  
  // Marble veins
  sCtx.strokeStyle = '#433E3B';
  sCtx.lineWidth = 1.5;
  for (let i = 0; i < 18; i++) {
    sCtx.beginPath();
    let x = Math.random() * 512;
    let y = Math.random() * 512;
    sCtx.moveTo(x, y);
    for (let j = 0; j < 5; j++) {
      x += (Math.random() - 0.5) * 120;
      y += (Math.random() - 0.5) * 120;
      sCtx.lineTo(x, y);
    }
    sCtx.stroke();
  }
  const stoneTexture = new THREE.CanvasTexture(stoneCanvas);
  stoneTexture.wrapS = THREE.RepeatWrapping;
  stoneTexture.wrapT = THREE.RepeatWrapping;

  // 2. Oak Wood grain procedural texture
  const woodCanvas = document.createElement('canvas');
  woodCanvas.width = 512;
  woodCanvas.height = 512;
  const wCtx = woodCanvas.getContext('2d')!;
  wCtx.fillStyle = '#C5A073'; // Warm honey oak
  wCtx.fillRect(0, 0, 512, 512);
  
  wCtx.strokeStyle = '#9E784D';
  for (let y = 0; y < 512; y += 4) {
    wCtx.beginPath();
    wCtx.moveTo(0, y + (Math.random() - 0.5) * 2);
    wCtx.lineTo(512, y + (Math.random() - 0.5) * 2);
    wCtx.stroke();
  }
  const oakTexture = new THREE.CanvasTexture(woodCanvas);
  oakTexture.wrapS = THREE.RepeatWrapping;
  oakTexture.wrapT = THREE.RepeatWrapping;

  return { stoneTexture, oakTexture };
}

export function createMonolithModel(): MonolithMeshGroup {
  const group = new THREE.Group();
  const { stoneTexture, oakTexture } = createProceduralTextures();

  // Materials
  const stoneMat = new THREE.MeshStandardMaterial({
    color: '#282523',
    map: stoneTexture,
    roughness: 0.18,
    metalness: 0.05,
  });

  const oakMat = new THREE.MeshStandardMaterial({
    color: '#C6A174',
    map: oakTexture,
    roughness: 0.55,
    metalness: 0.02,
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: '#D4AF37', // Champagne bronze gold
    roughness: 0.22,
    metalness: 0.88,
  });

  const ebonizedMat = new THREE.MeshStandardMaterial({
    color: '#121212',
    roughness: 0.45,
    metalness: 0.1,
  });

  // 1. Top Stone Slab (Rounded extruded box)
  const slabShape = new THREE.Shape();
  const slabW = 1.6;
  const slabD = 0.8;
  const radius = 0.18;
  slabShape.moveTo(-slabW / 2 + radius, -slabD / 2);
  slabShape.lineTo(slabW / 2 - radius, -slabD / 2);
  slabShape.quadraticCurveTo(slabW / 2, -slabD / 2, slabW / 2, -slabD / 2 + radius);
  slabShape.lineTo(slabW / 2, slabD / 2 - radius);
  slabShape.quadraticCurveTo(slabW / 2, slabD / 2, slabW / 2 - radius, slabD / 2);
  slabShape.lineTo(-slabW / 2 + radius, slabD / 2);
  slabShape.quadraticCurveTo(-slabW / 2, slabD / 2, -slabW / 2, slabD / 2 - radius);
  slabShape.lineTo(-slabW / 2, -slabD / 2 + radius);
  slabShape.quadraticCurveTo(-slabW / 2, -slabD / 2, -slabW / 2 + radius, -slabD / 2);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  };
  const slabGeo = new THREE.ExtrudeGeometry(slabShape, extrudeSettings);
  slabGeo.center();
  // Rotate so it lies flat (XZ plane)
  slabGeo.rotateX(-Math.PI / 2);

  const topSlab = new THREE.Mesh(slabGeo, stoneMat);
  topSlab.position.y = 0.42;
  topSlab.castShadow = true;
  topSlab.receiveShadow = true;
  group.add(topSlab);

  // 2. Brass Accent Inlay Band
  const trimGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.025, 48);
  const brassTrim = new THREE.Mesh(trimGeo, brassMat);
  brassTrim.position.y = 0.35;
  group.add(brassTrim);

  // 3. Fluted Tambour Base (Two architectural pillars with fluted ribs)
  const flutedBase = new THREE.Group();
  const pillarRadius = 0.28;
  const pillarHeight = 0.65;
  const flutesPerPillar = 20;

  [-0.45, 0.45].forEach((xOffset) => {
    const pillarGroup = new THREE.Group();
    pillarGroup.position.x = xOffset;

    // Core cylinder
    const coreGeo = new THREE.CylinderGeometry(pillarRadius, pillarRadius, pillarHeight, 32);
    const coreMesh = new THREE.Mesh(coreGeo, oakMat);
    pillarGroup.add(coreMesh);

    // Fluted ribs around cylinder perimeter
    const ribGeo = new THREE.CylinderGeometry(0.016, 0.016, pillarHeight, 8);
    for (let i = 0; i < flutesPerPillar; i++) {
      const angle = (i / flutesPerPillar) * Math.PI * 2;
      const rx = Math.cos(angle) * (pillarRadius + 0.008);
      const rz = Math.sin(angle) * (pillarRadius + 0.008);
      const ribMesh = new THREE.Mesh(ribGeo, oakMat);
      ribMesh.position.set(rx, 0, rz);
      pillarGroup.add(ribMesh);
    }
    flutedBase.add(pillarGroup);
  });
  flutedBase.position.y = 0.0;
  group.add(flutedBase);

  // 4. Internal Engineering Joinery (Visible when separation > 0)
  const internalTenons = new THREE.Group();
  [-0.3, 0.3].forEach((tx) => {
    const pinGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 16);
    const pinMesh = new THREE.Mesh(pinGeo, brassMat);
    pinMesh.position.set(tx, 0.3, 0);
    internalTenons.add(pinMesh);
  });
  internalTenons.visible = false;
  group.add(internalTenons);

  // Base elevation function
  const initialSlabY = 0.42;
  const initialTrimY = 0.35;

  const setSeparation = (factor: number) => {
    // Elevate slab and trim upward
    topSlab.position.y = initialSlabY + factor * 0.45;
    brassTrim.position.y = initialTrimY + factor * 0.22;
    // Reveal tenons when separating
    if (factor > 0.05) {
      internalTenons.visible = true;
      internalTenons.scale.set(1, Math.min(1 + factor * 1.5, 2.5), 1);
    } else {
      internalTenons.visible = false;
    }
  };

  const setMaterialMode = (mode: string) => {
    if (mode === 'ebonized') {
      flutedBase.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = ebonizedMat;
      });
      topSlab.material = ebonizedMat;
    } else if (mode === 'gold-accent') {
      flutedBase.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = oakMat;
      });
      topSlab.material = stoneMat;
      brassTrim.material = brassMat;
    } else {
      flutedBase.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = oakMat;
      });
      topSlab.material = stoneMat;
    }
  };

  const dispose = () => {
    slabGeo.dispose();
    trimGeo.dispose();
    stoneMat.dispose();
    oakMat.dispose();
    brassMat.dispose();
    ebonizedMat.dispose();
    stoneTexture.dispose();
    oakTexture.dispose();
  };

  return {
    group,
    topSlab,
    brassTrim,
    flutedBase,
    internalTenons,
    materials: {
      stone: stoneMat,
      oak: oakMat,
      brass: brassMat,
      ebonized: ebonizedMat,
    },
    setSeparation,
    setMaterialMode,
    dispose,
  };
}
