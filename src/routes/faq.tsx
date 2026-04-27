import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fadeUp } from "@/lib/animations";

const faqData = [
  { question: "O que é o Santo Daime?", answer: "O Santo Daime é uma doutrina espiritual que teve origem na floresta amazônica, fundada por Raimundo Irineu Serra (Mestre Irineu). Utiliza a ayahuasca como sacramento para expansão da consciência, cura espiritual e autoconhecimento." },
  { question: "O que é Ayahuasca?", answer: "A Ayahuasca é uma bebida sacramental preparada a partir de duas plantas amazônicas: o cipó Jagube (Banisteriopsis caapi) e a folha Rainha (Psychotria viridis). Seu uso religioso é reconhecido e regulamentado pelo governo brasileiro." },
  { question: "O uso da Ayahuasca é legal?", answer: "Sim. O uso religioso da Ayahuasca é legal no Brasil, regulamentado pelo CONAD (Conselho Nacional de Políticas sobre Drogas) desde 2010, através da Resolução nº 1." },
  { question: "Preciso ter experiência prévia para participar?", answer: "Não é necessária experiência prévia. Oferecemos o trabalho Sementes, especialmente desenvolvido para quem deseja conhecer esta sagrada medicina. É uma porta de entrada segura e acolhedora." },
  { question: "Quais são os tipos de trabalho oferecidos?", answer: "Oferecemos diversos formatos: Original (trabalho principal com consagração de ayahuasca), Sementes (ideal para iniciantes), Despertar (formato de audição com duas consagrações), Florescer (exclusivo feminino) e Humano (exclusivo masculino), além da Clínica Caminho da Luz." },
  { question: "O que é a Clínica Caminho da Luz?", answer: "A Clínica funciona às segundas-feiras e oferece atendimento terapêutico com ayahuasca para pessoas que buscam ajuda com depressão, dependências, ansiedade e outros desafios. O atendimento é agendado." },
  { question: "Qual é o valor de contribuição?", answer: "Os valores variam por tipo de trabalho: Original R$ 100, Despertar R$ 80, Sementes R$ 60. A contribuição ajuda a manter o espaço e os trabalhos." },
  { question: "Existe alguma restrição para participar?", answer: "Sim. É necessário preencher uma anamnese prévia. Pessoas com histórico de esquizofrenia, psicose ou transtornos psiquiátricos graves devem consultar a equipe antes de participar. Gestantes, lactantes e menores de 18 anos também possuem restrições." },
  { question: "Como me preparo para um trabalho?", answer: "Recomendamos dieta leve no dia (evitar carnes vermelhas, alimentos gordurosos e bebidas alcoólicas), usar roupas brancas e confortáveis, e chegar com antecedência ao horário marcado." },
  { question: "Preciso usar roupa branca?", answer: "Sim, pedimos que todos os participantes usem roupas brancas ou claras durante os trabalhos. Isso faz parte da tradição e contribui para a harmonia energética do ambiente." },
  { question: "Onde ficam as casas do Caminho da Luz?", answer: "Temos casas em Sorocaba/SP (sede principal), São Paulo/SP, Pernambuco e Itararé/SP. Cada casa possui seu próprio calendário de trabalhos." },
  { question: "Como faço para participar pela primeira vez?", answer: "Entre em contato pelo WhatsApp da casa mais próxima de você, preencha a anamnese (disponível para download em nosso site) e aguarde a confirmação da equipe." },
  { question: "O Caminho da Luz é uma religião?", answer: "O Instituto Caminho da Luz é um centro espiritual universalista. Embora tenha raízes no Santo Daime, nossa abordagem é plural e respeita todas as tradições espirituais. Buscamos a expansão da consciência de forma inclusiva." },
  { question: "Posso levar acompanhante?", answer: "Acompanhantes que não participarão do trabalho não podem permanecer no espaço durante a cerimônia. Se deseja trazer alguém, essa pessoa também precisa se inscrever e preencher a anamnese." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Perguntas Frequentes · Caminho da Luz" },
      { name: "description", content: "Perguntas frequentes sobre o Instituto Caminho da Luz, Santo Daime, Ayahuasca e nossos trabalhos espirituais." },
      { property: "og:title", content: "FAQ — Perguntas Frequentes · Caminho da Luz" },
      { property: "og:description", content: "Tire suas dúvidas sobre o Caminho da Luz e o Santo Daime." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/faq" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/faq" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-cdl-bg-light">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl text-cdl-text font-semibold">Perguntas Frequentes</h1>
            <p className="text-cdl-text-muted mt-3">Tire suas dúvidas sobre o Caminho da Luz</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className={`rounded-lg px-4 border-cdl-primary/10 ${i % 2 === 0 ? "bg-cdl-bg-light" : "bg-muted/50"}`}
                >
                  <AccordionTrigger className="text-cdl-text hover:no-underline text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-cdl-text-muted leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
