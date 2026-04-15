

## Comprehensive Corrections and Improvements — 6 Blocks

This is a large set of changes. I'll implement them in priority order across all blocks.

### BLOCO P0 — Critical Fixes

**1. Remove hardcoded Supabase credentials** (`src/lib/supabase.ts`)
- Remove fallback values, use only env vars, export `null` if missing

**2. Complete aniversariantes.json** (`public/data/aniversariantes.json`)
- Replace with the full 87-entry list provided (was 62, now 87 with the new additions)

**3. Add og:image to all routes**
- `index.tsx`, `sorocaba.tsx`, `sao-paulo.tsx`, `recife.tsx`, `itarare.tsx`, `sobre.tsx`, `faq.tsx`, `radio.tsx` — add og:image, og:type, og:url meta tags with the specified Cloudinary URLs

### BLOCO P1-A — Refactor Casa Pages into CasaPage Component

**1. Create `src/components/CasaPage.tsx`**
- Generic component accepting all config as props (nome, slug, trabalhos, eventos, galeriaFotos, whatsappPhone, etc.)
- Renders: Hero → Trabalhos → Clínica (conditional) → Calendário → Aniversariantes → Galeria → Maps (conditional) → CTA WhatsApp
- Extracts all the repeated patterns from the 4 casa routes

**2. Simplify each route file** (`sorocaba.tsx`, `sao-paulo.tsx`, `recife.tsx`, `itarare.tsx`)
- Each becomes ~30-50 lines: route export with head() + config object + `<CasaPage {...config} />`
- All existing content preserved exactly as-is via config objects

### BLOCO P1-B — Google Maps + Cloudinary Optimization

**1. Fix Google Maps embeds**
- Sorocaba: `https://www.google.com/maps?q=R.+Paulo+Varchavtchik,+365,+Brigadeiro+Tobias,+Sorocaba,+SP&output=embed`
- São Paulo: `https://www.google.com/maps?q=Rua+Medeiros+Furtado,+642,+Vila+Formosa,+São+Paulo,+SP&output=embed`
- Itararé: `https://www.google.com/maps?q=Rua+XV+de+Novembro,+156,+Centro,+Itararé,+SP&output=embed`
- Recife: no map (address pending)

**2. Add Cloudinary transformations to ALL image URLs**
- Heroes/large: `f_auto,q_auto,w_1200/`
- Cards/work images: `f_auto,q_auto,w_800/`
- Logo: `f_auto,q_auto,w_200/`
- Applied in `__root.tsx`, `index.tsx`, `CasaPage.tsx`, and all casa configs

### BLOCO P1-C — Integrate Supabase Hooks with Fallback

**1. Update `useCalendario.ts` and `useGaleria.ts`**
- Handle `supabase` being null (from P0 change)
- Return empty data gracefully when Supabase unavailable

**2. Update `EventCalendar.tsx`**
- Add optional `casa` prop to trigger `useCalendario` hook
- If Supabase returns data, use it; otherwise fall back to static `eventos` prop
- Add skeleton loading state

### BLOCO P2-A — SEO, Sitemap, Schema.org

**1. Create `public/sitemap.xml`** with all routes
**2. Create `public/robots.txt`**
**3. Add Schema.org Organization JSON-LD** to `__root.tsx` head scripts
**4. Add canonical URLs** to all route head() links arrays

### BLOCO P2-B — Cleanup & Performance

**1. WhatsApp FAB visible on all resolutions**
- Remove `md:hidden`, change to green `bg-[#25D366]` with white icon, responsive sizing

**2. iOS parallax fix** in `src/styles.css`

**3. CTA overlay fix** in `index.tsx`
- Change `bg-white/30` → `bg-black/40`, text colors back to light

**4. Reduce redundant animations**
- Remove individual `motion.div` whileInView from items inside already-animated sections

**5. Clean unused dependencies**
- Remove ~20 unused packages from package.json
- Delete corresponding unused UI component files from `src/components/ui/`

### BLOCO P3 — Extract Layout Components

**1. Create `src/components/layout/Navbar.tsx`**
**2. Create `src/components/layout/Footer.tsx`**
**3. Create `src/components/layout/WhatsAppFAB.tsx`**
**4. Simplify `__root.tsx`** to ~60 lines with imports

### Files Changed (summary)
- `src/lib/supabase.ts` — remove hardcoded credentials
- `public/data/aniversariantes.json` — complete 87-entry list
- `src/routes/index.tsx` — og:image, CTA fix, animation cleanup
- `src/routes/sorocaba.tsx` — refactored to use CasaPage
- `src/routes/sao-paulo.tsx` — refactored to use CasaPage
- `src/routes/recife.tsx` — refactored to use CasaPage
- `src/routes/itarare.tsx` — refactored to use CasaPage
- `src/routes/sobre.tsx` — og:image added
- `src/routes/faq.tsx` — og:image added
- `src/routes/radio.tsx` — og:image added
- `src/routes/__root.tsx` — Schema.org, Cloudinary opt, layout extraction
- `src/components/CasaPage.tsx` — new generic component
- `src/components/layout/Navbar.tsx` — extracted
- `src/components/layout/Footer.tsx` — extracted
- `src/components/layout/WhatsAppFAB.tsx` — extracted
- `src/components/EventCalendar.tsx` — Supabase integration + loading
- `src/hooks/useCalendario.ts` — null supabase handling
- `src/hooks/useGaleria.ts` — null supabase handling
- `src/styles.css` — iOS parallax fix
- `public/sitemap.xml` — new
- `public/robots.txt` — new
- `package.json` — remove unused deps
- Multiple `src/components/ui/*.tsx` — delete unused ones

### Hydration Error Fix
The React #418 error (hydration mismatch) will be addressed by fixing the CTA section overlay/text color inconsistency and ensuring consistent server/client rendering.

