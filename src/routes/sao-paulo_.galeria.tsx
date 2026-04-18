import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa, PLACEHOLDER_FOTOS } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/sao-paulo_/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Caminho da Luz São Paulo" },
      { name: "description", content: "Fotos dos trabalhos do Caminho da Luz São Paulo." },
    ],
  }),
  component: () => <GaleriaCasa casa="São Paulo" fotos={PLACEHOLDER_FOTOS} />,
});
