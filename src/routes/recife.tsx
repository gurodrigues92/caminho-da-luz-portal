import { createFileRoute } from "@tanstack/react-router";
import { CasaPage } from "@/components/CasaPage";
import type { CasaPageProps } from "@/components/CasaPage";

export const Route = createFileRoute("/recife")({
  head: () => ({
    meta: [
      { title: "Santo Daime Recife — Caminho da Luz · Pernambuco" },
      { name: "description", content: "Santo Daime em Recife (PE) — Caminho da Luz. Trabalhos espirituais com Ayahuasca para cura, autoconhecimento e expansão da consciência em Pernambuco." },
      { property: "og:title", content: "Santo Daime Recife — Caminho da Luz · Pernambuco" },
      { property: "og:description", content: "Casa do Caminho da Luz em Recife (PE). Trabalhos espirituais com Santo Daime." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188750/caminhodaluz/recife.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/recife" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Santo Daime Recife — Caminho da Luz" },
      { name: "twitter:description", content: "Casa do Caminho da Luz em Recife — Pernambuco." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188750/caminhodaluz/recife.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/recife" },
    ],
  }),
  component: () => <CasaPage {...recifeConfig} />,
});

const recifeConfig: CasaPageProps = {
  nome: "Recife",
  slug: "recife",
  endereco: "Recife/PE — endereço em atualização",
  heroImage: "/images/bg/hero-recife.jpg",
  whatsappPhone: "5581992038383",
  whatsappMessage: "Olá! Gostaria de saber mais sobre o Caminho da Luz Recife.",
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
