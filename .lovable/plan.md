

## Recreate Hero Images in Blue Tones + Adjust Home Hero Style

### What Changes

**1. Regenerate 4 casa hero background images** (`/public/images/bg/`) replacing green-toned abstracts with blue-toned ones:
- `hero-main.jpg` — lighter, ethereal blue abstract (less dark overlay, more visible)
- `hero-sp.jpg` — blue abstract for São Paulo
- `hero-recife.jpg` — blue abstract for Recife
- `hero-itarare.jpg` — blue abstract for Itararé

All images: abstract, minimal elements, blue/white palette, spiritual atmosphere.

**2. Adjust Home Hero section** (`src/routes/index.tsx`):
- Reduce the dark overlay from `bg-black/50` to `bg-black/20` so the lighter background shows through more
- Change heading text color from white (`text-cdl-text-light`) to blue (`text-cdl-primary`)
- Change logo tinting or keep as-is if already blue
- Adjust the gold/yellow subtitle (`text-cdl-secondary`) — darken the `--cdl-secondary` token from `oklch(0.72 0.12 85)` to a deeper amber like `oklch(0.58 0.12 75)` (darker, warmer gold)

**3. Update `--cdl-secondary` in `src/styles.css`** to a deeper amber/gold tone.

### Files Changed
- `/public/images/bg/hero-main.jpg` — regenerated (light blue abstract)
- `/public/images/bg/hero-sp.jpg` — regenerated (blue abstract)
- `/public/images/bg/hero-recife.jpg` — regenerated (blue abstract)
- `/public/images/bg/hero-itarare.jpg` — regenerated (blue abstract)
- `src/routes/index.tsx` — hero overlay + text color adjustments
- `src/styles.css` — `--cdl-secondary` darker gold

