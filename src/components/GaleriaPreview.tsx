import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { Expand } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGaleria } from "@/hooks/useGaleria";

interface GaleriaPreviewProps {
  casa: string;
  casaSlug: string;
}

export function GaleriaPreview({ casa, casaSlug }: GaleriaPreviewProps) {
  const { eventos, loading } = useGaleria(casaSlug, null, 6);

  if (loading) {
    return (
      <div>
        <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-3 text-center">
          Galeria
        </h2>
        <p className="text-cdl-text-muted text-center mb-8">Registros dos nossos trabalhos</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const fotos = eventos.flatMap((e) => e.fotos).slice(0, 6);
  const galeriaHref = `/${casaSlug}/galeria`;

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-3 text-center">
        Galeria
      </h2>
      <p className="text-cdl-text-muted text-center mb-8">Registros dos nossos trabalhos</p>

      {fotos.length > 0 ? (
        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fotos.map((foto, i) => (
            <motion.div
              key={foto.id}
              variants={fadeUp}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={foto.url_thumbnail ?? foto.url_imagem}
                alt={`Galeria ${casa} ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Expand className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-cdl-text-muted italic mb-2">
          Em breve, novos registros dos nossos trabalhos.
        </p>
      )}

      <div className="text-center mt-8">
        <Button asChild variant="default" size="lg" className="font-label uppercase tracking-widest">
          <Link to={galeriaHref as any}>
            Ver galeria completa de {casa}
            <Expand className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
