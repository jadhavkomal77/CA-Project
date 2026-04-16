# CADNA Associates — Website Fix & Overhaul Plan
**Version:** 2.1 (Updated with codebase audit findings)
**Prepared by:** Dhairyasheel Shinde  
**Date:** 13 April 2026  
**Hard Deadline:** 15 April 2026 (48-hour execution window)  
**Classification:** Internal Engineering Document  

---

## 0. Executive Summary

The existing website was built by a junior developer with significant quality gaps across UI fidelity, content accuracy, component architecture, and maintainability. This document defines a structured, sprint-based remediation plan to deliver a production-grade, client-ready website for **CADNA Associates Pvt. Ltd.** — a professional CA firm offering financial, legal, and compliance services across India.

The plan covers: requirement analysis, architecture decisions, sprint task breakdowns, QA strategy, and done criteria.

---

## 1. Client Requirements (Extracted from Handwritten Notes + Brief)

The following are the confirmed requirements from the client's handwritten notes (images provided):

### 1.1 Business Identity
- **Company:** CADNA Associates Pvt. Ltd.
- **Type:** Professional CA / Financial Services Firm
- **Reach:** Services Across India

### 1.2 Services (Final List)
1. Project Financing
2. Income Tax Return (ITR) Filing
3. GST Compliances
4. Company Law Compliances
5. Wealth Management
6. Loan Services:
   - Home Loan
   - Car Loan
   - CC Loan (Credit Card Loan / Cash Credit)
   - LAP Loan (Loan Against Property)
   - Mortgage Loan
7. Government Subsidy Assistance (Amitana)
8. Auctioneering Services
9. Foreign Accounting / Bookkeeping *(from image 1 — confirm with client)*
10. Financial Advisory

### 1.3 UI / Branding Changes Required
| # | Area | Change Required |
|---|------|----------------|
| 1 | Logo | Make bigger on website |
| 2 | Tagline | **"DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS"** — Blue color |
| 3 | Phone | **99 2105 5588** — Highlight prominently on site |
| 4 | Reviews | Remove photos, replace with actual/real text reviews |
| 5 | Last Page | CADNA logo — remove background (use transparent PNG/SVG) |
| 6 | Navigation | Rename/fix "Reviews" tab → "About" OR add About as separate tab |
| 7 | Cities Section | "OUR CITIES" in CAPS LOCK — card layout |

> **Note from images:** The phone number visible is `99 2105 5588` — verify final number with client before go-live.

---

## 2. Problem Analysis (Confirmed via Codebase Audit)

> Full technical breakdown in `CADNA_Codebase_Audit.md`. Summary below.

### 2.1 UI / Visual Issues
- [ ] Logo is too small and possibly low-res
- [ ] Tagline is missing or incorrect
- [ ] Reviews section has random/irrelevant photos
- [ ] Last page CADNA logo has a background that needs to be removed
- [ ] Phone number not prominently visible
- [ ] "Our Cities" text may not be in uppercase / layout broken

### 2.2 Content Issues
- [ ] Services list is incomplete or incorrect
- [ ] Navigation tabs are wrong (Reviews tab should be About)
- [ ] Hardcoded strings throughout components

### 2.3 Code Quality Issues (Confirmed)
- [ ] Single `main` branch — no dev/staging/prod workflow *(HIGH)*
- [ ] Direct Vercel → production deploy on every push *(HIGH)*
- [ ] `.env` missing from repo, likely hardcoded values *(HIGH)*
- [ ] Zero test coverage — no Vitest/Cypress *(HIGH)*
- [ ] Monolithic `server/index.js` (117 lines, all routes inline) *(MEDIUM)*
- [ ] No API input validation layer *(MEDIUM)*
- [ ] No rate limiting on public routes *(MEDIUM)*
- [ ] Typo folder `shere/` exists (likely `shared/`) *(LOW)*
- [ ] 133 lines of commented-out dead code in `App.jsx` *(LOW)*
- [ ] Inconsistent naming conventions across files *(LOW)*

---

## 3. Technical Architecture

### 3.1 Tech Stack (Confirmed — from Codebase Audit)
```
Frontend:     React 18 + Vite + Tailwind CSS
State:        Redux Toolkit (RTK Query) — 15 API slices
Routing:      React Router v7
Backend:      Express 5 + MongoDB (Mongoose 9) + JWT Auth
Assets:       Optimize to WebP, SVG for logos
Deployment:   Vercel (client) + Vercel serverless (server)
```

> Full technical audit in companion doc: `CADNA_Codebase_Audit.md`

### 3.2 Component Breakdown (Target State — React)
```
client/src/
  components/
    layout/
      Header.jsx              ← Logo, Nav, Phone CTA
      Footer.jsx              ← Contact, Social, Links
    sections/
      HeroSection.jsx         ← Tagline, CTA
      ServicesSection.jsx     ← Card grid — 8 services
      ReviewsSection.jsx      ← Text testimonials only
      CitiesSection.jsx       ← Card grid — OUR CITIES
      AboutSection.jsx        ← About CADNA
    shared/
      ServiceCard.jsx         ← Reusable card
      CityCard.jsx            ← Reusable city card
      ReviewCard.jsx          ← Reusable review card
      PhoneCTA.jsx            ← Sticky call button
  assets/
    icons/                    ← SVG icons per service
    images/                   ← Optimized WebP
    logo-transparent.svg      ← CADNA logo no background
  constants/
    services.data.js          ← Service list (single source of truth)
    cities.data.js            ← Cities data
    reviews.data.js           ← Testimonials
  styles/
    tokens.css                ← Color, spacing, typography tokens
```

### 3.3 Design Tokens (Minimum)
```css
:root {
  --color-primary: #1A56DB;       /* Brand Blue */
  --color-primary-dark: #1239A0;
  --color-text: #1F2937;
  --color-muted: #6B7280;
  --color-bg: #FFFFFF;
  --color-surface: #F9FAFB;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --radius-card: 12px;
  --shadow-card: 0 4px 20px rgba(0,0,0,0.08);
}
```

---

## 4. Sprint Execution Plan

> **Total Time Budget: ~48 hours**  
> **Team:** Dhairyasheel (lead) + team members  
> Sprint duration: ~8–10 working hours each

---

### Sprint 0 — Setup, Audit & Git Hygiene (2–3 hours)
**Goal:** Safe working environment before touching any code. See `CADNA_Codebase_Audit.md` for full details.

| Task | Owner | Est. |
|------|-------|------|
| Clone repo, run locally (client + server) | All | 20 min |
| Create `dev` + `staging` branches, protect `main` | Lead | 15 min |
| Reconfigure Vercel: deploy `staging` → preview, `main` → prod only | Lead | 20 min |
| Add `.env.example` to server, verify no secrets in git history | Lead | 30 min |
| Rename `shere/` → `shared/` folder, fix all import paths | Dev | 15 min |
| Delete commented-out code in `App.jsx` lines 1–133 | Dev | 10 min |
| Audit 15 RTK slices — mark unused ones for removal | Dev | 30 min |
| Verify all RTK `baseUrl` uses `import.meta.env.VITE_API_URL` | Dev | 15 min |
| Full visual audit (screenshots per section) | Lead | 30 min |
| Create working branch: `fix/cadna-overhaul` off `dev` | Lead | 5 min |

**Done Criteria:** Branches created, Vercel reconfigured, no secrets in repo, audit screenshots shared with team.

---

### Sprint 1 — Header, Logo, Tagline, Navigation (Day 1 — Morning)
**Goal:** Fix the first impression. Client sees correct branding immediately.

#### Tasks
- [ ] Replace logo with high-res version (SVG preferred, min 200px height)
- [ ] Fix logo padding/alignment in header
- [ ] Update tagline to: **"DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS"**
  - Color: `var(--color-primary)` (blue)
  - Placement: Hero section, centered
- [ ] Fix navigation menu:
  ```
  Home | Services | About | Reviews | Contact
  ```
  - "Reviews" tab → renamed or kept, confirm with client
  - "About" section to be wired in
- [ ] Highlight phone number `99 2105 5588` in header (bold, clickable `tel:` link)
- [ ] Sticky "Call Now" CTA button (bottom-right, mobile + desktop)

**Git Commits:**
```
feat: update logo size and resolution in header
feat: add hero tagline with brand blue color
fix: navigation menu — add About, fix ordering
feat: sticky phone CTA component
```

---

### Sprint 2 — Services Section (Day 1 — Afternoon)
**Goal:** Complete rebuild of services section with correct data.

#### Tasks
- [ ] Create `client/src/constants/services.data.js` with all 8 services:
  ```js
  export const SERVICES = [
    { id: 1, title: 'Project Financing', icon: 'briefcase' },
    { id: 2, title: 'Income Tax Return Filing', icon: 'file-text' },
    { id: 3, title: 'GST Compliances', icon: 'receipt' },
    { id: 4, title: 'Company Law Compliances', icon: 'building' },
    { id: 5, title: 'Wealth Management', icon: 'trending-up' },
    { id: 6, title: 'Loan Services', icon: 'credit-card',
      subServices: ['Home Loan', 'Car Loan', 'CC Loan', 'LAP Loan', 'Mortgage Loan'] },
    { id: 7, title: 'Government Subsidy Assistance', icon: 'landmark' },
    { id: 8, title: 'Auctioneering Services', icon: 'gavel' },
  ]
  ```
- [ ] Rebuild `ServicesSection` as card grid (3 cols desktop / 2 cols tablet / 1 col mobile)
- [ ] Add icons per service (Lucide / HeroIcons / Feather)
- [ ] Hover effect: card lift + blue border
- [ ] Loan Services card: expandable sub-list on hover/click

**Git Commits:**
```
feat: services data file — single source of truth
feat: services section — card grid with icons
feat: loan services card with sub-service list
```

---

### Sprint 3 — Cities, Reviews, About (Day 2 — Morning)
**Goal:** Fix middle and lower sections of the site.

#### Cities Section
- [ ] Section title: **"OUR CITIES"** (all caps, bold)
- [ ] Grid layout: city name + map-pin icon per card
- [ ] Data-driven: `cities.data.ts`
- [ ] Confirm city list with client if not provided (placeholder till then)

#### Reviews Section
- [ ] **Remove all photos** from existing review cards
- [ ] Replace review content with text-only testimonials
- [ ] If real reviews not yet available → use this pattern:
  ```
  "Review coming soon from our valued clients."
  — Client Name, City [Placeholder]
  ```
- [ ] Star rating (static 5-star visual for now)
- [ ] No fake names / no stock photos

#### About Section
- [ ] Create `About` section (new if missing):
  - Company intro: CADNA Associates Pvt. Ltd.
  - Professional company providing: [service list summary]
  - Services across India
  - Trust signals: years of experience, clients served, etc. (get numbers from client)

**Git Commits:**
```
feat: our cities section — data-driven card grid
fix: reviews — remove photos, replace with text testimonials
feat: about section — company intro and trust signals
```

---

### Sprint 4 — Footer, Last Page, Final Polish (Day 2 — Afternoon)
**Goal:** Fix footer, clean up last page, global polish pass.

#### Footer
- [ ] Phone: `99 2105 5588` (prominent, clickable)
- [ ] Navigation links: Home, Services, About, Reviews, Contact
- [ ] Copyright: `© 2026 CADNA Associates Pvt. Ltd. All Rights Reserved.`
- [ ] Optional: WhatsApp floating icon (bottom-left)

#### Last Page / Closing Section
- [ ] CADNA logo: remove background → use transparent PNG or SVG
- [ ] No white box / colored background artifact behind logo

#### Global Polish
- [ ] Mobile responsiveness audit (375px → 1440px)
- [ ] Consistent spacing using design tokens (no magic numbers)
- [ ] Remove all inline styles
- [ ] Remove all hardcoded strings → move to constants
- [ ] Image optimization: convert to WebP, add lazy loading

**Git Commits:**
```
fix: footer — phone number highlight and nav links
fix: last page CADNA logo — remove background
refactor: remove all inline styles, enforce token usage
perf: image optimization — WebP + lazy loading
```

---

## 5. QA Strategy

### 5.1 Functional Testing Checklist
- [ ] All navigation links route correctly
- [ ] Phone number `tel:` link opens dialer on mobile
- [ ] Sticky CTA visible and functional on all pages
- [ ] Services cards render all 8 items
- [ ] Loan sub-services render correctly
- [ ] Cities grid renders without overflow
- [ ] Reviews show text-only (zero photos)
- [ ] About section content is accurate

### 5.2 Visual / UI Testing
| Viewport | Device | Priority |
|----------|--------|----------|
| 375px | iPhone SE | P0 |
| 390px | iPhone 14 | P0 |
| 768px | iPad | P1 |
| 1280px | Laptop | P0 |
| 1440px | Desktop | P0 |

**Cross-browser:**
- Chrome (latest)
- Edge (latest)
- Safari (iOS + macOS)
- Firefox (regression)

### 5.3 Content Validation
- [ ] Company name spelled correctly: **CADNA Associates Pvt. Ltd.**
- [ ] All service names match client requirement list
- [ ] Tagline exact: "DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS"
- [ ] Phone number confirmed: **99 2105 5588** *(verify before go-live)*
- [ ] No placeholder text (`Lorem ipsum`) in production

### 5.4 Performance Baseline (Post-Fix Target)
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse Score | ≥ 80 |

Use: Chrome DevTools > Lighthouse, or PageSpeed Insights.

---

## 6. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Phone number to confirm | Medium | High | Get confirmation from client before Sprint 4 |
| Real reviews not available | High | Medium | Use professional placeholders with clear labeling |
| Logo source file unavailable | Medium | High | Request original from client / recreate in Figma |
| Existing codebase unsalvageable (deep issues) | Low | High | Partial rewrite in separate branch, merge section by section |
| Deployment access not available | Low | High | Confirm deployment credentials before Sprint 4 |
| City list not provided by client | Medium | Low | Use placeholder, mark as `[TODO: confirm]` in code |
| RTK slices have hardcoded localhost URLs | High | High | Audit all 15 slices in Sprint 0 before touching prod |
| Vercel auto-deploys broken code to prod | High | High | Reconfigure Vercel in Sprint 0 (first action) |
| JWT stored in localStorage (security risk) | Medium | High | Audit Auth folder in Sprint 0, migrate to httpOnly cookie if needed |

---

## 7. Definition of Done (DoD)

A task is **DONE** only when:
- [ ] Code is on `fix/cadna-overhaul` branch
- [ ] No console errors in Chrome DevTools
- [ ] Mobile responsive (tested at 375px + 1280px minimum)
- [ ] No inline CSS / hardcoded strings
- [ ] Reviewed by at least one other team member
- [ ] Committed with a proper conventional commit message

Website is **READY FOR CLIENT DELIVERY** when:
- [ ] All Sprint tasks marked done
- [ ] QA checklist 100% passed
- [ ] Client has reviewed and approved on staging
- [ ] Performance score ≥ 80 on Lighthouse

---

## 8. Optional Enhancements (Post-Deadline, If Time Allows)

| Enhancement | Priority | Effort |
|-------------|----------|--------|
| WhatsApp floating button | P1 | Low |
| Lead capture form (contact us) | P1 | Medium |
| SEO: meta tags + Open Graph | P2 | Low |
| Schema markup (LocalBusiness) | P2 | Medium |
| Google Analytics 4 (GA4) | P2 | Low |
| Blog / Resource section | P3 | High |

---

## 9. Engineering Standards (Non-Negotiable)

```
✅ No inline CSS — all styles via classes / tokens
✅ No hardcoded strings — all content via data files / constants
✅ Reusable components — DRY principle enforced
✅ Conventional commits — feat: / fix: / refactor: / perf: / chore:
✅ Mobile-first CSS
✅ Accessible markup — alt text on images, ARIA labels on CTAs
✅ Clean component boundaries — single responsibility
✅ No commented-out dead code in final PR
```

---

**Staging URL:** *(add before go-live)*  
**Production URL:** *(add before go-live)*  
**Repo:** *(add link)*  
**Deployment Method:** Vercel (client) + Vercel Serverless (server)

### Companion Documents
| Document | Purpose |
|----------|---------|
| `CADNA_Website_Fix_Plan_v2.md` | This file — sprint plan, requirements, QA |
| `CADNA_Codebase_Audit.md` | Technical debt, security issues, code quality findings |

---

*Document last updated: 13 April 2026. All requirement changes after this date must be logged as scope additions and assessed for deadline impact.*
