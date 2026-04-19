
## Pedido
Deixar a Hero com o mesmo estilo de fundo do CTA "Pronto para expandir sua consciência?" — mesmas imagens (já são), mesmo tratamento de overlay/luzes.

## Observação
O CTA hoje usa apenas um overlay sólido `bg-black/65` sobre as imagens — **não tem AuroraLayer nem gradiente**. A Hero tem AuroraLayer + gradiente preto suave. Então "igualar" significa simplificar a Hero para o mesmo padrão do CTA.

## Solução
Em `src/routes/index.tsx`, dentro de `HeroSection` (linhas ~60-78):

- **Remover** o `<AuroraLayer ... />` (linha 77)
- **Remover** o gradiente `bg-gradient-to-b from-black/20 ... to-black/25` (linha 78)
- **Substituir** por um único `<div className="absolute inset-0 bg-black/65" />` (idêntico ao CTA)
- **Remover** o import `AuroraLayer` se não for mais usado em outro lugar do arquivo (não é).

Resultado: Hero e CTA com o mesmo tratamento visual de fundo (mesmas imagens responsivas + mesmo véu preto a 65%).

## Arquivo
- `src/routes/index.tsx` — apenas `HeroSection` + remoção do import.

## Restrições
- Wordmark azul, logo, textos, chevron e animações permanecem.
- CTA não muda.
- Sem alterar tipografia, cores ou layout.
