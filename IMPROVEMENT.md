# Regenovate — Iterative Improvement Framework

## What This Project Is

Regenovate is a premium B2B corporate website for a business investment and transformation company. The company invests in, partners with, and acquires small-to-medium businesses, transforming them through a proven "Business Transformation Programme" (BTP).

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Vercel
**Repo:** `git@github.com:adamwilss/regenovate-site-draft-.git` (push to `master`)

---

## Improvement Philosophy

Every iteration should answer one question: **does this make the site more credible and compelling to a business owner considering selling their company?**

Improvements fall into three categories:
- **Visual** — typography, motion, colour, layout, density
- **Content** — copy, data, testimonials, case studies
- **Functional** — forms, integrations, analytics, performance

---

## Iterative Improvement Loop

```
┌─────────────────────────────────────────────────────────────────┐
│  1. AUDIT  →  2. RESEARCH  →  3. PLAN  →  4. BUILD  →  5. SHIP │
│                    ↑                                    │       │
│                    └────────────── LEARN ───────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Audit (What needs improving?)
Tools:
- **Vercel Analytics** — real user behaviour, bounce rate, scroll depth
- **Browser DevTools** — performance (LCP, CLS, FID), accessibility
- **Lighthouse** — score card for performance, SEO, a11y
- **Manual review** — view on mobile, tablet, desktop; check animations

Ask:
- Where do users drop off?
- What loads slowly?
- What looks generic or unpolished?
- What copy is unclear?

### 2. Research (What do the best do?)
Sources to check:
- **Awwwards** — search "investment", "finance", "B2B" for visual inspiration
- **Lapa.ninja** — curated landing page gallery
- **Dark.design** — dark-theme site inspiration
- **Mobbin** — UI pattern library
- **Fonts in Use** — typography pairings used in real brand work
- **Competitor sites** — Blackstone, Bain Capital, KKR, EY-Parthenon, McKinsey

Ask Claude to search any of these for specific inspiration when stuck.

### 3. Plan (What will we change?)
Before coding, state clearly:
- Component(s) affected
- Specific visual/UX goal
- Any new dependencies needed
- Mobile behaviour

### 4. Build (Implement)
- Edit the affected component
- Run `npx next build` to verify no errors
- Test locally (`npx next dev`)
- Check mobile breakpoints

### 5. Ship
```bash
git add <files>
git commit -m "Brief description of change"
git push origin master
```
Vercel auto-deploys on push to `master`.

---

## Active Improvement Areas

### High Priority
- [ ] **Pillars scroll-jack animation** — wire draws between boxes as user scrolls (see CLAUDE.md for spec)
- [ ] **Performance** — logo-icon.png is 2MB, needs optimising (export at 80×80px max)
- [ ] **Contact form** — connect to email service (Resend / Nodemailer)
- [ ] **SEO** — add OG image, structured data (LocalBusiness schema)
- [ ] **Mobile hero** — verify particle intro performs well on low-end mobile

### Medium Priority
- [ ] **About page** — currently minimal; add team photos, timeline, story arc
- [ ] **Solutions page** — expand service cards with more detail + case study snippets
- [ ] **Case studies** — real before/after transformation stories build enormous trust
- [ ] **Loading skeleton** — placeholder while fonts/particles load
- [ ] **Cookie consent** — required for UK/EU compliance

### Stretch Goals
- [ ] **Video background option** — short looping reel in hero for emotional impact
- [ ] **Interactive BTP explorer** — interactive diagram of the transformation programme
- [ ] **Blog/Insights** — positions Regenovate as thought leaders; helps SEO
- [ ] **Exit-intent popup** — capture leads before they leave

---

## External APIs & Integrations to Consider

| Service | Purpose | Priority |
|---|---|---|
| **Resend** | Transactional email from contact form | High |
| **Vercel Analytics** | Page views, user flow | High |
| **Google Search Console** | SEO health, keyword visibility | High |
| **Hotjar / Microsoft Clarity** | Session recordings, heatmaps | Medium |
| **Airtable / Notion API** | CMS for testimonials, case studies | Medium |
| **LinkedIn API** | Embed recent posts / social proof | Low |
| **Calendly** | Book a call CTA embedded on contact page | Medium |

---

## Knowledge Base for Claude

When asking Claude to improve this site, provide context:

```
This is the Regenovate website — premium B2B investment/transformation firm.
Stack: Next.js App Router, TypeScript, Tailwind CSS v4 (@theme block, no tailwind.config.js),
Framer Motion. Dark theme (#020617 bg). Push to git@github.com:adamwilss/regenovate-site-draft-.git master.
See CLAUDE.md for full component map and animation patterns.
```

### Useful prompts for iteration:
- `"Improve [Component] to feel more premium — add [specific effect]"`
- `"The [Component] looks generic — research what top investment firm sites do and apply it"`
- `"Optimise performance: [specific issue]"`
- `"Add [feature] to the contact page — integrate with [service]"`
- `"Make the mobile experience of [section] better"`

---

## Design Principles to Preserve

1. **Never regress the hero particle intro** — flagship feature, always protect it
2. **Canvas/SVG over DOM animation** — better performance for complex animations
3. **Mobile-first** — all breakpoints must work before shipping
4. **Serif for display, sans for body** — DM Serif Display / Bebas Neue headlines, Inter body
5. **Motion with purpose** — every animation should serve clarity or brand character
6. **Dark luxury** — `#020617` background, blue primary, emerald/teal accents

---

## Current Design System Quick Reference

```css
Background:  #020617 (slate-950)
Primary:     #4169e1 (cornflower blue)
Accent 1:    #34d399 (emerald)
Accent 2:    #2dd4bf (teal)

Fonts:
  Display:   DM Serif Display (serif, italic for key phrases)
  Impact:    Bebas Neue (condensed, all-caps, large headlines)
  Body:      Inter (sans-serif)

CSS utilities: .gradient-text, .gradient-text-flow, .businesses-text,
               .glass, .glow, .orb, .shimmer, .gradient-border, .wave-divider
```

---

## Deployment Checklist (before any major release)

- [ ] `npx next build` passes with zero errors
- [ ] Lighthouse score ≥ 90 performance, ≥ 95 SEO
- [ ] All pages tested on mobile (375px) and tablet (768px)
- [ ] Animations don't break on `prefers-reduced-motion`
- [ ] No console errors in production build
- [ ] Contact form tested end-to-end
- [ ] OG image renders correctly (use opengraph.xyz to check)
