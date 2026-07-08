# Scroll animations (Motion)

How this repo animates section/card reveals on scroll. Ported from `oj-multimedia`'s pattern —
same package, same primitives, same conventions — so a contributor familiar with one recognizes
the other immediately.

## Package

`motion` (the successor to `framer-motion`), imported as `from 'motion/react'`. Never
`framer-motion` directly — there is no lint rule enforcing this here (oj-multimedia has a
contract test for it; this repo doesn't yet), so review for stray `framer-motion` imports by hand
if you copy code from an older reference.

## Primitives — `components/general/MotionContainers.tsx`

Three `'use client'` wrapper components, all pre-existing in this repo (ported during the initial
skeleton) but unused until this pass wired them into the actual sections:

| Component | Renders | Use for |
|---|---|---|
| `FadeInUpWrap` | `motion.div` | A single standalone block (a `SectionHeader`, a lone panel) that should fade+slide up once, no stagger. |
| `FadeInUpCard` | `motion.div` | One item in a repeated/sequenced group (grid cards, stat pairs, accordion rows, a left/right column pair) — auto-staggers via `index`. |
| `FadeInUpSection` | `motion.section` | Same animation as `FadeInUpWrap` but as a semantic `<section>`. **Not used in this repo** — every section already gets its `<section>` tag from `SectionContainer` (or is hand-rolled for a full-bleed background image), so wrapping again would nest `<section>` inside `<section>`. Kept for parity with oj-multimedia; reach for `FadeInUpWrap` instead when animating content that's already inside a `<section>`.

All three:
- `initial={{ opacity: 0, y: 50 }}` → animates to `{ opacity: 1, y: 0 }`
- `transition={{ duration: 0.8, ease: 'easeOut' }}` (`FadeInUpCard` adds `delay: index * delayMultiplier`, default `delayMultiplier = 0.1`)
- `viewport={{ once: true, amount }}` — `once: true` so it never re-plays on scroll-back; `amount` (0–1, default 0.3 for `Wrap`/`Section`, 0 for `Card`) controls how much of the element must be visible before it fires
- Gate on `siteLoading` (from `lib/store/siteStore.ts`, flipped off by `LoadAnimationScreen` once the splash clears): while `siteLoading` is true, `whileInView` resolves to `{}` (no-op), so a section that's already in the initial viewport doesn't animate underneath the splash overlay and only starts its scroll-reveal once the splash is gone.

There's no shared variants/easing config file beyond this — durations/delays/easing are the
constants above, used consistently by convention, not enforced by a shared object. If you need a
different curve for a one-off, don't edit `MotionContainers.tsx`; hand-roll a `motion.div` (see
Hero below).

## Where each section uses which primitive

| Section | Pattern |
|---|---|
| `HeroView.tsx` | **Exception** — above-the-fold, so it plays on mount (`animate`, not `whileInView`) rather than waiting for a scroll trigger. Hand-rolled `motion.h1`/`motion.p`/`motion.div` (not the wrapper components) so each element — eyebrow, heading, paragraph, store buttons, fine print, dashboard mockup — cascades in on its own 0.1s-apart delay (`0, 0.1, 0.2, 0.3, 0.4`), matching oj-multimedia's `HeroSection.tsx`. |
| `TrustBarView.tsx` | Each of the 4 stat pairs is a `FadeInUpCard` (`index` = position in `content.stats`). |
| `ValuePropView.tsx` | `SectionHeader` in a `FadeInUpWrap`. Checklist rows are `motion.li` by hand (not `FadeInUpCard`, which renders a `div` — a `<div>` inside a `<ul>` would be invalid; `motion.li` reuses the same timing values instead). The card panel's items are `FadeInUpCard`. |
| `FeaturesView.tsx` | `SectionHeader` in a `FadeInUpWrap`; each `FeatureCard` in a `FadeInUpCard`. |
| `AppPreviewView.tsx` | Hand-rolled section (own `<section>`, full-bleed background image, like Hero) — phone mockup and header block are each a `FadeInUpCard` (`index={0}`/`index={1}`) so they reveal as a staggered pair rather than a repeated grid; there's no `FadeInUpWrap` here because there isn't a lone standalone block by itself. |
| `PricingView.tsx` | Header + billing toggle share one `FadeInUpWrap`; each `PricingCard` (Free/Premium) is a `FadeInUpCard`. |
| `FaqView.tsx` | Left `SectionHeader` column in a `FadeInUpWrap`; each accordion row (`FaqAccordionItem`) in a `FadeInUpCard`. |
| `CtaView.tsx` | The copy column and the form column are each a `FadeInUpCard` (`index={0}`/`index={1}`) — same staggered-pair treatment as AppPreview. |

Header/Footer (site chrome) are deliberately **not** animated — they're always in view or
persistent, not a "reveal on scroll" case, and `docs/BUILD-NOTES.md` already excludes nav chrome
from the per-section content pipeline this mirrors.

## Adding animation to a new section

1. Repeated items (cards, list rows, a left/right pair) → wrap each mapped item in `<FadeInUpCard key={...} index={i}>`. Add the `index` param to your `.map()` if it isn't already there.
2. A single block (a header, a lone panel) → wrap it in `<FadeInUpWrap>`.
3. List semantics (`<li>` inside a `<ul>`/`<ol>`) → don't use `FadeInUpCard` (it renders a `div`); hand-roll `motion.li` with the same `initial`/`whileInView`/`viewport`/`transition` values (copy from `ValuePropView.tsx`'s `ChecklistItem`).
4. Above-the-fold content that should play immediately (not wait for scroll) → hand-roll `motion.*` with `animate` instead of `whileInView`, no `viewport` prop, staggered by manually-set `delay`s (copy from `HeroView.tsx`).
5. Mark the file `'use client'` — every one of these components (the wrappers and raw `motion.*` elements) is client-only.

## Known issue: pre-animation overflow (`overflow-hidden` on every animated section)

**Problem:** on first load, the page has extra scrollable space — most visible as excess
horizontal scroll room on mobile, but it's really an overall document-overflow issue — that
shrinks back to normal as you scroll down and each section's reveal plays. By the time you reach
the bottom, the overflow is gone. This is the same issue oj-multimedia hit and fixed the same way;
recorded here so it isn't re-discovered (or re-"fixed" by masking the symptom, e.g. by disabling
animations) the next time it shows up.

**Cause:** `initial={{ opacity: 0, y: 50 }}` (or `x: ±20` for a slide) doesn't just hide an
element — `transform: translateY(50px)` visually paints it 50px away from its actual box, and
every element on the page mounts in this `initial` state immediately, whether or not it's near the
viewport yet (`whileInView` only decides *when* to animate to the rest state; it doesn't defer
mounting the `initial` one). A browser's scrollable area (`scrollWidth`/`scrollHeight`) is based on
the *painted* extent of descendants, not their layout boxes, so a transformed-away element inflates
its ancestor's scrollable area unless something in the ancestor chain clips it with
`overflow: hidden`. With every section's off-screen cards/rows contributing their translated offset
simultaneously on first paint, the document's total scrollable area is briefly larger than the real
content — and shrinks section by section as each one's elements settle to `transform: none` while
scrolling down.

Minimal repro (paste in a console): a 100px-wide box containing a child at
`transform: translateX(300px)` inflates `document.documentElement.scrollWidth` by the child's
full offset; setting `overflow: hidden` on the parent brings it right back down. Every
`FadeInUpWrap`/`FadeInUpCard`/hand-rolled `motion.li` instance in this repo is that child.

**Fix:** every section that contains a scroll animation gets `overflow-hidden` on its own
top-level element, so the transformed-but-not-yet-revealed descendants are clipped to that
section's box instead of leaking into the page's overall scrollable area:

- `TrustBarView.tsx`, `ValuePropView.tsx`, `FeaturesView.tsx`, `PricingView.tsx`, `FaqView.tsx` —
  added `overflow-hidden` to the section's className (either the hand-rolled `<section>`, or via
  `<SectionContainer className="...overflow-hidden">`).
- `HeroView.tsx` and `AppPreviewView.tsx` already had `overflow-hidden` (needed anyway for their
  full-bleed background images), so they were already covered before animations were added.
- `CtaView.tsx` gets it for free — `SectionContainer` already adds `relative overflow-hidden`
  automatically whenever `backgroundImageSrc` is passed, which CTA does.

If you add a new animated section, give its outer element `overflow-hidden` (or use
`SectionContainer`, which already does this whenever a `backgroundImageSrc` is set — otherwise add
`overflow-hidden` to its `className` yourself, same as Features/Pricing/FAQ/ValueProp above).
Don't rely on the body-level `overflow-x-hidden` in `app/layout.tsx` — that only masks horizontal
overflow at the document root and does nothing for the vertical `scrollHeight` inflation, which is
the actual root cause.

## Reduced motion

Handled once, at the splash-screen level (`components/general/LoadAnimationScreen.tsx`):
`window.matchMedia('(prefers-reduced-motion: reduce)')` short-circuits the splash and its
transition durations. The per-section `FadeInUpWrap`/`FadeInUpCard`/hand-rolled reveals do **not**
independently check `prefers-reduced-motion` — this matches oj-multimedia's actual behavior (its
`MotionContainers.tsx` doesn't check it either), not an oversight specific to this port. If that
ever needs tightening, `motion/react`'s `useReducedMotion()` hook is the addition point.

## Performance notes

- No `LazyMotion`/`domAnimation` bundling — the full `motion` package is imported directly, same
  as oj-multimedia.
- `viewport={{ once: true }}` everywhere means each element's scroll listener detaches after its
  first reveal — no ongoing scroll-tied work once a section has played.
- Card/list hover states (if added later) should default to CSS `transition`/`group-hover:` for
  simple opacity/scale changes, reserving `motion`'s `whileHover` for position/layout shifts — see
  oj-multimedia's `MusicCard.tsx` for the reference split (CSS for the image scale, `motion` for
  the container lift).
