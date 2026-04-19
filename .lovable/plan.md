
## Pedido
Duas mudanças globais no site:

1. **Harmonia tipográfica**: balancear quebras de linha em títulos e parágrafos longos para que linhas tenham número similar de palavras (efeito "balanced text").
2. **Hierarquia de botões**: botões secundários (ex: "Ver galeria de São Paulo", "Saiba mais") devem virar outline/vazados — borda da cor da marca, fundo transparente ou cor do fundo da seção, mantendo o `rounded-full`. Apenas CTAs principais (WhatsApp, ações de conversão) mantêm o preenchimento sólido.

## Solução

### Parte 1 — Texto balanceado (1 linha de CSS global)
Tailwind v4 já suporta `text-balance` (CSS `text-wrap: balance`) e `text-pretty` (`text-wrap: pretty`).

**Abordagem**: aplicar globalmente em `src/styles.css` via `@layer base`:
- `h1, h2, h3, h4, h5, h6` → `text-wrap: balance` (balanceia linhas — ideal para títulos curtos/médios)
- `p` → `text-wrap: pretty` (evita órfãs/viúvas em parágrafos longos)

Isso aplica em **todo o site automaticamente** sem precisar editar cada componente. É exatamente o efeito pedido (mesmo número de palavras por linha) e funciona em todos navegadores modernos.

```css
@layer base {
  h1, h2, h3, h4, h5, h6 { text-wrap: balance; }
  p { text-wrap: pretty; }
}
```

### Parte 2 — Botões secundários vazados

**Identificar os botões secundários** no site. Vou inspecionar as rotas para listar todos os casos:
- `src/routes/index.tsx` — botões "Ver galeria", "Saiba mais", links de navegação para casas
- `src/routes/sorocaba.tsx`, `recife.tsx`, `sao-paulo.tsx`, `itarare.tsx` — botões de galeria, calendário, etc.
- `src/components/CasaPage.tsx` — botões compartilhados entre páginas de casa
- `src/components/GaleriaPreview.tsx`, `TrabalhoCard.tsx` — possíveis CTAs secundários

**Regra de classificação**:
- **CTA principal (mantém sólido)**: WhatsApp, "Falar com a casa", "Quero participar", botões de conversão
- **Secundário (vira outline)**: "Ver galeria", "Ver todos os eventos", "Saiba mais", "Voltar", navegação interna

**Mudança técnica**: trocar `<Button>` (default) por `<Button variant="outline">`. O `variant="outline"` já existe em `src/components/ui/button.tsx` com:
- `border-2 border-cdl-primary`
- `bg-transparent`
- `text-cdl-primary`
- `rounded-full` (herdado da base)
- Hover: preenche com gradiente primário

Isso atende o pedido (borda azul escura, fundo transparente = fundo da seção aparece, arredondado igual ao principal).

### Plano de execução
1. Adicionar `text-wrap: balance/pretty` em `src/styles.css`.
2. Varrer rotas e componentes; em cada botão secundário, adicionar `variant="outline"`.
3. CTAs principais (WhatsApp, anamnese principal) ficam intocados.

## Arquivos esperados
- `src/styles.css` — adicionar regra global de `text-wrap`.
- `src/routes/index.tsx` — botões secundários (cards de casas, "ver mais")
- `src/routes/sorocaba.tsx`, `recife.tsx`, `sao-paulo.tsx`, `itarare.tsx` — botões de galeria/calendário
- `src/components/CasaPage.tsx` — botões compartilhados
- `src/components/GaleriaPreview.tsx`, `UltimosVideosSection.tsx` — possíveis CTAs secundários
- `src/components/AniversariantesDoMes.tsx`, `EventCalendar.tsx` — se houver botões

## Restrições
- CTAs principais (WhatsApp, conversão) mantêm preenchimento sólido — hierarquia visual preservada.
- `text-wrap: balance` só afeta visualmente; não altera conteúdo nem layout.
- Não mexer em ícones, links de navegação do header/footer (já têm estilo próprio).
- Imagens, animações, cores e tipografia não mudam.
