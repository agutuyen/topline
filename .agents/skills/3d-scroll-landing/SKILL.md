---
name: 3d-scroll-landing
description: Builds seamless scroll-driven 3D landing pages using Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis, camera choreography, performance budgets and reduced-motion fallbacks. Use for 3D section transitions and WebGL landing pages.
---

# 3D Scroll-Driven Landing Page Workflow

This skill defines the rigorous 5-phase engineering protocol for award-winning, scroll-driven 3D web experiences combining React Three Fiber, Three.js, and GSAP ScrollTrigger.

## Core Directives
1. **Single Persistent Canvas**: Exactly one full-screen WebGL canvas anchored behind HTML DOM layers.
2. **Unified Hero Object**: One hero 3D entity transitioning continuously through the page story. No disjointed per-section 3D instances.
3. **Clarity Over Excess**: Visual hierarchy prioritizes readable typography, architectural precision, and WCAG AA contrast.
4. **Strict Phase Gating**: Do not write production 3D code until Phase 2 Storyboard is approved by the user.

## 5-Phase Workflow
- **Phase 1 — Brief & Constraints**: Product taxonomy, audience framing, device matrices, asset/memory budget.
- **Phase 2 — Storyboard & Motion Plan**: 6-section timeline mapping camera, lighting, 3D state, scrub, and DOM animation. Must pause for user approval.
- **Phase 3 — Architecture & Scaffold**: Component boundaries, lazy canvas loading, scroll bridge hooks.
- **Phase 4 — Implementation**: Scene integration, responsive viewport adaptors, materials, and lighting.
- **Phase 5 — Performance, Accessibility & Handoff**: 60fps validation, draw call batching, memory teardown, `prefers-reduced-motion` fallbacks.
