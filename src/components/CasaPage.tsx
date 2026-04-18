import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Instagram, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TrabalhoCard } from "@/components/TrabalhoCard";
import { EventCalendar, type Evento } from "@/components/EventCalendar";
import { GaleriaPreview } from "@/components/GaleriaPreview";
import { AniversariantesDoMes } from "@/components/AniversariantesDoMes";
import type { ReactNode } from "react";

interface TrabalhoConfig {
  title: string;
  description: string;
  image?: string;
  horario?: string;
  contribuicao?: string;
  badge?: string;
  badgeColor?: string;
  highlighted?: boolean;
}

export interface CasaPageProps {
  nome: string;
  slug: "sorocaba" | "sao-paulo" | "recife" | "itarare";
  endereco: string;
  heroImage: string;
  whatsappPhone: string;
  whatsappMessage: string;
  instagramHandle: string;
  instagramUrl: string;
  phoneDisplay: string;
  isSede?: boolean;
  trabalhos: TrabalhoConfig[];
  trabalhosLayout?: "grid" | "single";
  eventos?: Evento[];
  calendarTitle?: string;
  calendarEmptyMessage?: string;
  showCalendario?: boolean;
  galeriaFotos?: string[];
  mapsQuery?: string;
  mapsAddress?: string;
  clinicaSection?: ReactNode;
}

export function CasaPage({
  nome,
  slug,
  endereco,
  heroImage,
  whatsappPhone,
  whatsappMessage,
  instagramHandle,
  instagramUrl,
  phoneDisplay,
  isSede,
  trabalhos,
  trabalhosLayout = "grid",
  eventos,
  calendarTitle,
  calendarEmptyMessage,
  showCalendario = true,
  mapsQuery,
  mapsAddress,
  clinicaSection,
}: CasaPageProps) {
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {isSede && (
            <span className="inline-block mb-4 px-3 py-1 bg-cdl-secondary text-cdl-bg-dark text-xs font-label uppercase tracking-widest rounded">
              Sede Principal
            </span>
          )}
          <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-3">Caminho da Luz — {nome}</h1>
          <p className="text-cdl-text-light/80 mb-6">{endereco}</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram @${instagramHandle}`}
              className="inline-flex items-center gap-2 min-h-11 px-3 py-2 rounded-full text-cdl-text-light/80 hover:text-cdl-text-light hover:bg-white/10 text-sm transition-colors"
            >
              <Instagram className="h-5 w-5" /> @{instagramHandle}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${phoneDisplay}`}
              className="inline-flex items-center gap-2 min-h-11 px-3 py-2 rounded-full text-cdl-text-light/80 hover:text-cdl-text-light hover:bg-white/10 text-sm transition-colors"
            >
              <WhatsAppIcon className="h-5 w-5" /> {phoneDisplay}
            </a>
            {mapsQuery && (
              <a
                href={`https://maps.google.com/?q=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir no Google Maps"
                className="inline-flex items-center gap-2 min-h-11 px-3 py-2 rounded-full text-cdl-text-light/80 hover:text-cdl-text-light hover:bg-white/10 text-sm transition-colors"
              >
                <MapPin className="h-5 w-5" /> Mapa
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Trabalhos */}
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">Nossos Trabalhos</h2>
          </motion.div>
          <div className={trabalhosLayout === "single" ? "max-w-lg mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
            {trabalhos.map((t) => (
              <TrabalhoCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Clínica (Sorocaba only) */}
      {clinicaSection}

      {/* Calendário */}
      {showCalendario && eventos ? (
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
            <EventCalendar
              title={calendarTitle || `Calendário 2026 — ${nome}`}
              eventos={eventos}
              casa={nome}
              emptyMessage={calendarEmptyMessage}
            />
          </div>
        </section>
      ) : !showCalendario ? (
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl text-cdl-text font-semibold mb-4">Calendário</h2>
              <p className="text-cdl-text-muted">{calendarEmptyMessage || "Calendário em breve. Entre em contato pelo WhatsApp para saber as próximas datas."}</p>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Aniversariantes do Mês */}
      <AniversariantesDoMes casa={nome} />

      {/* Galeria Preview */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <GaleriaPreview casa={nome} casaSlug={slug} />
        </div>
      </section>

      {/* Google Maps */}
      {mapsQuery && (
        <section className="py-20 bg-cdl-bg-light">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold mb-8">Como Chegar</h2>
              <div className="rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
                <iframe
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
              </div>
              {mapsAddress && (
                <p className="text-cdl-text-muted text-sm mt-4">
                  {mapsAddress} ·{" "}
                  <a href={`https://maps.google.com/?q=${mapsQuery}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-cdl-text transition-colors">
                    Abrir no Google Maps
                  </a>
                </p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA WhatsApp */}
      <section className="py-20 bg-cdl-bg-dark grain-overlay relative text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-xl px-4">
          <h2 className="font-heading text-3xl text-cdl-text-light font-semibold mb-4">Reserve sua vaga para o próximo trabalho</h2>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cdl-secondary text-cdl-bg-dark font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-secondary/90 transition-all duration-300 shadow-lg"
          >
            Chamar no WhatsApp
          </a>
          <p className="text-cdl-text-light/60 text-sm mt-6">
            Primeira vez?{" "}
            <a href="/docs/Anamnese_Formulario.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-cdl-text-light transition-colors">
              Baixe a anamnese antes
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
