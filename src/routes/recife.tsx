import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Instagram, MessageCircle } from "lucide-react";
import { TrabalhoCard } from "@/components/TrabalhoCard";
import { GaleriaPreview } from "@/components/GaleriaPreview";

export const Route = createFileRoute("/recife")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz Recife — Pernambuco" },
      { name: "description", content: "Casa do Caminho da Luz em Recife, Pernambuco." },
      { property: "og:title", content: "Caminho da Luz Recife" },
      { property: "og:description", content: "Casa do Caminho da Luz em Recife." },
    ],
  }),
  component: RecifePage,
});

const whatsappLink = "https://api.whatsapp.com/send?phone=5581992038383&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz%20Recife.";

function RecifePage() {
  return (
    <div className="pt-16">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188750/caminhodaluz/recife.jpg')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-3">Caminho da Luz — Recife</h1>
          <p className="text-cdl-text-light/80 mb-6">Recife/PE — endereço em atualização</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://www.instagram.com/caminhodaluz_pe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <Instagram className="h-4 w-4" /> @caminhodaluz_pe
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <MessageCircle className="h-4 w-4" /> (81) 99203-8383
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">Nossos Trabalhos</h2>
          </motion.div>
          <div className="max-w-lg mx-auto">
            <TrabalhoCard
              title="Original"
              description="Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz."
              image="https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188745/caminhodaluz/original.jpg"
              badge="PRINCIPAL"
              badgeColor="bg-cdl-secondary text-cdl-bg-dark"
              highlighted
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-3xl text-cdl-text font-semibold mb-4">Calendário</h2>
            <p className="text-cdl-text-muted">Calendário em breve. Entre em contato pelo WhatsApp para saber as próximas datas.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <GaleriaPreview casa="Recife" casaSlug="recife" fotos={[
            "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188750/caminhodaluz/recife.jpg",
          ]} />
        </div>
      </section>

      <section className="py-20 bg-cdl-bg-dark grain-overlay relative text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-xl px-4">
          <h2 className="font-heading text-3xl text-cdl-text-light font-semibold mb-4">Reserve sua vaga</h2>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-cdl-secondary text-cdl-bg-dark font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-secondary/90 transition-all duration-300 shadow-lg">
            Chamar no WhatsApp
          </a>
        </motion.div>
      </section>
    </div>
  );
}
