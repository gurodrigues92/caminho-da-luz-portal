import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fadeUp } from "@/lib/animations";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Instituto Caminho da Luz" },
      { name: "description", content: "Conheça a história do Instituto Caminho da Luz, nossa missão, visão, valores e o Decálogo do Estrelado." },
      { property: "og:title", content: "Sobre — Instituto Caminho da Luz" },
      { property: "og:description", content: "Conheça a história do Instituto Caminho da Luz." },
    ],
  }),
  component: SobrePage,
});


function SobrePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-cdl-bg-dark grain-overlay">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.img
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              src="https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188751/caminhodaluz/pedrao.jpg"
              alt="João Carlos Pedrão"
              className="rounded-xl aspect-[3/4] object-cover w-full max-w-md mx-auto"
              loading="lazy"
            />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h1 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-6">Sobre o Caminho da Luz</h1>
              <p className="text-cdl-text-light/80 leading-relaxed mb-4">
                O Instituto Caminho da Luz nasceu com o propósito de mudar o mundo. A princípio, essa afirmação pode parecer ousada, impossível ou prepotente. Na verdade, mudar o mundo é uma tarefa que se inicia mudando a cada um de nós. Se eu melhoro, o mundo melhora junto. Se você sorri, o mundo sorri junto. Se uma família se une, o mundo fica mais unido. Então, expandindo a consciência, com o uso religioso e de estudos do Santo Daime/Ayahuasca, vamos procurando essa mudança, que se dá muito mais no campo das ações, do que nas palavras.
              </p>
              <p className="text-cdl-text-light/80 leading-relaxed mb-4">
                Somos filhos do Céu Sagrado, uma das linhas do Santo Daime que busca a expansão da consciência através do uso sacramental da ayahuasca, aliado a práticas de cura, estudo e autoconhecimento.
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-cdl-secondary/20 text-cdl-secondary text-xs font-label uppercase tracking-widest rounded">
                Desde 2014
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">Missão, Visão e Valores</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Missão", text: "Ser um centro espiritual universalista e plural, capaz de expandir a consciência através de estudos e do uso do Santo Daime (ayahuasca)" },
              { title: "Visão", text: "Alcançar todo o planeta, através de unidades espalhadas pelo Brasil e pelos países, além dos múltiplos meios digitais e físicos, sendo respeitado pela nova sociedade." },
              { title: "Valores", text: "Amor e Doação, Luz e Cura, Liberdade e Disciplina, Expansão e Conhecimento, Amizade e União" },
            ].map((card) => (
              <motion.div key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-xl border border-cdl-primary/10 p-8 text-center">
                <h3 className="font-heading text-2xl text-cdl-text font-semibold mb-3">{card.title}</h3>
                <p className="text-cdl-text-muted text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decálogo do Estrelado */}
      <section className="py-20 bg-cdl-bg-dark grain-overlay relative">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text-light font-semibold">Decálogo do Estrelado</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Accordion type="single" collapsible className="space-y-2">
              {[
                "Amar a Deus sobre todas as coisas e ao próximo como a si mesmo.",
                "Fazer caridade, sempre que possível, sem ostentação.",
                "Respeitar e acatar a hierarquia espiritual.",
                "Procurar manter sempre limpo o corpo, a mente e o espírito.",
                "Não usar substâncias que causem dependência ou prejudiquem a saúde.",
                "Não praticar a maledicência.",
                "Ser pontual e assíduo nos trabalhos e compromissos.",
                "Estudar e procurar a elevação espiritual constantemente.",
                "Ser humilde, reconhecendo sempre as próprias limitações.",
                "Ter fé, firmeza e constância no caminho espiritual.",
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-cdl-primary/20 rounded-lg bg-cdl-primary/10 px-4">
                  <AccordionTrigger className="text-cdl-text-light hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span className="text-cdl-secondary font-label text-sm">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-left text-sm">{item}</span>
                    </span>
                  </AccordionTrigger>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Download Anamnese */}
      <section className="py-16 bg-cdl-bg-light text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="font-heading text-2xl text-cdl-text font-semibold mb-4">Anamnese</h2>
          <p className="text-cdl-text-muted mb-6 max-w-md mx-auto text-sm">
            Se é sua primeira vez, preencha a anamnese antes da sua participação.
          </p>
          <a
            href="/docs/Anamnese_Formulario.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cdl-primary text-cdl-text-light font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-primary-light transition-all duration-300"
          >
            Baixar Anamnese (PDF)
          </a>
        </motion.div>
      </section>
    </div>
  );
}
