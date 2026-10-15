# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Guests of Cristian & Priscila's wedding (Saturday, October 17, 2026, 2:30 p.m., Casa de Lago — Jardín de Eventos, Cuautitlán Izcalli). Family and friends of both sides, Spanish first with an English version. They open the site on their phones: before the wedding to RSVP and read the details, and on the day itself to get there and find their way around.

## Product Purpose
A single-page wedding invitation: announces the wedding, tells guests when and where, collects RSVPs, links the gift registry and shared photo album, and helps guests on the day (directions, itinerary, assigned table). Success means guests arrive informed and find what they need on their phone without asking the couple.

## Operating Context
- Guests mostly arrive through a personalized link (`?c=<clave>`) that identifies their family for the RSVP; some will open the plain site without it.
- On the wedding day, the site is used standing up, outdoors, on a phone, possibly with weak signal at the venue.
- Guest list, RSVPs and seating live in a Google Sheet maintained by the couple ("Familias", "Confirmaciones", "Mesas" tabs).

## Capabilities and Constraints
- RSVP backed by a Google Apps Script web app over the Google Sheet (`scripts/rsvp-apps-script.gs`).
- Seating (confirmed 2026-10-15): the "Mesas" tab lists groups of adults (first names, comma-separated, some names repeat across tables) and an integer assigned table (1–12). The seating finder uses only that tab, baked into the site at build time (updated by republishing). Anyone can look up a table by typing a name; no personal link required. Visible from publication, not only on the day. A venue floor plan exists and will be provided.
- Deploys to Cloudflare Pages only, on push to `master`.

## Brand Commitments
- Couple names: Cristian & Priscila (Cris & Pris), domain crisypris.com.
- Bilingual es/en; all copy lives in `src/content/content.js`.

## Product Principles
- Phone first: every guest task must be easy one-handed on a phone.
- No dead ends: when the site cannot identify a guest, it still offers a path (WhatsApp, search, directions).
- The couple can maintain it from the Google Sheet with minimal technical steps.

## Accessibility & Inclusion
Guests span all ages, including older relatives: large readable type, generous touch targets, body text contrast ≥ 4.5:1 (project convention).
