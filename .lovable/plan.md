

## Problema

O efeito Aurora está quase invisível na hero. Causas prováveis (sem precisar inspecionar mais — código já está em contexto):

1. **`mix-blend-screen` + `opacity-70`** sobre uma imagem clara/média = efeito apaga. `screen` só clareia onde já tem cor escura; em fotos médias os tons azuis somem.
2. **`opacity-60` interna** no componente + **`blur-[10px]`** muito forte = cores diluem.
3. **Máscara radial** `radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)` concentra o efeito só no canto superior direito — 70% da hero fica sem aurora.
4. **`mix-blend-difference`** no `::after` inverte cores e neutraliza saturação quando combinado com screen externo.

## Solução

Aumentar visibilidade em duas camadas — no componente e na aplicação:

### 1. `src/components/ui/aurora-background.tsx`
- Subir `opacity-60` → `opacity-100` na camada interna
- Reduzir `blur-[10px]` → `blur-[8px]` (mantém suavidade sem apagar)
- Saturar mais as cores aurora: trocar paleta para tons mais vivos (`#60a5fa`, `#818cf8`, `#22d3ee`, `#c4b5fd`, `#3b82f6`)
- Trocar `mix-blend-difference` do `::after` por `mix-blend-screen` (somar luz em vez de inverter)
- Tornar `showRadialGradient` opcional já existe — vamos passar `false` na hero pra cobrir a área inteira (ou usar máscara mais ampla)

### 2. `src/routes/index.tsx` (uso na hero)
- `mix-blend-screen` → `mix-blend-soft-light` ou remover blend e usar opacidade direta (mais visível em fotos médias)
- `opacity-70` → `opacity-90`
- Passar `showRadialGradient={false}` para cobrir a hero inteira
- Opcional: escurecer um tiquinho mais o overlay preto (`bg-black/20` → `bg-black/30`) para contrastar com as luzes mais vivas e manter legibilidade do texto

## Resultado esperado
Luzes azul-violeta-ciano visíveis fluindo por trás do conteúdo da hero, sobrepostas à foto, com movimento suave da animação `aurora`. Texto e CTAs continuam legíveis pelo overlay escuro.

## Arquivos
**Editar:** `src/components/ui/aurora-background.tsx`, `src/routes/index.tsx`

