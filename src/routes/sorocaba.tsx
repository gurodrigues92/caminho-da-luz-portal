import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { TrabalhoCard } from "@/components/TrabalhoCard";
import { EventCalendar } from "@/components/EventCalendar";
import { GaleriaPreview } from "@/components/GaleriaPreview";

export const Route = createFileRoute("/sorocaba")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz Sorocaba — Sede Principal" },
      { name: "description", content: "Casa sede do Instituto Caminho da Luz em Sorocaba. Trabalhos espirituais com Ayahuasca: Original, Sementes, Despertar, Florescer e Humano." },
      { property: "og:title", content: "Caminho da Luz Sorocaba — Sede Principal" },
      { property: "og:description", content: "Casa sede em Sorocaba. Trabalhos espirituais com Santo Daime." },
    ],
  }),
  component: SorocabaPage,
});

const whatsappLink = "https://api.whatsapp.com/send?phone=5515974011072&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz%20Sorocaba.";

const trabalhos = [
  {
    title: "Original",
    description: "Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz, guiado por músicas e conteúdos para cura física, espiritual, mudança de hábitos, encontro de propósito, autoconhecimento, conexão com seu eu interior e elevação vibracional.",
    image: "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188745/caminhodaluz/original.jpg",
    horario: "18h às 00h",
    contribuicao: "R$ 100",
    badge: "PRINCIPAL",
    badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
    highlighted: true,
  },
  {
    title: "Sementes",
    description: "O Sementes é um projeto pensado e desenvolvido para quem tem interesse em conhecer esta sagrada medicina. Este projeto acontece em forma de reuniões com audições de elevação da nossa frequência vibratória. É uma ponte para a conexão com o seu eu interior.",
    image: "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188745/caminhodaluz/sementes.jpg",
    horario: "18h às 21h",
    contribuicao: "R$ 60",
    badge: "IDEAL PARA INICIANTES",
    badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
  },
  {
    title: "Despertar",
    description: "Este é um trabalho em formato de audição chamado Despertar, que consiste em duas cerimônias de consagração de ayahuasca e tem uma duração de quatro horas. Durante o trabalho, são apresentados conteúdos como músicas, áudios, contos e meditações com foco no tema em questão, além de ferramentas práticas para a vida cotidiana.",
    image: "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188746/caminhodaluz/estudos.jpg",
    horario: "18h às 22h",
    contribuicao: "R$ 80",
  },
  {
    title: "Florescer",
    description: "A proposta deste projeto dedicado a participação somente de mulheres, é o resgate e valorização da energia feminina que habita em cada uma delas para a expressão da essência ancestral e harmonização com o masculino.",
    image: "https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188748/caminhodaluz/florescer.jpg",
    horario: "8h às 16h",
    badge: "EXCLUSIVO FEMININO",
    badgeColor: "bg-pink-600 text-white",
  },
  {
    title: "Humano",
    description: "Trabalho exclusivo para homens, focado no resgate e fortalecimento da energia masculina consciente. Acontece periodicamente.",
    badge: "EXCLUSIVO MASCULINO",
    badgeColor: "bg-cdl-accent text-cdl-text-light",
  },
];

const eventos = [
  { data: "11/04", nome: "Original", tipo: "Original", whatsappLink },
  { data: "25/04", nome: "Sementes", tipo: "Sementes", whatsappLink },
  { data: "09/05", nome: "Original Aniversário", tipo: "Original", whatsappLink },
  { data: "23/05", nome: "Despertar", tipo: "Despertar", whatsappLink },
  { data: "13/06", nome: "Original", tipo: "Original", whatsappLink },
  { data: "27/06", nome: "Sementes", tipo: "Sementes", whatsappLink },
];

const galeriaFotos = [
  "https://caminhodaluzdaime.com.br/images/mural/desktop/fogueira/24-06-23/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/original/10-06/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/estudos/20-05/2.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/sementes/22/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/florescer/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/original/1.jpg",
];

function SorocabaPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188744/caminhodaluz/caminho-da-luz.jpg')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 bg-cdl-secondary text-cdl-bg-dark text-xs font-label uppercase tracking-widest rounded">
            Sede Principal
          </span>
          <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-3">Caminho da Luz — Sorocaba</h1>
          <p className="text-cdl-text-light/80 mb-6">R. Paulo Varchavtchik, 365 — Brigadeiro Tobias, Sorocaba/SP</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/caminhodaluzdaime" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <Instagram className="h-4 w-4" /> @caminhodaluzdaime
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <MessageCircle className="h-4 w-4" /> (15) 97401-1072
            </a>
            <a href="https://maps.google.com/?q=R.+Paulo+Varchavtchik,+365+Brigadeiro+Tobias+Sorocaba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
              <MapPin className="h-4 w-4" /> Mapa
            </a>
          </div>
        </motion.div>
      </section>

      {/* Trabalhos */}
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">Nossos Trabalhos</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trabalhos.map((t) => (
              <TrabalhoCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Clínica */}
      <section className="relative bg-cdl-bg-dark grain-overlay py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border-l-4 border-cdl-accent pl-6 md:pl-10">
            <h2 className="font-heading text-3xl text-cdl-text-light font-semibold mb-2">Clínica Caminho da Luz</h2>
            <p className="text-cdl-secondary text-sm font-label uppercase tracking-widest mb-4">Atendimento terapêutico com Ayahuasca</p>
            <p className="text-cdl-text-light/80 leading-relaxed mb-6 max-w-2xl">
              Toda segunda-feira oferecemos atendimento para pessoas que buscam ajuda com depressão, dependências, ansiedade e outros desafios. O atendimento é agendado e a chegada deve ser pontual entre 17:30 e 17:50.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Depressão", "Dependências", "Ansiedade", "Outros"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-cdl-primary/30 text-cdl-text-light text-xs font-label tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=5515974011072&text=Olá!%20Gostaria%20de%20agendar%20um%20atendimento%20na%20Clínica%20Caminho%20da%20Luz."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cdl-secondary text-cdl-bg-dark font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-secondary/90 transition-all duration-300"
            >
              Agendar atendimento
            </a>
            <p className="text-cdl-text-muted text-sm mt-3">Alex Lava — Responsável · Instagram: @caminhodaluzdaime</p>
          </motion.div>
        </div>
      </section>

      {/* Calendário */}
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <EventCalendar title="Calendário 2026 — Sorocaba" eventos={eventos} />
        </div>
      </section>

      {/* Galeria Preview */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <GaleriaPreview casa="Sorocaba" casaSlug="sorocaba" fotos={galeriaFotos} />
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-8">Como Chegar</h2>
            <div className="rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.5!2d-47.42!3d-23.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMwJzM2LjAiUyA0N8KwMjUnMTIuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
            <p className="text-cdl-text-muted text-sm mt-4">
              R. Paulo Varchavtchik, 365 — Brigadeiro Tobias, Sorocaba/SP ·{" "}
              <a href="https://maps.google.com/?q=R.+Paulo+Varchavtchik,+365+Brigadeiro+Tobias+Sorocaba" target="_blank" rel="noopener noreferrer" className="underline hover:text-cdl-text transition-colors">
                Abrir no Google Maps
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="py-20 bg-cdl-bg-dark grain-overlay relative text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-xl px-4">
          <h2 className="font-heading text-3xl text-cdl-text-light font-semibold mb-4">Reserve sua vaga para o próximo trabalho</h2>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cdl-secondary text-cdl-bg-dark font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-secondary/90 transition-all duration-300 shadow-lg"
          >
            Chamar no WhatsApp
          </a>
          <p className="text-cdl-text-light/60 text-sm mt-6">
            Primeira vez?{" "}
            <a href="https://res.cloudinary.com/dtt7egwkk/raw/upload/v1776188783/caminhodaluz/Anamnese.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-cdl-text-light transition-colors">
              Baixe a anamnese antes
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
