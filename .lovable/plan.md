

## Instituto Caminho da Luz — Full Website Build Plan

### Overview
Multi-location spiritual center website with dynamic calendar, photo gallery, and WhatsApp integrations. 5 phases building on each other.

---

### Phase 1: Foundation — Design System, Routes & Global Components

**Design System**
- Custom color tokens (forest green, gold, terracotta, cream) in `src/styles.css` replacing default shadcn theme
- Typography: Cormorant Garamond (headlines), Source Sans 3 (body), Josefin Sans (labels) via Google Fonts `<link>` in root shell
- Global styles: grain texture overlay, soft shadows, 12px border-radius, smooth scroll

**Routes** (TanStack Start file-based routing):
- `/` → Homepage
- `/sorocaba`, `/sao-paulo`, `/recife`, `/itarare` → Casa pages
- `/sorocaba/galeria`, `/sao-paulo/galeria`, etc. → Gallery pages
- `/$casa/galeria/$trabalho` → Filtered gallery
- `/sobre`, `/faq`, `/radio` → Institutional pages

**Global Components**
- **Navbar**: Dark bg, logo, dropdown for Casas, sticky, mobile Sheet menu
- **Footer**: 4-column layout with logo, casa links, WhatsApp, social links
- **WhatsAppFAB**: Floating button, mobile-only, links to Sorocaba WhatsApp

---

### Phase 2: Homepage (Hub)

6 sections in order:
1. **Hero**: Fullscreen with parallax background, logo, "Caminho da Luz" headline, gold subtitle, dirigente quote, animated scroll arrow
2. **Nossas Casas**: Grid of 4 cards (Sorocaba spans full width as "SEDE PRINCIPAL"), each with background image, address, social icons, hover scale effect, staggered fade-in
3. **O Caminho da Luz**: Dark section, 2-column layout with Pedrão photo + institute description text + "Desde 2014" badge
4. **Missão, Visão e Valores**: 3 cards with SVG icons, transparent bg with subtle border
5. **Nossa Rádio**: Dark section with Spotify playlist embed (max-width 600px)
6. **CTA Final**: Background image with overlay, WhatsApp button (gold), anamnese PDF download link

All sections with Framer Motion fade-in-from-bottom on scroll.

---

### Phase 3: Sorocaba Page (Template for all Casas)

**Reusable components created here:**
- `TrabalhoCard` — Work type card (image, description, schedule, price, badge)
- `EventCalendar` — Upcoming events list with date, type badge, WhatsApp button
- `GaleriaPreview` — 6-photo grid preview with link to full gallery

**Sorocaba sections:**
1. Hero with "SEDE PRINCIPAL" badge, address, social icons
2. 5 work types: Original (highlighted), Sementes, Despertar, Florescer, Humano
3. Clínica section (dark bg, terracotta border, condition tags, WhatsApp CTA)
4. Calendar (hardcoded initially, 6 upcoming events)
5. Gallery preview (6 photos) + full gallery page at `/sorocaba/galeria` with work-type filter tabs and lightbox
6. Google Maps embed
7. WhatsApp CTA + anamnese link

---

### Phase 4: Remaining Pages

**Casa pages** (reusing Phase 3 components with different data):
- **São Paulo**: Original + Encontro Terapêutico, Vila Formosa address
- **Recife**: Original only, "calendário em breve" placeholder
- **Itararé**: Original + Sementes, hardcoded calendar

Each with gallery routes (`/[casa]/galeria` and `/[casa]/galeria/$trabalho`).

**Institutional pages:**
- **Sobre** (`/sobre`): History, Missão/Visão/Valores, Decálogo do Estrelado, anamnese download
- **FAQ** (`/faq`): 14 questions in ShadCN Accordion, FAQPage schema.org markup
- **Rádio** (`/radio`): Spotify embed (large) + YouTube channel embed

---

### Phase 5: Supabase Self-Hosted Integration

**Manual Supabase client** (NOT Lovable Cloud — self-hosted at `api.supabase.altavance.media`):
- `src/lib/supabase.ts` with provided URL and anon key
- Environment variables via `.env`

**Dynamic data hooks:**
- `useCalendario(casa, limit)` → fetches future confirmed events from `calendario` table
- `useGaleria(casa, trabalhoSlug)` → fetches events with photos from `eventos` + `evento_fotos` tables

**Updates:**
- `EventCalendar` switches to Supabase data with hardcoded fallback
- New `FotoGaleria` component with masonry grid, work-type filter tabs synced to URL, lightbox navigation
- Loading skeletons and empty states throughout

**Tracking (per workspace SOP):**
- `gatherTrackingData()` utility capturing `_fbp`, `_fbc`, `gclid`, user agent, page URL
- All WhatsApp CTA clicks and form submissions send webhook payload with `lead_data`, `tracking_data`, `metadata` blocks

---

### Dependencies Needed
- `framer-motion` (scroll animations)
- `@supabase/supabase-js` (database client)
- Google Fonts loaded via `<link>` tags in root shell

