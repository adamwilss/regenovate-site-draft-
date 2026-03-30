# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## GitHub

**Push all changes to GitHub after every task.**
- Remote: `git@github.com:adamwilss/regenovate-site-draft-.git`
- Branch: `master`
- Commit with a clear message summarising what changed, then push immediately.

## Commands

```bash
npm run dev      # start local dev server (localhost:3000)
npm run build    # production build (run this to catch type/lint errors)
npm run lint     # ESLint check
```

No test suite exists. Use `npm run build` to validate changes before pushing.

## Stack

- **Next.js 14** App Router, TypeScript, React 19
- **Tailwind CSS v4** — utility classes only; no `tailwind.config.js`, config lives in `globals.css` via `@theme`
- **Framer Motion** — all page/component animations
- **Canvas API** — particle system and intro animation (no external library)
- **Fonts** loaded via Google Fonts in `layout.tsx`: Inter (body), DM Serif Display (editorial headings), Bebas Neue (display/hero), Playfair Display (fallback serif)

## Architecture

### Layout shell
`layout.tsx` wraps every page with `<ClientShell>` → `<Navbar>` → `{children}` → `<Footer>`. `ClientShell` is a thin `"use client"` boundary that lets the server layout coexist with client-only animation components.

### Pages
- `/` — `page.tsx` composes the homepage sections in order: Hero → Stats → SectorBar → Pillars → Testimonials → Quote → HomeCTA
- `/about`, `/solutions`, `/contact` — each is an App Router folder with its own `page.tsx`

### Animation system
Two layers work together:

1. **CSS keyframes** (`globals.css`) — `float` (orbs), `shimmer-sweep` (BUSINESSES text), `gradient-flow` ("like yours." text), `marquee` (SectorBar ticker). Classes: `.orb`, `.businesses-text`, `.gradient-text-flow`, `.marquee-track`.

2. **Framer Motion** — used for all enter/exit transitions on text lines, eyebrow pills, CTAs. Pattern throughout: `initial` hidden state, `animate={show ? visible : hidden}`, triggered by a `showContent` boolean that flips after the particle intro completes.

### Hero section (`Hero.tsx`)
Most complex component. Three layers:
- `<ParticleField>` canvas background (90 particles, mouse-interactive)
- `<HeroParticleIntro>` — full-screen canvas that runs a 6-phase animation sequence (form "Regenerate" + "Innovate" → hold → burst → reform "Regenovate" → hold → radial explosion → `onComplete()` fires)
- `<HeroContent>` — the actual text/CTAs, revealed after the intro completes. Uses a character-scramble hook for "BUSINESSES".

The intro canvas and hero content share the same dark navy background (`#0d1b3e`) so the opacity crossfade is seamless.

**Text clipping rule:** Never use `overflow-hidden` on wrappers around large display text — it clips descenders and trailing letter-spacing. Use `opacity + y-offset` Framer Motion animations instead of `y: "120%"` slide-from-below.

### UI primitives (`src/components/ui/`)
- `particle-field.tsx` — canvas particle network, used as hero background
- `hero-particle-intro.tsx` — standalone canvas intro animation with physics-based particle class
- `magnetic-button.tsx` — wraps `<a>` tags with cursor-magnetic hover effect
- `tilt-card.tsx`, `text-reveal.tsx`, `typewriter.tsx` — reusable motion wrappers

### Styling conventions
- Dark theme only. Base: `#0d1b3e`. Surface: `slate-900/slate-800`.
- Custom colour tokens defined in `globals.css` `@theme` block — not in a config file.
- Animations should feel **slow and confident** — shimmer at 12s+, gradient flows at 14s+. Avoid fast multi-colour sweeps.
- Logo has black text — always place it on a white/light background (currently a `bg-white/95` pill in Navbar).
