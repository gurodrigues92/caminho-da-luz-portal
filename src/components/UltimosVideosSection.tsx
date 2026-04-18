import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Youtube, Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeUp, stagger } from "@/lib/animations";
import {
  getLatestVideos,
  YOUTUBE_CHANNEL_URL,
  type YoutubeVideo,
} from "@/lib/youtube";

export function UltimosVideosSection() {
  const [active, setActive] = useState<YoutubeVideo | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["youtube", "latest"],
    queryFn: () => getLatestVideos(),
    staleTime: 60 * 60 * 1000, // 1h
    gcTime: 6 * 60 * 60 * 1000,
    retry: 1,
  });

  const videos = data?.videos ?? [];

  return (
    <section className="py-20 bg-cdl-bg-light">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Youtube className="h-5 w-5 text-cdl-secondary" />
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">
              Últimos Vídeos
            </h2>
          </div>
          <p className="text-cdl-text-muted">
            Acompanhe nossos conteúdos mais recentes no YouTube
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="aspect-video w-full rounded-xl" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center text-cdl-text-muted">
            Nenhum vídeo disponível no momento.{" "}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cdl-primary transition-colors"
            >
              Visite nosso canal
            </a>
            .
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {videos.map((v) => (
              <motion.button
                key={v.id}
                variants={fadeUp}
                onClick={() => setActive(v)}
                className="group relative overflow-hidden rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] text-left bg-cdl-bg-dark"
                aria-label={`Assistir: ${v.title}`}
              >
                <div className="relative aspect-video">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-cdl-secondary/95 text-cdl-bg-dark p-4 shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cdl-primary hover:text-cdl-primary-light font-label uppercase tracking-widest text-sm transition-colors"
          >
            <Youtube className="h-4 w-4" />
            Ver canal completo no YouTube →
          </a>
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl p-0 bg-cdl-bg-dark border-cdl-primary/20 overflow-hidden">
          <DialogTitle className="sr-only">
            {active?.title ?? "Vídeo"}
          </DialogTitle>
          <button
            onClick={() => setActive(null)}
            className="absolute top-3 right-3 z-10 rounded-full bg-black/60 hover:bg-black/80 text-white p-2 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
          {active && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
