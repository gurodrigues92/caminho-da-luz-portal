
## Pedido
Na versão mobile do rodapé, centralizar todas as informações (logo, links, contato, redes sociais) em vez de alinhá-las à esquerda. No desktop, manter o alinhamento atual à esquerda.

## Estado atual
`src/components/layout/Footer.tsx` usa um grid de 4 colunas (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). No mobile (1 coluna), todo o conteúdo de cada bloco fica alinhado à esquerda por padrão. Isso inclui:
- Wordmark + texto descritivo
- Bloco "Casas" com 4 links
- Bloco "Contato" com WhatsApp
- Bloco "Redes Sociais" com 3 links

## Solução
Adicionar classes responsivas de centralização que se aplicam apenas no mobile e revertem para alinhamento à esquerda a partir do breakpoint `sm`:

1. **Cada bloco** (`<div>` filho do grid): adicionar `text-center sm:text-left` para centralizar texto no mobile.
2. **Wordmark `<img>`**: adicionar `mx-auto sm:mx-0` para centralizar a imagem.
3. **Containers `flex flex-col`** (links de Casas e Redes Sociais): adicionar `items-center sm:items-start` para centralizar os links empilhados.

O bloco de copyright já é `text-center` — fica como está.

## Arquivo
- `src/components/layout/Footer.tsx` — apenas classes utilitárias Tailwind, sem mudança de estrutura.

## Restrições
- Desktop (≥640px) permanece idêntico ao atual.
- Sem alteração de cores, tipografia, espaçamentos verticais ou conteúdo.
- Sem mudança no copyright (já centralizado).
