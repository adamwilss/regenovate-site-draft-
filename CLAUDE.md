# REGENOVATE — Project Brief & Improvement Framework

## What is this project?
Regenovate is a premium B2B corporate website for a business investment and transformation company. They invest in, partner with, and acquire small-to-medium businesses, then transform and scale them through a proven "Business Transformation Programme" (BTP). Key focus areas: acquisition, cloud modernisation, marketing innovation, and preserving teams through transitions.

## Tech Stack
- **Framework**: Next.js (App Router, multi-page)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@theme {}` block in `globals.css` — no `tailwind.config.js`)
- **Animations**: Framer Motion
- **Deployment**: Vercel (auto-deploys on push to `master`)
- **Repo**: `git@github.com:adamwilss/regenovate-site-draft-.git` — push to `master`

## Pages
- `/` — Home: Hero → Stats → Pillars → Testimonials → Quote
- `/about` — Company story, 20+ years, 4 sectors
- `/solutions` — 4 service cards (Acquisition, Marketing, Cloud, BTP)
- `/contact` — Contact form → `POST /api/contact`

## Key Components
| Component | Purpose |
|---|---|
| `Hero.tsx` | Full-screen hero: canvas particle intro + editorial line-clip content reveal |
| `Navbar.tsx` | Fixed nav, glass effect on scroll, mobile hamburger, animated underline |
| `Stats.tsx` | Animated counters (200+ clients, £300M+ revenue, etc.), DM Serif Display |
| `Pillars.tsx` | 3-pillar philosophy: Stabilise → Systemise → Scale — scroll-jacked wire animation |
| `Testimonials.tsx` | Stacked featured testimonial layout with author avatars |
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
4. Canvas fades out → editorial line-clip content reveal (each headline line slides up from overflow-hidden wrapper, staggered).
5. "We invest in" — per-word 3D rotateX flip reveal. "BUSINESSES" — Bebas Neue + character scramble. "like yours." — italic DM Serif + animated flowing gradient.

## Pillars Animation — Implemented
- Desktop: `h-[280vh]` outer + `sticky top-0 h-screen` inner for scroll-jacking
- `useScroll` + `useTransform` drive: SVG `motion.path` wire draw (`pathLength`), greyscale→colour filter activation per card
- Box 1 activates at 3–22%, Wire 1 draws at 17–45%, Box 2 activates at 40–60%, Wire 2 at 55–75%, Box 3 at 70–92%
- Mobile: regular stacked card grid reveal (no scroll-jack)

## Design System
- **Background**: Near-black `#020617` + radial gradient cobalt bleed top-right
- **Primary**: Cornflower blue `#4169e1`
- **Accents**: Emerald green `#34d399`, Teal `#2dd4bf`
- **Fonts**: Inter (body) · DM Serif Display (display serif) · Bebas Neue (impact headlines)
- **Effects**: Frosted glass, gradient borders, animated orbs, shimmer
- **CSS utilities**: `.gradient-text`, `.gradient-text-flow`, `.businesses-text`, `.glass`, `.glow`, `.orb`, `.shimmer`, `.gradient-border`, `.wave-divider`

## Animation Patterns in Use
- **Canvas RAF loops** — hero particle intro, background particle field
- **Framer Motion declarative** — most section animations
- **useInView** — triggers fade/slide when element enters viewport
- **useScroll + useSpring** — scroll progress bar
- **useScroll + useTransform** — Pillars scroll-jack; `pathLength` on `motion.path` for wire draw
- **Line-clip reveal** — `overflow-hidden` wrapper + `y: "110%" → 0` (Hero, Quote)
- **Character scramble** — `useEffect` cycling random chars before settling (Hero "BUSINESSES")
- **layoutId underline** — animated nav active indicator

## Notes for Claude
- **Never regress the hero particle intro** — flagship feature, always protect it
- Keep animations performant — canvas/SVG preferred over heavy DOM animation
- Mobile-first responsive design throughout
- Contact API at `/api/contact` currently just logs; ready for email service integration

---

## Iterative Improvement Framework

### Improvement Philosophy
Every iteration should answer: **does this make the site more credible and compelling to a business owner considering selling their company?**

Categories:
- **Visual** — typography, motion, colour, layout, density
- **Content** — copy, data, testimonials, case studies
- **Functional** — forms, integrations, analytics, performance

### The Loop
```
AUDIT → RESEARCH → PLAN → BUILD → SHIP → LEARN → repeat
```

1. **Audit**: Vercel Analytics, Lighthouse, DevTools, manual mobile review
2. **Research**: Awwwards, dark.design, lapa.ninja, competitor PE firm sites (Blackstone, KKR, Bain)
3. **Plan**: state component, goal, dependencies, mobile behaviour before coding
4. **Build**: edit component → `npx next build` → test locally → check mobile
5. **Ship**: `git add <files> && git commit -m "..." && git push origin master`

### Active Improvement Backlog

**High Priority**
- [ ] **Performance** — `logo-icon.png` is 2MB; re-export at 80×80px
- [ ] **Contact form** — connect to Resend for transactional email
- [ ] **SEO** — add OG image, LocalBusiness structured data schema
- [ ] **Mobile hero** — verify particle intro on low-end mobile
- [ ] **Cookie consent** — UK/EU compliance

**Medium Priority**
- [ ] **About page** — team photos, timeline, story arc
- [ ] **Solutions page** — expand service cards + case study snippets
- [ ] **Case studies** — real before/after transformation stories
- [ ] **Calendly integration** — book-a-call CTA on contact page
- [ ] **Hotjar / Clarity** — session recordings + heatmaps

**Stretch**
- [ ] **Video background** — short hero reel for emotional impact
- [ ] **Blog/Insights** — thought leadership + SEO
- [ ] **Interactive BTP explorer** — diagram of transformation programme

### External APIs & Integrations

| Service | Purpose | Priority |
|---|---|---|
| **Resend** | Contact form email | High |
| **Vercel Analytics** | Page views, user flow | High |
| **Google Search Console** | SEO health | High |
| **Hotjar / Clarity** | Session recordings, heatmaps | Medium |
| **Airtable / Notion API** | CMS for testimonials/case studies | Medium |
| **Calendly** | Book-a-call embed | Medium |

### Useful Prompts for Future Sessions
- `"Improve [Component] — research what top PE/investment sites do and apply it"`
- `"Optimise performance: [specific issue]"`
- `"Add [feature] to contact page — integrate with [service]"`
- `"Make mobile experience of [section] better"`

### Deployment Checklist
- [ ] `npx next build` passes with zero errors
- [ ] All pages tested on mobile (375px) and tablet (768px)
- [ ] Animations work on `prefers-reduced-motion`
- [ ] No console errors in production build
- [ ] Contact form tested end-to-end
