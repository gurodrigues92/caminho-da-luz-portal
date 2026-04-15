

## Generate AI Images for Work Type Cards

### Current State
6 unique work types across all casa pages. Some have Cloudinary photos, some have none:
- **Original** — has `original.jpg`
- **Sementes** — has `sementes.jpg`
- **Despertar** — has `estudos.jpg`
- **Florescer** — has `florescer.jpg`
- **Humano** — no image (shows placeholder)
- **Encontro Terapêutico** — no image (shows placeholder)

### Plan

**Step 1: Generate 6 images** using AI image generation (Nano banana 2 for quality + speed). Each image will be a spiritual/sacred atmosphere matching the work type:
- **Original** — Ayahuasca ceremony with candles, sacred circle, warm golden light
- **Sementes** — Intimate gathering, seeds/nature motifs, soft ambient lighting
- **Despertar** — Sunrise/awakening energy, meditation, ethereal light
- **Florescer** — Feminine energy, flowers blooming, soft pink/golden tones
- **Humano** — Masculine energy, grounding, earth tones, fire
- **Encontro Terapêutico** — Healing circle, therapeutic setting, calm blue/green tones

Style: Atmospheric, warm, spiritual, photographic quality. Dark forest greens and golden tones matching the site's palette.

**Step 2: Upload images** to `/public/images/trabalhos/` directory for use in the app.

**Step 3: Update all references** in:
- `src/routes/sorocaba.tsx` — Original, Sementes, Despertar, Florescer, Humano (5 cards)
- `src/routes/sao-paulo.tsx` — Original, Encontro Terapêutico (2 cards)
- `src/routes/recife.tsx` — Original (1 card)
- `src/routes/itarare.tsx` — Original, Sementes (2 cards)

Replace all Cloudinary URLs and placeholders with the new generated image paths.

