

## Layout Analysis

Looking at the three screenshots, here are the core problems:

1. **Massive vertical gap** between the buttons and the image — the buttons sit at the top of the grid while the image floats in the lower half, creating a disconnected feel
2. **Image container is too tall and unanchored** — it uses `flex-1` with `maxHeight: calc(100vh - 320px)` which makes the image drift downward in the available space
3. **Buttons feel orphaned** — they're tiny text elements in a huge empty left column with no visual relationship to the right content
4. **Name + marquee collision** — "Helgi Hreinn Hjálmarsson" and the client marquee crowd together at the bottom
5. **Text content views lack vertical grounding** — when "What I do" or "Who am I" content shows, it floats in a tall container with uneven whitespace

## Proposed Fix

Restructure the grid area so buttons and content are vertically centered together, with a controlled-height right column.

### Changes to `src/components/Hero.tsx`:

1. **Vertically center the grid content** — change `items-start` to `items-center` so buttons align with the middle of the right column
2. **Give the right column a fixed height** instead of `flex-1` — use something like `h-[calc(100vh-380px)]` so the image/content area has a predictable, proportional size
3. **Remove `-mt-8`** from the image container — no longer needed once the layout is properly centered
4. **Move the name inside the image container** as an overlay at the bottom, so it doesn't add extra height below
5. **Add subtle vertical centering padding to the button column** so buttons feel anchored to the content area
6. **Tighten the marquee spacing** — reduce `pt-4` to `pt-2` and pin it to the bottom with `mt-auto`

The result: buttons and image/content share a visual center line, the image fills a well-proportioned rectangle, and the name overlays the image bottom rather than pushing everything down.

### File to edit
- `src/components/Hero.tsx`

