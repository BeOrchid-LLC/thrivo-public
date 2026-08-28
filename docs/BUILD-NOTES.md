# Landing page build notes

The repo skeleton replicates `oj-multimedia` conventions with design tokens extracted from the
Thrivo Figma landing page (frame **144:457**, select it in Figma desktop for MCP access). The
The marketing, legal, waitlist, and email-link handoff surfaces are implemented; this file
records the patterns and remaining launch work.

## Rules for the section-building phase

1. **Use the shared components — do not write raw markup duplicates.** Search
   `components/atoms/`, `components/ui/`, and `components/general/` before writing any new UI:
   - `EyebrowBadge` — tint-gradient pill w/ optional orange dot (hero badge, CTA "Launching soon")
   - `StoreButtons` — App Store / Google Play dark pills with green glow
   - `PhoneFrame` — 36px-radius, 3px ink border app screenshot frame (mockups in `public/mockups/`)
   - `SectionContainer` + `SectionHeader` — section shell (eyebrow + h2 + subtext) and padding
   - `FadeInUpWrap` / `FadeInUpCard` (MotionContainers) — scroll-in animation, staggered cards; see
     `docs/scroll-animations.md` for which primitive each section uses and how to add more
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
| AppPreview | 144:668 | done — `app/_sections/AppPreview.tsx` + `AppPreviewView`/`AppPreviewSkeleton` + `lib/content/app-preview.ts`. Hand-rolled section (like Hero) for the full-bleed `public/images/progress-bg.png`; phone mockup (`public/images/mobile-progress-tracker.png`, frame baked into the PNG like Hero's dashboard image) + `SectionHeader` centered as a pair, per the reference screenshot rather than Figma's raw node tree, which has a couple of stray nodes that never render (an empty duplicate container behind the phone, an off-canvas decorative layer) |
| Pricing | 144:681 | done — `app/_sections/Pricing.tsx` + `PricingView`/`PricingSkeleton` + `lib/content/pricing.ts`. `id="pricing"` + `scroll-mt-header`. `PricingCard` sub-component colocated in `PricingView.tsx`, mapped over `content.plans` (Free / Premium); billing-cycle toggle (`ui/switch`) is local UI state, not content -- it swaps each plan's `monthly`/`annual` price object. New `.bg-premium-card` gradient utility (`globals.css`) for the Premium card fill, matching Figma's green gradient via the existing `primary`/`primary-light`/`primary-active` tokens |
| FAQ | 144:804 | done — `app/_sections/Faq.tsx` + `FaqView`/`FaqSkeleton` + `lib/content/faq.ts`. `id="faq"` + `scroll-mt-header`. Left `SectionHeader` (narrow, left-aligned) + right `ui/accordion` column spread via `justify-between`, matching the design's asymmetric two-column layout rather than a centered pair. `FaqAccordionItem` sub-component colocated in `FaqView.tsx`, mapped over `content.questions`; `ui/accordion`'s existing styling (divider, chevron rotate, spacing) already matched the design as-is. Renders `faqJsonLd(content.questions)` via `<JsonLd />` (rule 4); `organizationJsonLd()` + `websiteJsonLd()` + `mobileAppJsonLd()` now render once in `app/page.tsx` |
| CTA | 144:855 | done — `app/_sections/Cta.tsx` + `CtaView`/`CtaSkeleton` + `lib/content/cta.ts`. `id="get-started"` + `scroll-mt-header`, matching the header's existing "Get started" anchor. Built from the reference screenshot, not Figma's raw node tree -- the radial glow-orb layer (node 144:856) is already baked into `public/images/cta-bg.png`. New `backgroundImageSrc` prop on `SectionContainer` renders that full-bleed image behind the container, so this section keeps using the shared container instead of hand-rolling one like Hero/AppPreview. `SectionHeader`'s `eyebrow` now accepts a node, not just a string, so the "Launching soon" pill (new `EyebrowBadge` `variant="solid"`, orange fill/white text/dot, vs the existing tint variant) can stand in for the usual text eyebrow. `StoreButtons` reused for the app links; `RegularInput` + `RegularBtn` submit to the backend lead-capture endpoint, which persists the lead and queues one idempotent waitlist-confirmation email. Store URLs remain placeholders until the listings are published. |
| Footer | 144:886 | done — `components/layout/Footer.tsx` |

## Runtime verification

- The CTA implementation is live: submissions post to the backend, persist the lead, and queue
  an idempotent waitlist-confirmation email. The older section-inventory wording about a stub is
  historical and should not be used as an implementation status.
- `npm run test:e2e:deployed` runs the email-link destination suite against the current preview
  deployment at `https://preview.thrivo.fit`.
- The suite checks `/dashboard`, `/log`, `/metrics`, `/settings/subscription`, and
  `/unsubscribe`, including the expected app handoff links.
- Promotion from `https://preview.thrivo.fit` to `https://thrivo.fit` remains a release decision
  pending approval.

## Deferred / later phases

- Store listing URLs: keep App Store and Google Play buttons on their intentional `/#get-started`
  placeholders until the real listings exist.
- Main-domain promotion: deploy to `https://thrivo.fit` after approval.
- Performance budget scripts (`lighthouse-budget.json`, `performance-budgets.json` +
  `checks:performance`) — port from oj-multimedia at the NFR pass.
- SEO/AEO/GEO follow-ups per `docs/seo-aeo-geo-strategy.md` (llms.txt already in `public/`).
- **Social handles**: no real accounts exist yet, so `public/llms.txt` has no Links/social
  section and the footer's `SOCIAL_LINKS` (`lib/constants/texts.ts`) point at unverified
  handle/platform guesses. Once accounts are created, add the real handles to **both**
  files and double check which handle is on which platform in each — the two previously
  disagreed with each other (neither was ever verified).
