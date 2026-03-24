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
| `Hero.tsx` | Full-screen hero with gooey text morphing + particle field |
| `Navbar.tsx` | Fixed nav, glass effect on scroll, mobile hamburger |
| `Stats.tsx` | Animated counters (200+ clients, £300M+ revenue, etc.) |
| `Pillars.tsx` | 3-pillar philosophy: Stabilise → Systemise → Scale |
| `Testimonials.tsx` | Auto-rotating 6s carousel |
| `Contact.tsx` | Form with validation and API submission |
| `ui/gooey-text-morphing.tsx` | SVG filter morphing between text strings |
| `ui/particle-field.tsx` | Mouse-interactive canvas particle system |
| `ui/magnetic-button.tsx` | Spring-physics cursor-tracking buttons |
| `ui/tilt-card.tsx` | 3D perspective hover effect |

## Design System
- **Background**: Near-black (`#020617`)
- **Primary**: Cornflower blue (`#4169e1`)
- **Accents**: Emerald green, Teal
- **Fonts**: Inter (body) + Playfair Display (headings/quotes)
- **Effects**: Frosted glass, gradient borders, animated orbs, shimmer

## Brand Concept
The name "Regenovate" = "Regenerate" + "Innovate". This fusion is the core brand identity and should be visually expressed in the hero animation.

## Notes for Claude
- Keep animations performant — canvas/SVG preferred over heavy DOM animation
- Mobile-first responsive design throughout
- The hero animation is a flagship feature — prioritise visual impact
- Contact API at `/api/contact` currently just logs; ready for email service integration
- SSH push access confirmed via `git@github.com` (adamwilss account)
