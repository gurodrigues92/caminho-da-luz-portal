import { createServerFn } from "@tanstack/react-start";

export const YOUTUBE_CHANNEL_HANDLE = "institutocaminhodaluz6191";
export const YOUTUBE_CHANNEL_ID = "UC91bF7LgjRXXDPMR0G_jUgQ";
export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/@${YOUTUBE_CHANNEL_HANDLE}`;
const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function parseRssVideos(xml: string, limit = 3): YoutubeVideo[] {
  const videos: YoutubeVideo[] = [];
  // Cada <entry> contém um vídeo
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;
  while ((match = entryRe.exec(xml)) && videos.length < limit) {
    const block = match[1];
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const rawTitle = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const publishedAt = block.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    if (!id || !rawTitle) continue;
    videos.push({
      id,
      title: decodeXmlEntities(rawTitle).trim(),
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
      const res = await fetch(YOUTUBE_RSS_URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; CaminhoDaLuzBot/1.0; +https://caminhodaluz.org)",
          Accept: "application/atom+xml, application/xml, text/xml",
        },
      });
      if (!res.ok) {
        console.error(`YouTube RSS error: ${res.status} ${res.statusText}`);
        return { videos: [], error: `Canal indisponível (${res.status})` };
      }
      const xml = await res.text();
      const videos = parseRssVideos(xml, 3);
      if (videos.length === 0) {
        console.error("YouTube RSS: no videos parsed");
        return { videos: [], error: "Nenhum vídeo encontrado" };
      }
      return { videos, error: null };
    } catch (e) {
      console.error("YouTube RSS fetch failed:", e);
      return { videos: [], error: "Falha ao buscar vídeos" };
    }
  },
);
