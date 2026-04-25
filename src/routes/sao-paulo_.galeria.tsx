import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/sao-paulo_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — Santo Daime São Paulo | Caminho da Luz" },
      { name: "description", content: "Galeria de fotos dos trabalhos do Caminho da Luz São Paulo (Vila Formosa): Original e Encontro Terapêutico. Registros das cerimônias com Santo Daime." },
      { property: "og:title", content: "Galeria — Caminho da Luz São Paulo" },
      { property: "og:description", content: "Fotos dos trabalhos espirituais com Santo Daime em São Paulo." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/ipiranga.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/sao-paulo/galeria" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Galeria — Caminho da Luz São Paulo" },
      { name: "twitter:description", content: "Fotos dos trabalhos espirituais com Santo Daime em São Paulo." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/ipiranga.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caminhodaluzdaime.com.br/sao-paulo/galeria" }],
  }),
  component: () => <GaleriaCasa casa="São Paulo" casaSlug="sao-paulo" />,
});
