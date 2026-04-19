
## Pedido
Inverter o que foi feito: ao invés de simplificar a Hero para o estilo do CTA, agora aplicar o estilo original da Hero (com AuroraLayer + gradiente suave + imagem mais visível) no CTA "Pronto para expandir sua consciência?".

## Estado atual
- **Hero**: imagens responsivas + `<div className="absolute inset-0 bg-black/65" />` (overlay sólido escuro)
- **CTA**: imagens responsivas + `<div className="absolute inset-0 bg-black/65" />` (overlay sólido escuro)

## Estado desejado
Ambas com o estilo "rico" que a Hero tinha antes:
- Imagens responsivas (mantém)
- `AuroraLayer` com `opacity-70` (efeito de luz)
- Gradiente preto suave `from-black/20 via-transparent to-black/25` (vinheta leve)
- Sem o overlay sólido `bg-black/65`

## Solução
Em `src/routes/index.tsx`:

1. **HeroSection**: trocar `<div className="absolute inset-0 bg-black/65" />` por:
   ```tsx
   <AuroraLayer showRadialGradient={false} className="absolute inset-0 opacity-70" />
   <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25" />
   ```

2. **CTASection**: aplicar exatamente o mesmo tratamento — trocar `bg-black/65` pelos mesmos 2 elementos (AuroraLayer + gradiente suave).

3. **Reimportar** `AuroraLayer` no topo do arquivo (foi removido na última edição).

4. **Atenção ao CTA**: o texto do CTA é branco sobre fundo. Com overlay mais leve, vou verificar se a legibilidade segue ok — se o usuário achar que ficou claro demais, ajustamos depois (mas o pedido é "deixar igual à Hero original", então sigo isso).

## Arquivo
- `src/routes/index.tsx` — apenas blocos de overlay da `HeroSection` e `CTASection` + 1 import.

## Restrições
- Imagens responsivas, wordmark, textos, botões e animações permanecem.
- Sem mudança de tipografia, cores ou layout.
