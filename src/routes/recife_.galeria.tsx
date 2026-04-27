import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recife_/galeria")({
  beforeLoad: () => {
    throw redirect({ to: "/pernambuco/galeria", statusCode: 301 });
  },
  component: () => null,
});
