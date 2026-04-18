
User uploaded a logo (Símbolo_Caminho_da_Luz.png) — appears blank/white in preview but is a real PNG asset. They want to replace the logos in the header (Navbar) and hero section with this image.

## Investigation needed
- Check `src/components/layout/Navbar.tsx` for current header logo
- Check `src/routes/index.tsx` for hero logo
- Find where current logo URL lives (likely the Cloudinary one from organizationSchema: `caminhodaluz/logo.png`)

## Plan

1. **Copy uploaded image** to `src/assets/logo-caminho-da-luz.png` via `lov-copy` (proper React asset bundling).
2. **Update Navbar** (`src/components/layout/Navbar.tsx`) — import the new asset and swap the `<img src>` of the logo.
3. **Update Hero on home** (`src/routes/index.tsx`) — swap the hero logo image to the new asset.
4. Keep `alt` text, sizing, and surrounding markup intact. Since the logo is white on transparent, it will continue to work over the dark navbar/hero backgrounds.

No changes to organizationSchema (that's structured data for SEO, separate concern — can revisit if user wants).

Files touched: `src/components/layout/Navbar.tsx`, `src/routes/index.tsx`, plus new `src/assets/logo-caminho-da-luz.png`.
