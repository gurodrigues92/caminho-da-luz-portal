import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface TrabalhoCardProps {
  title: string;
  description: string;
  image?: string;
  horario?: string;
  contribuicao?: string;
  badge?: string;
  badgeColor?: string;
  highlighted?: boolean;
}

export function TrabalhoCard({
  title,
  description,
  image,
  horario,
  contribuicao,
  badge,
  badgeColor = "bg-cdl-primary text-cdl-text-light",
  highlighted = false,
}: TrabalhoCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className={`rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${highlighted ? "border-2 border-cdl-secondary" : "border border-cdl-primary/10"}`}
    >
      {image ? (
        <div className="aspect-[16/9] relative">
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-cdl-primary flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-16 w-16 text-cdl-text-light/30" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="24" cy="24" r="20" />
            <path d="M24 14v20M14 24h20" />
          </svg>
        </div>
      )}
      <div className="p-6 bg-card">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading text-xl font-semibold text-cdl-text">{title}</h3>
          {badge && (
            <span className={`inline-block px-2 py-0.5 text-[10px] font-label uppercase tracking-widest rounded ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-cdl-text-muted text-sm leading-relaxed mb-4">{description}</p>
        {(horario || contribuicao) && (
          <div className="flex items-center gap-4 text-xs text-cdl-text-muted font-label uppercase tracking-wider">
            {horario && <span>🕐 {horario}</span>}
            {contribuicao && <span>💛 {contribuicao}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
