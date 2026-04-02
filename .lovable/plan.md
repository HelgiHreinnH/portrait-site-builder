

## Redesign: Three Fields — Isometric 3D Blocks

### Concept

Replace the current Venn diagram with three interlocking isometric blocks rendered using CSS transforms (no WebGL needed). Each block represents People, Buildings, and Technology, arranged so they visually interlock — communicating that the three disciplines fit together spatially.

### Layout

```text
┌──────────────────────────────────────────────────────────┐
│  Three Fields. One Approach.                             │
│  Subtitle text...                                        │
│                                                          │
│         ┌──────┐                                         │
│        /      /│  ← People (blue-light)                  │
│       /──────/ │                                         │
│       │      │/┌──────┐                                  │
│       └──────┘/      /│  ← Technology (sage)             │
│         ┌────/──────/ │                                  │
│        /    │      │/                                    │
│       /─────└──────┘   Detail panel:                     │
│       │     │          Title, description, tags           │
│       │     │/                                           │
│       └─────┘  ← Buildings (steel)                       │
│                                                          │
│  ─── People · Buildings · Technology                     │
└──────────────────────────────────────────────────────────┘
```

### Implementation

**File: `src/components/Services.tsx`** — full rewrite

1. **CSS-only isometric blocks** — no 3D library needed
   - Use CSS `transform: rotateX(…) rotateY(…) rotateZ(…)` with `transform-style: preserve-3d` to create three cube-like blocks
   - Each block is a div with three visible faces (top, left, right) using the existing accent colors
   - Blocks are staggered and slightly overlapping to create a physical interlocking feeling

2. **Three blocks arrangement**
   - Stacked/offset in an isometric grid pattern — like architectural building blocks
   - People block (top-left), Buildings block (bottom-center), Technology block (top-right)
   - Positioned so edges touch or overlap, showing they connect

3. **Hover interaction with Framer Motion**
   - Hovering a block lifts it slightly (translateY) and brightens it
   - Non-hovered blocks dim and shift down subtly
   - Detail panel on the right updates with the hovered field's discipline, description, and tags (same AnimatePresence pattern as current)

4. **Colors** — map existing accents to block faces:
   - People: `#D5DEF4` (light blue) with darker variants for side faces
   - Buildings: `#B8C9EE` (steel blue) with darker variants
   - Technology: `#DCE8E6` (sage) with darker variants

5. **Responsive behavior**
   - Desktop: blocks on the left, detail panel on the right (same 50/50 split)
   - Mobile: blocks scale down and stack above the detail panel

6. **Keep existing data** — reuse `services` array, section header, and bottom footer

### Technical details
- Pure CSS transforms for isometric effect — no `@react-three/fiber` or WebGL
- Framer Motion `motion.div` for hover lift/dim animations
- Each block face is an absolutely positioned div with skew/rotate transforms
- No new dependencies required

