import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/sorocaba_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — Santo Daime Sorocaba | Caminho da Luz" },
      { name: "description", content: "Galeria de fotos dos trabalhos do Caminho da Luz Sorocaba: Original, Sementes, Despertar, Florescer e mais. Registros das cerimônias com Santo Daime." },
      { property: "og:title", content: "Galeria — Caminho da Luz Sorocaba" },
      { property: "og:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Sorocaba." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/sorocaba/galeria" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Galeria — Caminho da Luz Sorocaba" },
      { name: "twitter:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Sorocaba." },
      { name: "twitter:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caminhodaluzdaime.com.br/sorocaba/galeria" }],
  }),
  component: () => <GaleriaCasa casa="Sorocaba" casaSlug="sorocaba" />,
});
