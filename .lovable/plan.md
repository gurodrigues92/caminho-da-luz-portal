

## Pedido
Adicionar efeito "Aurora" (luzes animadas em degradê) ao fundo da hero da home, **mantendo a imagem de fundo atual** por baixo. Texto e elementos da hero ficam intactos.

## Investigação
Preciso confirmar a estrutura atual da hero da home.
- Tailwind v4 (CSS-first via `src/styles.css`) — não há `tailwind.config.js`. Keyframes e animações vão direto no `@theme` do CSS.
- Projeto já tem `cn` em `src/lib/utils.ts` e usa `framer-motion`.

## Adaptações necessárias ao snippet original
1. **Tailwind v4**: ignorar o `tailwind.config.js` proposto. Adicionar o keyframe `aurora` e a animação no `src/styles.css` via `@theme` + `@keyframes`.
2. **Componente `AuroraBackground`**: o snippet veio truncado/quebrado (JSX vazio). Reconstruir baseado no padrão original do Aceternity UI:
   - Wrapper relativo
   - Camada interna com gradientes cônicos animados (`--white-gradient`, `--dark-gradient`, `--aurora`) usando CSS vars locais
   - Filtro de blur + máscara radial opcional
3. **Manter imagem de fundo**: NÃO usar `AuroraBackground` como container substituto. Em vez disso, sobrepor o efeito aurora **entre** a `background-image` e o overlay escuro existente, com `mix-blend-mode` (lighten/screen) e opacidade reduzida para integrar com a foto.

## Estrutura final da hero (home)
```
<section relative>
  <div bg-image absolute inset-0 />          ← imagem atual mantida
  <AuroraLayer absolute inset-0 />           ← novo: luzes animadas
  <div bg-black/50 absolute inset-0 />       ← overlay escuro existente
  <motion.div relative z-10>texto/CTAs</>    ← intacto
</section>
```

A camada Aurora terá `mix-blend-screen` + `opacity-60` para somar luz à foto sem apagá-la.

## Mudanças

### 1. `src/styles.css`
Adicionar dentro do `@theme`:
```css
--animate-aurora: aurora 60s linear infinite;
```
E fora do `@theme`:
```css
@keyframes aurora {
  from { background-position: 50% 50%, 50% 50%; }
  to   { background-position: 350% 50%, 350% 50%; }
}
```

### 2. `src/components/ui/aurora-background.tsx` (novo)
Componente reutilizável que renderiza apenas a camada de luzes (sem wrapper de página inteira), aceitando `className` para posicionamento absoluto:
- Usa CSS vars com gradientes lineares para cores brancas e cores aurora (azul/roxo/violeta — alinhado ao branding `cdl-primary` azul)
- Dois pseudo-elementos (`::after` via div extra) com `background-image` combinando `--white-gradient` + `--aurora`, `background-size: 300%`, `filter: blur(10px)`, animação `animate-aurora`
- Prop `showRadialGradient` aplica `[mask-image:radial-gradient(...)]` para suavizar bordas

Exporta também uma versão `<AuroraLayer />` minimal (apenas a camada) para usar como overlay sem ser o wrapper raiz.

### 3. `src/routes/index.tsx`
Localizar a `<section>` da hero (primeira seção com `bg-cover`/`backgroundImage`) e inserir `<AuroraLayer className="absolute inset-0 mix-blend-screen opacity-60 pointer-events-none" />` entre a div da imagem e a div do overlay preto. Texto/CTAs permanecem inalterados.

## Cores da aurora
Para combinar com a paleta azul do projeto (`cdl-primary` azul, `cdl-secondary` dourado), usar gradientes em tons de:
- azul claro `#3b82f6`
- azul violeta `#6366f1`
- ciano suave `#22d3ee`
- branco `#ffffff` (highlights)

## Arquivos
**Criar:** `src/components/ui/aurora-background.tsx`
**Editar:** `src/styles.css` (keyframe + animation token), `src/routes/index.tsx` (inserir camada na hero)

## Restrições respeitadas
- Tailwind v4 (sem `tailwind.config.js`)
- Sem novas dependências (`framer-motion`, `cn` já existem)
- Imagem de fundo atual preservada
- Texto e CTAs da hero intocados

