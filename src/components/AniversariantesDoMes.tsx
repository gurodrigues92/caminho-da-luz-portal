import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";

interface Aniversariante {
  nome: string;
  mes: number;
  dia: number;
  casa: string;
}

const MESES = [
  "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function AniversariantesDoMes({ casa }: { casa?: string }) {
  const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>([]);
  const mesAtual = new Date().getMonth() + 1;

  useEffect(() => {
    fetch("/data/aniversariantes.json")
      .then((r) => r.json())
      .then((data: Aniversariante[]) => {
        const filtered = data.filter(
          (a) => a.mes === mesAtual && (!casa || a.casa === casa)
        );
        filtered.sort((a, b) => a.dia - b.dia);
        setAniversariantes(filtered);
      })
      .catch(() => setAniversariantes([]));
  }, [mesAtual, casa]);

  if (aniversariantes.length === 0) return null;

  return (
    <section className="py-16 bg-cdl-bg-light">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="h-5 w-5 text-cdl-secondary fill-cdl-secondary" />
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">
              Aniversariantes de {MESES[mesAtual]}
            </h2>
            <Star className="h-5 w-5 text-cdl-secondary fill-cdl-secondary" />
          </div>
          <p className="text-cdl-text-muted text-sm">
            Parabéns aos nossos queridos estrelados ✨
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4"
        >
          {aniversariantes.map((a, i) => (
            <motion.div
              key={`${a.nome}-${a.dia}-${i}`}
              variants={fadeUp}
              className="flex items-center gap-2.5 rounded-xl border border-cdl-secondary/30 bg-cdl-secondary/5 px-3 py-2.5 shadow-sm sm:gap-3 sm:px-5 sm:py-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cdl-secondary/20 sm:h-10 sm:w-10">
                <Star className="h-4 w-4 text-cdl-secondary fill-cdl-secondary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-base sm:text-lg text-cdl-text font-semibold truncate">{a.nome}</p>
                <p className="text-cdl-text-muted text-xs truncate">
                  {a.dia}/{String(a.mes).padStart(2, "0")}
                  {!casa && ` · ${a.casa}`}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
