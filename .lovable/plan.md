
## Pedido
Deixar a imagem de fundo da hero um pouco mais visível, reduzindo levemente a intensidade dos efeitos de luz (aurora + gradiente preto + mix-blend).

## Solução
Em `src/routes/index.tsx`, dentro de `HeroSection`, ajustes pequenos:

1. **Imagens de background (mobile + desktop)**: aumentar opacidade de `opacity-90` para `opacity-100` e remover (ou suavizar) o `mix-blend-overlay` que escurece/dessatura. Vou trocar `mix-blend-overlay opacity-90` por apenas (sem blend) — deixa a imagem aparecer no tom original.

2. **Gradiente preto sobreposto**: reduzir de `from-black/30 ... to-black/40` para `from-black/20 ... to-black/25` (mantém leve vinheta para legibilidade do wordmark sem escurecer demais).

3. **AuroraLayer**: manter, mas envolver em wrapper com `opacity-70` (estava 100%) para suavizar sem remover o efeito de luz.

Tudo o mais (wordmark azul, textos, chevron, animações) permanece intacto.

## Arquivo
- `src/routes/index.tsx` — apenas o bloco de background da `HeroSection`.

## Restrições
- CTA section não muda.
- Sem alterar tipografia, cores ou layout.
- Ajustes conservadores ("pouca coisa") conforme pedido.
