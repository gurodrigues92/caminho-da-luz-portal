import { createFileRoute } from "@tanstack/react-router";
import { GaleriaCasa } from "@/components/GaleriaCasa";

export const Route = createFileRoute("/sorocaba_/galeria/$trabalho")({
  head: ({ params }) => ({
    meta: [
      { title: `Galeria ${params.trabalho} — Caminho da Luz Sorocaba` },
      { name: "description", content: `Fotos dos trabalhos de ${params.trabalho} no Caminho da Luz Sorocaba.` },
    ],
  }),
  component: function Component() {
    const { trabalho } = Route.useParams();
    return <GaleriaCasa casa="Sorocaba" casaSlug="sorocaba" trabalhoSlug={trabalho} />;
  },
});
