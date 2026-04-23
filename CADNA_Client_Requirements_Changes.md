# CADNA Associates — Client Requirements Change Plan
**Version:** 1.0  
**Source:** Client-submitted Word document (Requirements_CADMA_Client.docx)  
**Prepared by:** Dhairyasheel Shinde  
**Date:** 22 April 2026  
**Branch:** `fix/client-requirements-round2` (branch off `dev`)  

---

## 0. Overview

This document captures all UI/content change requests submitted by the client via Word doc. Each requirement has been mapped to a specific section of the site, an exact task description, and a component file to edit. Work against the existing React + Vite codebase.

Total changes: **8 sections**, covering Hero, Services, About, Team, CTA Banner, Calculator, Footer, and Last Page.

---

## 1. Change Breakdown by Section

---

### 1.1 — Header / Hero Section

#### REQ-01 — Logo Size (Header)
- **Instruction:** First logo is too small — make it larger.
- **File:** `Header.jsx` (or wherever the logo `<img>` lives)
- **Fix:**
  ```jsx
  // Find the logo img tag and increase its height class
  // Before (likely):
  <img src={logo} className="h-8" />
  // After:
  <img src={logo} className="h-14 md:h-16" />
  ```
- **Done when:** Logo is clearly visible and proportionate at both mobile and desktop viewports.

---

#### REQ-02 — Hero Tagline — Text + Styling
- **Instruction:** Change tagline to `"DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS"` — all caps, blue colour. Same as shown in the PDF reference.
- **File:** `HeroSection.jsx`
- **Fix:**
  ```jsx
  <h1 className="text-[var(--color-primary)] font-bold uppercase tracking-wide text-3xl md:text-5xl">
    DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS
  </h1>
  ```
- **Note:** Must match exactly — all caps via `uppercase` Tailwind class OR hardcoded uppercase string. Blue = `var(--color-primary)` / `#1A56DB`.

---

#### REQ-03 — Hero Sub-text — Replace Service Tags with Buttons
- **Instruction:** Remove the current inline service tag list:
  > `"Income Tax Filing • GST Registration • Company Incorporation • Financial Advisory • Loan Approvals • Government Subsidy Assistance • Auctioneering Services"`
  
  Replace with two buttons: **"View Services"** and **"Contact Us"** — buttons must be attached/adjacent to the tagline text, not floating below.

- **File:** `HeroSection.jsx`
- **Fix:**
  ```jsx
  // Remove the <p> or <div> with the bullet-separated services text
  // Replace with:
  <div className="flex gap-4 mt-4">
    <a href="#services" className="btn-primary">View Services</a>
    <a href="#contact" className="btn-outline">Contact Us</a>
  </div>
  ```
- **Layout:** Buttons should sit directly below the heading, no large gap.

---

#### REQ-04 — Trust Bar — Tick Icons Must Be Green
- **Instruction:** The trust bar showing `✔ 30+ Years of Experience  ✔ 5,000+ Clients Served  ✔ Expert Advisory` — the tick/checkmark icons must be **green**, not the current purple/violet colour.
- **Visual Reference:** image1 in doc — currently ticks are purple `#7C3AED` approximately.
- **File:** Look for the trust bar component — likely `HeroSection.jsx` or a `TrustBar.jsx`
- **Fix:**
  ```jsx
  // Change icon colour class from text-purple-600 (or similar) to:
  <CheckIcon className="text-green-500 w-5 h-5" />
  // or in CSS: color: #16A34A;
  ```
- **Done when:** All 3 checkmarks are clearly green at all viewports.

---

### 1.2 — Services Section

#### REQ-05 — Reorder: Project Financing Must Be First
- **Instruction:** In the View Services tab/page, `Project Financing` must appear at the top (first card).
- **File:** `client/src/constants/services.data.js`
- **Fix:** Ensure array order starts with:
  ```js
  export const SERVICES = [
    { id: 1, title: 'Project Financing', icon: '...' },
    // ... rest of services follow
  ]
  ```
- **Note:** If services are fetched from backend/admin CMS, reorder via the admin panel instead. Check if order is DB-driven.

---

#### REQ-06 — Add Logo / Icon to Each Service Card
- **Instruction:** Each service card must have its own icon/logo.
- **File:** `ServiceCard.jsx` + `services.data.js`
- **Fix:** Each service entry in the data file should have an `icon` field. Recommended icon library: **Lucide React** (already likely in project).
  ```js
  // services.data.js
  { id: 1, title: 'Project Financing',          icon: 'Briefcase' },
  { id: 2, title: 'Income Tax Return Filing',   icon: 'FileText' },
  { id: 3, title: 'GST Compliances',            icon: 'Receipt' },
  { id: 4, title: 'Company Law Compliances',    icon: 'Building2' },
  { id: 5, title: 'Wealth Management',          icon: 'TrendingUp' },
  { id: 6, title: 'Loan Services',              icon: 'CreditCard' },
  { id: 7, title: 'Government Subsidy Assistance', icon: 'Landmark' },
  { id: 8, title: 'Auctioneering Services',     icon: 'Gavel' },
  ```
  ```jsx
  // ServiceCard.jsx — dynamic icon rendering
  import * as Icons from 'lucide-react'
  const Icon = Icons[service.icon]
  return (
    <div className="service-card">
      <Icon className="w-8 h-8 text-[var(--color-primary)] mb-3" />
      <h3>{service.title}</h3>
    </div>
  )
  ```

---

### 1.3 — About Section

#### REQ-07 — About Section Sub-Heading — All Caps + Blue
- **Instruction:** The line `"A LEGACY OF TRUST AND EXPERTISE FOR OVER 30 YEARS"` must be:
  - All caps (already done in text — verify it's not sentence-case in code)
  - Blue colour (same brand blue as tagline)
- **File:** `AboutSection.jsx`
- **Fix:**
  ```jsx
  <h2 className="text-[var(--color-primary)] font-bold uppercase">
    A LEGACY OF TRUST AND EXPERTISE FOR OVER 30 YEARS
  </h2>
  ```

---

#### REQ-08 — "Meet Our Team" Heading — All Caps
- **Instruction:** The team section heading currently shows `"Meet Our"` (truncated) and is **not** in all caps. Fix to `"MEET OUR TEAM"` — all caps, same style.
- **Visual Reference:** image2 in doc — heading shows `"Meet Our"` in mixed case and appears cut off.
- **File:** Wherever the team section heading is rendered — likely `AboutSection.jsx` or `TeamSection.jsx`
- **Fix:**
  ```jsx
  <h2 className="text-[var(--color-primary)] font-bold uppercase">
    MEET OUR TEAM
  </h2>
  ```
- **Also fix:** Heading appears to be truncated/cut off — check for `overflow: hidden` or `whitespace-nowrap` on the container and remove.

---

#### REQ-09 — Team Member Names — Must Be in Sequence
- **Instruction:** Team member cards must appear in a consistent/logical sequence (not random order).
- **Visual Reference:** image2 — currently shows `SHRI DATTA M ALSE` (Director) and `SHRI RAJIV ALSE` (Director, Alse Rajiv and Company).
- **Fix:** Confirm the intended display order with the client, then enforce it in the data file or admin CMS. If order comes from DB, add an `order` or `sortIndex` field to the Team model.
  ```js
  // Example: teams.data.js or DB document
  { order: 1, name: 'SHRI DATTA M ALSE',  role: 'Director' },
  { order: 2, name: 'SHRI RAJIV ALSE',    role: 'Director, Alse Rajiv and Company' },
  // ... confirm full list with client
  ```

---

#### REQ-10 — Remove "OUR CLIENTS" Block from About Section
- **Instruction:** The blue banner section showing `"OUR CLIENTS"` with Wonder Constructions, Global Agro Industries, Unity Infra must be **completely removed** from the About section.
- **Visual Reference:** image3 in doc — full-width blue section with client company names listed.
- **File:** `AboutSection.jsx` or a standalone `OurClientsSection.jsx`
- **Fix:** Delete or comment out the entire `<OurClients />` component from the About page render. Do not just hide it with CSS — remove from DOM entirely.
  ```jsx
  // AboutSection.jsx — remove this line:
  // <OurClientsSection />   ← DELETE THIS
  ```
- **⚠️ Note:** Before deleting, confirm with client whether this section should move elsewhere (e.g., homepage) or be fully removed from the entire site.

---

### 1.4 — CTA Banner Section

#### REQ-11 — "Need Professional Financial Guidance?" Banner — Blue + All Caps
- **Instruction:** The heading `"Need Professional Financial Guidance?"` must be:
  - Blue colour
  - All caps
- **Visual Reference:** image4 in doc — currently black/dark text.
- **File:** Likely `CTABanner.jsx` or `ContactCTA.jsx`
- **Fix:**
  ```jsx
  <h2 className="text-[var(--color-primary)] font-bold uppercase">
    NEED PROFESSIONAL FINANCIAL GUIDANCE?
  </h2>
  ```

---

### 1.5 — Financial Calculator Section

#### REQ-12 — "Financial Calculator" Heading — Blue + All Caps
- **Instruction:** The section heading "Financial Calculator" (which appears above the QR code / calculator widget) must be **blue and all caps**.
- **File:** `FinancialCalculator.jsx` or similar
- **Fix:**
  ```jsx
  <h2 className="text-[var(--color-primary)] font-bold uppercase">
    FINANCIAL CALCULATOR
  </h2>
  ```

---

### 1.6 — Footer (Last Page)

#### REQ-13 — Footer — Complete Redesign Required
- **Instruction:** "We have to change entire page" — the footer needs a full redesign.
- **Visual Reference:** image5 in doc — current footer structure:
  - Logo + company description (col 1)
  - Quick Links: Home, About, Services, Latest Updates, Contact (col 2)
  - Important Links: Privacy Policy, Terms & Conditions, Disclaimer, Refund Policy (col 3)
  - Our Cities: Mumbai, Pune, Bangalore, Chh. Sambhaji Nagar, Satara, Hingoli, Parbhani, Beed (col 4)
  - Contact Info: `+91 9921055588`, `support@cadmaassociatespvtltd.com`, `2, Anuvihar Complex, Opp. Yadav Tyres, Behind Vivekanand College, Chh. Sambhajinagar – 431001` (col 5)
  - Social icons: Facebook, X (Twitter), Instagram (bottom left)
  - "Review Us" button (bottom right)
  - Copyright: `© 2026 CADMA ASSOCIATES PVT LTD • All Rights Reserved`

- **What to keep (confirmed data):**
  - Company description text: `"CADMA Associates Pvt Ltd is a professional Company Income Tax, GST, Company Incorporation, Audit, Accounting, and Advisory services across India"`
  - Phone: `+91 9921055588` ✅ *(confirmed from footer screenshot)*
  - Email: `support@cadmaassociatespvtltd.com`
  - Address: `2, Anuvihar Complex, Opp. Yadav Tyres, Behind Vivekanand College, Chh. Sambhajinagar – 431001`
  - Cities list: Mumbai, Pune, Bangalore, Chh. Sambhaji Nagar, Satara, Hingoli, Parbhani, Beed
  - Social: Facebook, X, Instagram

- **What needs redesign:** Layout, visual style, typography hierarchy, colour balance. Current dark-navy theme may stay or change — **confirm with client whether to keep dark footer or switch to light.**

- **Suggested new structure:**
  ```
  ┌─────────────────────────────────────────────────────────┐
  │  [CADNA Logo]                                           │
  │  Company description text                               │
  │  [FB] [X] [IG]                                         │
  ├──────────────┬──────────────┬────────────┬─────────────┤
  │  Quick Links │ Important    │ Our Cities │ Contact     │
  │  Home        │ Privacy      │ Mumbai     │ 📞 Phone    │
  │  About       │ T&C          │ Pune       │ ✉ Email    │
  │  Services    │ Disclaimer   │ Bangalore  │ 📍 Address  │
  │  Contact     │ Refund       │ + 5 more   │             │
  └──────────────┴──────────────┴────────────┴─────────────┘
  │        © 2026 CADMA Associates Pvt Ltd                 │
  └─────────────────────────────────────────────────────────┘
  ```

- **Files to edit:** `Footer.jsx` + `footer.data.js` (or inline constants)

---

### 1.7 — Last/Closing Page (Same as First Page)

#### REQ-14 — Last Page Must Mirror the First Page (Hero Section)
- **Instruction:** `"in last page same as their first page"` — the closing section/last visible section of the site should visually match the Hero/first section.
- **Interpretation:** This likely means the closing CTA section should reuse the same Hero-style layout — logo, tagline, background, and CTA buttons.
- **File:** Check if there's a `ClosingSection.jsx` or `CTABottom.jsx`. If not, create one.
- **Fix:**
  ```jsx
  // Reuse the Hero layout as a closing section
  // Same background, same tagline, same CTA buttons
  <section className="hero-section"> {/* same class as Hero */}
    <HeroContent /> {/* extract hero content into a shared component */}
  </section>
  ```
- **Best practice:** Extract the hero content into a `<HeroContent />` sub-component and render it in both the top Hero and bottom Closing sections — avoids duplication.

---

## 2. Complete Task Checklist

| ID | Section | Task | Priority | Status |
|----|---------|------|----------|--------|
| REQ-01 | Header | Increase logo size | P0 | ☐ |
| REQ-02 | Hero | Tagline → all caps, blue | P0 | ☐ |
| REQ-03 | Hero | Replace service tags with View Services + Contact Us buttons | P0 | ☐ |
| REQ-04 | Hero | Trust bar tick icons → green | P1 | ☐ |
| REQ-05 | Services | Reorder — Project Financing first | P0 | ☐ |
| REQ-06 | Services | Add icon/logo to each service card | P1 | ☐ |
| REQ-07 | About | Sub-heading → all caps, blue | P1 | ☐ |
| REQ-08 | About | "Meet Our Team" → all caps, fix truncation | P1 | ☐ |
| REQ-09 | About | Team cards → sequential order | P1 | ☐ |
| REQ-10 | About | Remove "Our Clients" blue block | P1 | ☐ |
| REQ-11 | CTA Banner | "Need Professional..." heading → blue, all caps | P1 | ☐ |
| REQ-12 | Calculator | "Financial Calculator" heading → blue, all caps | P2 | ☐ |
| REQ-13 | Footer | Full footer redesign | P0 | ☐ |
| REQ-14 | Closing | Last page must mirror first page (Hero) | P1 | ☐ |

---

## 3. Clarifications Needed from Client

Before starting the following tasks, get written confirmation:

| # | Question | Blocks Task |
|---|----------|-------------|
| C-01 | Should the "Our Clients" section (Wonder Constructions, Global Agro, Unity Infra) be removed from the entire site, or just moved out of the About section? | REQ-10 |
| C-02 | For the footer redesign — keep dark navy background or switch to light/white? | REQ-13 |
| C-03 | What is the intended sequence for team member cards? Provide ordered list. | REQ-09 |
| C-04 | For the closing/last section — should it be an exact copy of the Hero, or just visually similar? Should the CTA buttons be different? | REQ-14 |
| C-05 | Phone number — footer shows `+91 9921055588`. Confirm this is the final number (earlier notes had a different number). | All CTAs |

---

## 4. Git Commit Plan

```bash
# Work on branch:
git checkout dev
git checkout -b fix/client-requirements-round2

# Recommended commit sequence:
git commit -m "fix: increase logo size in header (REQ-01)"
git commit -m "feat: hero tagline — all caps blue, replace service tags with CTA buttons (REQ-02, REQ-03)"
git commit -m "fix: trust bar checkmark icons — change to green (REQ-04)"
git commit -m "fix: services order — project financing first, add icons to cards (REQ-05, REQ-06)"
git commit -m "fix: about section — headings all caps blue, fix meet our team truncation (REQ-07, REQ-08)"
git commit -m "fix: team cards — sequential order (REQ-09)"
git commit -m "feat: remove our clients section from about (REQ-10)"
git commit -m "fix: cta banner and calculator headings — blue all caps (REQ-11, REQ-12)"
git commit -m "feat: footer — complete redesign (REQ-13)"
git commit -m "feat: closing section — mirror hero layout (REQ-14)"

# After all tasks done:
git push origin fix/client-requirements-round2
# Open PR: fix/client-requirements-round2 → dev
# Review → merge to dev → test on staging → merge to main
```

---

## 5. QA Checklist (Post-Implementation)

- [ ] Logo is visually large and clear in header on both mobile + desktop
- [ ] Tagline is ALL CAPS and blue (`#1A56DB`) in hero
- [ ] "View Services" button scrolls to / navigates to services section
- [ ] "Contact Us" button scrolls to / navigates to contact section
- [ ] Trust bar checkmarks are green (not purple/violet)
- [ ] Services section: Project Financing is the first card
- [ ] Every service card has an icon
- [ ] About sub-heading is ALL CAPS and blue
- [ ] "MEET OUR TEAM" is all caps and not truncated
- [ ] Team members appear in confirmed sequence
- [ ] "OUR CLIENTS" block is completely absent from About section
- [ ] "NEED PROFESSIONAL FINANCIAL GUIDANCE?" is blue and all caps
- [ ] "FINANCIAL CALCULATOR" heading is blue and all caps
- [ ] Footer renders correctly at 375px, 768px, 1280px, 1440px
- [ ] Footer phone number is clickable (`tel:` link)
- [ ] Footer email is clickable (`mailto:` link)
- [ ] Last/closing section matches Hero visual style
- [ ] No console errors in Chrome DevTools
- [ ] Lighthouse score ≥ 80

---

## 6. Confirmed Data (from Footer Screenshot)

The following are now **confirmed** from the client's own live site screenshot (image5):

```
Phone:   +91 9921055588
Email:   support@cadmaassociatespvtltd.com
Address: 2, Anuvihar Complex, Opp. Yadav Tyres,
         Behind Vivekanand College,
         Chh. Sambhajinagar – 431001

Cities:  Mumbai, Pune, Bangalore, Chh. Sambhaji Nagar,
         Satara, Hingoli, Parbhani, Beed

Social:  Facebook, X (Twitter), Instagram

Copyright: © 2026 CADMA ASSOCIATES PVT LTD • All Rights Reserved
```

> **Update the main plan (`CADNA_Website_Fix_Plan_v2.md`):** Replace the earlier unconfirmed phone number `99 2105 5588` with the confirmed `+91 9921055588` from this document.

---

*This document covers requirements from client submission dated ~13 April 2026. Any new client requests after this date should be treated as a separate change request and assessed for deadline/scope impact.*
