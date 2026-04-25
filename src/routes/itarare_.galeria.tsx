import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/itarare_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — Santo Daime Itararé | Caminho da Luz" },
      { name: "description", content: "Galeria de fotos dos trabalhos do Caminho da Luz Itararé (SP): Original e Sementes. Registros das cerimônias com Santo Daime." },
      { property: "og:title", content: "Galeria — Caminho da Luz Itararé" },
      { property: "og:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Itararé." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/itarare.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/itarare/galeria" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Galeria — Caminho da Luz Itararé" },
      { name: "twitter:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Itararé." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188749/caminhodaluz/itarare.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caminhodaluzdaime.com.br/itarare/galeria" }],
  }),
  component: () => <GaleriaCasa casa="Itararé" casaSlug="itarare" />,
});
