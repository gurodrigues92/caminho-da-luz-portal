import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import logoCdl from "@/assets/logo-caminho-da-luz.png";

const casas = [
  { name: "Sorocaba (Sede)", to: "/sorocaba" as const },
  { name: "São Paulo", to: "/sao-paulo" as const },
  { name: "Pernambuco", to: "/pernambuco" as const },
  { name: "Itararé", to: "/itarare" as const },
];

const navLinks = [
  { name: "Home", to: "/" as const },
  { name: "Sobre", to: "/sobre" as const },
  { name: "FAQ", to: "/faq" as const },
  { name: "Rádio", to: "/radio" as const },
];

export function Navbar() {
  const [casasOpen, setCasasOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cdl-bg-dark/95 backdrop-blur-md border-b border-cdl-primary/20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoCdl}
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
