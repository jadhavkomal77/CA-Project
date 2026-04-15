# Branch Protection Runbook

Use this once after pushing the `.github` folder.

## 1) Standardize production branch

This repo currently uses `master`. Keep using `master` unless you intentionally rename it to `main`.

## 2) Create long-lived branches

Create and push:
- `dev`
- `staging`

## 3) GitHub rules to apply

Configure branch protection (or rulesets) for `master` and `staging`:

- Require a pull request before merging
- Require at least 1 approval
- Dismiss stale approvals on new commits
- Require status checks to pass before merging
  - `Client Build`
  - `Server Install + Syntax Check`
- Keep `Client Lint (Advisory)` visible but optional until legacy lint errors are fixed.
- Require branches to be up to date before merging
- Block force pushes
- Block branch deletion

Recommended for `master`:
- Restrict who can push directly (prefer no direct push)

## 4) Pull request flow

- `feat/*` or `fix/*` -> `dev`
- `dev` -> `staging`
- `staging` -> `master`

## 5) Vercel branch mapping

- Production: `master` only
- Preview/UAT: `staging`

Do not enable production deploys from `dev` or feature branches.
