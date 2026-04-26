## Plan

Redesign the mobile-only version of the "From Convention to Insight" section into two deliberate screens that fit within a single mobile viewport, while leaving the desktop layout unchanged.

## Recommended mobile interaction

Use a **two-screen horizontal pager** for mobile.

Why this is the best fit here:
- It matches the interaction already used in the Projects section, so the site stays behaviorally consistent.
- It avoids the current "double scroll" problem caused by stacked content and nested vertical scrolling.
- It keeps both desktop ideas intact as two separate mobile experiences instead of compressing both into one overloaded screen.
- It works with touch naturally, and can still be supported with tapable dots/buttons.

I would not recommend:
- **Vertical scroll between screen 1 and screen 2**: too easy to feel like one long broken section again.
- **Single tap only**: usable, but less discoverable and less natural than a swipe on mobile.

## What I’ll build

### 1. Keep desktop exactly as-is
- Leave the `md+` About layout untouched.
- Restrict all redesign work to the `md:hidden` mobile block in `src/components/About.tsx`.

### 2. Turn mobile into two true screens
Build the mobile version as a fixed two-page pager inside the About section:

```text
Mobile About
├─ Shared section header (shown once)
├─ Horizontal pager
│  ├─ Screen 1: Mindset shifts
│  └─ Screen 2: Ways to work together
└─ Page indicator / tap controls
```

### 3. Fix the current broken layout issues
Address the problems visible in the screenshot:
- Remove the feeling of two stacked sections on mobile.
- Prevent the second screen from reintroducing the full large heading in a way that makes the section look duplicated.
- Eliminate awkward nested scrolling where possible.
- Ensure each mobile screen fits within the available viewport height under the nav.

### 4. Refine each mobile screen for fit
#### Screen 1 — Mindset shifts
- Keep the large title and intro framing here.
- Present the shifts inside one clean card sized to the remaining viewport.
- Tighten vertical spacing and type scale only on mobile so all five pairs fit comfortably.

#### Screen 2 — Ways to Work Together
- Do **not** repeat the full large section heading.
- Use a smaller internal label/subheading so it feels like page 2 of the same section, not a new section.
- Reformat engagement items into a compact stacked card layout optimized for mobile height.
- If necessary, slightly reduce padding and metadata spacing before allowing any inner scroll.

### 5. Improve navigation clarity
- Keep horizontal swipe.
- Keep or refine the pagination dots.
- Add optional tap targets such as "01 / 02" or previous/next micro-controls if needed for discoverability.

## Technical details

- File to update: `src/components/About.tsx`
- Preserve existing desktop blocks under `hidden md:flex`.
- Rework only the mobile block under `md:hidden`.
- Use a single mobile header region plus a pager container sized against the section height.
- Use `w-screen`/viewport-based slide sizing carefully so each page snaps cleanly.
- Prefer `overflow-hidden` on the mobile section wrapper and avoid `overflow-y-auto` inside cards unless content truly cannot fit on very small devices.
- If needed, use a height formula for the pager area so the card content fits below the title and above the dots.

## Expected result

On mobile, this section will feel like one polished two-step story:
1. "From Convention to Insight" with the mindset shifts
2. "Ways to Work Together" as the follow-up screen

Users can swipe horizontally between them, desktop remains unchanged, and the broken stacked/mobile overflow behavior is removed.