import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/sao-paulo_/galeria/$trabalho")({
  head: ({ params }) => ({
    meta: [
      { title: `Galeria ${params.trabalho} — Caminho da Luz São Paulo` },
      { name: "description", content: `Fotos dos trabalhos de ${params.trabalho} no Caminho da Luz São Paulo.` },
    ],
  }),
  component: function Component() {
    const { trabalho } = Route.useParams();
    return <GaleriaCasa casa="São Paulo" casaSlug="sao-paulo" trabalhoSlug={trabalho} />;
  },
});
