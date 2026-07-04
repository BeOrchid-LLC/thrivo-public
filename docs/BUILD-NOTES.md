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
     `.bg-tint`, `.bg-tint-tile`, `.bg-tint-band`, `.bg-tint-panel`, `.glow-orb`, `.card-surface`,
     `.card-interactive`, `.text-section-subtext` (SectionHeader's subtext), `shadow-xs` (flat
     list-style cards), `.bg-tint-tile-accent` (orange icon-tile variant)
2. **Every section fetches its own content — this is the standing pattern, not optional.**
   Copy and image URLs are modeled as if a CMS backend already owns them (none exists yet, but
   this is the seam for when one does). For a section named `X`:
   - `lib/content/X.ts` — `XContent` type, `X_CONTENT_FALLBACK` (today's hardcoded copy/image
     paths), and `getXContent = cache(() => fetchSectionContent('x', async () => { ...
     TODO(cms): real fetch goes here ...; return X_CONTENT_FALLBACK; }))`. See
     `lib/content/hero.ts` for the reference shape and `lib/content/fetch-content.ts` for the
     shared seam (logs, then re-throws, so failures are catchable).
   - `app/_sections/XView.tsx` — presentational, pure function of a `content: XContent` prop.
     Never imports the content loader itself.
   - `app/_sections/XSkeleton.tsx` — loading placeholder shaped like `XView` (same section
     classes/grid) so nothing shifts when real content swaps in.
   - `app/_sections/X.tsx` — the exported section. A non-async `XData()` calls
     `use(getXContent())` (React's `use` hook — not `useEffect`/`useState`) and renders
     `<XView content={content} />`; the exported `X` wraps `<XData />` in `<Suspense
     fallback={<XSkeleton />}>` inside a `<SectionErrorBoundary section="x" fallback={<XView
     content={X_CONTENT_FALLBACK} />}>` (`components/general/SectionErrorBoundary.tsx`). A
     failed fetch degrades to that section's own fallback copy — quietly, no error banner —
     rather than breaking the page. See `app/_sections/Hero.tsx` as the reference.
   - Only per-section marketing copy/images go through this pipeline. Site-wide chrome
     (`NAV_LINKS`, `FOOTER_LINKS`, `SOCIAL_LINKS`, `SEO_DETAILS` in `lib/constants/texts.ts`)
     is intentionally NOT part of it — header/footer render synchronously, no Suspense/loading
     state for nav chrome. Revisit if that should change.
3. Anchor targets: `#features`, `#pricing`, `#faq`, `#get-started` (header/nav already links to
   these). Add `scroll-mt-header` to each target section.
4. FAQ section must render `faqJsonLd()` (see `lib/jsonld.ts`) via `<JsonLd />`; the page should
   also include `organizationJsonLd()` + `websiteJsonLd()` + `mobileAppJsonLd()`.

## Section inventory (Figma node IDs)

| Section | Node | Notes |
|---|---|---|
| Nav | 144:458 | done — `components/layout/Header.tsx` |
| Hero | 144:482 | done — `app/_sections/Hero.tsx` + `HeroView`/`HeroSkeleton` + `lib/content/hero.ts` (reference implementation of the content-fetching pattern in rule 2). Layout follows the reference screenshot, not Figma's exact positions; background glows are baked into `public/images/public-hero-bg.png` (no CSS glow-orb elements here) |
| TrustBar | 144:513 | done — `app/_sections/TrustBar.tsx` + `TrustBarView`/`TrustBarSkeleton` + `lib/content/trust-bar.ts`. 4 stats: 5M+ foods, 160+ countries, 60 sec, $14.99 (accent orange). Full-bleed tint band (new `.bg-tint-band`), narrower vertical padding than `section-padding` |
| ValueProp | 144:535 | done — `app/_sections/ValueProp.tsx` + `ValuePropView`/`ValuePropSkeleton` + `lib/content/value-prop.ts`. First user of `SectionHeader` (now finalized, in `components/general/`). Checklist (icon bullet + text) and card (icon tile + title + body) are colocated sub-components in `ValuePropView.tsx`, mapped over content arrays. Checklist item 2 deliberately drops the Figma copy's unverified "email confirmation in 60 seconds" — see `docs/seo-aeo-geo-strategy.md` / llms.txt history |
| Features | 144:601 | done — `app/_sections/Features.tsx` + `FeaturesView`/`FeaturesSkeleton` + `lib/content/features.ts`. `id="features"` + `scroll-mt-header` for the nav anchor (new `id` prop on `SectionContainer`). Muted `#F4F6F9` bg — fixed `SectionContainer`'s `background="muted"` from `bg-muted/30` to full-opacity `bg-muted` to match. `FeatureCard` sub-component colocated in `FeaturesView.tsx`, mapped over `content.features`; the "Transparent subscription" card uses the new orange `.bg-tint-tile-accent` instead of the green tile |
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
- **Social handles**: no real accounts exist yet, so `public/llms.txt` has no Links/social
  section and the footer's `SOCIAL_LINKS` (`lib/constants/texts.ts`) point at unverified
  handle/platform guesses. Once accounts are created, add the real handles to **both**
  files and double check which handle is on which platform in each — the two previously
  disagreed with each other (neither was ever verified).
