import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recife/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Caminho da Luz Recife" },
      { name: "description", content: "Fotos dos trabalhos do Caminho da Luz Recife." },
    ],
  }),
  component: () => {
    return (
      <div className="pt-16 py-20 bg-cdl-bg-light text-center">
        <div className="mx-auto max-w-[1200px] px-4">
          <h1 className="font-heading text-3xl md:text-5xl text-cdl-text font-semibold mb-4">Galeria — Recife</h1>
          <p className="text-cdl-text-muted">Galeria em breve. Acompanhe nosso Instagram.</p>
        </div>
      </div>
    );
  },
});
