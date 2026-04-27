import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recife")({
  beforeLoad: () => {
    throw redirect({ to: "/pernambuco", statusCode: 301 });
  },
  component: () => null,
});
