import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown, Instagram, MessageCircle, Camera } from "lucide-react";
import { AniversariantesDoMes } from "@/components/AniversariantesDoMes";
import { fadeUp, stagger } from "@/lib/animations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caminho da Luz — Centro Espiritual Universalista · Santo Daime" },
      { name: "description", content: "Centro Espiritual Universalista de Santo Daime com casas em Sorocaba, São Paulo, Recife e Itararé. Expansão de consciência através do uso religioso do Santo Daime." },
      { property: "og:title", content: "Caminho da Luz — Centro Espiritual Universalista · Santo Daime" },
      { property: "og:description", content: "Centro Espiritual Universalista de Santo Daime com casas em Sorocaba, São Paulo, Recife e Itararé." },
      { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
      { property: "og:url", content: "https://caminhodaluzdaime.com.br/" },
    ],
    links: [
      { rel: "canonical", href: "https://caminhodaluzdaime.com.br/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <HeroSection />
      <GaleriaHomeSection />
      <CasasSection />
      <AboutSection />
      <MissaoSection />
      <RadioSection />
      <AniversariantesDoMes />
      <CTASection />
    </div>
  );
}

// ─── Hero ───
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/bg/hero-main.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <motion.img
          variants={fadeUp}
          src="https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_200/v1776188742/caminhodaluz/logo.png"
          alt="Caminho da Luz"
          className="h-24 w-auto mx-auto mb-6"
        />
        <motion.h1
          variants={fadeUp}
          className="font-heading text-4xl md:text-7xl text-cdl-primary font-semibold"
        >
          Caminho da Luz
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="font-label uppercase tracking-[0.2em] text-cdl-secondary text-sm md:text-base mt-4"
        >
          Centro Espiritual Universalista · Santo Daime
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-8 text-cdl-primary-light italic max-w-xl mx-auto text-base md:text-lg leading-relaxed"
        >
          "Mudar o mundo é uma tarefa que se inicia mudando a cada um de nós."
        </motion.p>
        <motion.p variants={fadeUp} className="text-cdl-text-muted text-sm mt-3">
          — João Carlos Pedrão, Dirigente
        </motion.p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-8 w-8 text-cdl-text-light/50" />
      </motion.div>
    </section>
  );
}

// ─── Casas ───
const casasData = [
  {
    name: "Sorocaba",
    subtitle: "R. Paulo Varchavtchik, 365 — Brigadeiro Tobias",
    image: "/images/casas/sorocaba-card.jpg",
    to: "/sorocaba" as const,
    sede: true,
    whatsapp: "5515974011072",
    instagram: "https://www.instagram.com/caminhodaluzdaime",
  },
  {
    name: "São Paulo",
    subtitle: "Rua Medeiros Furtado, 642 — Vila Formosa",
    image: "/images/casas/sao-paulo-card.jpg",
    to: "/sao-paulo" as const,
    sede: false,
    whatsapp: "5511916652879",
    instagram: "https://www.instagram.com/caminhodaluzsp",
  },
  {
    name: "Recife",
    subtitle: "Pernambuco",
    image: "/images/casas/recife-card.jpg",
    to: "/recife" as const,
    sede: false,
    whatsapp: "5581992038383",
    instagram: "https://www.instagram.com/caminhodaluz_pe",
  },
  {
    name: "Itararé",
    subtitle: "Rua XV de Novembro, 156 — Centro",
    image: "/images/casas/itarare-card.jpg",
    to: "/itarare" as const,
    sede: false,
    whatsapp: "5515996751934",
    instagram: "https://www.instagram.com/caminhodaluzitarare",
  },
];

function CasasSection() {
  return (
    <section className="py-20 bg-cdl-bg-light">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl text-cdl-text font-semibold">Nossas Casas</h2>
          <p className="text-cdl-text-muted mt-3">Escolha a casa mais próxima de você</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {casasData.map((casa) => (
            <motion.div
              key={casa.name}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] ${casa.sede ? "md:col-span-2" : ""}`}
            >
              <div className={`relative ${casa.sede ? "aspect-video md:aspect-[2.33]" : "aspect-[4/3]"}`}>
                <Link to={casa.to} className="block absolute inset-0 z-10" aria-label={`Visitar página de ${casa.name}`}>
                  <img src={casa.image} alt={casa.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
                  {casa.sede && (
                    <span className="inline-block mb-2 px-3 py-1 bg-cdl-secondary text-cdl-bg-dark text-xs font-label uppercase tracking-widest rounded">
                      Sede Principal
                    </span>
                  )}
                  <p className="text-cdl-text-light/80 text-sm">{casa.subtitle}</p>
                  <div className="flex items-center gap-3 mt-3 pointer-events-auto">
                    <a href={casa.instagram} target="_blank" rel="noopener noreferrer" className="text-cdl-text-light/60 hover:text-cdl-text-light transition-colors">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a href={`https://api.whatsapp.com/send?phone=${casa.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-cdl-text-light/60 hover:text-cdl-text-light transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About / Pedrão ───
function AboutSection() {
  return (
    <section className="relative bg-cdl-bg-dark grain-overlay py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <img
              src="https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_800/v1776188751/caminhodaluz/pedrao.jpg"
              alt="João Carlos Pedrão"
              className="rounded-xl aspect-[3/4] object-cover w-full max-w-md mx-auto"
              loading="lazy"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text-light font-semibold mb-6">O Instituto Caminho da Luz</h2>
            <p className="text-cdl-text-light/80 leading-relaxed mb-6">
              O Instituto Caminho da Luz nasceu com o propósito de mudar o mundo. A princípio, essa afirmação pode parecer ousada, impossível ou prepotente. Na verdade, mudar o mundo é uma tarefa que se inicia mudando a cada um de nós. Se eu melhoro, o mundo melhora junto. Se você sorri, o mundo sorri junto. Se uma família se une, o mundo fica mais unido. Então, expandindo a consciência, com o uso religioso e de estudos do Santo Daime/Ayahuasca, vamos procurando essa mudança, que se dá muito mais no campo das ações, do que nas palavras.
            </p>
            <p className="text-cdl-text-muted text-sm italic">— João Carlos Pedrão, Dirigente</p>
            <span className="inline-block mt-4 px-3 py-1 bg-cdl-secondary/20 text-cdl-secondary text-xs font-label uppercase tracking-widest rounded">
              Desde 2014
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Missão, Visão, Valores ───
function MissaoSection() {
  const cards = [
    {
      title: "Missão",
      text: "Ser um centro espiritual universalista e plural, capaz de expandir a consciência através de estudos e do uso do Santo Daime (ayahuasca)",
      icon: (
        <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="20" />
          <path d="M24 8v32M8 24h32" />
          <circle cx="24" cy="24" r="8" />
        </svg>
      ),
    },
    {
      title: "Visão",
      text: "Alcançar todo o planeta, através de unidades espalhadas pelo Brasil e pelos países, além dos múltiplos meios digitais e físicos, sendo respeitado pela nova sociedade.",
      icon: (
        <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="20" />
          <path d="M12 24c0-8 5.373-16 12-16s12 8 12 16-5.373 16-12 16-12-8-12-16z" />
          <path d="M4 24h40" />
        </svg>
      ),
    },
    {
      title: "Valores",
      text: "Amor e Doação, Luz e Cura, Liberdade e Disciplina, Expansão e Conhecimento, Amizade e União",
      icon: (
        <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 42S6 28 6 18a10 10 0 0118-6 10 10 0 0118 6c0 10-18 24-18 24z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-cdl-bg-light">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-xl border border-cdl-primary/10 p-8 text-center transition-all duration-300"
            >
              <div className="text-cdl-primary mb-4 flex justify-center">{card.icon}</div>
              <h3 className="font-heading text-2xl text-cdl-text font-semibold mb-3">{card.title}</h3>
              <p className="text-cdl-text-muted text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Rádio / Spotify ───
function RadioSection() {
  return (
    <section className="relative bg-cdl-bg-dark grain-overlay py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="font-heading text-3xl md:text-4xl text-cdl-text-light font-semibold mb-3">Nossa Rádio</h2>
          <p className="text-cdl-text-muted mb-8">Músicas que elevam a consciência</p>
          <div className="max-w-xl mx-auto rounded-xl overflow-hidden">
            <iframe
              src="https://open.spotify.com/embed/playlist/3c4ESUCuZTLiIXY1P1yhSC?theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Galeria Home ───
const galeriaData = [
  {
    casa: "Sorocaba",
    to: "/sorocaba/galeria" as const,
    fotos: [
      "https://caminhodaluzdaime.com.br/images/mural/desktop/fogueira/24-06-23/1.jpg",
      "https://caminhodaluzdaime.com.br/images/mural/desktop/original/10-06/1.jpg",
      "https://caminhodaluzdaime.com.br/images/mural/desktop/estudos/20-05/2.jpg",
    ],
  },
  {
    casa: "São Paulo",
    to: "/sao-paulo/galeria" as const,
    fotos: [
      "https://caminhodaluzdaime.com.br/images/mural/desktop/sementes/22/1.jpg",
      "https://caminhodaluzdaime.com.br/images/mural/desktop/florescer/1.jpg",
      "https://caminhodaluzdaime.com.br/images/mural/desktop/original/1.jpg",
    ],
  },
];

function GaleriaHomeSection() {
  return (
    <section className="py-20 bg-cdl-bg-light">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Camera className="h-5 w-5 text-cdl-secondary" />
            <h2 className="font-heading text-3xl md:text-4xl text-cdl-text font-semibold">Galeria de Fotos</h2>
          </div>
          <p className="text-cdl-text-muted">Registros dos nossos últimos trabalhos</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galeriaData.map((g) => (
            <motion.div key={g.casa} variants={fadeUp} className="space-y-4">
              <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
                {g.fotos.map((foto, i) => (
                  <img
                    key={i}
                    src={foto}
                    alt={`${g.casa} - foto ${i + 1}`}
                    className="aspect-square object-cover w-full hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="text-center">
                <Link
                  to={g.to}
                  className="inline-flex items-center gap-2 text-cdl-primary hover:text-cdl-primary-light font-label uppercase tracking-widest text-sm transition-colors"
                >
                  Ver galeria de {g.casa} →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Final ───
function CTASection() {
  return (
    <section className="relative py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg/cta-section.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
      >
        <h2 className="font-heading text-3xl md:text-5xl text-cdl-text-light font-semibold mb-4">
          Pronto para expandir sua consciência?
        </h2>
        <p className="text-cdl-text-light/70 mb-8">Reserve sua vaga para o próximo trabalho</p>
        <a
          href="https://api.whatsapp.com/send?phone=5515974011072&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-cdl-secondary text-cdl-bg-dark font-label uppercase tracking-widest text-sm rounded-lg hover:bg-cdl-secondary/90 transition-all duration-300 shadow-lg"
        >
          Fale conosco no WhatsApp
        </a>
        <p className="text-cdl-text-light/60 text-sm mt-6">
          Primeira vez?{" "}
          <a
            href="/docs/Anamnese_Formulario.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cdl-text-light transition-colors"
          >
            Preencha a anamnese antes da sua participação.
          </a>
        </p>
      </motion.div>
    </section>
  );
}
