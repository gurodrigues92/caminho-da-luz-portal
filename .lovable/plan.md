

## Pedido
O botão "Chamar no WhatsApp" na seção "Reserve sua vaga para o próximo trabalho" (e potencialmente outros pelo site) está usando a cor `secondary` (dourado/gold), mas deve usar o **azul degradê padrão** (variant `default` = gradiente cdl-primary). Aplicar isso em todas as páginas das casas e em todo o site.

## Análise

No `CasaPage.tsx` (CTA final) o botão está como `variant="secondary"` — preciso trocar para `variant="default"` (azul degradê com shimmer).

**Problema de contraste:** A seção tem fundo escuro (`bg-cdl-bg-dark`). O `variant="default"` usa `cdl-primary` que segundo a memória é "forest green" — mas o usuário diz que o padrão agora é **azul degradê**. Vou checar `mem://design/tokens` para confirmar a cor real do `cdl-primary` (a memória de cores pode estar desatualizada — o arquivo de tokens menciona "blue/white brand").

**Auditoria de outros botões fora do padrão:** Preciso varrer o site procurando:
- `<a>` ou `<Link>` com classes hardcoded tipo `bg-cdl-secondary`, `bg-cdl-primary`, `bg-gradient-to-*` que deveriam ser `<Button>`
- `<Button variant="secondary">` que deveriam ser `variant="default"` (azul)
- Páginas a checar: `index.tsx`, `sobre.tsx`, `faq.tsx`, `radio.tsx`, `*galeria*.tsx`, `Footer.tsx`, `Navbar.tsx`, `WhatsAppFAB.tsx`, `TrabalhoCard.tsx`, `UltimosVideosSection.tsx`, `AniversariantesDoMes.tsx`, `EventCalendar.tsx`

## Plano

1. **Confirmar cor**: ler `mem://design/tokens` para ver qual é o azul degradê atual (e se `cdl-primary` já é azul ou se precisa ajustar variável)
2. **CasaPage.tsx**: trocar CTA "Chamar no WhatsApp" de `variant="secondary"` → `variant="default"` (azul degradê + shimmer)
3. **Auditoria global** com `code--search_files` por:
   - `variant="secondary"` (validar caso a caso se deve virar default)
   - `bg-cdl-secondary`, `bg-cdl-primary` em `<a>`/`<Link>` (migrar para `<Button>`)
   - `<a className=` com aparência de botão
4. **Migrar** todos para `<Button asChild variant="default">` mantendo `font-label uppercase tracking-widest` quando aplicável
5. **Exceções a preservar**: badges, chips do hero (Instagram/WhatsApp/Mapa pequenos), links de texto puro, links do footer, link "Baixe a anamnese"

## Arquivos prováveis a editar
- `src/components/CasaPage.tsx` (CTA WhatsApp final)
- + qualquer arquivo encontrado na auditoria com botão visualmente "antigo" ou cor errada

## Restrições
- Manter componente `<Button>` como única fonte de estilo
- Não trocar fontes (Cormorant/Source Sans/Josefin)
- Não mexer em chips pequenos do hero (Instagram/WhatsApp/Mapa) — são links de info, não CTAs
- Não tocar links de texto inline (anamnese, footer, etc.)
- Garantir contraste do azul degradê sobre fundo escuro `bg-cdl-bg-dark` (azul + shimmer + sombra cdl-primary/30 deve funcionar; se ficar fraco, adicionar `shadow-xl` extra)

