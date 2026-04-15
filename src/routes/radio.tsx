import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/radio")({
  head: () => ({
    meta: [
      { title: "Rádio — Caminho da Luz" },
      { name: "description", content: "Ouça a playlist do Caminho da Luz no Spotify e assista aos vídeos no YouTube." },
      { property: "og:title", content: "Rádio — Caminho da Luz" },
      { property: "og:description", content: "Músicas que elevam a consciência." },
    ],
  }),
  component: RadioPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function RadioPage() {
  return (
    <div className="pt-16">
      {/* Spotify */}
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

      {/* YouTube */}
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-3">Canal no YouTube</h2>
            <p className="text-cdl-text-muted mb-10">Vídeos, palestras e registros dos nossos trabalhos</p>
            <div className="max-w-2xl mx-auto rounded-xl overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/videoseries?list=UUEq6FzaDeKHSgPRGz-GqHsg"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <a
              href="https://youtube.com/@institutocaminhodaluz6191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-cdl-primary text-cdl-text-light font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-primary-light transition-all duration-300"
            >
              Assistir no YouTube
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
