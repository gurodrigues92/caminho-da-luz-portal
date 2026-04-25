import { createFileRoute } from "@tanstack/react-router";
import { CasaPage } from "@/components/CasaPage";
import type { CasaPageProps } from "@/components/CasaPage";

export const Route = createFileRoute("/itarare")({
  head: () => ({
    meta: [
      { title: "Santo Daime Itararé — Caminho da Luz · São Paulo" },
      { name: "description", content: "Santo Daime em Itararé (SP) — Caminho da Luz. Trabalhos Original e Sementes com Ayahuasca para cura, autoconhecimento e expansão da consciência." },
      { property: "og:title", content: "Santo Daime Itararé — Caminho da Luz · São Paulo" },
      { property: "og:description", content: "Casa do Caminho da Luz em Itararé (SP). Trabalhos Original e Sementes com Santo Daime." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/itarare.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/itarare" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Santo Daime Itararé — Caminho da Luz" },
      { name: "twitter:description", content: "Casa do Caminho da Luz em Itararé, SP." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/itarare.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/itarare" },
    ],
  }),
  component: () => <CasaPage {...itarareConfig} />,
});

const itarareConfig: CasaPageProps = {
  nome: "Itararé",
  slug: "itarare",
  endereco: "Rua XV de Novembro, 156 — Centro, Itararé/SP",
  heroImage: "/images/bg/hero-itarare.jpg",
  whatsappPhone: "5515996751934",
  whatsappMessage: "Olá! Gostaria de saber mais sobre o Caminho da Luz Itararé.",
  instagramHandle: "caminhodaluzitarare",
  instagramUrl: "https://www.instagram.com/caminhodaluzitarare",
  phoneDisplay: "(15) 99675-1934",
  mapsQuery: "Rua+XV+de+Novembro,+156,+Centro,+Itararé,+SP",
  mapsAddress: "Rua XV de Novembro, 156 — Centro, Itararé/SP",
  trabalhos: [
    {
      title: "Original",
      description: "Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz.",
      image: "/images/trabalhos/original.jpg",
      horario: "18h às 00h",
      contribuicao: "R$ 150 no dia · R$ 120 antecipado",
      badge: "PRINCIPAL",
      badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
      highlighted: true,
    },
    {
      title: "Sementes",
      description: "O Sementes é um projeto pensado e desenvolvido para quem tem interesse em conhecer esta sagrada medicina. Este projeto acontece em forma de reuniões com audições de elevação da nossa frequência vibratória.",
      image: "/images/trabalhos/sementes.jpg",
      horario: "18h às 21h",
      contribuicao: "R$ 80 no dia · R$ 60 antecipado",
      badge: "IDEAL PARA INICIANTES",
      badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
    },
  ],
  eventos: [
    { data: "18/04", nome: "Original", tipo: "Original" },
    { data: "02/05", nome: "Sementes", tipo: "Sementes" },
    { data: "16/05", nome: "Original", tipo: "Original" },
    { data: "20/06", nome: "Original", tipo: "Original" },
  ],
  galeriaFotos: [
    "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_800/v1776188749/caminhodaluz/itarare.jpg",
  ],
};
