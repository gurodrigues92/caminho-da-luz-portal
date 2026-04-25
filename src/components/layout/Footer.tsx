import { Link } from "@tanstack/react-router";
import wordmarkFooter from "@/assets/wordmark-caminho-da-luz-footer.png";

export function Footer() {
  return (
    <footer className="bg-cdl-bg-dark grain-overlay relative py-12">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src={wordmarkFooter}
              alt="Caminho da Luz"
              className="h-10 md:h-12 w-auto mb-4"
            />
            <p className="text-cdl-text-light/70 text-sm">
              Centro Espiritual Universalista · Santo Daime
            </p>
          </div>

          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-cdl-secondary mb-4">Casas</h4>
            <div className="flex flex-col gap-2">
              <Link to="/sorocaba" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">Sorocaba (Sede)</Link>
              <Link to="/sao-paulo" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">São Paulo</Link>
              <Link to="/recife" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">Recife</Link>
              <Link to="/itarare" className="text-cdl-text-light/70 hover:text-cdl-text-light text-sm transition-colors">Itararé</Link>
            </div>
          </div>

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
