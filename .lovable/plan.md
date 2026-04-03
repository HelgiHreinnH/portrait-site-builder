

## Redesign: Projects Section — Featured Trio + Bento Grid

### What changes

Replace the current single bento grid with two distinct zones inside the same horizontal scroll container:

**Zone 1 — Featured Trio** (fills the initial viewport width)
- Three equal-width portrait cards for **Felles**, **Archi AR**, and **A Place to Work**
- Each card: full-height hero image, gradient overlay, client/title/outcome at bottom
- Equal visual hierarchy — same width (~340px each), same height (full container)
- Subtle 1px border, rounded corners, hover scale + arrow icon
- Gap of ~16px between cards

**Zone 2 — Bento Grid** (scrolls in from the right)
- Remaining 9 projects in the existing bento column layout
- Slightly larger column widths than current (~20% increase)
- Keeps quote/stat filler tiles

**Scroll Indicator** — Right-edge fade gradient with mono text
- A 120px-wide gradient fade (background → transparent, reversed) on the right edge of the viewport
- Small mono text: "More projects →" overlaid on the gradient
- Disappears once user scrolls past the featured section (track scroll position)

### Layout diagram

```text
│◄─────── viewport width ────────►│
│                                  │ gradient
│  ┌──────┐  ┌──────┐  ┌──────┐   │ fade ──► bento columns continue...
│  │Felles│  │Archi │  │A Place│   │  ░░░
│  │      │  │  AR  │  │to Work│   │  ░ "More projects →"
│  │      │  │      │  │      │   │  ░░░
│  └──────┘  └──────┘  └──────┘   │
│         FEATURED TRIO            │
```

### Technical scope

- **Single file edit**: `src/components/Projects.tsx`
- Define `featuredIds = ["felles", "archi-ar", "a-place-to-work"]`
- Split `allProjects` into `featured` and `rest` arrays
- Render featured as 3 equal flex children before the bento columns
- Add a fixed-position gradient overlay div on the right edge of the scroll container
- Use `scrollRef` scroll event listener to fade out the indicator after ~200px of scroll
- Reuse existing `ProjectTile` component for featured cards (already has hover effects)
- `buildLayout` only receives the non-featured projects

