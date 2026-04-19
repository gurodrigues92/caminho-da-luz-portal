
## Pedido
Na seção "O Instituto Caminho da Luz" (home), reorganizar o bloco do dirigente para que a **imagem do Pedrão fique acima do nome** "João Carlos Pedrão, Dirigente" (hoje provavelmente está lado a lado ou nome em cima da imagem).

## Investigação
Preciso localizar o bloco em `src/routes/index.tsx` que renderiza o nome "João Carlos Pedrão" para entender a estrutura atual (flex row vs column, ordem dos elementos) antes de propor a mudança exata.

## Solução prevista
No componente da seção "O Instituto" em `src/routes/index.tsx`:
- Trocar layout de `flex-row` (ou grid horizontal) para `flex-col items-center` no wrapper imagem+nome.
- Garantir ordem no JSX: `<img />` primeiro, depois `<p>João Carlos Pedrão, Dirigente</p>`.
- Ajustar espaçamentos (ex: `gap-3`, `mt-3`) para manter respiro visual.
- Manter tamanho/borda da imagem, tipografia e cores intactas.

Se a imagem hoje for grande (ex: lateral ocupando metade da seção), avaliarei se faz sentido reduzir para um avatar redondo centralizado acima do nome — mas só confirmo após inspecionar o código atual. Por padrão, **mantenho o tamanho e formato atuais da imagem**, só reordeno verticalmente.

## Arquivo
- `src/routes/index.tsx` — apenas o sub-bloco do dirigente dentro da seção "O Instituto Caminho da Luz".

## Restrições
- Resto da seção (texto institucional, imagens, CTA) permanece.
- Sem mudança de tipografia, cores ou tamanho da imagem.
- Sem mexer em outras seções.
