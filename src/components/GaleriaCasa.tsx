import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGaleria } from "@/hooks/useGaleria";

interface GaleriaCasaProps {
  casa: string;
  casaSlug: string;
  trabalhoSlug?: string;
}

const TIPO_BADGE_COLORS: Record<string, string> = {
  Original: "bg-cdl-primary text-cdl-text-light",
  Sementes: "bg-cdl-secondary text-cdl-bg-dark",
  Despertar: "bg-cdl-accent text-cdl-text-light",
  Florescer: "bg-pink-500 text-white",
  Humano: "bg-cdl-primary text-cdl-text-light",
  Fogueira: "bg-orange-500 text-white",
  Clínica: "bg-cdl-accent text-cdl-text-light",
  "Encontro Terapêutico": "bg-cdl-secondary text-cdl-bg-dark",
};

function formatarData(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function GaleriaCasa({ casa, casaSlug, trabalhoSlug }: GaleriaCasaProps) {
  const navigate = useNavigate();
  const { eventos, trabalhos, loading, error } = useGaleria(casaSlug, trabalhoSlug ?? null);
  const [lightbox, setLightbox] = useState<{ eventoIdx: number; fotoIdx: number } | null>(null);

  const trabalhoAtivo = trabalhos.find((t) => t.tipo_trabalho_slug === trabalhoSlug);

  const goTo = (slug: string | null) => {
    if (slug) {
      navigate({ to: "/$casa/galeria/$trabalho" as any, params: { casa: casaSlug, trabalho: slug } });
    } else {
      navigate({ to: `/${casaSlug}/galeria` as any });
    }
  };

  const eventoAtivo = lightbox !== null ? eventos[lightbox.eventoIdx] : null;
  const fotosLightbox = eventoAtivo?.fotos ?? [];

  return (
    <div className="pt-16">
      <section className="py-20 bg-cdl-bg-light min-h-[60vh]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-5xl text-cdl-text font-semibold">
              Galeria — {casa}
            </h1>
            <p className="text-cdl-text-muted mt-3">Registros dos nossos trabalhos</p>
          </div>

          {/* Filtros */}
          {trabalhos.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => goTo(null)}
                className={`px-4 py-2 rounded-full text-sm font-label uppercase tracking-wider transition-all ${
                  !trabalhoSlug
                    ? "bg-cdl-primary text-cdl-text-light"
                    : "border border-cdl-primary/20 text-cdl-text-muted hover:border-cdl-primary/40"
                }`}
              >
                Todos
              </button>
              {trabalhos.map((t) => (
                <button
                  key={t.tipo_trabalho_slug}
                  onClick={() => goTo(t.tipo_trabalho_slug)}
                  className={`px-4 py-2 rounded-full text-sm font-label uppercase tracking-wider transition-all ${
                    trabalhoSlug === t.tipo_trabalho_slug
                      ? "bg-cdl-primary text-cdl-text-light"
                      : "border border-cdl-primary/20 text-cdl-text-muted hover:border-cdl-primary/40"
                  }`}
                >
                  {t.tipo_trabalho}
                </button>
              ))}
            </div>
          )}

          {/* Estados */}
          {loading && (
            <div className="space-y-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((j) => (
                      <Skeleton key={j} className="aspect-square rounded-xl" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="text-cdl-text-muted text-center">
              Não foi possível carregar a galeria. Tente novamente em instantes.
            </p>
          )}

          {!loading && !error && eventos.length === 0 && !trabalhoSlug && (
            <p className="text-cdl-text-muted text-center">
              Galeria em breve. Acompanhe nosso{" "}
              <a
                href="https://instagram.com/caminhodaluzdaime"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cdl-primary underline hover:text-cdl-primary-light"
              >
                Instagram
              </a>
              .
            </p>
          )}

          {!loading && !error && eventos.length === 0 && trabalhoSlug && (
            <p className="text-cdl-text-muted text-center">
              Nenhum registro de {trabalhoAtivo?.tipo_trabalho ?? trabalhoSlug} ainda.{" "}
              <button
                onClick={() => goTo(null)}
                className="text-cdl-primary underline hover:text-cdl-primary-light"
              >
                Ver todas as fotos
              </button>
              .
            </p>
          )}

          {/* Eventos agrupados */}
          {!loading && !error && eventos.length > 0 && (
            <div className="space-y-12">
              {eventos.map((evento, eventoIdx) => (
                <div key={evento.id}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="font-heading text-xl md:text-2xl text-cdl-text font-semibold">
                      {formatarData(evento.data_evento)}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-label uppercase tracking-wider ${
                        TIPO_BADGE_COLORS[evento.tipo_trabalho] ??
                        "bg-cdl-primary text-cdl-text-light"
                      }`}
                    >
                      {evento.tipo_trabalho}
                    </span>
                    {evento.titulo && (
                      <span className="text-cdl-text-muted text-sm">— {evento.titulo}</span>
                    )}
                  </div>
                  {evento.fotos.length === 0 ? (
                    <p className="text-cdl-text-muted text-sm">Sem fotos publicadas.</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {evento.fotos.map((foto, fotoIdx) => (
                        <div
                          key={foto.id}
                          className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => setLightbox({ eventoIdx, fotoIdx })}
                        >
                          <img
                            src={foto.url_thumbnail ?? foto.url_imagem}
                            alt={`${evento.tipo_trabalho} ${formatarData(evento.data_evento)} foto ${fotoIdx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={lightbox !== null} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-none p-0">
          <DialogTitle className="sr-only">Foto ampliada</DialogTitle>
          {lightbox !== null && fotosLightbox.length > 0 && (
            <div className="relative">
              <img
                src={fotosLightbox[lightbox.fotoIdx].url_imagem}
                alt=""
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              {fotosLightbox.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setLightbox({
                        eventoIdx: lightbox.eventoIdx,
                        fotoIdx:
                          lightbox.fotoIdx > 0
                            ? lightbox.fotoIdx - 1
                            : fotosLightbox.length - 1,
                      })
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={() =>
                      setLightbox({
                        eventoIdx: lightbox.eventoIdx,
                        fotoIdx:
                          lightbox.fotoIdx < fotosLightbox.length - 1
                            ? lightbox.fotoIdx + 1
                            : 0,
                      })
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
