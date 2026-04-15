

## Replace Cloudinary Anamnese PDF with Local File

### What Changes

**Step 1:** Copy the uploaded PDF to the project's public directory:
`user-uploads://Anamnese_Formulário.pdf` → `public/docs/Anamnese_Formulario.pdf`

**Step 2:** Update all 3 Cloudinary links across the codebase to point to `/docs/Anamnese_Formulario.pdf`:

| File | Line(s) |
|------|---------|
| `src/routes/sobre.tsx` | Line 112 |
| `src/routes/sorocaba.tsx` | Line 210 |
| `src/routes/index.tsx` | Line 314 |

### Also Fix
Hydration mismatch error in `index.tsx` — a class name difference (`text-cdl-text/85` vs `text-cdl-text-light/85`) between server and client render. Will normalize to one value.

