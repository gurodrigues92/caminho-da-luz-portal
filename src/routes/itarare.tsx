import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { TrabalhoCard } from "@/components/TrabalhoCard";
import { EventCalendar } from "@/components/EventCalendar";
import { GaleriaPreview } from "@/components/GaleriaPreview";
import { AniversariantesDoMes } from "@/components/AniversariantesDoMes";

export const Route = createFileRoute("/itarare")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz Itararé — São Paulo" },
      { name: "description", content: "Casa do Caminho da Luz em Itararé. Trabalhos Original e Sementes." },
      { property: "og:title", content: "Caminho da Luz Itararé" },
      { property: "og:description", content: "Casa do Caminho da Luz em Itararé, SP." },
    ],
  }),
  component: ItararePage,
});

const whatsappLink = "https://api.whatsapp.com/send?phone=5515996751934&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz%20Itararé.";

function ItararePage() {
  return (
    <div className="pt-16">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg/hero-itarare.jpg')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-3">Caminho da Luz — Itararé</h1>
          <p className="text-cdl-text-light/80 mb-6">Rua XV de Novembro, 156 — Centro, Itararé/SP</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://www.instagram.com/caminhodaluzitarare" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <Instagram className="h-4 w-4" /> @caminhodaluzitarare
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <MessageCircle className="h-4 w-4" /> (15) 99675-1934
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">Nossos Trabalhos</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrabalhoCard
              title="Original"
              description="Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz."
              image="/images/trabalhos/original.jpg"
              horario="18h às 00h"
              contribuicao="R$ 100"
              badge="PRINCIPAL"
              badgeColor="bg-cdl-secondary text-cdl-bg-dark"
              highlighted
            />
            <TrabalhoCard
              title="Sementes"
              description="O Sementes é um projeto pensado e desenvolvido para quem tem interesse em conhecer esta sagrada medicina. Este projeto acontece em forma de reuniões com audições de elevação da nossa frequência vibratória."
              image="/images/trabalhos/sementes.jpg"
              horario="18h às 21h"
              contribuicao="R$ 60"
              badge="IDEAL PARA INICIANTES"
              badgeColor="bg-cdl-secondary text-cdl-bg-dark"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <EventCalendar
            title="Calendário 2026 — Itararé"
            eventos={[
              { data: "18/04", nome: "Original", tipo: "Original", whatsappLink },
              { data: "02/05", nome: "Sementes", tipo: "Sementes", whatsappLink },
              { data: "16/05", nome: "Original", tipo: "Original", whatsappLink },
              { data: "20/06", nome: "Original", tipo: "Original", whatsappLink },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <GaleriaPreview casa="Itararé" casaSlug="itarare" fotos={[
            "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188749/caminhodaluz/itarare.jpg",
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
