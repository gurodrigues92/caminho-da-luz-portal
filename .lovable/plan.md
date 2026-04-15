

## Three Changes: WhatsApp FAB Color, Gallery Section on Home, Birthday Section on Sorocaba + Notion DB

### 1. WhatsApp FAB — Change green to gold/secondary color

In `src/routes/__root.tsx`, change the WhatsApp FAB background from `bg-[#25D366]` to `bg-cdl-secondary` (the site's gold/amber color). Also update the SVG fill to dark (`fill-cdl-bg-dark` or similar) for contrast on gold.

### 2. Add Gallery Preview section on Home page

Add a new section to `src/routes/index.tsx` (between RadioSection and CTASection) showing a grid of recent event photos from all casas with links to each casa's gallery. Will use the existing `useGaleria` hook to fetch recent photos from Supabase, or a simpler static approach showing curated photos from each casa with "Ver galeria" links.

### 3. Birthday celebrants section on Sorocaba page + Notion database

**Step A — Create Notion database** with columns:
- Nome (title)
- Data de Aniversário (date)
- Casa (select: Sorocaba, São Paulo, Recife, Itararé)

This gives you a manageable place to add/edit birthday data.

**Step B — Fetch from Notion in the app**: Since the Notion MCP is connected, we can query the database. However, for the website to display this data dynamically at runtime, we need an approach that works without server-side Notion API calls (Worker runtime). Options:
- **Recommended**: Create a simple static JSON file (`public/data/aniversariantes.json`) that you periodically export from Notion. The Sorocaba page reads this file and filters by current month.
- **Alternative**: Use a Supabase table `aniversariantes` and sync from Notion.

**Step C — UI Component**: Add an `AniversariantesDoMes` section on the Sorocaba page showing birthday celebrants for the current month with a celebratory design — star icons, gold accents, names displayed in cards.

### 4. Fix hydration mismatch

The hydration error in CasasSection comes from `aspect-[16/9] md:aspect-[21/9]` — Tailwind's arbitrary values with `/` can conflict with oklch color opacity syntax. Will normalize these class names.

### Files Changed
- `src/routes/__root.tsx` — WhatsApp FAB color
- `src/routes/index.tsx` — new GaleriaSection + hydration fix
- `src/routes/sorocaba.tsx` — new AniversariantesDoMes section
- `src/components/AniversariantesDoMes.tsx` — new component
- `public/data/aniversariantes.json` — birthday data file
- Notion — create "Aniversariantes" database

