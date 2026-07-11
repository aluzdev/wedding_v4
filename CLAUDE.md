# CLAUDE.md

Guidance for Claude Code (and any agent) working in this repo.

## Deployment — Cloudflare Pages ONLY

**We always deploy to Cloudflare Pages. Never Vercel, never anything else.**

- Production ships on every push to `master` via [.github/workflows/deploy-prod.yml](.github/workflows/deploy-prod.yml):
  `wrangler pages deploy dist --project-name=boda-cris-pris --branch=master` → **https://crisypris.com**.
- Do **not** add Vercel config, Netlify config, or any other deploy provider.
- `vercel.json` in this repo exists only to **disable** Vercel git deployments (`git.deploymentEnabled: false`). Leave it that way. The Vercel↔GitHub integration itself is disconnected at the account level.
- If a deploy needs changing, edit the Cloudflare workflow — don't introduce a new provider.

## Stack

- React 19 + Vite + Tailwind CSS v4 + framer-motion. Single-page wedding invitation.
- Dev server: `npm run dev` (Vite, port 5173). Build: `npm run build`. Tests: `npm test` (vitest).
- Note: the repo normally runs under WSL; `vite.config.js` uses `usePolling` for `/mnt/c`.

## Where things live (edit these, not the components)

- **Text / dates / hotels / registry / colors data:** [src/content/content.js](src/content/content.js). Bilingual (`es` / `en`). Components read it via `useLang()` and `{t.some.path}` tokens ([src/i18n.jsx](src/i18n.jsx)).
- **Per-section background + text color:** the `surface-*` classes in [src/index.css](src/index.css) `@layer components`. Recolor a section there, not in its JSX.
- **Sections:** `src/sections/*.jsx`. Page order is composed in [src/App.jsx](src/App.jsx).
- **Ambient/theme tokens** (petals, motes, fireflies colors): CSS variables in `src/index.css`.

## Conventions

- Keep contrast readable: body text ≥ 4.5:1. Gold (`--color-gold`) is for dark surfaces only; on cream use ink/moss.
- PRs target `master`. Prod deploy is automatic on merge to `master` (Cloudflare).

## Git accounts

This machine has two GitHub accounts configured in `gh`. Pushes to `aluzdev/wedding_v4` must use the **`aluzdev`** account (`gh auth switch --user aluzdev`). The other account (`Cristian-Molina_kraft`, Enterprise) has no write access and will 403.
