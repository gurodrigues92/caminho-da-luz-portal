import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/pernambuco_/galeria/$trabalho")({
  head: ({ params }) => ({
    meta: [
      { title: `Galeria ${params.trabalho} — Caminho da Luz Pernambuco` },
      { name: "description", content: `Fotos dos trabalhos de ${params.trabalho} no Caminho da Luz Pernambuco.` },
    ],
  }),
  component: function Component() {
    const { trabalho } = Route.useParams();
    return <GaleriaCasa casa="Pernambuco" casaSlug="pernambuco" trabalhoSlug={trabalho} />;
  },
});
