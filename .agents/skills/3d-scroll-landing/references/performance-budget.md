# Performance Budget & Asset Thresholds

- **FPS Target**: Constant 60fps on modern desktop, minimum stable 50fps on mid-tier mobile.
- **Draw Calls**: Maximum 25 draw calls per frame; instanced meshes and merged geometries where applicable.
- **Triangle Count**: Geometry capped under 45,000 triangles total across the persistent scene.
- **Texture Budgets**: Maximum 2K compressed WebP/KTX2 textures; mipmapped and anisotropic filtering capped at 4x.
- **Canvas Resolution**: `dpr = Math.min(window.devicePixelRatio, 2)` to eliminate thermal throttling on Retina displays.
- **Garbage Collection**: Deterministic teardown of geometries, materials, and textures on unmount.
