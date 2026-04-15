# CADNA Associates — Codebase Audit Report
**Version:** 1.0   
**Reviewed by:** Dhairyasheel Shinde  
**Audit Date:** 13 April 2026  
**Scope:** Full-stack — React/Vite frontend + Express/MongoDB backend  

---

## 1. Project Overview

| Property | Value |
|----------|-------|
| Project Name | CA-Project (CADNA Associates) |
| Type | CA Firm Website + Admin CMS Panel |
| Frontend | React 18 + Vite + Tailwind CSS + Redux Toolkit |
| Backend | Express 5 + MongoDB (Mongoose 9) + JWT Auth |
| Routing | React Router v7 |
| State Management | Redux Toolkit (RTK Query) |
| Deployment | Vercel (client) + likely Vercel serverless (server) |

---

## 2. Repository Structure (Current State)

```
CA-Project/
├── client/                        # React + Vite frontend
│   └── src/
│       ├── Auth/                  # Admin authentication (11 files)
│       ├── admin/                 # Admin CMS pages (20 files)
│       ├── components/            # UI components + calculators
│       ├── layout/                # Shared layouts
│       ├── pages/                 # Public-facing pages
│       └── redux/                 # RTK API slices (15 API files)
└── server/                        # Express + MongoDB backend
    ├── controllers/               # Business logic
    ├── models/                    # Mongoose schemas (13 + admin models)
    ├── routes/                    # API routes (14 route files)
    ├── middlewares/               # Auth, upload, etc.
    └── utils/                     # Helper functions
```

---

## 3. Issue Inventory (Prioritised)

### 3.1 Critical / High Severity

#### [HIGH-01] Single Master Branch — No Git Workflow
- **What:** Only one branch exists (`main` or `master`). All changes go directly to production.
- **Impact:** Any broken commit immediately breaks the live site. No way to safely test changes.
- **Fix:**
  ```
  Branch strategy to implement:
  main          ← production only, protected
  staging       ← client review / UAT
  dev           ← active development base
  fix/*         ← individual fix branches (e.g. fix/header-logo)
  feat/*        ← new feature branches
  ```
- **Action:** Create `staging` and `dev` branches before any new work begins. Set `main` as protected on GitHub.

---

#### [HIGH-02] Direct Vercel Deploy — No CI/CD Pipeline
- **What:** Vercel is connected directly to the repo — every push auto-deploys to production.
- **Impact:** A developer pushing a half-done fix will break the live client site instantly.
- **Fix:**
  - Connect Vercel to `main` branch only for production deploys
  - Connect Vercel to `staging` branch for preview deploys (Vercel supports this natively)
  - All work happens on `dev` → `staging` → `main` via PRs
  - Add a GitHub Actions step (even a simple one) to run lint before merge:
    ```yaml
    # .github/workflows/lint.yml
    name: Lint Check
    on: [pull_request]
    jobs:
      lint:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with: { node-version: '20' }
          - run: cd client && npm ci && npm run lint
    ```

---

#### [HIGH-03] Missing `.env` Management
- **What:** `.env` files are absent or not properly structured in the repo. Environment variables likely hardcoded or inconsistently handled.
- **Impact:** Secrets may be exposed; switching between dev/staging/prod environments is error-prone.
- **Fix:** Create proper env structure:
  ```
  client/
    .env.development      ← VITE_API_URL=http://localhost:5000
    .env.staging          ← VITE_API_URL=https://api-staging.cadna.in
    .env.production       ← VITE_API_URL=https://api.cadna.in
  server/
    .env.example          ← Committed: shows all required keys, no values
    .env                  ← NOT committed (in .gitignore)
  ```
  Required server env keys (minimum):
  ```
  PORT=
  MONGODB_URI=
  JWT_SECRET=
  JWT_EXPIRES_IN=
  CLOUDINARY_CLOUD_NAME=    # if using for image uploads
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  ```

---

#### [HIGH-04] Zero Test Coverage
- **What:** No Jest, Vitest, or Cypress setup anywhere in the project.
- **Impact:** Every change is manually verified. Regressions go undetected. Refactoring is high-risk.
- **Fix for 48hr window:** Not feasible to write full test suite now. However, add basic setup so future tests can be written:
  ```bash
  # Frontend — add Vitest (Vite-native, zero config)
  cd client
  npm install -D vitest @testing-library/react @testing-library/jest-dom
  ```
  Add to `vite.config.ts`:
  ```ts
  test: { globals: true, environment: 'jsdom', setupFiles: './src/test/setup.ts' }
  ```
  Write at minimum one smoke test per critical component (Services, Header, Reviews) — defer to post-deadline.

---

### 3.2 Medium Severity

#### [MED-01] Monolithic `server/index.js` — 117 Lines, All Routes Inline
- **What:** The Express server entry file registers all 14 route files AND likely contains middleware setup, DB connection, and error handling in a single 117-line file.
- **Fix:** Refactor to a clean structure:
  ```
  server/
    index.js          ← Only: env load, app start, DB connect
    app.js            ← Express app setup, middleware, routes
    routes/index.js   ← Aggregates all route imports
  ```
  ```js
  // app.js pattern
  import express from 'express'
  import routes from './routes/index.js'
  const app = express()
  app.use(express.json())
  app.use('/api', routes)
  export default app
  ```

---

#### [MED-02] No API Input Validation Layer
- **What:** Controllers receive `req.body` directly without validation or sanitization.
- **Impact:** Malformed data can corrupt MongoDB documents. Security risk (NoSQL injection vectors).
- **Fix:** Add `zod` or `express-validator` for all POST/PUT routes:
  ```bash
  npm install zod
  ```
  ```js
  // Example: validate contact form submission
  import { z } from 'zod'
  const contactSchema = z.object({
    name: z.string().min(2).max(100),
    phone: z.string().regex(/^[6-9]\d{9}$/),
    message: z.string().max(500).optional()
  })
  ```

---

#### [MED-03] No Rate Limiting on Public Routes
- **What:** Public API endpoints (contact form, lead capture) have no rate limiting.
- **Impact:** Spam submissions, potential DoS on the Express server.
- **Fix:**
  ```bash
  npm install express-rate-limit
  ```
  ```js
  import rateLimit from 'express-rate-limit'
  const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: 'Too many requests, please try again later.'
  })
  app.use('/api/contact', publicLimiter)
  app.use('/api/leads', publicLimiter)
  ```

---

### 3.3 Low Severity / Code Quality

#### [LOW-01] Typo Folder — `shere/` Directory
- **What:** A folder named `shere/` exists (likely meant `share/` or `shared/`).
- **Fix:** Rename folder, update all imports. Do in Sprint 0 during audit.
  ```bash
  git mv client/src/shere client/src/shared
  # Then update all import paths referencing 'shere'
  ```

---

#### [LOW-02] Commented-Out Code in `App.jsx` (Lines 1–133)
- **What:** 133 lines of commented-out code at the top of `App.jsx`. Likely dead routes or previous layout attempts.
- **Impact:** Confusing for any developer reading the file. Increases cognitive load.
- **Fix:** Delete entirely. Git history preserves it if ever needed.
  ```bash
  # Before deleting, check if anything is referenced:
  grep -r "from.*App" src/ --include="*.jsx"
  ```

---

#### [LOW-03] Inconsistent Naming Conventions
- **What:** Mixed naming patterns across files (PascalCase, camelCase, kebab-case used inconsistently for components and folders).
- **Fix Standard to enforce going forward:**
  ```
  Components:    PascalCase.jsx       → ServiceCard.jsx
  Data files:    camelCase.data.js    → services.data.js
  Hooks:         useCamelCase.js      → useServices.js
  Utilities:     camelCase.js         → formatPhone.js
  CSS modules:   camelCase.module.css → serviceCard.module.css
  ```

---

## 4. RTK Query / Redux Audit Notes

- **15 API slice files** is a large surface area. Confirm each slice is actually in use — likely some are stale from early development.
- Verify all `baseUrl` values in RTK slices are pointing to env variables, not hardcoded localhost/production URLs.
  ```ts
  // ✅ Correct
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL })

  // ❌ Wrong — common mistake by junior devs
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' })
  ```
- Check for duplicate API calls — 15 slices for a single CA website is likely over-engineered or has orphaned code.

---

## 5. Mongoose Schema Notes

- **13+ Mongoose models** — audit which are actively used by routes.
- Ensure all schemas have:
  - `timestamps: true` option
  - Proper index on fields used in `.find()` queries (especially `email`, `phone`, `slug`)
  - No `strict: false` — this disables schema validation

---

## 6. Security Checklist (Minimum for Go-Live)

| Check | Status | Action |
|-------|--------|--------|
| JWT secret is a strong random string (32+ chars) | Unknown | Verify in env |
| JWT stored in httpOnly cookie, not localStorage | Unknown | Audit Auth code |
| CORS configured to specific origin, not `*` | Unknown | Check `app.js` |
| MongoDB connection string not committed | Unknown | Check git history |
| Admin routes protected by auth middleware | Likely yes | Verify all 20 admin files |
| File uploads validated (type + size limits) | Unknown | Audit upload middleware |

> **For the 48-hour window:** Focus on verifying JWT storage (httpOnly cookie vs localStorage is a common junior dev mistake) and CORS origin restriction. These are the two most exploitable issues if misconfigured.

---

## 7. Immediate Pre-Work Checklist (Sprint 0 Actions from This Audit)

Before writing a single line of feature code, complete these:

- [ ] Create `dev` and `staging` branches, protect `main`
- [ ] Disconnect Vercel auto-deploy from `main`, reconnect to `staging`
- [ ] Add `.env.example` to server with all key names (no values)
- [ ] Rename `shere/` → `shared/` folder
- [ ] Delete commented-out code in `App.jsx` lines 1–133
- [ ] Audit all 15 RTK slices — remove unused ones
- [ ] Confirm all `baseUrl` values in RTK use `import.meta.env.VITE_API_URL`
- [ ] Verify JWT is stored in httpOnly cookie (not localStorage)
- [ ] Verify CORS is restricted to the actual Vercel domain

---

## 8. Effort Estimate — Technical Debt Resolution

| Issue ID | Fix Effort | Do When |
|----------|-----------|---------|
| HIGH-01 — Git branching | 15 min | Sprint 0 (NOW) |
| HIGH-02 — Vercel config | 20 min | Sprint 0 (NOW) |
| HIGH-03 — .env structure | 30 min | Sprint 0 (NOW) |
| HIGH-04 — Test setup | 1 hr setup | Post-deadline |
| MED-01 — server/index.js refactor | 1 hr | Sprint 4 / post-deadline |
| MED-02 — Validation layer | 2 hrs | Post-deadline |
| MED-03 — Rate limiting | 30 min | Sprint 4 |
| LOW-01 — shere/ rename | 15 min | Sprint 0 |
| LOW-02 — App.jsx cleanup | 10 min | Sprint 0 |
| LOW-03 — Naming conventions | Ongoing | Enforce per PR |

**Total for Sprint 0 immediate items: ~2.5 hours**  
**Total post-deadline debt: ~5 hours**

---

*This audit is based on static analysis output from Claude Code. A developer should verify each finding directly in the codebase before acting. Some issues may already be partially resolved.*

*Last updated: 13 April 2026*
