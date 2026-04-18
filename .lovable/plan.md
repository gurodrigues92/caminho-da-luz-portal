

## Resumo

Conectar a galeria ao Supabase via hook `useGaleria` (já existente), adicionar filtro por tipo de trabalho com deep-link, agrupar fotos por evento/data, e remover todo o placeholder estático. Zero integração com Google Drive — isso é responsabilidade do n8n externo.

## Arquitetura

```
URL: /sorocaba/galeria              → todos eventos
URL: /sorocaba/galeria/original     → filtrado por trabalho
            ↓
GaleriaCasa(casaSlug, trabalhoSlug?)
            ↓
useGaleria(casa, trabalhoSlug, limit)
            ↓
Supabase: eventos + evento_fotos
```

## Mudanças

### 1. `src/components/GaleriaCasa.tsx` (refatorar)
- Nova assinatura: `{ casa, casaSlug, trabalhoSlug? }`
- Usa `useGaleria(casaSlug, trabalhoSlug ?? null)`
- **Tabs/pills de filtro** no topo: "Todos" + um pill por `tipo_trabalho` retornado pelo hook. Clicar navega via `useNavigate` para `/[casaSlug]/galeria` ou `/[casaSlug]/galeria/[slug]`. Pill ativo: `bg-cdl-primary text-cdl-text-light`; inativo: `border border-cdl-primary/20 text-cdl-text-muted`
- **Renderização agrupada por evento**: cada evento vira um card com:
  - Header: data formatada em pt-BR ("11 de abril de 2026") + badge colorido do tipo (mapa de cores: Original→cdl-primary, Sementes→cdl-secondary, Despertar→cdl-accent, Florescer→pink-500, Humano→cdl-primary, Fogueira→orange-500, Clínica→cdl-accent, Encontro Terapêutico→cdl-secondary)
  - Grid 2/3/4 cols de thumbnails (usar `url_thumbnail ?? url_imagem`)
  - Click em thumb abre lightbox **dentro do escopo do evento** (state `{ eventoIdx, fotoIdx }`)
- **Lightbox**: navegação com setas circula apenas pelas fotos do evento ativo
- **Estados**:
  - Loading: 3 skeleton cards (`<Skeleton>` shimmer da UI lib)
  - Empty sem filtro: "Galeria em breve. Acompanhe nosso Instagram." com link
  - Empty com filtro: "Nenhum registro de [tipo] ainda. Ver todas as fotos." com link
  - Erro: "Não foi possível carregar a galeria. Tente novamente em instantes."
- Remover export de `PLACEHOLDER_FOTOS`

### 2. `src/components/GaleriaPreview.tsx` (refatorar)
- Nova assinatura: `{ casa, casaSlug }` (remove `fotos`)
- Usa `useGaleria(casaSlug, null, 6)`
- Achata `eventos.flatMap(e => e.fotos).slice(0, 6)` para ter até 6 thumbs no preview
- Se `eventos.length === 0` → retorna `null` (some a seção)
- Loading: 6 skeletons no grid
- Botão "Ver galeria completa" preservado

### 3. Rotas existentes — atualizar (4 arquivos)
`sorocaba_.galeria.tsx`, `sao-paulo_.galeria.tsx`, `recife_.galeria.tsx`, `itarare_.galeria.tsx`:
- Remover import de `PLACEHOLDER_FOTOS`
- Passar apenas `casa` + `casaSlug` para `<GaleriaCasa>`

### 4. Rotas novas com filtro — criar (4 arquivos)
- `src/routes/sorocaba_.galeria.$trabalho.tsx`
- `src/routes/sao-paulo_.galeria.$trabalho.tsx`
- `src/routes/recife_.galeria.$trabalho.tsx`
- `src/routes/itarare_.galeria.$trabalho.tsx`

Cada uma lê `params.trabalho` via `Route.useParams()` e passa como `trabalhoSlug`. `head()` dinâmico com o nome do trabalho no title.

### 5. Páginas das casas — limpar prop `fotos`
Em `src/routes/sorocaba.tsx`, `sao-paulo.tsx`, `recife.tsx`, `itarare.tsx`:
- Remover `fotos={PLACEHOLDER_FOTOS}` de `<GaleriaPreview>`
- Remover import órfão de `PLACEHOLDER_FOTOS`

### 6. routeTree.gen.ts
Auto-regenerado pelo Vite plugin ao salvar — não editar manualmente.

## Restrições respeitadas
- ✅ Zero código Google Drive / OAuth / googleapis
- ✅ `useGaleria.ts` e `lib/supabase.ts` intocados
- ✅ Design system `cdl-*` preservado
- ✅ Sem UI de upload no site

## Arquivos
**Editar:** `src/components/GaleriaCasa.tsx`, `src/components/GaleriaPreview.tsx`, `src/routes/sorocaba_.galeria.tsx`, `src/routes/sao-paulo_.galeria.tsx`, `src/routes/recife_.galeria.tsx`, `src/routes/itarare_.galeria.tsx`, `src/routes/sorocaba.tsx`, `src/routes/sao-paulo.tsx`, `src/routes/recife.tsx`, `src/routes/itarare.tsx`
**Criar:** `src/routes/sorocaba_.galeria.$trabalho.tsx`, `src/routes/sao-paulo_.galeria.$trabalho.tsx`, `src/routes/recife_.galeria.$trabalho.tsx`, `src/routes/itarare_.galeria.$trabalho.tsx`

