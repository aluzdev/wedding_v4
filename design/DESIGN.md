# DESIGN — single source of truth

Chosen inspiration aspect (user): **dark botanical + cream** from perplexity.ai/personal-computer (see INSPIRATION.md). Venue photos show garden lawn, white tents, mature trees, late-golden light — the dark-botanical register matches the real place at dusk.

## Palette
| Token | Hex | Use |
|---|---|---|
| `night` | `#141711` | dark section bg (warm green-black, never flat #000) |
| `night-soft` | `#1d211b` | dark cards/surfaces |
| `cream` | `#FBF9F4` | light section bg (warm paper) |
| `cream-soft` | `#F1EDE3` | light cards/surfaces |
| `ink` | `#27251E` | text on cream |
| `linen` | `#EFEBE0` | text on night |
| `sage` | `#8A9B7C` | accent on dark: eyebrows, rules, icons |
| `moss` | `#5C6B4F` | accent on cream |
| `gold` | `#C5A572` | sparing: countdown numerals, date highlight |

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
