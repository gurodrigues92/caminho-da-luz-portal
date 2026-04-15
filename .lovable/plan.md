

## Move Gallery Section to Second Position on Home Page

### What Changes

Reorder sections in `HomePage` so `GaleriaHomeSection` comes right after `HeroSection` (before `CasasSection`).

Also fix the hydration mismatch error by replacing `aspect-video md:aspect-[21/9]` with a safe class in `CasasSection`.

### New Order
1. HeroSection
2. **GaleriaHomeSection** (moved up from position 6)
3. CasasSection
4. AboutSection
5. MissaoSection
6. RadioSection
7. AniversariantesDoMes
8. CTASection

### Files Changed
- `src/routes/index.tsx` — reorder sections + fix hydration class

