

## Hero Section Redesign — Buttons + Content in Image Area

### Current State
The Hero section has a two-column layout: left side shows "What I do" or "Who am I" content (swapped on image hover), right side shows the portrait. The name overlay sits on top of the image. Content swap is triggered by hovering the image.

### What Changes

**1. Add a standardized header to the left column**
- Add section label `01 — Introduction` and a headline like "I turn knowledge into design" using the same header pattern as other sections (mono label + bold title + subtitle)
- Place it at the top of the left column with the standard `my-[48px]` spacing and `px-[4px]`

**2. Add two toggle buttons: "What I do" and "Who am I"**
- Place below the header on the left side
- Styled as pill/outline buttons matching the site's mono aesthetic
- Active state uses a filled/highlighted style; inactive is outline
- Clicking or hovering a button sets which content appears on the right

**3. Move existing text content into the right-side image area**
- The image remains as background/base of the right column
- When "What I do" is active: overlay the stats, description text, and subtitle on top of or below the image with a semi-transparent background
- When "Who am I" is active: overlay the bio text, contact details on top of the image area
- Use AnimatePresence for smooth transitions between the two content blocks

**4. Move name below the image, push image up**
- Remove the name overlay from inside the image
- Place "Helgi Hreinn Hjálmarsson" and "Architect · Copenhagen" below the image container as standalone text
- Increase the negative top margin on the image container (from `-mt-4` to `-mt-8` or more) to push the image higher

### Layout Structure

```text
┌─────────────────────────────────────────────────┐
│  LEFT COLUMN            │  RIGHT COLUMN          │
│                         │                        │
│  01 — Introduction      │  ┌──────────────────┐  │
│  I turn knowledge       │  │                  │  │
│  into design            │  │   Portrait Image │  │
│                         │  │                  │  │
│  [What I do] [Who am I] │  │   + overlay text │  │
│                         │  │   (swapped by    │  │
│                         │  │    active button) │  │
│                         │  └──────────────────┘  │
│                         │  Helgi Hreinn          │
│                         │  Architect · Copenhagen│
└─────────────────────────────────────────────────┘
```

### Files to Edit
- `src/components/Hero.tsx` — all changes in this single file

### Technical Details
- Replace `hovered` boolean state with `activeTab: "what" | "who"` state
- Remove `onMouseEnter`/`onMouseLeave` from image container
- Two buttons control `activeTab` via `onClick` (and optionally `onMouseEnter`)
- Left column: header + buttons only
- Right column: image + AnimatePresence content overlay + name below
- Content overlay uses `absolute` positioning over the image with a gradient/semi-transparent backdrop for readability

