
User wants a new section on the home page showing the 3 latest videos from a YouTube channel as cards.

## Options to fetch latest videos

1. **YouTube Data API v3** — official, requires API key, real-time data, quota limits
2. **RSS feed** (`https://www.youtube.com/feeds/videos.xml?channel_id=XXX`) — no auth, no quota, public, returns latest 15 videos
3. **Hardcoded video IDs** — manual update each time

Best approach: **RSS feed via server function** — no API key needed, free, always fresh. Parse XML on server, return JSON to client, cache with TanStack Query.

## Need from user

I need the YouTube channel ID or handle (e.g., `@caminhodaluz` or `UCxxxxxxxxxx`). The RSS feed needs the channel ID. If they only have a handle/URL, I can extract it.

## Plan

### New section: "Últimos Vídeos"
Place between `RadioSection` and `AniversariantesDoMes` on home (`src/routes/index.tsx`).

Layout:
- Section title "Últimos Vídeos" with YouTube icon + subtitle
- Grid 1 col mobile / 3 cols desktop
- Each card: thumbnail (16:9) with play overlay → click opens YouTube video in new tab (or lightbox with embedded iframe)
- "Ver canal completo no YouTube →" link below
- Visual style matches existing sections (cdl-bg-light, rounded-xl, hover scale)

### Data fetching
- Server function `getLatestVideos` in `src/lib/youtube.ts` using `createServerFn`
- Fetches `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
- Parses XML (use simple regex or `fast-xml-parser`), extracts top 3 entries: videoId, title, thumbnail, publishedAt
- Returns JSON
- Client uses TanStack Query (`useQuery`) with 1h staleTime + fallback to skeleton/empty state on error

### Files
- `src/lib/youtube.ts` — new server function
- `src/routes/index.tsx` — add `UltimosVideosSection` component + insert in `HomePage`

### Question for user
Need the YouTube channel ID/handle to wire the RSS URL.
