import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa, PLACEHOLDER_FOTOS } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/itarare/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Caminho da Luz Itararé" },
      { name: "description", content: "Fotos dos trabalhos do Caminho da Luz Itararé." },
    ],
  }),
  component: () => <GaleriaCasa casa="Itararé" fotos={PLACEHOLDER_FOTOS} />,
});
