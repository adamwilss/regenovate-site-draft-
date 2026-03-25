# REGENOVATE — Project Brief for Claude

## What is this project?
Regenovate is a premium B2B corporate website for a business investment and transformation company. They invest in, partner with, and acquire small-to-medium businesses, then transform and scale them through a proven "Business Transformation Programme" (BTP). Key focus areas: acquisition, cloud modernisation, marketing innovation, and preserving teams through transitions.

## Tech Stack
- **Framework**: Next.js (App Router, multi-page)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Repo**: git@github.com:adamwilss/regenovate-site-draft-.git

## Pages
- `/` — Home: Hero → Stats → Pillars → Testimonials → Quote
- `/about` — Company story, 20+ years, 4 sectors
- `/solutions` — 4 service cards (Acquisition, Marketing, Cloud, BTP)
- `/contact` — Contact form → `POST /api/contact`

## Key Components
| Component | Purpose |
|---|---|
| `Hero.tsx` | Full-screen hero: canvas particle intro + editorial line-clip content reveal |
| `Navbar.tsx` | Fixed nav, glass effect on scroll, mobile hamburger |
| `Stats.tsx` | Animated counters (200+ clients, £300M+ revenue, etc.) |
| `Pillars.tsx` | 3-pillar philosophy: Stabilise → Systemise → Scale — scroll-jacked wire animation (planned) |
| `Testimonials.tsx` | Auto-rotating 6s carousel |
| `Contact.tsx` | Form with validation and API submission |
| `ui/hero-particle-intro.tsx` | Canvas particle intro: "Regenerate" + "Innovate" burst and reform as "Regenovate". Same particles redirect — no new ones created. Phases: form → hold → burst → reform → hold → done |
| `ui/particle-field.tsx` | Mouse-interactive canvas particle system (hero background) |
| `ui/particle-text-effect.tsx` | Generic canvas particle-to-text effect (word cycling) |
| `ui/gooey-text-morphing.tsx` | SVG filter morphing between text strings |
| `ui/magnetic-button.tsx` | Spring-physics cursor-tracking buttons |
| `ui/tilt-card.tsx` | 3D perspective hover effect |
| `ui/text-reveal.tsx` | Word/letter clip-up reveal with useInView |
| `ui/scroll-progress.tsx` | Fixed top progress bar using useScroll + useSpring |

## Hero Animation — How it works
1. Canvas fills the screen. "Regenerate" particles assemble from the left, "Innovate" from the right.
2. Both words hold briefly, then every particle bursts outward with a random velocity.
3. The exact same particles are redirected mid-flight to form "Regenovate" at centre.
4. Equation subtitle fades in: "Regenerate + Innovate = Regenovate"
5. Canvas fades out → editorial line-clip content reveal (each headline line slides up from overflow-hidden wrapper, staggered).

## Pillars Animation — Planned (approved, not yet built)
- Outer container `h-[280vh]` + inner `sticky top-0 h-screen` for scroll-jacking
- `useScroll` + `useTransform` drive: SVG wire draw between boxes, greyscale→colour activation per box
- Wire 1 draws (box 1→2) at scroll 15–45%, box 1 activates. Wire 2 at 45–75%, box 2 activates. Box 3 at 75–95%.

## Design System
- **Background**: Near-black (`#020617`)
- **Primary**: Cornflower blue (`#4169e1`)
- **Accents**: Emerald green, Teal
- **Fonts**: Inter (body) + Playfair Display (headings/quotes)
- **Effects**: Frosted glass, gradient borders, animated orbs, shimmer
- **CSS utilities**: `.gradient-text`, `.glass`, `.glow`, `.orb`, `.shimmer`, `.gradient-border`, `.wave-divider`

## Animation Patterns in Use
- **Canvas RAF loops** — hero particle intro, background particle field
- **Framer Motion declarative** — most section animations
- **useInView** — triggers fade/slide when element enters viewport (most sections)
- **useScroll + useSpring** — scroll progress bar
- **useScroll + useTransform** — planned for Pillars scroll-jack
- **Line-clip reveal** — `overflow-hidden` wrapper + `y: "110%" → 0` for editorial text entrances (Hero content)

## Brand Concept
The name "Regenovate" = "Regenerate" + "Innovate". This fusion is the core brand identity and is literally expressed in the hero particle animation — the two source words physically transform into the combined word.

## Notes for Claude
- Keep animations performant — canvas/SVG preferred over heavy DOM animation
- Mobile-first responsive design throughout
- The hero particle intro is a flagship feature — do not regress it
- SSH push access confirmed via `git@github.com` (adamwilss account); push to `master` branch, which syncs to `origin/main`
- Contact API at `/api/contact` currently just logs; ready for email service integration
- Tailwind v4 uses `@theme {}` block in `globals.css` — no `tailwind.config.js`
