
Remover o título sobreposto nas miniaturas dos vídeos do YouTube em `src/components/UltimosVideosSection.tsx`. Manter apenas o botão de play centralizado.

## Mudança

No bloco do card do vídeo, remover:
- O `<div className="absolute bottom-0 left-0 right-0 p-4">` contendo o `<h3>` com o título.
- Opcional: suavizar o gradiente escuro (já que não há mais texto para legibilidade) — mantenho um gradiente leve só para destacar o botão de play sobre thumbnails claras.

Manter:
- `aria-label={`Assistir: ${v.title}`}` no botão (acessibilidade).
- `alt={v.title}` na imagem.
- Botão de play centralizado com hover scale.

## Arquivo
- `src/components/UltimosVideosSection.tsx` — remover overlay de título.
