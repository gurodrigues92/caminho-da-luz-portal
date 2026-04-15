import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { TrabalhoCard } from "@/components/TrabalhoCard";
import { EventCalendar } from "@/components/EventCalendar";
import { GaleriaPreview } from "@/components/GaleriaPreview";
import { AniversariantesDoMes } from "@/components/AniversariantesDoMes";

export const Route = createFileRoute("/sao-paulo")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz São Paulo — Vila Formosa" },
      { name: "description", content: "Casa do Caminho da Luz em São Paulo. Trabalhos Original e Encontro Terapêutico." },
      { property: "og:title", content: "Caminho da Luz São Paulo" },
      { property: "og:description", content: "Casa do Caminho da Luz em São Paulo." },
    ],
  }),
  component: SaoPauloPage,
});

const whatsappLink = "https://api.whatsapp.com/send?phone=5511916652879&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz%20SP.";

function SaoPauloPage() {
  return (
    <div className="pt-16">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg/hero-sp.jpg')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-3">Caminho da Luz — São Paulo</h1>
          <p className="text-cdl-text-light/80 mb-6">Rua Medeiros Furtado, 642 — Vila Formosa, São Paulo/SP</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://www.instagram.com/caminhodaluzsp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <Instagram className="h-4 w-4" /> @caminhodaluzsp
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <MessageCircle className="h-4 w-4" /> (11) 91665-2879
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
              description="Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz, guiado por músicas e conteúdos para cura física, espiritual, mudança de hábitos, encontro de propósito, autoconhecimento, conexão com seu eu interior e elevação vibracional."
              image="/images/trabalhos/original.jpg"
              horario="18h às 00h"
              contribuicao="R$ 100"
              badge="PRINCIPAL"
              badgeColor="bg-cdl-secondary text-cdl-bg-dark"
              highlighted
            />
            <TrabalhoCard
              title="Encontro Terapêutico"
              description="Encontro voltado para práticas terapêuticas integrativas, proporcionando cura e equilíbrio através de técnicas complementares aliadas ao uso sacramental da ayahuasca."
              image="/images/trabalhos/encontro-terapeutico.jpg"
              badge="TERAPÊUTICO"
              badgeColor="bg-cdl-primary-light text-cdl-text-light"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <EventCalendar
            title="Calendário 2026 — São Paulo"
            eventos={[
              { data: "11/04", nome: "Encontro Terapêutico", tipo: "Encontro Terapêutico", whatsappLink },
              { data: "25/04", nome: "Original", tipo: "Original", whatsappLink },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <GaleriaPreview casa="São Paulo" casaSlug="sao-paulo" fotos={[
            "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188749/caminhodaluz/ipiranga.jpg",
          ]} />
        </div>
      </section>

      <AniversariantesDoMes casa="São Paulo" />

      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-8">Como Chegar</h2>
            <div className="rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657!2d-46.55!3d-23.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sRua+Medeiros+Furtado+642+Vila+Formosa!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </motion.div>
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
