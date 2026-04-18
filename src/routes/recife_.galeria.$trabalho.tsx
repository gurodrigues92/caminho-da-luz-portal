import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/recife_/galeria/$trabalho")({
  head: ({ params }) => ({
    meta: [
      { title: `Galeria ${params.trabalho} — Caminho da Luz Recife` },
      { name: "description", content: `Fotos dos trabalhos de ${params.trabalho} no Caminho da Luz Recife.` },
    ],
  }),
  component: function Component() {
    const { trabalho } = Route.useParams();
    return <GaleriaCasa casa="Recife" casaSlug="recife" trabalhoSlug={trabalho} />;
  },
});
