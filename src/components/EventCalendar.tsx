import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCalendario } from "@/hooks/useCalendario";
import { Skeleton } from "@/components/ui/skeleton";

export interface Evento {
  data: string;
  nome: string;
  tipo: string;
  whatsappLink?: string;
}

interface EventCalendarProps {
  title: string;
  eventos: Evento[];
  casa?: string;
  emptyMessage?: string;
}

const tipoBadgeColor: Record<string, string> = {
  Original: "bg-cdl-primary text-cdl-text-light",
  Sementes: "bg-cdl-secondary text-cdl-bg-dark",
  Despertar: "bg-cdl-accent text-cdl-text-light",
  Florescer: "bg-pink-600 text-white",
  Humano: "bg-cdl-accent text-cdl-text-light",
  "Encontro Terapêutico": "bg-cdl-primary-light text-cdl-text-light",
  "Clínica": "bg-cdl-accent text-cdl-text-light",
};

export function EventCalendar({ title, eventos: staticEventos, casa, emptyMessage }: EventCalendarProps) {
  const { eventos: dbEventos, loading } = useCalendario(casa || '');

  const rawEventos = (casa && dbEventos.length > 0)
    ? dbEventos.map((e: any) => ({
        data: new Date(e.data_evento).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        nome: e.nome,
        tipo: e.tipo_trabalho,
        whatsappLink: e.link_whatsapp || undefined,
      }))
    : staticEventos;

  const futureEventos = rawEventos.filter((e) => {
    const parts = e.data.split("/");
    if (parts.length === 2) {
      const eventDate = new Date(2026, parseInt(parts[1]) - 1, parseInt(parts[0]));
      return eventDate >= new Date();
    }
    return true;
  }).slice(0, 6);

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
      <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-8 text-center">{title}</h2>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : futureEventos.length === 0 ? (
        <p className="text-cdl-text-muted text-center">{emptyMessage || "Calendário sendo atualizado. Entre em contato pelo WhatsApp."}</p>
      ) : (
        <div className="space-y-3">
          {futureEventos.map((evento, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-cdl-primary/10 p-4 bg-card transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-4">
                <span className="font-label text-cdl-secondary text-sm tracking-wider min-w-[50px]">
                  {evento.data}
                </span>
                <span className="font-heading text-lg text-cdl-text">{evento.nome}</span>
                <span className={`hidden sm:inline-block px-2 py-0.5 text-[10px] font-label uppercase tracking-widest rounded ${tipoBadgeColor[evento.tipo] || "bg-cdl-primary text-cdl-text-light"}`}>
                  {evento.tipo}
                </span>
              </div>
              {evento.whatsappLink && (
                <a
                  href={evento.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reservar via WhatsApp"
                  className="inline-flex items-center justify-center min-h-11 min-w-11 p-2 rounded-full text-cdl-primary hover:text-cdl-primary-light hover:bg-cdl-primary/10 transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
