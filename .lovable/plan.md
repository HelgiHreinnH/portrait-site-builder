

## Redesign: Three Fields — Venn Overlap Diagram

### Concept

Replace the current 3-column card grid with an interactive Venn diagram showing how **People**, **Buildings**, and **Technology** overlap. Each circle represents a discipline; the intersections show where combined value emerges.

### Layout

```text
┌──────────────────────────────────────────────────────┐
│  Three Fields. One Approach.                         │
│  Subtitle text...                                    │
│                                                      │
│            ┌─────────┐                               │
│           │  People   │                              │
│            │         │                               │
│       ┌────┤   ∩     ├────┐                          │
│      │ Buildings  ∩  Technology │                     │
│       └────┤         ├────┘                          │
│            └─────────┘                               │
│                                                      │
│  [ Hover detail panel / tags appear below or aside ] │
│  People · Buildings · Technology                     │
└──────────────────────────────────────────────────────┘
```

### Implementation

**File: `src/components/Services.tsx`** — full rewrite

1. **Venn diagram using SVG + Framer Motion**
   - Three overlapping circles positioned with slight offsets (equilateral triangle arrangement)
   - Each circle uses a semi-transparent fill from the existing accent colors (`#D5DEF4`, `#B8C9EE`, `#DCE8E6`)
   - Circle labels ("People", "Buildings", "Technology") positioned at each circle's outer edge
   - `mix-blend-mode: multiply` for natural overlap coloring

2. **Hover interaction**
   - Hovering a circle highlights it (increases opacity, subtle scale) and dims the others
   - A text panel below or beside the diagram shows the discipline subtitle, description, and tags for the hovered field
   - Hovering an intersection zone could show a short line about the combined value (e.g., "Where workplace strategy meets digital tools")

3. **Intersection labels** (optional but impactful)
   - Small text or icons at each 2-way and 3-way intersection describing the cross-discipline value
   - Center (all three): "Where the best solutions emerge"

4. **Responsive behavior**
   - Desktop: diagram centered with detail panel to the right or below
   - Mobile: diagram scales down; detail panel stacks below; circles may reduce overlap for readability

5. **Keep existing data structure** — reuse the `services` array for titles, descriptions, tags, and accents

6. **Retain section header and bottom footer** exactly as they are

### Technical notes
- SVG circles with Framer Motion `motion.circle` for hover animations
- All within the existing 100vh snap section constraint
- No external libraries needed beyond existing framer-motion

