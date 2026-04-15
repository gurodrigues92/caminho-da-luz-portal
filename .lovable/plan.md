

## Update Brand Colors: Green → Blue & Regenerate Hero Image

### Problem
Current color tokens use forest green (hue 155 in oklch). Caminho da Luz's actual brand colors are blue and white.

### Step 1: Update CSS Color Tokens in `src/styles.css`

Replace green-hued tokens with blue equivalents:

| Token | Current (green, hue ~155) | New (blue, hue ~250) |
|-------|--------------------------|----------------------|
| `--cdl-primary` | `oklch(0.28 0.05 155)` | `oklch(0.30 0.08 250)` — deep navy blue |
| `--cdl-primary-light` | `oklch(0.40 0.06 155)` | `oklch(0.45 0.10 250)` — medium blue |
| `--cdl-bg-dark` | `oklch(0.18 0.03 155)` | `oklch(0.18 0.04 250)` — dark navy |
| `--cdl-accent` | `oklch(0.52 0.14 40)` (terracotta) | Keep or shift to a lighter blue accent `oklch(0.55 0.12 240)` |

Keep `--cdl-secondary` (gold) and `--cdl-bg-light` (cream/white) as-is — they complement blue well.

Also update derived tokens that reference the green hue:
- `--sidebar-border: oklch(0.3 0.03 250)` (was 155)
- `--card`, `--border`, `--input` — keep neutral

### Step 2: Regenerate Hero Background Image

Replace `/public/images/bg/hero-main.jpg` with a new abstract image:
- Lighter overall tone
- Blue tones instead of green — soft gradients, light washes, ethereal
- Minimal abstract elements (light rays, subtle geometric forms)
- Spiritual/sacred atmosphere maintained

### Step 3: Update Memory

Update the design tokens memory to reflect blue instead of green.

### Files Changed
- `src/styles.css` — color token values
- `/public/images/bg/hero-main.jpg` — regenerated image
- `mem://design/tokens` and `mem://index.md` — updated brand color description

