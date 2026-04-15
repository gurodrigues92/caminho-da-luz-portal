import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground font-heading">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Instituto Caminho da Luz — Santo Daime" },
      { name: "description", content: "Centro Espiritual Universalista de Santo Daime. Casas em Sorocaba, São Paulo, Recife e Itararé." },
      { name: "author", content: "Instituto Caminho da Luz" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Josefin+Sans:wght@300;400&family=Source+Sans+3:wght@300;400;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

// ─── Navbar ───
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

function Navbar() {
  const [casasOpen, setCasasOpen] = useState(false);

  const casas = [
    { name: "Sorocaba (Sede)", to: "/sorocaba" as const },
    { name: "São Paulo", to: "/sao-paulo" as const },
    { name: "Recife", to: "/recife" as const },
    { name: "Itararé", to: "/itarare" as const },
  ];

  const navLinks = [
    { name: "Home", to: "/" as const },
    { name: "Sobre", to: "/sobre" as const },
    { name: "FAQ", to: "/faq" as const },
    { name: "Rádio", to: "/radio" as const },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cdl-bg-dark/95 backdrop-blur-md border-b border-cdl-primary/20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188742/caminhodaluz/logo.png"
              alt="Caminho da Luz"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-cdl-text-light/80 hover:text-cdl-text-light text-sm font-label uppercase tracking-widest transition-colors">
              Home
            </Link>

            {/* Casas dropdown */}
            <div className="relative" onMouseEnter={() => setCasasOpen(true)} onMouseLeave={() => setCasasOpen(false)}>
              <button className="flex items-center gap-1 text-cdl-text-light/80 hover:text-cdl-text-light text-sm font-label uppercase tracking-widest transition-colors">
                Casas <ChevronDown className="h-3 w-3" />
              </button>
              {casasOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-lg bg-cdl-bg-dark border border-cdl-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-2">
                  {casas.map((casa) => (
                    <Link
                      key={casa.to}
                      to={casa.to}
                      className="block px-4 py-2 text-sm text-cdl-text-light/80 hover:text-cdl-text-light hover:bg-cdl-primary/20 transition-colors"
                    >
                      {casa.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/sobre" className="text-cdl-text-light/80 hover:text-cdl-text-light text-sm font-label uppercase tracking-widest transition-colors">
              Sobre
            </Link>
            <Link to="/faq" className="text-cdl-text-light/80 hover:text-cdl-text-light text-sm font-label uppercase tracking-widest transition-colors">
              FAQ
            </Link>
            <Link to="/radio" className="text-cdl-text-light/80 hover:text-cdl-text-light text-sm font-label uppercase tracking-widest transition-colors">
              Rádio
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="text-cdl-text-light p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-cdl-bg-dark border-cdl-primary/20 w-72">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="text-cdl-text-light/80 hover:text-cdl-text-light text-lg font-label uppercase tracking-widest transition-colors py-2">
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-cdl-primary/20 pt-4 mt-2">
                  <p className="text-cdl-secondary text-xs font-label uppercase tracking-widest mb-3">Casas</p>
                  {casas.map((casa) => (
                    <Link key={casa.to} to={casa.to} className="block text-cdl-text-light/80 hover:text-cdl-text-light transition-colors py-2">
                      {casa.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="bg-cdl-bg-dark grain-overlay relative py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div>
            <img
              src="https://res.cloudinary.com/dtt7egwkk/image/upload/v1776188742/caminhodaluz/logo.png"
              alt="Caminho da Luz"
              className="h-12 w-auto mb-4"
            />
            <p className="text-cdl-text-light/70 text-sm">
              Centro Espiritual Universalista · Santo Daime
            </p>
          </div>

          {/* Casas */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-cdl-secondary mb-4">Casas</h4>
            <div className="flex flex-col gap-2">
              <Link to="/sorocaba" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">Sorocaba (Sede)</Link>
              <Link to="/sao-paulo" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">São Paulo</Link>
              <Link to="/recife" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">Recife</Link>
              <Link to="/itarare" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">Itararé</Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-cdl-secondary mb-4">Contato</h4>
            <a
              href="https://api.whatsapp.com/send?phone=5515974011072&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz."
              target="_blank"
              rel="noopener noreferrer"
              className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors"
            >
              WhatsApp: (15) 97401-1072
            </a>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-cdl-secondary mb-4">Redes Sociais</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.instagram.com/caminhodaluzdaime" target="_blank" rel="noopener noreferrer" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
                Instagram
              </a>
              <a href="https://youtube.com/@institutocaminhodaluz6191" target="_blank" rel="noopener noreferrer" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
                YouTube
              </a>
              <a href="https://open.spotify.com/playlist/3c4ESUCuZTLiIXY1P1yhSC" target="_blank" rel="noopener noreferrer" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">
                Spotify
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cdl-primary/20 mt-10 pt-6 text-center">
          <p className="text-cdl-text-light/50 text-xs">
            © 2026 Instituto Caminho da Luz — Santo Daime. Desde 2014.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp FAB ───
function WhatsAppFAB() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5515974011072&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-all duration-300 md:hidden"
      aria-label="Fale conosco no WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
