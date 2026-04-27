import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recife_/galeria/$trabalho")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/pernambuco/galeria/$trabalho",
      params: { trabalho: params.trabalho },
      statusCode: 301,
    });
  },
  component: () => null,
});
