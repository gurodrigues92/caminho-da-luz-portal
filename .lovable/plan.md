
## Pedido
Usar as 2 imagens enviadas como background da Hero (substituindo `hero-main.jpg`) e da seção CTA "Pronto para expandir sua consciência?" (substituindo `cta-section.jpg`). Versão horizontal para desktop, vertical para mobile. Manter os efeitos de luz (AuroraLayer, gradientes, overlays).

## Solução

### 1. Salvar as imagens
Copiar para `public/images/bg/`:
- `user-uploads://image-backgroud-horizontal.png` → `public/images/bg/hero-desktop.png`
- `user-uploads://image-backgrou-cl.png` → `public/images/bg/hero-mobile.png`

(mesmas imagens reaproveitadas tanto para hero quanto para CTA, evitando duplicar ~MB extras de assets)

### 2. Trocar background da Hero (`HeroSection`)
Atualmente usa um único `<div>` com `background-image` inline. Vou trocar por duas `<img>` absolutas com `object-cover`, alternando via classes responsivas:
- `<img src="/images/bg/hero-mobile.png" className="md:hidden absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90" />`
- `<img src="/images/bg/hero-desktop.png" className="hidden md:block absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90" />`
- Ambas com `loading="eager"` + `fetchpriority="high"` (LCP da hero)
- Mantém: `bg-slate-900` base, `AuroraLayer`, gradiente preto top/bottom, wordmark azul, etc.

### 3. Trocar background do CTA (`CTASection`)
Mesmo padrão, mas com `loading="lazy"` (está abaixo da dobra):
- mobile: `image-backgrou-cl.png`
- desktop: `image-backgroud-horizontal.png`
- Mantém o overlay `bg-black/65` para legibilidade do texto branco.

## Arquivos
- `public/images/bg/hero-desktop.png` (novo, copiado)
- `public/images/bg/hero-mobile.png` (novo, copiado)
- `src/routes/index.tsx` — apenas blocos de background da `HeroSection` e `CTASection`

## Restrições
- Aurora, gradientes escuros, wordmark, conteúdo e animações permanecem idênticos.
- `bg-fixed` (parallax) é removido só na hero, pois `<img>` substitui o `bg-cover bg-fixed` — em troca o efeito funciona melhor em mobile (iOS quebra `bg-fixed`).
- Sem mudança de tipografia, cores ou layout.
