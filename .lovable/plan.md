## Pedido
A frase "Centro Espiritual Universalista · Santo Daime" (legenda dourada, uppercase com tracking largo) ainda está pouco legível dentro do shape escuro do Hero.

## Diagnóstico
Linha 131-136 de `src/routes/index.tsx`:
- Cor `text-cdl-secondary` (dourado) sobre `bg-black/40` — contraste razoável, mas o tracking `[0.2em]` + tamanho `text-sm` deixam as letras finas e "vibrando" sobre a textura blur.
- Sem `drop-shadow`, ao contrário dos outros textos do bloco.

## Solução
Ajustes mínimos só nessa linha:
1. Aumentar peso: adicionar `font-semibold` (hoje não tem peso definido).
2. Subir um degrau de tamanho no mobile: `text-sm` → `text-[0.8rem]` mantendo `md:text-base` — na verdade vou usar `text-xs sm:text-sm md:text-base` para garantir respiro, mas o ganho real vem do peso e sombra.
3. Reduzir tracking de `[0.2em]` para `[0.15em]` — letras menos espaçadas leem melhor em corpo pequeno.
4. Adicionar `drop-shadow-md` para destacar do fundo (consistente com H1 e parágrafo).
5. Trocar `text-cdl-secondary` puro por uma variação mais clara/brilhante: usar `text-cdl-secondary` + classe `brightness-110` não funciona em texto — então uso `text-amber-200` como fallback de alto contraste sobre fundo escuro, OU mantenho `text-cdl-secondary` se o token já for claro o suficiente.

Vou conferir o token `cdl-secondary` em `src/styles.css` antes de decidir entre manter o dourado da marca ou clarear. Provavelmente mantenho a cor da marca e resolvo só com **peso + sombra + tracking menor**, que já é o suficiente para legibilidade sem quebrar identidade visual.

## Arquivo
- `src/routes/index.tsx` — apenas a `className` da `motion.p` na linha 133.

## Restrições
- Não mudar o texto.
- Não mexer em outros elementos do Hero.
- Manter a cor dourada da marca (não trocar por branco) — a legenda é um detalhe de identidade.
