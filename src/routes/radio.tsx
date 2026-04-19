import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { UltimosVideosSection } from "@/components/UltimosVideosSection";

export const Route = createFileRoute("/radio")({
  head: () => ({
    meta: [
      { title: "Rádio — Caminho da Luz" },
      { name: "description", content: "Ouça a playlist do Caminho da Luz no Spotify e assista aos vídeos no YouTube." },
      { property: "og:title", content: "Rádio — Caminho da Luz" },
      { property: "og:description", content: "Músicas que elevam a consciência." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/radio" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/radio" },
    ],
  }),
  component: RadioPage,
});

function RadioPage() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-cdl-bg-dark grain-overlay relative">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-3">Rádio Caminho da Luz</h1>
            <p className="text-cdl-text-muted mb-10">Músicas que elevam a consciência</p>
            <div className="max-w-2xl mx-auto rounded-xl overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/playlist/3c4ESUCuZTLiIXY1P1yhSC?theme=0"
                width="100%"
                height="500"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <UltimosVideosSection />
    </div>
  );
}
