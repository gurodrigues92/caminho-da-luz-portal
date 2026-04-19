import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";

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

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Instituto Caminho da Luz",
  "alternateName": "Caminho da Luz - Santo Daime",
  "url": "https://caminhodaluzdaime.com.br",
  "logo": "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_200/v1776188742/caminhodaluz/logo.png",
  "foundingDate": "2014",
  "founder": { "@type": "Person", "name": "João Carlos Pedrão" },
  "description": "Centro Espiritual Universalista de Santo Daime. Expansão de consciência através do uso religioso da Ayahuasca.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Paulo Varchavtchik, 365 - Brigadeiro Tobias",
    "addressLocality": "Sorocaba",
    "addressRegion": "SP",
    "postalCode": "18087-190",
    "addressCountry": "BR",
  },
  "telephone": "+5515974011072",
  "sameAs": [
    "https://www.instagram.com/caminhodaluzdaime",
    "https://youtube.com/@institutocaminhodaluz6191",
    "https://open.spotify.com/playlist/3c4ESUCuZTLiIXY1P1yhSC",
  ],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Instituto Caminho da Luz — Santo Daime" },
      { name: "description", content: "Centro Espiritual Universalista de Santo Daime. Casas em Sorocaba, São Paulo, Recife e Itararé." },
      { name: "author", content: "Instituto Caminho da Luz" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Instituto Caminho da Luz — Santo Daime" },
      { name: "twitter:title", content: "Instituto Caminho da Luz — Santo Daime" },
      { property: "og:description", content: "Centro Espiritual Universalista de Santo Daime. Casas em Sorocaba, São Paulo, Recife e Itararé." },
      { name: "twitter:description", content: "Centro Espiritual Universalista de Santo Daime. Casas em Sorocaba, São Paulo, Recife e Itararé." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/ebc46a8e-4d00-41dd-8e5a-8dccd8a7c7b6" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/ebc46a8e-4d00-41dd-8e5a-8dccd8a7c7b6" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Josefin+Sans:wght@300;400&family=Source+Sans+3:wght@300;400;600&display=swap",
        media: "print",
        onLoad: "this.media='all'",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: organizationSchema },
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
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFAB />
    </QueryClientProvider>
  );
}
