# DESIGN — single source of truth

Chosen inspiration aspect (user): **palette derived from the hero video** (`public/8.1-invideo-seedance_2_0.mp4`) — a warm anime-style golden-hour romance arc: ocean sunset (amber sun, peach clouds, soft sea) → sunflower field (sunflower gold, leaf green, sky blue) → twilight embrace (deep dusk blue, warm town lights, stars). The page reads as that arc: warm sunlit cream sections, twilight-blue dark sections, sunflower-amber as the star accent, leaf green as secondary. All key text/bg pairs verified ≥4.5:1 (WCAG AA). Single source of truth for values is `src/index.css @theme`.

## Palette
Values are pulled **directly from the video frames** (the 7-toma extraction kept as a reference comment atop `src/index.css`), then chosen so every text/bg pair clears WCAG AA. 7ma toma = the twilight/night shots → dark surfaces; 1ra toma sand → cream; 3ra/5ta tomas → the green + gold accents.

| Token | Hex | Toma | Use |
|---|---|---|---|
| `night` | `#0B2740` | 7ma | dark section bg (deep twilight navy, never flat #000) |
| `night-deep` | `#0D2426` | 7ma | teal-near-black opening (Story) — the page descends through the arc |
| `night-soft` | `#123A5C` | 7ma | dark elevated surface / button hover |
| `cream` | `#ECDCC0` | 1ra | light section bg (warm sand, softened so dark→light transitions don't glare) |
| `cream-soft` | `#E3CDA6` | — | light cards/surfaces (deeper warm sand) |
| `ink` | `#1C2422` | 7ma | text on cream (≈11.8:1) |
| `linen` | `#F0E7D5` | 1ra | text/elements on night (≈12.4:1) |
| `sage` | `#BACD84` | 3ra | leaf-green accent on dark: eyebrows, icons (≈8.8:1) |
| `moss` | `#4C5A2A` | 5ta | olive-green text/icons on cream (≈5.5:1) |
| `gold` | `#E2C758` | 3ra | sunflower amber: CTAs, countdown numerals, date. Dark surfaces only (≈9.1:1 on night); never gold text on cream |

Bright daytime tomas (sky `#3A9AE6`, peach `#FFC07D`, rose `#DFA79E`, lilac `#A28EBF`) are held in reserve as per-section accents — all clear ≥5:1 on `night`, not yet wired in.

**Per-section surfaces:** each section's bg+text lives in `src/index.css` (`@layer components` → `.surface-historia`, `.surface-ceremonia`, …), not as `bg-*`/`text-*` utilities in the JSX. Recolor a section — or make one differ from the rest — by editing its one line in index.css; never touch the component.

Dress-code swatches: 4 placeholders defined in content file (`#536878`, `#7B5B45`, `#5C6B4F`, `#8E5A63`) — couple swaps hexes + names later.

## Typography
- Display: **Fraunces** (Google Fonts, 1 weight: 400 + italic axis off, `latin` subset only) — large centered headlines, couple names, section titles.
- Body/UI: system sans stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`) — zero font bytes for body. Bad-cellular constraint wins over a second webfont.
- Eyebrows: 11px uppercase tracking-[0.2em] sage/moss.
- Scale (mobile-first): h1 clamp(2.5rem→4.5rem), h2 clamp(1.75rem→2.5rem), body 16px.

## Section rhythm (alternating, from inspiration)
1. **Hero** — perplexity register, venue-matched (user, 2026-06-12; pixel hero archived at git tag `pixel-garden-hero` + `~/personal-projects/saved-components/`): full-bleed golden-hour calm-lake photo with green treeline + open sky (Unsplash 1599707647972, free license — chosen to echo the real venue's lake; WebP 1800w desktop + 820×1460 portrait crop mobile via `<picture>`), vignette scrim + desktop text-spot scrim + bottom fade into `night`, 24s `slow-breathe` zoom. **Scroll motion (user loves parallax):** background drifts at 0.1× scroll, content lifts at -0.12× and fades out, animated scroll cue chevron — all rAF, all inside `prefers-reduced-motion: no-preference`. Centered serif block: italic announce, huge Fraunces names, invite line, gold date between sage rules, venue line, cream solid RSVP pill + frosted directions pill, fine-print deadline.
2. **Countdown** — night, gold numerals strip
3. **Nuestra historia** — cream: 5 moments, vertical timeline, photo placeholder frames
4. **Ceremonia** — night: when/where card, tappable map button (geo pin), address
5. **Dress code** — cream: "Formal" + 4 swatch circles
6. **RSVP** — cream emphasis card: deadline Sep 1 2026, embedded Google Form (lazy iframe), fallback link
7. **Mesa de regalos** — night: presence-is-the-gift line + Amazon button
8. **Hospedaje** — cream: hotel placeholder cards
9. **Footer** — night: names, date, WhatsApp link, ES/EN toggle also in nav

## Components
- Frosted glass: `bg-white/10 backdrop-blur-md ring-1 ring-white/15` over dark only
- Buttons: pill radius-full; primary = glass on dark / night-solid on cream
- Language toggle: fixed top-right pill "ES | EN", persists in localStorage
- Sticky bottom RSVP bar on mobile after scrolling past hero

## Motion
Soft fade-up on section entry via IntersectionObserver adding a class — content fully visible without JS/animation (visible-by-default rule). Hero gets rAF parallax (bg 0.1×, content -0.12× + fade); later sections may use gentle parallax accents — user explicitly loves parallax/scroll animations (2026-06-12). `prefers-reduced-motion: reduce` disables all. No bounce.

## Performance budget
- Raster only in hero: one WebP per viewport (~270KB desktop / ~225KB mobile), `fetchpriority=high`. No other decorative rasters.
- Google Form iframe lazy-loaded on approach.
- One webfont family, one weight, subset. Total JS < 100KB gz.
