# thrivo-public

Public marketing site for **Thrivo** (thrivo.fit) — weight loss without the nonsense.

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · shadcn/ui · motion · TypeScript strict.
Toolchain and structure mirror `oj-multimedia`; design tokens come from the Thrivo Figma landing
page (see `docs/BUILD-NOTES.md`).

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # production build (standalone output)
npm run checks       # lint + format:check + test:unit + build
npm run test:unit    # vitest (jsdom)
npm run test:e2e     # playwright
```

## Deploy

Coolify builds from `Dockerfile` (multi-stage, node:22-alpine, port 3000). The deps stage
reinstalls from `package.json` because the committed lockfile is Windows-generated (win32-only
optional deps break Linux builds). Healthcheck hits `/api/health`. Pass `NEXT_PUBLIC_LIVE_URL`
as a Coolify build variable.

## Docs

- `docs/BUILD-NOTES.md` — section-building contract, Figma node IDs, shared-component rules
- `docs/seo-aeo-geo-strategy.md` — SEO/AEO/GEO strategy
