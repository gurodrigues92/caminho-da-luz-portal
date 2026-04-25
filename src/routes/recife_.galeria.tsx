import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/recife_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — Santo Daime Recife | Caminho da Luz" },
      { name: "description", content: "Galeria de fotos dos trabalhos do Caminho da Luz Recife (PE). Registros das cerimônias com Santo Daime em Pernambuco." },
      { property: "og:title", content: "Galeria — Caminho da Luz Recife" },
      { property: "og:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Recife." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188750/caminhodaluz/recife.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/recife/galeria" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Galeria — Caminho da Luz Recife" },
      { name: "twitter:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Recife." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188750/caminhodaluz/recife.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caminhodaluzdaime.com.br/recife/galeria" }],
  }),
  component: () => <GaleriaCasa casa="Recife" casaSlug="recife" />,
});
