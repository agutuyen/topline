export interface Section3DState {
  sectionId: string;
  camera: {
    position: [number, number, number];
    lookAt: [number, number, number];
    fov: number;
  };
  monolith: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    separation: number; // 0 = closed, 1 = exploded/expanded
    materialMode: 'warm-wood' | 'technical' | 'ebonized' | 'sculptural' | 'gold-accent';
  };
  lighting: {
    keyIntensity: number;
    ambientIntensity: number;
    rimIntensity: number;
    keyColor: string;
  };
  canvasOpacity: number;
}

export const SCENE_SECTIONS: Section3DState[] = [
  // 1. Hero
  {
    sectionId: 'hero',
    camera: {
      position: [0, 0, 4.6],
      lookAt: [0.6, 0, 0],
      fov: 45,
    },
    monolith: {
      position: [1.3, -0.1, 0],
      rotation: [0.15, -0.45, 0.05],
      scale: [1, 1, 1],
      separation: 0,
      materialMode: 'warm-wood',
    },
    lighting: {
      keyIntensity: 1.4,
      ambientIntensity: 0.6,
      rimIntensity: 1.2,
      keyColor: '#FFF6E8',
    },
    canvasOpacity: 0.85,
  },

  // 2. Problem (About - Nhu cầu quy mô & Khắc phục nút thắt)
  {
    sectionId: 'about',
    camera: {
      position: [0.3, -0.15, 3.6],
      lookAt: [0.8, -0.1, 0],
      fov: 42,
    },
    monolith: {
      position: [1.2, -0.2, 0.2],
      rotation: [0.25, -0.75, 0.1],
      scale: [1.05, 1.05, 1.05],
      separation: 0.55, // Explode to reveal joinery craftsmanship
      materialMode: 'technical',
    },
    lighting: {
      keyIntensity: 1.1,
      ambientIntensity: 0.5,
      rimIntensity: 1.6,
      keyColor: '#E8D5B5',
    },
    canvasOpacity: 0.7,
  },

  // 3. Solution (Capabilities - Năng lực may đo chuẩn xác)
  {
    sectionId: 'capabilities',
    camera: {
      position: [-0.4, 0.1, 3.4],
      lookAt: [-0.8, 0, 0],
      fov: 40,
    },
    monolith: {
      position: [-1.2, 0.0, 0.1],
      rotation: [-0.1, 0.65, -0.05],
      scale: [1.0, 1.0, 1.0],
      separation: 0.0, // Re-assembled precisely
      materialMode: 'gold-accent',
    },
    lighting: {
      keyIntensity: 1.7,
      ambientIntensity: 0.7,
      rimIntensity: 1.8,
      keyColor: '#FFF2DB',
    },
    canvasOpacity: 0.65,
  },

  // 4. Features (Collections - 3 ngôn ngữ thiết kế đồng bộ)
  {
    sectionId: 'collections',
    camera: {
      position: [0, 0, 4.2],
      lookAt: [0, 0, 0],
      fov: 46,
    },
    monolith: {
      position: [0, 0.1, -0.2],
      rotation: [0.05, Math.PI * 0.95, 0],
      scale: [0.95, 0.95, 0.95],
      separation: 0.1,
      materialMode: 'ebonized',
    },
    lighting: {
      keyIntensity: 1.2,
      ambientIntensity: 0.45,
      rimIntensity: 1.4,
      keyColor: '#E5D6C0',
    },
    canvasOpacity: 0.35, // Low opacity behind dense product cards
  },

  // 5. Proof (Workflow - Kiểm định 100% & Xuất khẩu)
  {
    sectionId: 'workflow',
    camera: {
      position: [0, -0.2, 5.0],
      lookAt: [0, 0, 0],
      fov: 48,
    },
    monolith: {
      position: [0, -0.2, 0],
      rotation: [0.3, 0.4, 0.1],
      scale: [0.85, 0.85, 0.85],
      separation: 0.0,
      materialMode: 'technical',
    },
    lighting: {
      keyIntensity: 1.3,
      ambientIntensity: 0.6,
      rimIntensity: 2.0,
      keyColor: '#FAF0E0',
    },
    canvasOpacity: 0.45,
  },

  // 6. CTA (Contact & RFQ - Hoàn thiện chuẩn mực)
  {
    sectionId: 'contact',
    camera: {
      position: [0.5, 0, 3.6],
      lookAt: [0.8, 0, 0],
      fov: 42,
    },
    monolith: {
      position: [1.3, 0.0, 0],
      rotation: [-0.05, -0.35, 0],
      scale: [1.02, 1.02, 1.02],
      separation: 0,
      materialMode: 'gold-accent',
    },
    lighting: {
      keyIntensity: 1.6,
      ambientIntensity: 0.5,
      rimIntensity: 1.5,
      keyColor: '#FFEBD1',
    },
    canvasOpacity: 0.6,
  },
];
