# Landing page build notes

The repo skeleton replicates `oj-multimedia` conventions with design tokens extracted from the
Thrivo Figma landing page (frame **144:457**, select it in Figma desktop for MCP access). The
sections themselves are **not built yet** — this file is the contract for that phase.

## Rules for the section-building phase

1. **Use the shared components — do not write raw markup duplicates.** Search
   `components/atoms/`, `components/ui/`, and `components/general/` before writing any new UI:
   - `EyebrowBadge` — tint-gradient pill w/ optional orange dot (hero badge, CTA "Launching soon")
   - `StoreButtons` — App Store / Google Play dark pills with green glow
   - `PhoneFrame` — 36px-radius, 3px ink border app screenshot frame (mockups in `public/mockups/`)
   - `SectionContainer` + `SectionHeader` — section shell (eyebrow + h2 + subtext) and padding
   - `FadeInUpSection` / `FadeInUpCard` (MotionContainers) — scroll-in animation, staggered cards
   - `RegularBtn` / `RegularInput` — buttons and the email-capture input (CTA form)
   - `ui/accordion` — FAQ; `ui/switch` — pricing monthly/annual toggle
   - Type scale utilities in `globals.css`: `.text-display`, `.text-section-h2`, `.text-eyebrow`,
     `.text-body-lg`, `.text-card-title`, `.text-card-body`, `.text-fine`, `.gradient-text`,
     `.bg-tint`, `.bg-tint-tile`, `.glow-orb`, `.card-surface`, `.card-interactive`
2. Sections live in `app/_sections/` (oj naming: `SectionName.tsx`), composed in `app/page.tsx`
   inside `MainLayout`, each wrapped in `<Suspense>` with a skeleton fallback where data-driven.
3. Section copy goes in `lib/constants/texts.ts` — no copy hardcoded inside section components.
4. Anchor targets: `#features`, `#pricing`, `#faq`, `#get-started` (header/nav already links to
   these). Add `scroll-mt-header` to each target section.
5. FAQ section must render `faqJsonLd()` (see `lib/jsonld.ts`) via `<JsonLd />`; the page should
   also include `organizationJsonLd()` + `websiteJsonLd()` + `mobileAppJsonLd()`.

## Section inventory (Figma node IDs)

| Section | Node | Notes |
|---|---|---|
| Nav | 144:458 | done — `components/layout/Header.tsx` |
| Hero | 144:482 | h1 56px w/ green gradient "without", badge, store buttons, phone mockup, glow orbs |
| TrustBar | 144:513 | 4 stats: 5M+ foods, 160+ countries, 60 sec, $14.99 |
| ValueProp | 144:535 | eyebrow "Why Thrivo", checklist + 3 stacked feature cards |
| Features | 144:601 | eyebrow "Features", 6-card grid (icon tile + title + body) |
| AppPreview | 144:668 | phone mockups + "Outcomes, not gimmicks." |
| Pricing | 144:681 | monthly/annual toggle (Save 17%), Free vs Premium cards, footnote |
| FAQ | 144:804 | left header + right accordion (6 questions) |
| CTA | 144:855 | "Launching soon" badge, store buttons, email-capture form ("Notify me") |
| Footer | 144:886 | done — `components/layout/Footer.tsx` |

## Deferred / later phases

- Legal pages: `/privacy-policy`, `/terms-of-service`, `/cancellation-policy`, `/contact`
  (footer already links to them).
- Email capture backend for the CTA form (add env vars to `.env.example` + `lib/config/env.ts`).
- Performance budget scripts (`lighthouse-budget.json`, `performance-budgets.json` +
  `checks:performance`) — port from oj-multimedia at the NFR pass.
- SEO/AEO/GEO follow-ups per `docs/seo-aeo-geo-strategy.md` (llms.txt already in `public/`).
