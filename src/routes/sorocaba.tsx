import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { CasaPage } from "@/components/CasaPage";
import type { CasaPageProps } from "@/components/CasaPage";

export const Route = createFileRoute("/sorocaba")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz Sorocaba — Sede Principal" },
      { name: "description", content: "Casa sede do Instituto Caminho da Luz em Sorocaba. Trabalhos espirituais com Ayahuasca: Original, Sementes, Despertar, Florescer e Humano." },
      { property: "og:title", content: "Caminho da Luz Sorocaba — Sede Principal" },
      { property: "og:description", content: "Casa sede em Sorocaba. Trabalhos espirituais com Santo Daime." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/sorocaba" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/sorocaba" },
    ],
  }),
  component: () => <CasaPage {...sorocabaConfig} clinicaSection={<ClinicaSection />} />,
});

function ClinicaSection() {
  return (
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
  );
}

const sorocabaConfig: Omit<CasaPageProps, "clinicaSection"> = {
  nome: "Sorocaba",
  slug: "sorocaba",
  endereco: "R. Paulo Varchavtchik, 365 — Brigadeiro Tobias, Sorocaba/SP",
  heroImage: "/images/bg/hero-main.jpg",
  whatsappPhone: "5515974011072",
  whatsappMessage: "Olá! Gostaria de saber mais sobre o Caminho da Luz Sorocaba.",
  instagramHandle: "caminhodaluzdaime",
  instagramUrl: "https://www.instagram.com/caminhodaluzdaime",
  phoneDisplay: "(15) 97401-1072",
  isSede: true,
  mapsQuery: "R.+Paulo+Varchavtchik,+365,+Brigadeiro+Tobias,+Sorocaba,+SP",
  mapsAddress: "R. Paulo Varchavtchik, 365 — Brigadeiro Tobias, Sorocaba/SP",
  trabalhos: [
    {
      title: "Original",
      description: "Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz, guiado por músicas e conteúdos para cura física, espiritual, mudança de hábitos, encontro de propósito, autoconhecimento, conexão com seu eu interior e elevação vibracional.",
      image: "/images/trabalhos/original.jpg",
      horario: "18h às 00h",
      contribuicao: "R$ 150 no dia · R$ 120 antecipado",
      badge: "PRINCIPAL",
      badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
      highlighted: true,
    },
    {
      title: "Sementes",
      description: "O Sementes é um projeto pensado e desenvolvido para quem tem interesse em conhecer esta sagrada medicina. Este projeto acontece em forma de reuniões com audições de elevação da nossa frequência vibratória. É uma ponte para a conexão com o seu eu interior.",
      image: "/images/trabalhos/sementes.jpg",
      horario: "18h às 21h",
      contribuicao: "R$ 80 no dia · R$ 60 antecipado",
      badge: "IDEAL PARA INICIANTES",
      badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
    },
    {
      title: "Despertar",
      description: "Este é um trabalho em formato de audição chamado Despertar, que consiste em duas cerimônias de consagração de ayahuasca e tem uma duração de quatro horas. Durante o trabalho, são apresentados conteúdos como músicas, áudios, contos e meditações com foco no tema em questão, além de ferramentas práticas para a vida cotidiana.",
      image: "/images/trabalhos/despertar.jpg",
      horario: "18h às 22h",
      contribuicao: "R$ 80",
    },
    {
      title: "Florescer",
      description: "A proposta deste projeto dedicado a participação somente de mulheres, é o resgate e valorização da energia feminina que habita em cada uma delas para a expressão da essência ancestral e harmonização com o masculino.",
      image: "/images/trabalhos/florescer.jpg",
      horario: "8h às 16h",
      badge: "EXCLUSIVO FEMININO",
      badgeColor: "bg-pink-600 text-white",
    },
    {
      title: "Humano",
      description: "Trabalho exclusivo para homens, focado no resgate e fortalecimento da energia masculina consciente. Acontece periodicamente.",
      image: "/images/trabalhos/humano.jpg",
      badge: "EXCLUSIVO MASCULINO",
      badgeColor: "bg-cdl-accent text-cdl-text-light",
    },
  ],
  eventos: [
    { data: "11/04", nome: "Original", tipo: "Original" },
    { data: "25/04", nome: "Sementes", tipo: "Sementes" },
    { data: "09/05", nome: "Original Aniversário", tipo: "Original" },
    { data: "23/05", nome: "Despertar", tipo: "Despertar" },
    { data: "13/06", nome: "Original", tipo: "Original" },
    { data: "27/06", nome: "Sementes", tipo: "Sementes" },
  ],
  galeriaFotos: [
    "https://caminhodaluzdaime.com.br/images/mural/desktop/fogueira/24-06-23/1.jpg",
    "https://caminhodaluzdaime.com.br/images/mural/desktop/original/10-06/1.jpg",
    "https://caminhodaluzdaime.com.br/images/mural/desktop/estudos/20-05/2.jpg",
    "https://caminhodaluzdaime.com.br/images/mural/desktop/sementes/22/1.jpg",
    "https://caminhodaluzdaime.com.br/images/mural/desktop/florescer/1.jpg",
    "https://caminhodaluzdaime.com.br/images/mural/desktop/original/1.jpg",
  ],
};
