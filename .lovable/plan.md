

## Pedido
1. A seção do YouTube na página `/radio` está com problema (provavelmente o embed `videoseries?list=UU...` não carrega — o ID do canal `UCEq6FzaDeKHSgPRGz-GqHsg` no embed está diferente do `YOUTUBE_CHANNEL_ID` correto em `youtube.ts` que é `UC91bF7LgjRXXDPMR0G_jUgQ`).
2. Espelhar a seção "Últimos Vídeos" da home (componente `UltimosVideosSection`) na página `/radio`.
3. Confirmar se os 3 vídeos atualizam automaticamente.

## Análise

- O componente `UltimosVideosSection` já existe, busca via `getLatestVideos()` (server function que lê o RSS feed do canal).
- O RSS retorna sempre os vídeos mais recentes — então **sim, atualiza automaticamente** quando novos vídeos são postados (com cache de 1h via `staleTime`, então pode levar até 1h pra refletir).
- Hoje a `/radio` tem um `<iframe>` manual de `videoseries` que não funciona bem (limitação do YouTube com playlists de uploads `UU...` em embeds + ID de canal aparentemente errado).

## Plano

1. **Substituir** na `src/routes/radio.tsx` toda a seção atual do YouTube (segundo `<section>`) pelo componente `<UltimosVideosSection />`.
2. Remover o `<iframe>` antigo e o botão "Assistir no YouTube" duplicado (o componente já tem o link "Ver canal completo no YouTube →" no rodapé).
3. Manter intacta a seção do Spotify acima.

## Arquivos a editar
- `src/routes/radio.tsx` — trocar segunda `<section>` pelo `<UltimosVideosSection />` e adicionar import.

## Resposta sobre atualização automática
Sim. O componente busca o RSS oficial do canal (`feeds/videos.xml?channel_id=...`), que sempre lista os vídeos mais recentes. Cache de 1h no cliente — após esse tempo (ou refresh forçado) novos vídeos aparecem automaticamente sem precisar editar código.

## Restrições
- Não mexer na seção Spotify
- Não trocar fontes/cores
- Manter padrão de botões (já unificado no componente)

