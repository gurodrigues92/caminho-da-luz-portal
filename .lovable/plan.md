
User wants me to test the 4 "Ver galeria" buttons end-to-end in the browser. This is an explicit testing request — browser tools are appropriate here.

## Plan

Switch to default mode and use browser automation to:

1. Navigate to home `/` at current viewport (1189×894)
2. Locate the gallery section (CasasSection / GaleriaPreview area) with the 4 "Ver galeria" buttons
3. For each casa (Sorocaba, São Paulo, Recife, Itararé):
   - Click "Ver galeria de {casa}"
   - Verify URL becomes `/{slug}/galeria` and the GaleriaCasa page renders with the heading "Galeria — {casa}" and the 6-photo grid
   - Click the first thumbnail → verify the lightbox Dialog opens with the enlarged image
   - Click the right chevron → verify navigation to next photo
   - Close the lightbox (Esc or X)
   - Navigate back to home
4. Capture a screenshot at a key step (e.g. lightbox open) for visual confirmation
5. Report a concise pass/fail summary per casa, noting any console errors observed

If a button fails to navigate or the lightbox doesn't open, stop, inspect the code, fix it, and report before continuing.

No code changes planned — this is read-only verification unless a bug surfaces.
