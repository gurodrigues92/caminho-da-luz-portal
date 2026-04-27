## Pedido

Quatro ajustes pequenos relacionados a affordance/legibilidade nos cards da home:

1. **Galeria de Fotos da home** — unificar a grade de 3 thumbs com o link "Ver galeria de {casa}" num único elemento que pareça um botão (com bordas, padding, hover).
2. **Cards grandes de cada cidade** (Sorocaba, São Paulo, Recife, Itararé) — quando o card entrar na viewport, mostrar um ícone que sinalize "toque aqui", reforçando que o card todo é clicável (importante no mobile, onde não existe hover).
3. **Botão "Ver canal completo no YouTube"** — o hover atual deixa o texto branco e perde contraste; corrigir para manter o azul da marca.
4. **Cards de vídeo do YouTube** — trocar o círculo amarelo (`bg-cdl-secondary`) do play por **branco**, mantendo o ícone escuro no centro.

## Mudanças por arquivo

### `src/routes/index.tsx`

**`GaleriaHomeSection` (linhas ~385-430)** — colapsar grade + link num único `<Link>` estilizado como card-botão:
- Envolver as 3 thumbs e o texto "Ver galeria de {casa} →" dentro de um único `<Link>` com:
  - `border border-cdl-primary/20`, `rounded-2xl`, `p-3` (cria a moldura visual de botão).
  - `hover:border-cdl-primary`, `hover:shadow-lg`, `hover:-translate-y-0.5` (feedback interativo).
  - `bg-white` (separa do fundo `bg-cdl-bg-light`).
- O texto do CTA vira a "barra inferior" do card, dentro da mesma borda.
- Remover o segundo `<Link>` redundante.

**`CasasSection` (linhas ~199-249)** — adicionar indicador de toque animado por card:
- Importar `MousePointerClick` (ou `Hand`) do `lucide-react`.
- Dentro de cada card, no canto superior direito da imagem, adicionar um badge circular pequeno com o ícone:
  - Posicionado `absolute top-3 right-3 z-20`, `bg-white/90`, `rounded-full`, `p-2`, `shadow-md`.
  - Aparece com fade+pulse via `motion.div` quando `whileInView` dispara (animação `animate={{ opacity: [0, 1, 1], scale: [0.5, 1.1, 1] }}` com `transition={{ duration: 1.2 }}`).
  - Em telas md+, esconde no hover do grupo (`md:group-hover:opacity-0`) — no mobile permanece como pista visual.
  - `pointer-events-none` para não bloquear o link.

### `src/components/UltimosVideosSection.tsx`

**Círculo de play (linhas ~93-95)**:
- Trocar `bg-cdl-secondary/95 text-cdl-bg-dark` → `bg-white/95 text-cdl-primary` (círculo branco, ícone azul da marca para manter identidade).
- Manter `shadow-lg` e `group-hover:scale-110`.

**Botão "Ver canal completo" (linhas ~104-114)**:
- Remover o problema de contraste no hover. O `Button` `variant="outline"` do shadcn aplica `hover:text-accent-foreground` que pode forçar branco; sobrescrever com `hover:text-cdl-primary` explícito na className para garantir que o texto continue azul no hover.
- Classe final: `border-cdl-primary text-cdl-primary bg-transparent hover:bg-cdl-primary/10 hover:text-cdl-primary rounded-full text-xs`.

### `src/components/GaleriaPreview.tsx` (páginas internas das casas)

Mesma correção de hover do botão "Ver galeria completa de {casa}" (linha ~74) — adicionar `hover:text-cdl-primary` para evitar texto branco no hover. Mantém consistência com o ajuste do botão do YouTube.

## Restrições

- Sem mudança de cores da paleta, tipografia ou estrutura geral das seções.
- Sem alterar conteúdo textual.
- O ícone de toque nos cards de cidade não deve atrapalhar o clique nem o conteúdo (subtítulo + ícones sociais) na parte inferior — fica no topo direito.
- Animação do ícone de toque é única ao entrar na viewport (não fica looping infinito após — só pulse inicial).
