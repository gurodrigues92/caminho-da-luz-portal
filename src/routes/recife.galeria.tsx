import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa, PLACEHOLDER_FOTOS } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/recife/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Caminho da Luz Recife" },
      { name: "description", content: "Fotos dos trabalhos do Caminho da Luz Recife." },
    ],
  }),
  component: () => <GaleriaCasa casa="Recife" fotos={PLACEHOLDER_FOTOS} />,
});
