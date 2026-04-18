import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/sorocaba_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Caminho da Luz Sorocaba" },
      { name: "description", content: "Fotos dos trabalhos espirituais do Caminho da Luz Sorocaba." },
    ],
  }),
  component: () => <GaleriaCasa casa="Sorocaba" casaSlug="sorocaba" />,
});
