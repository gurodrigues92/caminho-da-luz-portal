

## Pedido
No mobile, melhorar a distribuição/layout dos cards de aniversariantes em `AniversariantesDoMes.tsx`.

## Diagnóstico
Hoje o container usa `flex flex-wrap justify-center gap-4` e cada card tem padding `px-5 py-3` + ícone 40px + textos. Em 390px de largura:
- cards têm largura natural variável → quebram desalinhados, sobrando espaço/órfãos no fim das linhas
- com nomes longos (ex: "Carol Quintiliano", "João Carlos (Pedrão)") um card sozinho ocupa quase toda a linha enquanto outros ficam apertados ao lado
- visualmente fica irregular e desperdiça espaço vertical

## Solução
Trocar o layout para **grid responsivo de 2 colunas no mobile**, mantendo flex-wrap centralizado em telas maiores (onde já funciona bem):

- Mobile (`< sm`): `grid grid-cols-2 gap-3` → cards uniformes, 2 por linha, ocupam toda a largura disponível
- `sm+`: voltar a `flex flex-wrap justify-center gap-4` (comportamento atual preservado em tablet/desktop)
- Reduzir levemente padding interno no mobile (`px-3 py-2.5`) e ícone (`h-9 w-9`) para caberem 2 por linha confortavelmente em 390px sem cortar nomes
- Adicionar `min-w-0` + `truncate` no bloco de texto para nomes longos não estourarem o card
- Reduzir `text-lg` → `text-base` no nome em mobile (`text-base sm:text-lg`)

## Arquivos
**Editar:** `src/components/AniversariantesDoMes.tsx` (apenas o container `motion.div` da grid + classes do card interno)

## Restrições respeitadas
- Sem mudança de dados, animações ou cores
- Comportamento desktop/tablet intacto
- Sem novas dependências

