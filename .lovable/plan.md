

## Pedido
Adicionar link/CTA visível para a galeria de imagens dentro de cada página de casa (Sorocaba, SP, Recife, Itararé).

## Análise

Já existe `GaleriaPreview` renderizado em `CasaPage.tsx`. Preciso verificar:
- Se o `GaleriaPreview` já tem um botão "Ver galeria completa" ou similar
- Se não tem, adicionar um CTA claro apontando para `/{slug}/galeria`

Provavelmente o componente mostra thumbnails mas falta o link explícito "Ver toda a galeria".

## Plano

1. **Ler** `src/components/GaleriaPreview.tsx` para confirmar o estado atual
2. **Adicionar** botão/link "Ver galeria completa →" abaixo dos thumbnails apontando para `/{casaSlug}/galeria` usando `<Link to="/$casa/galeria">` (ou rota concreta por slug)
3. Estilo: botão secundário no padrão da identidade (Josefin uppercase, gold ou outline) — coerente com os outros CTAs do site

Se `GaleriaPreview` já tiver o link mas estiver pouco visível, **aumentar destaque** (peso, cor, tamanho).

## Arquivos
- `src/components/GaleriaPreview.tsx` (provável único arquivo)

## Restrições
- Manter fontes da identidade (Cormorant/Source Sans/Josefin)
- Sem mudar layout estrutural — apenas adicionar/destacar o CTA
- Rota destino: `/{slug}/galeria` (já existe para todas as 4 casas)

