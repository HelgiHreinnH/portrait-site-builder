

## Hero Section Restructure — Buttons Left, Content/Image Right

### Current State
The Hero section has a two-column grid: left column shows "What I do" or "Who am I" text content (toggled by hovering the right-side image), right column shows the portrait. The toggle is driven by mouse enter/leave on the image container.

### What Changes

**New layout: Left column = header + two buttons, Right column = image OR text content**

```text
┌──────────────────────────────────────────────────────┐
│  LEFT COLUMN (narrow)     │  RIGHT COLUMN (wide)      │
│                           │                           │
│  [What do I do?]          │  Default: Portrait image  │
│  [Who am I?]              │  Hover btn 1: "What I do" │
│                           │    text replaces image    │
│                           │  Hover btn 2: "Who am I"  │
│                           │    text replaces image    │
│                           │                           │
│                           │  Name below image area    │
└──────────────────────────────────────────────────────┘
```

### Interaction Logic

- State: `activeView: "image" | "what" | "who"` (default: `"image"`)
- **Button "What do I do?"**: `onMouseEnter` and `onClick` set `activeView = "what"`; `onMouseLeave` sets `activeView = "image"`
- **Button "Who am I?"**: `onMouseEnter` and `onClick` set `activeView = "who"`; `onMouseLeave` sets `activeView = "image"`
- Clicking outside the buttons or moving mouse away returns to image view

### Right Column Content

Three states with AnimatePresence transitions:

1. **`"image"` (default)**: Portrait image visible, name overlay at bottom
2. **`"what"`**: Image hidden. Show the "What do I do?" content — the italic question header, "I turn knowledge into design" large text, description, stats (10+, 10K+, 3), and the mono architect tagline
3. **`"who"`**: Image hidden. Show the "Who am I?" content — "Helgi Hreinn Hjálmarsson" heading, three bio paragraphs, and the email/phone/base contact rows

### Left Column Content

- Keep the standardized header (already there, above the grid)
- Two styled buttons stacked vertically, matching the site's mono/architectural aesthetic
- Active button gets a highlighted state (filled background or underline)

### Files to Edit

- `src/components/Hero.tsx` — single file, full restructure of the grid content

### Technical Details

- Replace `hovered` boolean with `activeView` state
- Move all "What I do" and "Who am I" content from the left column into the right column
- Left column becomes just the two buttons
- Right column uses `AnimatePresence mode="wait"` to swap between image and text
- Buttons use `onMouseEnter`/`onMouseLeave` plus `onClick` for both hover and click interaction
- Grid proportions change from `grid-cols-2` to something like `grid-cols-[auto_1fr]` or `grid-cols-[200px_1fr]` to give more space to the right content area

