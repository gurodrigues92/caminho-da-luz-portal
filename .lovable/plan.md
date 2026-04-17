
## Diagnóstico

O feed RSS oficial do YouTube (`/feeds/videos.xml?channel_id=...`) retorna **404** para este canal — provavelmente por ser uma conta legada (sufixo `6191`). Testei `channel_id`, `user`, `playlist_id` (`UU...` uploads) — todas falham. Por isso a seção mostra "Nenhum vídeo disponível".

A página pública `https://www.youtube.com/@institutocaminhodaluz6191/videos` **funciona** e expõe os vídeos em JSON embutido (`ytInitialData`). Confirmei que dá pra extrair `videoId` + `title` dos últimos uploads.

## Solução

Trocar a estratégia do `getLatestVideos` em `src/lib/youtube.ts`:

1. Buscar `https://www.youtube.com/@institutocaminhodaluz6191/videos` (com `User-Agent` de browser).
2. Localizar o bloco `var ytInitialData = {...};` no HTML.
3. Navegar `contents.twoColumnBrowseResultsRenderer.tabs[].tabRenderer` até a tab "Videos" → `richGridRenderer.contents[]` → `richItemRenderer.content.videoRenderer` (ou `shortsLockupViewModel` — filtrar só `videoRenderer`).
4. Extrair `videoId`, `title.runs[0].text`, `publishedTimeText.simpleText` (ex.: "há 3 dias"), e montar `thumbnail = https://i.ytimg.com/vi/${id}/hqdefault.jpg`.
5. Retornar os 3 primeiros. Manter o fallback `{ videos: [], error }` em caso de erro.

Cache continua via TanStack Query (1h staleTime). O componente `UltimosVideosSection` não muda — só o backend.

### Alternativa (caso a estrutura mude no futuro)
Fallback regex robusto: extrair pares `"videoId":"XXX"` + `"title":{"runs":[{"text":"..."}]}` sequenciais via regex no HTML, deduplicar por id, pegar 3 primeiros. Vou implementar regex como caminho principal (mais resiliente que navegar a árvore JSON do YouTube, que muda com frequência).

### Arquivo
- `src/lib/youtube.ts` — reescrever `getLatestVideos` para fazer scrape do HTML do canal em vez de RSS.

### Observação
Scraping de HTML é mais frágil que RSS oficial — se o YouTube mudar o layout, precisará de ajuste. A função vai degradar graciosamente (mostrando o link "Visite nosso canal") se a extração falhar.
