## Goal

Redesign the Contact ("Let's Talk") section on mobile so all 4 elements fit one screen, with the contact form opening in a full-screen overlay window (not a drawer). Desktop stays untouched.

## Mobile layout

Primary screen shows everything except the form:

```text
┌─────────────────────────────┐
│  Let's Talk                 │  ← header
│  Short intro paragraph      │
├─────────────────────────────┤
│        ◉ portrait           │  ← centered avatar
│      Helgi Hreinn           │
│   ✉ helgihreinn@me.com      │
│   ☎ +45 4083 1842           │
│   ⌖ Copenhagen, Denmark     │
├─────────────────────────────┤
│ [LinkedIn] [Download CV]    │  ← CTA pills
│         [GitHub]            │
├─────────────────────────────┤
│  [ ✉ Send a message ]       │  ← opens overlay
└─────────────────────────────┘
```

Tapping "Send a message" opens a full-screen overlay window:

```text
┌─────────────────────────────┐
│ Send a message          [✕] │  ← header bar with close
├─────────────────────────────┤
│  Name                       │
│  Subject ▾                  │
│  Email                      │
│  Message                    │
│                             │
│  [ Start a Conversation ]   │
└─────────────────────────────┘
```

## Behaviour of the overlay

- Triggered by the primary CTA on the mobile screen.
- Renders as a fixed full-screen panel (`fixed inset-0 z-50`) with the project's white background, sitting above the snap container.
- Header bar with the title "Send a message" on the left and a close (✕) button on the right.
- Locks body/snap-container scroll while open; the overlay itself scrolls internally if the keyboard pushes the form.
- Closes via:
  - Tap the ✕ button
  - Tap outside the form area (on the backdrop, if a backdrop is used)
  - Successful form submission (auto-close + toast)
  - Press Escape (desktop-safety, no-op on mobile)
- Animates in with a quick fade + slight upward translate using the existing framer-motion smoothing.

## What changes vs. today

- Wrap the existing desktop two-column layout in `hidden md:grid` / `hidden md:flex` so it is byte-identical on `md+`.
- Add a new `md:hidden` mobile block containing header, contact info, CTAs, and the "Send a message" trigger.
- Add a controlled state (`formOpen`) and an overlay component that reuses the exact same form, validation, and submit handler already used on desktop.
- Footer block (H logo + copyright) stays as-is on desktop; on mobile it becomes a single tight line at the bottom of the section so the primary content doesn't get pushed off-screen.

## Out of scope

- Desktop layout, copy, colors, fonts — unchanged.
- Form fields, submit logic, Supabase email functions — unchanged.
- Other sections.

## Technical notes

- Single file change: `src/components/Contact.tsx`.
- Reuse the existing `form` state, `handleSubmit`, and Supabase calls — just render the form markup inside the overlay on mobile and inline on desktop (extract a small `ContactForm` sub-component in the same file to avoid duplication).
- Use `position: fixed; inset: 0; z-50` for the overlay so it escapes the `snap-section`'s `overflow: hidden`.
- Lock background scroll while open by toggling `document.body.style.overflow` (and the `.snap-container` overflow) — restore on close.
- Keep all motion subtle, in line with the rest of the site (`duration: 0.4`, ease-out).
- No new dependencies.
