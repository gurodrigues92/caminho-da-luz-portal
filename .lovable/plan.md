

## Add Aniversariantes to Home + All Casa Pages + Update CTA Section

### 1. Fetch all 62 records from Notion and update `public/data/aniversariantes.json`

The current JSON has only 25 entries. I'll fetch all pages from the Notion "Estrelados Aniversariantes" database (62 records) and rebuild the JSON with complete data. Each record has: Nome, Dia, Mes, Casa.

The Notion DB uses month names (Janeiro, Fevereiro...) which need mapping to numbers, and Casa values (Sorocaba, São Paulo, Recife, Itararé) stay as-is.

### 2. Add `AniversariantesDoMes` to Home page (`src/routes/index.tsx`)

Add `<AniversariantesDoMes />` (without `casa` prop) between `GaleriaHomeSection` and `CTASection`. Without a `casa` prop, the component already shows all casas (the existing filter logic handles `!casa` by showing all). It will display the casa name next to each entry.

### 3. Add `AniversariantesDoMes` to all casa pages

Add the component with the corresponding `casa` prop to:
- `src/routes/sorocaba.tsx` — `casa="Sorocaba"` (already there)
- `src/routes/sao-paulo.tsx` — `casa="São Paulo"`
- `src/routes/recife.tsx` — `casa="Recife"`
- `src/routes/itarare.tsx` — `casa="Itararé"`

Position: between Galeria and CTA WhatsApp sections on each page.

### 4. Update CTA section in `src/routes/index.tsx`

- Generate `/public/images/bg/cta-section.jpg` — light blue/white ethereal abstract
- Change overlay from `bg-black/60` to `bg-white/30`
- Change text colors: headings and body from light to dark (`text-cdl-text`, `text-cdl-text-muted`)
- Update anamnese link hover to `hover:text-cdl-text`

### Files Changed
- `public/data/aniversariantes.json` — updated with all 62 Notion records
- `src/routes/index.tsx` — add AniversariantesDoMes + update CTA section
- `src/routes/sao-paulo.tsx` — add AniversariantesDoMes
- `src/routes/recife.tsx` — add AniversariantesDoMes
- `src/routes/itarare.tsx` — add AniversariantesDoMes
- `/public/images/bg/cta-section.jpg` — regenerated light blue abstract

