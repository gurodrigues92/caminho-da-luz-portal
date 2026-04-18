import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/recife_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Caminho da Luz Recife" },
      { name: "description", content: "Fotos dos trabalhos do Caminho da Luz Recife." },
    ],
  }),
  component: () => <GaleriaCasa casa="Recife" casaSlug="recife" />,
});
