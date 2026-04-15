import { createFileRoute } from "@tanstack/react-router";
import { CasaPage } from "@/components/CasaPage";
import type { CasaPageProps } from "@/components/CasaPage";

export const Route = createFileRoute("/sao-paulo")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz São Paulo — Vila Formosa" },
      { name: "description", content: "Casa do Caminho da Luz em São Paulo. Trabalhos Original e Encontro Terapêutico." },
      { property: "og:title", content: "Caminho da Luz São Paulo" },
      { property: "og:description", content: "Casa do Caminho da Luz em São Paulo." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/ipiranga.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/sao-paulo" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/sao-paulo" },
    ],
  }),
  component: () => <CasaPage {...saoPauloConfig} />,
});

const saoPauloConfig: CasaPageProps = {
  nome: "São Paulo",
  slug: "sao-paulo",
  endereco: "Rua Medeiros Furtado, 642 — Vila Formosa, São Paulo/SP",
  heroImage: "/images/bg/hero-sp.jpg",
  whatsappPhone: "5511916652879",
  whatsappMessage: "Olá! Gostaria de saber mais sobre o Caminho da Luz SP.",
  instagramHandle: "caminhodaluzsp",
  instagramUrl: "https://www.instagram.com/caminhodaluzsp",
  phoneDisplay: "(11) 91665-2879",
  mapsQuery: "Rua+Medeiros+Furtado,+642,+Vila+Formosa,+São+Paulo,+SP",
  mapsAddress: "Rua Medeiros Furtado, 642 — Vila Formosa, São Paulo/SP",
  trabalhos: [
    {
      title: "Original",
      description: "Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz, guiado por músicas e conteúdos para cura física, espiritual, mudança de hábitos, encontro de propósito, autoconhecimento, conexão com seu eu interior e elevação vibracional.",
      image: "/images/trabalhos/original.jpg",
      horario: "18h às 00h",
      contribuicao: "R$ 100",
      badge: "PRINCIPAL",
      badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
      highlighted: true,
    },
    {
      title: "Encontro Terapêutico",
      description: "Encontro voltado para práticas terapêuticas integrativas, proporcionando cura e equilíbrio através de técnicas complementares aliadas ao uso sacramental da ayahuasca.",
      image: "/images/trabalhos/encontro-terapeutico.jpg",
      badge: "TERAPÊUTICO",
      badgeColor: "bg-cdl-primary-light text-cdl-text-light",
    },
  ],
  eventos: [
    { data: "11/04", nome: "Encontro Terapêutico", tipo: "Encontro Terapêutico" },
    { data: "25/04", nome: "Original", tipo: "Original" },
  ],
  galeriaFotos: [
    "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_800/v1776188749/caminhodaluz/ipiranga.jpg",
  ],
};
