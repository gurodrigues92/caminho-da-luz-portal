
## Diagnóstico — por que o site travou

Identifiquei 3 causas reais de travamento, todas adicionadas nas últimas mudanças visuais:

### 1. AuroraLayer rodando em **2 seções simultâneas** (Hero + CTA) — principal culpado
A `AuroraLayer` é uma animação **muito pesada**: gradientes complexos `300%/200%`, `blur(4px)`, `mix-blend-screen`, `background-attachment: fixed` e animação infinita de 60s. Roda na GPU continuamente.

- Antes: só na Hero.
- Agora: também no CTA "Pronto para expandir sua consciência?".
- Resultado: **2 camadas auroras animadas a todo momento**, mesmo quando fora da viewport (CSS não pausa). Em mobile (393px, devicePixelRatio 3 = renderiza em 1179px reais), isso engasga o scroll.

### 2. Botão `<Button>` com shimmer pseudo-elemento aplicado em massa
O `buttonVariants` tem `before:` com gradiente + transição de 700ms em **todo botão**. Combinado com `variant="outline"` agora espalhado em vários botões secundários (galeria, YouTube, etc.), cada hover recalcula transform+opacity. Não é o maior vilão, mas soma.

### 3. `bg-fixed` / `background-attachment: fixed` no after da Aurora
Em mobile (especialmente iOS), `background-attachment: fixed` força o navegador a repintar a área inteira a cada scroll — é notório por travar scroll. Já existe um `@supports` para `.bg-fixed`, mas **não cobre o `after:[background-attachment:fixed]` da Aurora**.

## Correções propostas

### A. Limitar a Aurora à Hero apenas (remover do CTA)
Trocar a `AuroraLayer` do CTA por um gradiente estático suave (ou só manter a imagem + overlay). Mantém o visual claro/imagem visível, sem custo de animação.

### B. Pausar Aurora quando fora da viewport
Usar `IntersectionObserver` ou simplesmente CSS `content-visibility: auto` no container da Hero — quando a seção sai da tela, a animação para de ser pintada.

### C. Remover `background-attachment: fixed` do `after` da Aurora em mobile
Adicionar regra:
```css
@media (max-width: 768px) {
  .aurora-after\:fixed::after { background-attachment: scroll !important; }
}
```
Ou mais simples: tirar o `after:[background-attachment:fixed]` do componente — o efeito visual quase não muda e ganha muita performance.

### D. (Opcional) Remover o shimmer `before:` de botões `outline` e `ghost`
Esses são secundários, não precisam do efeito de brilho. Já existe `before:hidden` em `ghost`/`link`. Estender para `outline`.

## Plano de execução

1. **`src/routes/index.tsx`** — remover `<AuroraLayer />` da `CTASection`. Manter imagem de fundo + gradiente suave.
2. **`src/components/ui/aurora-background.tsx`** — remover `after:[background-attachment:fixed]` (ou trocar por `scroll` em mobile via media query).
3. **`src/components/ui/button.tsx`** — adicionar `before:hidden` ao `variant: outline` para reduzir custo de hover.
4. (Opcional, se persistir) — adicionar `content-visibility: auto; contain-intrinsic-size: 100vh` na Hero para pausar pintura quando rolada para fora.

## Arquivos
- `src/routes/index.tsx` — só o bloco `CTASection`
- `src/components/ui/aurora-background.tsx` — 1 linha
- `src/components/ui/button.tsx` — 1 linha (variant outline)

## Restrições
- Visual da Hero permanece idêntico.
- CTA mantém imagem de fundo + textos azuis (só perde a animação aurora, que era discreta lá).
- Sem mudança de tipografia, cores, layout ou conteúdo.
- Botões mantêm aparência; apenas hover do shimmer é removido em outline.
