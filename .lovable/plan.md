

## Brainstorm: Redesigning the "My Approach" Section

### Heuristic Analysis of Current Design

Looking at the screenshot and code, the current section has two issues:

1. **"Ways of Working" (left)** — The comparison table is functional but visually static. The strikethrough text feels negative rather than showing progression. It reads like a spreadsheet, not a design portfolio.

2. **"Ways to Work Together" (right)** — Four stacked cards with duration badges. It works but feels like a list — no visual hierarchy or flow between the engagement types.

3. **Overall** — Both halves use different visual languages (table vs cards) but neither connects to the architectural/wireframe aesthetic established in the "Three Fields" and "Methodology" sections. There is also a lot of empty space in the bottom half of the viewport.

---

### Proposal A: "Ways to Work Together" as a Horizontal Timeline

Replace the stacked cards with a horizontal timeline that shows engagement types ordered by duration — from shortest (Advisory) to longest (Full-Scope). This communicates progression and scale.

```text
Advisory        Product Sprint     Strategic Brief     Full-Scope Project
  Ongoing         2–6 weeks          4–8 weeks          3–12 months
    ●────────────────●────────────────●────────────────────●
    |                |                |                    |
  Workshops &     Rapid proto-     Clarity before      End-to-end
  frameworks      typing           commitment          delivery
```

- Thin connecting line with dot nodes — matches the wireframe language
- Hover a node to expand its description
- Mono labels for durations, display font for titles

---

### Proposal B: "Ways of Working" as a Before/After Shift Diagram

Replace the comparison table with an animated "shift" visualization — each row is a horizontal bar that slides from the traditional position (left, muted) to the new approach (right, bold). This communicates transformation rather than a static comparison.

```text
  TRADITIONAL                          MY APPROACH
  ░░░░░░░░░░░░░░░░  ──────────►  ████████████████████
  Assume how spaces               Observe how spaces
  should be used                  are actually used
```

- Each pair is a single row with an arrow or animated slide on scroll
- The "old" text fades/dims while the "new" text becomes prominent
- Feels more like a design process diagram than a data table

---

### Proposal C: Combined — Full-Width Stacked Layout

Instead of side-by-side, stack the two sections vertically within the viewport:

**Top half:** "My Approach" as shift arrows (Proposal B)
**Bottom half:** "Ways to Work Together" as timeline (Proposal A)

This uses the full viewport width for both elements and gives each more breathing room.

---

### Proposal D: New Title

The section title "Ways of Working" is generic. Alternatives that better communicate the philosophy:

- "A Different Lens" — positions the approach as perspective shift
- "From Convention to Insight" — directly states the transformation
- "How I Think Differently" — personal and direct
- "Rethinking the Standard" — implies challenging norms

---

### Recommendation

Combine **Proposal A** (timeline for engagements) + **Proposal B** (shift diagram for approach comparison) + a stronger title. This creates two distinct visual elements that both use the architectural/wireframe design language already established on the page, while making the content feel dynamic rather than static.

### Technical scope
- Single file edit: `src/components/About.tsx`
- Framer Motion scroll-triggered animations (already in use)
- SVG for timeline line and nodes
- No new dependencies

