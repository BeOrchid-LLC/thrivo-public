# Thrivo — SEO, AEO & GEO Strategy

How Thrivo's public site earns visibility across the three discovery surfaces that
matter in 2026:

- **SEO** — Search Engine Optimization. Ranking in classic search results (Google,
  Bing) via crawlable, fast, well-structured, authoritative pages.
- **AEO** — Answer Engine Optimization. Winning the _direct answer_ — featured
  snippets, Google AI Overviews, People-Also-Ask, and voice assistants.
- **GEO** — Generative Engine Optimization. Being _cited and recommended_ by
  generative assistants (ChatGPT, Perplexity, Claude, Gemini, Copilot).

They overlap heavily (clean structure + clear facts + authority feed all three),
but each has distinct levers. This doc covers what's already implemented in
`thrivo-public`, and the ongoing work to compound it.

> **Context:** Thrivo is pre-launch. The near-term SEO/AEO/GEO goal is **entity
> establishment** — making "Thrivo" a recognized, well-described entity with
> consistent facts (honest pricing, $14.99/mo, free tier, 160+ countries) — and
> **waitlist capture**, not yet ranking for high-volume head terms.

---

## 0. KPIs & tooling

| Goal | Metric | Tool |
|------|--------|------|
| Indexing health | Pages indexed, crawl errors, Core Web Vitals | Google Search Console, Bing Webmaster |
| SEO visibility | Impressions/clicks for brand + "honest weight loss app" cluster | Search Console |
| Performance | LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (NFR budgets) | Lighthouse / PageSpeed, CrUX |
| Rich results | FAQ / App rich-result eligibility & impressions | Rich Results Test, Search Console |
| AEO | Appearances in AI Overviews / PAA / featured snippets | Manual SERP checks, rank trackers w/ SERP-feature tracking |
| GEO | Citations/mentions in ChatGPT, Perplexity, Gemini answers | Manual prompt audits; Perplexity "Sources"; tools like Profound/Otterly |
| Conversion | Waitlist signups from organic | Analytics + form events |

**Cadence:** weekly Search Console review pre-launch; monthly GEO prompt audit;
re-run Lighthouse on every deploy that touches the page.

---

## 1. SEO

### 1.1 Technical (implemented)

- **Server-rendered HTML** — Next.js App Router, mostly Server Components. All
  copy (hero, features, pricing, FAQ) is in the initial HTML, not injected by
  client JS, so crawlers see it without rendering. Interactivity (pricing toggle,
  FAQ accordion, form) is isolated to small client components.
- **`app/sitemap.ts`** → `/sitemap.xml`; **`app/robots.ts`** → `/robots.txt`
  (references the sitemap). Keep public legal routes (privacy, terms, cancellation,
  and contact) in the sitemap as they ship.
- **Canonical URLs** via `metadata.alternates.canonical` + `metadataBase`
  (`lib/constants/texts.ts`). Set `NEXT_PUBLIC_LIVE_URL` in production to the real origin.
- **Metadata API** (`app/layout.tsx`) — title template, description, keywords,
  Open Graph, Twitter `summary_large_image`, robots directives
  (`max-image-preview:large`, `max-snippet:-1`), `theme-color`.
- **`public/og-image.png`** — the social card used by the metadata configuration.
- **`app/manifest.ts`** — PWA manifest; favicon served from `public/favicon.png` via
  `metadata.icons` (`lib/constants/texts.ts`).
- **Core Web Vitals** — `next/font` (Inter, no layout shift), `next/image` with
  explicit dimensions (no CLS), LCP hero text rendered statically (not behind a
  scroll/JS animation), below-the-fold animations only. Keep the client bundle
  lean — framer-motion is the only heavy client dep; don't add more without cause.
- **Mobile-first / responsive** — verified at 375px and 1280px; 44×44px tap
  targets; this is mobile-first indexing-safe.

### 1.2 On-page (implemented + ongoing)

- **One `<h1>`** (hero), ordered `<h2>` per section, `<h3>` for cards/FAQ —
  clean document outline.
- **Landmarks & a11y** — `header`/`nav`/`main`/`footer`, `aria-label`led
  sections, skip-to-content link, visible focus states, `alt` text on mockups.
  (A11y and SEO reinforce each other.)
- **Keyword themes** (see `lib/constants/texts.ts` `SEO_DETAILS.keywords`): the differentiator cluster —
  _honest / transparent weight-loss app_, _free calorie counter no credit card_,
  _barcode food scanner_, _cancel subscription easily_. Don't chase "weight loss
  app" head term directly pre-launch; own the long-tail intent Thrivo is built for.
- **Internal linking (ongoing)** — when content pages ship (blog, comparisons,
  legal), cross-link them and link from the footer; add a `/blog` hub.

### 1.3 Off-page (ongoing, post-launch)

- **App Store Optimization (ASO)** — the App Store / Play listings are their own
  search surface and a strong authority signal. Keep name, pricing, and feature
  claims identical to the site (entity consistency).
- **Backlinks** — product directories (Product Hunt, AlternativeTo, app
  roundups), digital-PR around the "honest pricing / anti-dark-pattern" angle.
- **Consistent NAP/entity** — same description, logo, and socials everywhere
  (site, stores, social profiles) so engines merge them into one entity.

### 1.4 Structured data (implemented — `lib/jsonld.ts`)

Rendered server-side as one `@graph`:

- `Organization` (BeOrchid LLC / Thrivo, logo, `sameAs` socials)
- `WebSite`
- `MobileApplication` (category Health, iOS+Android, `offers` $0 and $14.99)
- `FAQPage` (the 6 FAQs)

Validate after each change with Google's **Rich Results Test** and Schema.org
validator. **Don't** add `aggregateRating`/review schema until there are real,
on-page reviews (it's a manual-action risk otherwise). Add `BreadcrumbList` and
`Article` schema when content pages launch.

---

## 2. AEO (Answer Engine Optimization)

Goal: be the source Google's AI Overview / a voice assistant quotes when someone
asks "is there a weight loss app with no hidden fees?" or "how do I cancel
Thrivo?".

### Implemented

- **`FAQPage` schema + on-page FAQ** with **concise, self-contained answers** —
  each answer stands alone and leads with the direct answer ("No. The free tier
  works with no card, ever…"). This is the single highest-leverage AEO asset.
- **Question-shaped headings** and scannable copy (short paragraphs, the
  TrustBar's atomic stats `5M+`, `160+`, `60 sec`, `$14.99`).
- **Explicit, unambiguous facts** in prose (price, trial length, country count,
  cancellation steps) — answer engines extract claims, not vibes.

### Ongoing

- **Mine real questions** — Search Console queries, People-Also-Ask, Reddit,
  support tickets — and add them to the FAQ data (`lib/content/faq.ts`).
  The schema and UI update automatically.
- **Answer-first content** — any future article should open with a 40–60 word
  direct answer, then expand. That block is what gets lifted into snippets/AI
  Overviews.
- **Optional `speakable` schema** on key Q&A for voice eligibility.
- **Definitional clarity** — keep a crisp "What is Thrivo" statement (entity
  definition) on the site; engines need a clean one-sentence definition.

---

## 3. GEO (Generative Engine Optimization)

Goal: when someone asks ChatGPT/Perplexity/Gemini "what's a good honest weight
loss app?" or "weight loss app with a real free tier", Thrivo is named — with
correct facts.

### Implemented

- **`public/llms.txt`** — a concise, factual, LLM-friendly summary of what Thrivo
  is, its key facts, plans, and what it is _not_. This is the GEO analog of a
  sitemap: a clean, quotable brief. Keep it in sync with `lib/content/`.
- **AI-crawler allowlist** (`app/robots.ts`) — explicitly welcomes GPTBot,
  OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended,
  etc. (Flip an individual agent to `disallow` if policy ever requires it.)
- **Quotable, statistic-rich, unambiguous claims** — generative models prefer
  text they can lift verbatim with a number attached ("$14.99/month", "160+
  countries", "cancel in 2 taps"). Only use a specific number where there's a
  real SLA or measurement behind it — don't invent precision (see
  `public/llms.txt` history: a "60 seconds" email-confirmation claim and a
  "$149/year" price were both unverified/stale and had to be corrected).
- **Strong entity clarity** — consistent definition + `Organization`/`sameAs`
  schema so models bind the facts to the "Thrivo" entity.

### Ongoing — the real GEO work is off-site

LLMs synthesize from the wider web, especially high-trust community and review
sources. Priorities post-launch:

1. **Third-party presence** — get Thrivo into the corpora models trust:
   - Reddit threads (r/loseit, r/fitness) — genuine participation, not spam.
   - Review sites, app directories, "best honest weight loss app" listicles.
   - Comparison content ("Thrivo vs MyFitnessPal pricing") — models love
     structured comparisons; publish our own _and_ earn third-party ones.
2. **Statistics & citations** — publish original, citable data (e.g., a
   "transparency in fitness app pricing" mini-report). Models cite sources with
   concrete numbers.
3. **Consistency across the web** — identical facts everywhere; contradictions
   make models hedge or omit.
4. **Monitor & iterate** — run a monthly prompt audit across ChatGPT, Perplexity,
   Gemini, Claude with ~10 buyer-intent prompts; track whether Thrivo is named,
   whether facts are right, and which sources are cited; fix the gaps at the
   source.

---

## 4. Operations

### Pre-launch checklist

- [ ] Set `NEXT_PUBLIC_LIVE_URL` to the approved production origin (canonicals/OG/sitemap).
- [ ] Verify domain in Google Search Console + Bing Webmaster Tools.
- [ ] Submit `/sitemap.xml`.
- [ ] Rich Results Test on the live URL (FAQ + App eligible, no errors).
- [ ] Lighthouse: SEO 100, a11y ≥95, CWV within NFR budgets.
- [ ] Confirm `/robots.txt`, `/llms.txt`, `/manifest.webmanifest`,
      `/og-image.png` all serve 200.
- [ ] OG card renders correctly (LinkedIn Post Inspector, X card validator).
- [x] Wire the waitlist form to the backend lead-capture endpoint; it persists the lead and
      queues an idempotent confirmation email. Validate it after each deployment.
- [ ] Decide whether to keep `index:true` while pre-launch, or `noindex` until
      the page is final. (Recommended: index a real "launching soon" page so
      entity-building and waitlist capture start early.)

### Launch-day

- [ ] Remove any `noindex`; request indexing in Search Console.
- [ ] Publish App Store / Play listings with identical facts; replace the intentional
      `StoreButtons` placeholders with the real URLs.
- [ ] Product Hunt / directory submissions; kick off PR on the transparency angle.

### Ongoing cadence

- **Per deploy:** Lighthouse + Rich Results Test on changed pages.
- **Weekly:** Search Console (coverage, queries, CWV).
- **Monthly:** GEO prompt audit; refresh FAQ from real queries; review backlinks.
- **Quarterly:** content plan (comparisons, answer-first articles), entity audit
  (facts consistent across site/stores/social/llms.txt).

### Where each lever lives in the codebase

| Lever | File |
|-------|------|
| Site-wide SEO config, keywords, canonical origin | `lib/constants/texts.ts` |
| Section copy, FAQ, plans (drives AEO answers + JSON-LD) | `lib/content/` |
| Structured data graph | `lib/jsonld.ts`, `components/seo/JsonLd.tsx` |
| Metadata, OG/Twitter, robots directives | `app/layout.tsx` |
| Sitemap / robots / manifest / OG image / favicon | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `public/og-image.png`, `public/favicon.png` |
| GEO brief + AI-crawler policy | `public/llms.txt`, `app/robots.ts` |

> Because copy and FAQ live in `lib/content/`, editing the FAQ updates the
> visible accordion, the `FAQPage` schema, and (when synced) `llms.txt` — so
> SEO, AEO, and GEO improve from one edit. Keep the section content files authoritative.
