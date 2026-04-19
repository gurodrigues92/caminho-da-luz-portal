

## Pedido
Atualizar contribuição do Original em todas as casas: **R$ 150 no dia / R$ 120 antecipado** (hoje "R$ 100").

## Análise
Campo `contribuicao: "R$ 100"` aparece no Original de 3 rotas:
- `src/routes/sorocaba.tsx` (linha 75)
- `src/routes/sao-paulo.tsx` (linha 40)
- `src/routes/itarare.tsx` (linha 40)

Recife não tem valor cadastrado (mantém). Sementes (R$ 60) e Despertar (R$ 80) **não foram mencionados** pelo usuário → mantenho intactos.

O `TrabalhoCard` renderiza com `💛 {contribuicao}`, então uma string única já funciona sem mudar o componente.

## Solução
Substituir o valor em cada uma das 3 rotas por:
```
contribuicao: "R$ 150 no dia · R$ 120 antecipado"
```

Uso "·" para caber bem no card (o emoji 💛 já dá ênfase). Sem alteração no componente, sem mudança visual além do texto.

## Arquivos
- `src/routes/sorocaba.tsx` (linha 75)
- `src/routes/sao-paulo.tsx` (linha 40)
- `src/routes/itarare.tsx` (linha 40)

## Restrições
- Sem mudança de layout, cores, animações ou estrutura de dados
- Sementes e Despertar mantêm valores atuais
- Recife continua sem valor

