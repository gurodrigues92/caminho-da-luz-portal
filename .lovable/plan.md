

## Pedido
No mobile, na seção "O Instituto Caminho da Luz" (home), a foto do Pedrão aparece acima do título/texto. Mover para baixo no mobile, mantendo desktop como está (foto à esquerda, texto à direita).

## Análise

Em `src/routes/index.tsx`, função `AboutSection`, há um grid 2 colunas. No mobile (1 coluna), a ordem segue o DOM: primeira coluna = imagem, segunda = texto. Por isso a foto aparece em cima.

## Solução

Inverter a ordem visual no mobile usando `order` do Tailwind, sem mudar o DOM:
- Coluna da imagem: `order-2 md:order-1`
- Coluna do texto: `order-1 md:order-2`

Assim no mobile o texto vem primeiro e a foto fica abaixo; no desktop (`md:`) volta ao layout original (foto esquerda, texto direita).

## Arquivo
- `src/routes/index.tsx` — apenas ajuste de classes nas duas `motion.div` filhas do grid em `AboutSection`.

## Restrições
- Nada de mudar fontes, cores ou estrutura
- Desktop permanece idêntico

