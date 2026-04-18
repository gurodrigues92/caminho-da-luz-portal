import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/itarare_/galeria/$trabalho")({
  head: ({ params }) => ({
    meta: [
      { title: `Galeria ${params.trabalho} — Caminho da Luz Itararé` },
      { name: "description", content: `Fotos dos trabalhos de ${params.trabalho} no Caminho da Luz Itararé.` },
    ],
  }),
  component: function Component() {
    const { trabalho } = Route.useParams();
    return <GaleriaCasa casa="Itararé" casaSlug="itarare" trabalhoSlug={trabalho} />;
  },
});
