

## Parte 1 — Renomear seção "Estrelados"

Em `src/components/AniversariantesDoMes.tsx`:
- Título: `Estrelados de {MES}` → **`Aniversariantes de {MES}`**
- Subtítulo: `Parabéns aos nossos queridos aniversariantes! ✨` → **`Parabéns aos nossos queridos estrelados ✨`**
- Manter ícones de estrela e layout intactos.

## Parte 2 — Por que a seção do YouTube não funciona

A implementação atual (`src/lib/youtube.ts`) faz **scraping do HTML** de `youtube.com/@institutocaminhodaluz6191/videos` em uma server function. Isso falha por dois motivos previsíveis:

1. **YouTube bloqueia requisições server-side** sem cookies/JS — retorna uma página de "consent" (cookie wall da UE/bot detection) em vez do HTML com vídeos. Os regex não encontram `videoId` e a função retorna `videos: []` → UI mostra "Nenhum vídeo disponível".
2. **Mesmo quando passa**, o layout do YouTube muda com frequência e quebra o scraper em semanas.

Scraping não é um caminho viável. Precisamos de uma fonte oficial.

### Opções para resolver (precisa sua escolha)

**Opção A — YouTube Data API v3 (recomendado, robusto e grátis)**
- Você cria um projeto no Google Cloud Console → ativa "YouTube Data API v3" → gera uma **API Key**.
- Você me passa a API key (eu adiciono como secret `YOUTUBE_API_KEY`).
- Eu reescrevo `getLatestVideos` para chamar `https://www.googleapis.com/youtube/v3/search?channelId=...&order=date&part=snippet&maxResults=3&key=...`.
- Antes preciso descobrir o **channelId real** (formato `UCxxxxxxxx`) — consigo via uma chamada única à API ou você me envia (aparece em youtube.com → configurações avançadas do canal).
- Cota gratuita: 10.000 unidades/dia. Cada `search` custa 100 → ~100 chamadas/dia. Com cache de 1h (já configurado no React Query) é mais que suficiente.

**Opção B — RSS oficial do YouTube (grátis, sem API key, mais simples)**
- URL: `https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxx`
- Limitação: precisa do **channelId** (UC...), não funciona com handle `@institutocaminhodaluz6191`.
- Já testamos antes e retornou 404 — provavelmente porque tentamos com handle/user em vez do ID UC. Se descobrirmos o channelId correto, o RSS deve funcionar (retorna os 15 vídeos mais recentes em XML).
- Como descobrir o channelId: abrir o canal no navegador → ver código-fonte → procurar `"channelId":"UC...` ou usar https://commentpicker.com/youtube-channel-id.php.

**Opção C — Embed do canal (mais simples de todas, sem backend)**
- Substituir os 3 cards por um iframe oficial: lista de uploads do canal embedada.
- Zero manutenção, mas estética menos integrada (player do YouTube com branding deles).

### Recomendação

**Opção B primeiro** (gratuita, sem API key, sem cota). Se você me enviar o channelId UC do canal — ou me autorizar a tentar descobrir via uma busca rápida — eu reescrevo o scraper para consumir o RSS feed XML, parseando com regex/DOMParser. Caímos para Opção A apenas se o RSS continuar 404.

## Decisão necessária

1. Confirmo a renomeação da seção "Estrelados" → "Aniversariantes" (Parte 1)?
2. Qual opção do YouTube seguimos: **A** (API key), **B** (RSS — preciso do channelId UC) ou **C** (embed simples)?

