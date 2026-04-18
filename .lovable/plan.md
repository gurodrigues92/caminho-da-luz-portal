

## Pedido

1. Remover badge "Sede Principal" do card de Sorocaba na seção "Em Nossas Casas" (home).
2. Aumentar área de toque dos botões de Instagram e WhatsApp nos cards das casas (mobile) — ícones pequenos demais para touch preciso.
3. Trocar ícone genérico de balão (`MessageCircle`) pelo **logo oficial do WhatsApp** (SVG já usado em `WhatsAppFAB.tsx`).
4. Aplicar em **todo o site** — não só na home.

## Investigação necessária

Preciso ler:
- `src/routes/index.tsx` — seção "Em Nossas Casas" para localizar os cards das casas e confirmar uso de `MessageCircle` + badge "Sede Principal".
- `src/components/CasaPage.tsx` — já vi: usa `MessageCircle` no hero das páginas individuais das casas (4 ocorrências em /sorocaba, /sao-paulo, /recife, /itarare).
- `src/components/layout/Footer.tsx` — pode ter ícones de contato.
- `src/components/layout/Navbar.tsx` — idem.
- Buscar globalmente por `MessageCircle` para mapear todas as ocorrências.

## Plano

### 1. Criar componente reutilizável `WhatsAppIcon`
Novo arquivo `src/components/icons/WhatsAppIcon.tsx` exportando o SVG oficial (mesmo path já usado no `WhatsAppFAB`), aceita `className` para tamanho/cor — evita duplicar o path SVG longo em vários lugares.

```tsx
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149..." />
    </svg>
  );
}
```

### 2. Home (`src/routes/index.tsx`) — seção "Em Nossas Casas"
- Remover badge/marcação "Sede Principal" do card de Sorocaba.
- Substituir `<MessageCircle />` por `<WhatsAppIcon />` nos botões de contato dos cards.
- **Touch targets mobile**: garantir que os links de Instagram e WhatsApp tenham área clicável mínima de **44×44px** (recomendação Apple HIG / WCAG). Aplicar `min-h-[44px] min-w-[44px] p-2` nos `<a>` e centralizar ícone interno. Em desktop pode reduzir via `md:` se necessário, mas 44px é confortável em ambos.

### 3. CasaPage (`src/components/CasaPage.tsx`)
- Hero das casas individuais: trocar `<MessageCircle />` por `<WhatsAppIcon />` no link do WhatsApp.
- Mesmos targets de toque (44×44) para os 3 links: Instagram, WhatsApp, Maps.
- Considerar empilhar verticalmente ou dar `gap-3`/`gap-4` em vez de `gap-4` apertado no mobile para evitar toques cruzados.

### 4. Footer (`src/components/layout/Footer.tsx`)
- Verificar se há `MessageCircle` representando WhatsApp → trocar por `WhatsAppIcon`.
- Garantir touch target dos ícones sociais.

### 5. Busca global
- `code--search_files` por `MessageCircle` em `src/**/*.tsx` para pegar qualquer ocorrência restante (CTAs, FABs já corretos, etc.) e padronizar.
- O `WhatsAppFAB.tsx` já usa o SVG correto inline → refatorar para usar o novo componente `WhatsAppIcon` (DRY, opcional).

### 6. Touch target — padrão do projeto
Aplicar a regra simples: **todo link/botão de ação social/contato com ícone deve ter `inline-flex items-center justify-center` + `min-h-11 min-w-11` (44px = `h-11`) + `p-2`**. Se o link tem texto ao lado (ex: "@instagram"), usar `min-h-11 px-3 py-2` para área retangular confortável.

## Arquivos

- `src/components/icons/WhatsAppIcon.tsx` (novo)
- `src/routes/index.tsx` (remover badge sede + trocar ícone + touch targets na seção "Em Nossas Casas")
- `src/components/CasaPage.tsx` (trocar ícone + touch targets no hero)
- `src/components/layout/Footer.tsx` (verificar/trocar ícone se houver)
- `src/components/layout/WhatsAppFAB.tsx` (refatorar para usar `WhatsAppIcon` — opcional, mantém consistência)

