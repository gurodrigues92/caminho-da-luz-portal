import { createServerFn } from "@tanstack/react-start";

export const YOUTUBE_CHANNEL_ID = "UC91bF7LgjRXXDPMR0G_jUgQ";
export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@institutocaminhodaluz6191";

export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

function parseEntries(xml: string, limit = 3): YoutubeVideo[] {
  const entries: YoutubeVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;
  while ((match = entryRegex.exec(xml)) && entries.length < limit) {
    const block = match[1];
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = block.match(/<title>([^<]+)<\/title>/)?.[1];
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1];
    if (!id || !title) continue;
    entries.push({
      id,
      title: title
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'"),
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt: published ?? "",
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }
  return entries;
}

export const getLatestVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ videos: YoutubeVideo[]; error: string | null }> => {
    try {
      const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; CaminhoDaLuzBot/1.0; +https://caminhodaluzdaime.com.br)",
            Accept: "application/atom+xml, application/xml, text/xml",
          },
        },
      );
      if (!res.ok) {
        console.error(`YouTube RSS error: ${res.status} ${res.statusText}`);
        return { videos: [], error: `Feed indisponível (${res.status})` };
      }
      const xml = await res.text();
      const videos = parseEntries(xml, 3);
      return { videos, error: null };
    } catch (e) {
      console.error("YouTube RSS fetch failed:", e);
      return { videos: [], error: "Falha ao buscar vídeos" };
    }
  },
);
