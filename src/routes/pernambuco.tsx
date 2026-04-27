import { createFileRoute } from "@tanstack/react-router";
import { CasaPage } from "@/components/CasaPage";
import type { CasaPageProps } from "@/components/CasaPage";

export const Route = createFileRoute("/pernambuco")({
  head: () => ({
    meta: [
      { title: "Santo Daime Pernambuco — Caminho da Luz" },
      { name: "description", content: "Santo Daime em Pernambuco — Caminho da Luz. Trabalhos espirituais com Ayahuasca para cura, autoconhecimento e expansão da consciência." },
      { property: "og:title", content: "Santo Daime Pernambuco — Caminho da Luz" },
      { property: "og:description", content: "Casa do Caminho da Luz em Pernambuco. Trabalhos espirituais com Santo Daime." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188750/caminhodaluz/recife.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/pernambuco" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Santo Daime Pernambuco — Caminho da Luz" },
      { name: "twitter:description", content: "Casa do Caminho da Luz em Pernambuco." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188750/caminhodaluz/recife.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/pernambuco" },
    ],
  }),
  component: () => <CasaPage {...pernambucoConfig} />,
});

const pernambucoConfig: CasaPageProps = {
  nome: "Pernambuco",
  slug: "pernambuco",
  endereco: "Pernambuco — endereço em atualização",
  heroImage: "/images/bg/hero-pernambuco.jpg",
  whatsappPhone: "5581992038383",
  whatsappMessage: "Olá! Gostaria de saber mais sobre o Caminho da Luz Pernambuco.",
  instagramHandle: "caminhodaluz_pe",
  instagramUrl: "https://www.instagram.com/caminhodaluz_pe",
  phoneDisplay: "(81) 99203-8383",
  trabalhosLayout: "single",
  showCalendario: false,
  calendarEmptyMessage: "Calendário em breve. Entre em contato pelo WhatsApp para saber as próximas datas.",
  trabalhos: [
    {
      title: "Original",
      description: "Um trabalho espiritual universalista de expansão de consciência através da consagração da medicina Ayahuasca, pautado no amor e na luz.",
      image: "/images/trabalhos/original.jpg",
      badge: "PRINCIPAL",
      badgeColor: "bg-cdl-secondary text-cdl-bg-dark",
      highlighted: true,
    },
  ],
  galeriaFotos: [
    "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_800/v1776188750/caminhodaluz/recife.jpg",
  ],
};
