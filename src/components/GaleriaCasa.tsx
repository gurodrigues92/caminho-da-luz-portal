import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GaleriaCasaProps {
  casa: string;
  fotos: string[];
}

export function GaleriaCasa({ casa, fotos }: GaleriaCasaProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="pt-16">
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl text-cdl-text font-semibold">
              Galeria — {casa}
            </h1>
            <p className="text-cdl-text-muted mt-3">Registros dos nossos trabalhos</p>
          </div>

          {fotos.length === 0 ? (
            <p className="text-cdl-text-muted text-center">
              Galeria em breve. Acompanhe nosso Instagram.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {fotos.map((foto, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={foto}
                    alt={`Foto ${casa} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-none p-0">
          <DialogTitle className="sr-only">Foto ampliada</DialogTitle>
          {lightboxIndex !== null && (
            <div className="relative">
              <img
                src={fotos[lightboxIndex]}
                alt=""
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              <button
                onClick={() =>
                  setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : fotos.length - 1)
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex(lightboxIndex < fotos.length - 1 ? lightboxIndex + 1 : 0)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const PLACEHOLDER_FOTOS = [
  "https://caminhodaluzdaime.com.br/images/mural/desktop/fogueira/24-06-23/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/original/10-06/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/estudos/20-05/2.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/sementes/22/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/florescer/1.jpg",
  "https://caminhodaluzdaime.com.br/images/mural/desktop/original/1.jpg",
];
