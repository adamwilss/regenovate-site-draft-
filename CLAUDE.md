# REGENOVATE Site — Agent Instructions

## Project Overview
Next.js 14 (App Router) + TypeScript + Tailwind CSS marketing site for Regenovate — a business investment, partnership, and acquisition firm.

## GitHub
**Push all changes to GitHub after every task.**
- Remote: `git@github.com:adamwilss/regenovate-site-draft-.git`
- Branch: `master`
- Always commit with a clear message summarising what changed, then push immediately.

## Stack
- Framework: Next.js 14 App Router
- Styling: Tailwind CSS + globals.css for custom animations
- Animations: Framer Motion + canvas-based particle system
- Fonts: DM Serif Display (serif headings), Bebas Neue (display), Inter (body)

## Key Files
- `src/app/page.tsx` — page composition
- `src/components/Hero.tsx` — hero section (particle intro, scramble, animations)
- `src/app/globals.css` — custom keyframe animations (orbs, shimmer, gradient-flow, marquee)
- `src/components/ui/` — shared UI primitives (particle-field, magnetic-button, hero-particle-intro)

## Design Principles
- Dark theme only (`#0a0a0f` base)
- Premium, understated — avoid over-saturated colour effects
- Animations should feel slow and confident, not flashy
- Typography hierarchy: DM Serif Display for editorial lines, Bebas Neue for large display text
