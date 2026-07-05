# PRODUCT — Boda Cris & Pris

## What it is
Single-page wedding site for Cris & Pris — October 10, 2026, 5:00 pm ceremony, Casa de Lago (Jardín de Eventos), Cuautitlán Izcalli, Estado de México. Shared as one link over WhatsApp.

## Users
- ~95% Mexican guests, Spanish, opening on phones from WhatsApp, often on bad cellular. Mobile-first is the experience, not a breakpoint.
- ~5% US friends → full English toggle. Spanish default.

## Job hierarchy (in order)
1. RSVP via embedded Google Form (deadline Sep 1, 2026) — primary CTA everywhere
2. Where & when (venue, address, tappable directions to pin 19.6188061,-99.250275)
3. Dress code: formal, 4 color swatches (placeholders, TBD)
4. Registry: Amazon México wishlist (presence is the gift framing)
5. Hotels nearby (placeholder cards)
6. Our story (~5 moments, photo placeholders)
7. Countdown to the day
8. WhatsApp contact link (number = placeholder for now)

## Register / personality
Calm luxury, warm, personal. A quiet garden evening, not a glitter template. Spanish copy written naturally (not translated-sounding); English mirrors it.

## Constraints
- Static only, free hosting (Vercel). No backend, no subscriptions.
- All editable content (copy, photos, hotels, dress colors, WhatsApp number, form URL) lives in `src/content/` — couple edits data files, never components.
- Fast on bad mobile data: no heavy images for decoration, system-light font loading, lazy embeds.

## Anti-references
- Generic wedding templates: script-font overload, gold glitter, pastel clutter, stock ring photos
- Anything that hides the RSVP below fluff
