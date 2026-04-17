import { createServerFn } from "@tanstack/react-start";

export const YOUTUBE_CHANNEL_HANDLE = "institutocaminhodaluz6191";
export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/@${YOUTUBE_CHANNEL_HANDLE}`;

export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

function extractVideosFromHtml(html: string, limit = 3): YoutubeVideo[] {
  const videos: YoutubeVideo[] = [];
  const seen = new Set<string>();

  // Regex que captura blocos de videoRenderer com id + título.
  // Estrutura típica: "videoId":"XXXX", ... "title":{"runs":[{"text":"..."}]
  // ou "title":{"simpleText":"..."}
  const re =
    /"videoId":"([a-zA-Z0-9_-]{11})"[^}]*?"title":\{(?:"runs":\[\{"text":"([^"]+)"|"simpleText":"([^"]+)")/g;

  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && videos.length < limit) {
    const id = m[1];
    const rawTitle = m[2] ?? m[3];
    if (!id || !rawTitle || seen.has(id)) continue;
    seen.add(id);

    // Decodifica escapes JSON básicos
    const title = rawTitle
      .replace(/\\u0026/g, "&")
      .replace(/\\"/g, '"')
      .replace(/\\\//g, "/")
      .replace(/\\n/g, " ")
      .trim();

    // Tenta extrair publishedTimeText próximo (opcional)
    const tail = html.slice(m.index, m.index + 2000);
    const publishedMatch = tail.match(/"publishedTimeText":\{"simpleText":"([^"]+)"/);
    const publishedAt = publishedMatch?.[1] ?? "";

    videos.push({
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt,
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }

  return videos;
}

export const getLatestVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ videos: YoutubeVideo[]; error: string | null }> => {
    try {
      const res = await fetch(`${YOUTUBE_CHANNEL_URL}/videos`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
      if (!res.ok) {
        console.error(`YouTube page error: ${res.status} ${res.statusText}`);
        return { videos: [], error: `Canal indisponível (${res.status})` };
      }
      const html = await res.text();
      const videos = extractVideosFromHtml(html, 3);
      if (videos.length === 0) {
        console.error("YouTube scrape: no videos found in HTML");
        return { videos: [], error: "Nenhum vídeo encontrado" };
      }
      return { videos, error: null };
    } catch (e) {
      console.error("YouTube scrape failed:", e);
      return { videos: [], error: "Falha ao buscar vídeos" };
    }
  },
);
