import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { Expand } from "lucide-react";

interface GaleriaPreviewProps {
  casa: string;
  casaSlug: string;
  fotos: string[];
}

export function GaleriaPreview({ casa, casaSlug, fotos }: GaleriaPreviewProps) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-3 text-center">Galeria</h2>
      <p className="text-cdl-text-muted text-center mb-8">Registros dos nossos trabalhos</p>
      <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fotos.slice(0, 6).map((foto, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <img src={foto} alt={`Galeria ${casa} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <Expand className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-8">
        <Link
          to={`/${casaSlug}/galeria` as any}
          className="inline-flex items-center gap-2 px-6 py-3 bg-cdl-primary text-cdl-text-light font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-primary-light transition-all duration-300"
        >
          Ver galeria completa
        </Link>
      </div>
    </motion.div>
  );
}
