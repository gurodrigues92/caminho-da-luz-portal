
## Investigação

No `src/routes/index.tsx` (seção "Nossas Casas"), o card de Sorocaba tem `sede: true`. A grid usa `md:grid-cols-2` e o card aplica condicionalmente:

- `${casa.sede ? "md:col-span-2" : ""}` — ocupa 2 colunas (largura dupla)
- `${casa.sede ? "aspect-video md:aspect-[2.33]" : "aspect-[4/3]"}` — proporção mais "achatada" (panorâmica)

## Causa

Quando removemos o badge "Sede Principal", a flag `sede: true` continuou no objeto. Ela ainda controla o tamanho/proporção do card:

- **Desktop (md+)**: card de Sorocaba ocupa a linha inteira (`col-span-2`) com aspect ratio panorâmico `2.33:1` → parece "menor em altura" comparado aos outros que são `4:3` (mais altos).
- **Mobile**: como só tem 1 coluna, o `col-span-2` não muda nada, mas o `aspect-video` (16:9) ainda é mais baixo que `4:3` dos demais → visualmente o card fica com menos altura.

Ou seja: o card não está "menor em largura" — está com **menos altura** porque mantém a proporção panorâmica de "destaque de sede".

## Opções de correção

**A. Padronizar tudo igual** (recomendado, já que tiramos o destaque de sede)
- Remover a flag `sede: true` da Sorocaba OU
- Remover as classes condicionais `${casa.sede ? ... : ...}` do JSX
- Resultado: 4 cards idênticos em grid 2x2 com `aspect-[4/3]`.

**B. Manter Sorocaba em destaque visual** (mas sem o badge)
- Manter `col-span-2` mas trocar a proporção para algo mais alto (ex: `md:aspect-[16/9]` ou `md:aspect-[2/1]`) para não parecer "espremido".

**C. Manter como está**
- Aceitar que sede continua maior em largura (ocupa linha inteira) mesmo sem badge.

## Recomendação

**Opção A** — já que removemos o badge "Sede Principal", faz sentido tratar todos os cards igualmente. Layout fica simétrico em grid 2x2, sem hierarquia visual artificial.

## Arquivo
- `src/routes/index.tsx` — remover classes condicionais `casa.sede` do card e da div interna (proporção); opcionalmente remover a propriedade `sede` do objeto Sorocaba em `casasData`.
