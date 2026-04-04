

## Visual Layout and Communication Review

### Section-by-Section Analysis

Based on full-width 1920x1080 screenshots of all 7 sections, here are the issues and proposed fixes:

---

### 1. QuoteBreak (Hero Animation) — "TURN COMPLEXITY INTO STRATEGY"

**Issues identified:**
- The animated text block sits flush-left with small padding (`px-6 md:px-10`), leaving the entire right 60% of the screen empty on wide displays
- "I analyse. I strategise." text is pushed to the far bottom-right corner — visually disconnected from the main headline
- The staggered left-margin on each line (`ml-0`, `ml-6`, `ml-10`, `ml-3`) creates a diagonal drift that looks accidental at 1920px rather than intentional
- Text size at `lg:text-8xl` (~96px) is fine but could benefit from being larger given how much empty space surrounds it

**Proposed changes:**
- Center the entire text block horizontally on the page (use `mx-auto text-center` or `flex items-center justify-center`)
- Move "I analyse. I strategise." closer to the main headline — position it directly below or as a subtitle, left-aligned under the centered block
- Increase text to `text-[7rem]` or `text-[8rem]` on xl screens for more visual weight
- Remove the staggered margins — align all lines to the same left edge for a cleaner, more architectural feel

---

### 2. Hero (Portrait + "What I do") 

**Issues identified:**
- Content sits vertically centered but feels cramped in the left column
- The "What do I do?" question and body text are adequate size but the stats row (10+, 10K+, 3) feels small
- Layout balance is reasonable — no major changes needed

**Proposed changes:**
- Slight increase in body text from `text-sm md:text-base` to `text-base md:text-lg` for better readability
- Stats numbers could go from `text-2xl` to `text-3xl`

---

### 3. Services ("Three Fields. One Approach.")

**Issues identified:**
- Header position is correct (top-left, consistent padding)
- The wireframe blocks are quite small and sit in the vertical center of a huge empty space
- Description text `text-sm` is small for the available space
- "Hover a block to explore" instruction is easily missed

**Proposed changes:**
- Increase wireframe block size (currently 200x130px) to ~260x170px for better presence
- Bump body text to `text-base` and tags from `text-[9px]` to `text-[10px]`

---

### 4. Methodology ("How I Work")

**Issues identified:**
- Header position matches Services — good consistency
- The circular diagram is vertically centered but the whole composition feels pushed slightly left
- Body text is small (`text-sm`)
- "Hover over a phase to explore" text is centered but feels lost in the right half

**Proposed changes:**
- Increase description text to `text-base`
- Increase phase node label size slightly
- Center the circle + detail panel composition better within the full width

---

### 5. Projects ("Examples")

**Issues identified:**
- Header position is consistent with other sections — good
- Featured cards look good at full width
- The white info panel text is appropriately sized
- Overall this section works well

**Proposed changes:**
- Minor: bump subtitle text from `text-sm` to `text-base`

---

### 6. About ("From Convention to Insight")

**Issues identified:**
- Header is correctly positioned
- The comparison card is nicely centered in the top 2/3
- "Ways to Work Together" bottom section has good layout
- The "from" text in the card wraps on the first item ("Assume how spaces should be used") — could use slightly wider card

**Proposed changes:**
- Widen card from `max-w-2xl` to `max-w-3xl` to prevent text wrapping
- Bump text sizes in the card from `text-sm` to `text-base`

---

### 7. Contact ("Let's Talk")

**Issues identified:**
- Header position is consistent
- Content is all left-aligned in a narrow column with the right 60% completely empty
- Text is small (`text-sm`)
- Feels sparse and unfinished for a full-screen section

**Proposed changes:**
- Increase body text to `text-base md:text-lg`
- Consider a two-column layout or centering the content to reduce the empty right side
- Make contact info text slightly larger

---

### Global Changes (All Sections)

| Change | From | To |
|--------|------|----|
| Section body text | `text-sm` | `text-base` |
| Section subtitle/description | `text-sm` | `text-base md:text-lg` |
| Mono labels | `text-[9px]`-`text-[10px]` | `text-[10px]`-`text-[11px]` |
| Header padding | `pt-12 md:pt-16 px-6 md:px-14` | Standardize across all sections |
| Section title | `text-3xl md:text-4xl lg:text-5xl` | Keep (already strong) |

### Priority Summary

1. **QuoteBreak**: Center the animated headline, reposition "I analyse" text, increase font size — highest visual impact
2. **Global text sizing**: Bump all body text from `text-sm` to `text-base` across all sections
3. **Services**: Enlarge wireframe blocks
4. **Contact**: Better use of full-width space
5. **About**: Widen comparison card
6. **Standardize padding**: Ensure identical top/left padding on every section header

### Files to edit
- `src/components/QuoteBreak.tsx` — center layout, reposition subtitle, larger text
- `src/components/Hero.tsx` — bump text sizes
- `src/components/Services.tsx` — larger blocks, larger text
- `src/components/Methodology.tsx` — larger text, better centering
- `src/components/Projects.tsx` — minor text bump
- `src/components/About.tsx` — wider card, larger text
- `src/components/Contact.tsx` — larger text, better layout

