
## Pedido
Pacote de melhorias em 3 frentes na home e site inteiro:
1. **Legibilidade** — textos azuis ilegíveis no Hero, contraste do `cdl-primary-light`, peso de fonte do Pedrão, Aurora muito visível, rodapé colado nas bordas.
2. **Funcionais** — thumbnails da galeria home não são clicáveis, espaços vazios entre seções.
3. **SEO on-page** — H1 estratégico ("Santo Daime e Sorocaba"), hierarquia de headings, metadados ricos por rota (cidades + galerias com og:image, og:description, canonical), alts de imagens.

## Investigação realizada
- `src/routes/index.tsx`: Hero tem H1 escondido (`sr-only`) "Caminho da Luz". Frase do Pedrão usa `text-cdl-primary-light italic` (sem peso) e legenda em `text-cdl-text-muted text-sm` (cinza fraco). AuroraLayer com `opacity-70`. Galeria home usa `<img>` solto sem `<Link>`. CasasSection e GaleriaHomeSection ambos com `py-20` + `mb-12` interno → ~13rem de respiro entre eles.
- `src/styles.css`: `--cdl-primary-light: oklch(0.45 0.10 250)` — sobre fundo escuro `bg-cdl-bg-dark` (oklch 0.18) o contraste é ~3.5:1, abaixo de WCAG AA (4.5:1 para texto normal). Mas o Hero tem fundo de imagem + overlay claro, então é ainda pior.
- `Footer.tsx`: padding `px-4 sm:px-6 lg:px-8`. Pode ficar mais arejado.
- `GaleriaPreview.tsx` (componente do CasaPage, não da home): já tem botão "Ver galeria completa" — esse não é o alvo. O alvo é o `GaleriaHomeSection` em `index.tsx` (3 thumbnails por casa).
- `CasaPage.tsx`: hierarquia já correta (H1 hero, H2 nas seções).
- Rotas de cidade têm `head()` curto. Galerias (`*_.galeria.tsx`) só têm title+description, sem og:*, canonical, og:image.
- `__root.tsx`: organizationSchema sem `openingHours`.

## Solução proposta

### A. Legibilidade (Hero + cores globais)
**`src/styles.css`** — aumentar contraste do `--cdl-primary-light`:
```css
--cdl-primary-light: oklch(0.62 0.13 250);  /* era 0.45 → 0.62, mais claro */
```
Sobe lightness para ~62%, dá contraste >4.5:1 sobre `bg-cdl-bg-dark` e melhora muito sobre overlays claros do Hero.

**`src/routes/index.tsx` (Hero)**:
- Frase do Pedrão: trocar `text-cdl-primary-light italic` → `text-cdl-primary-light italic font-semibold drop-shadow-sm`.
- Legenda "— João Carlos Pedrão, Dirigente": trocar `text-cdl-text-muted text-sm` → `text-cdl-text-light/90 text-sm font-semibold drop-shadow-sm`.
- Aurora: reduzir `opacity-70` → `opacity-30`.
- Reforçar overlay do Hero com mais escurecimento no centro: `from-black/40 via-black/20 to-black/40` para melhor legibilidade do azul.

### B. Aurora com prop `disableAnimation`
**`src/components/ui/aurora-background.tsx`** — adicionar prop opcional:
```tsx
interface AuroraLayerProps {
  showRadialGradient?: boolean;
  disableAnimation?: boolean;  // novo
}
```
Quando `true`, omite `animate-aurora` (camada estática). Mantém visual sem custo de GPU. Não usar agora, mas fica disponível.

### C. Footer
**`src/components/layout/Footer.tsx`** — `px-4 sm:px-6 lg:px-8` → `px-6 sm:px-10 lg:px-12`.

### D. Galeria home clicável
**`src/routes/index.tsx`** — em `GaleriaHomeSection`, envolver o `<div className="grid grid-cols-3 gap-2 ...">` inteiro com `<Link to={g.to}>` (3 thumbnails viram um único botão visual para a galeria daquela casa). Mantém o link "Ver galeria de X →" embaixo. Adicionar `cursor-pointer` e leve `hover:opacity-90` no bloco.

### E. Espaços vazios
**`src/routes/index.tsx`**:
- `GaleriaHomeSection`: `py-20` → `pt-20 pb-10`.
- `CasasSection`: `py-20` → `pt-10 pb-20` e remover `mb-12` do header → `mb-8`.
Resultado: a transição galeria→casas fica contínua sem buraco.

### F. H1 estratégico + parágrafo SEO na Home
**`src/routes/index.tsx`** — substituir o `<h1 className="sr-only">Caminho da Luz</h1>` por bloco visível DEPOIS do wordmark e ANTES da frase do Pedrão:
```tsx
<motion.h1 variants={fadeUp} className="font-heading text-2xl md:text-3xl text-cdl-text-light font-semibold mt-6 drop-shadow-md">
  Santo Daime em Sorocaba
</motion.h1>
<motion.p variants={fadeUp} className="text-cdl-text-light/85 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
  O Caminho da Luz é um centro espiritualista universalista que estuda e consagra o Santo Daime (Ayahuasca) como caminho de cura, autoconhecimento e expansão da consciência. Sede em Sorocaba, com casas em São Paulo, Recife e Itararé.
</motion.p>
```
Observação: o pedido do usuário diz "Santo Daime **e** Sorocaba" — vou usar **"Santo Daime em Sorocaba"** que é a forma natural e mantém a palavra-chave. Confirmo se preferir literal "e".

### G. Hierarquia de headings
- `index.tsx`: já há H2 em todas seções (Casas, Instituto, Rádio, Galeria, CTA), H3 só no MissaoSection (Missão/Visão/Valores como filhos do bloco). OK.
- `CasaPage.tsx`: H1 hero, H2 em todas seções. OK. Apenas auditoria visual.

### H. Metadados por rota — Cidades
Enriquecer `head()` em `sorocaba.tsx`, `sao-paulo.tsx`, `recife.tsx`, `itarare.tsx`:
- `description` ~150 caracteres com "Santo Daime [Cidade]"
- og:title, og:description, og:image (já têm em sorocaba — replicar nas outras), og:url, twitter:*, canonical

Exemplo Sorocaba:
```
description: "Santo Daime em Sorocaba — Caminho da Luz, sede do instituto. Trabalhos de Ayahuasca para cura, autoconhecimento e expansão da consciência. Agende sua participação."
```

### I. Metadados das galerias
Para `sorocaba_.galeria.tsx`, `sao-paulo_.galeria.tsx`, `recife_.galeria.tsx`, `itarare_.galeria.tsx`:
```tsx
head: () => ({
  meta: [
    { title: "Galeria de Fotos — Santo Daime Sorocaba | Caminho da Luz" },
    { name: "description", content: "Galeria de fotos dos trabalhos do Caminho da Luz Sorocaba: Original, Sementes, Despertar, Florescer e mais." },
    { property: "og:title", content: "Galeria — Caminho da Luz Sorocaba" },
    { property: "og:description", content: "Fotos dos trabalhos espirituais com Santo Daime em Sorocaba." },
    { property: "og:image", content: "https://res.cloudinary.com/dtt7egwkk/image/upload/f_auto,q_auto,w_1200/v1776188744/caminhodaluz/caminho-da-luz.jpg" },
    { property: "og:url", content: "https://caminhodaluzdaime.com.br/sorocaba/galeria" },
    { property: "og:type", content: "website" },
  ],
  links: [{ rel: "canonical", href: "https://caminhodaluzdaime.com.br/sorocaba/galeria" }],
}),
```
Mesma estrutura adaptada para as 3 outras cidades.

### J. Schema.org (organização) com horários
**`src/routes/__root.tsx`** — adicionar ao `organizationSchema`:
```json
"openingHoursSpecification": [{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday"],
  "opens": "17:30",
  "closes": "22:00",
  "description": "Clínica Caminho da Luz — atendimento terapêutico"
}]
```
(horários reais só temos da Clínica/segunda; trabalhos têm datas variáveis. Não vou inventar.)

### K. Alts de imagens
- `index.tsx`: imagens de fundo do Hero/CTA já têm `alt=""` (correto, decorativas).
- Imagens de casas (Sorocaba/SP/Recife/Itararé): atualmente `alt={casa.name}` → trocar para `alt="Casa Caminho da Luz em ${casa.name} — Santo Daime"`.
- Pedrão: `alt="João Carlos Pedrão"` → `alt="João Carlos Pedrão, dirigente do Instituto Caminho da Luz"`.
- Galeria home: `alt={`${g.casa} - foto ${i+1}`}` → `alt={`Trabalho de Santo Daime em ${g.casa} - foto ${i+1}`}`.

## Arquivos a editar
1. `src/styles.css` — tom do `--cdl-primary-light`
2. `src/components/ui/aurora-background.tsx` — prop `disableAnimation`
3. `src/components/layout/Footer.tsx` — padding lateral
4. `src/routes/index.tsx` — Hero (peso, opacity Aurora, overlay, H1 visível + parágrafo SEO), GaleriaHomeSection (Link + alts), CasasSection (espaçamento + alts), AboutSection (alt Pedrão)
5. `src/routes/__root.tsx` — adicionar `openingHoursSpecification` ao schema
6. `src/routes/sorocaba.tsx` — meta enriquecida + canonical
7. `src/routes/sao-paulo.tsx` — meta + og:* completo + canonical
8. `src/routes/recife.tsx` — meta + og:* completo + canonical
9. `src/routes/itarare.tsx` — meta + og:* completo + canonical
10. `src/routes/sorocaba_.galeria.tsx` — head completo (og:*, canonical)
11. `src/routes/sao-paulo_.galeria.tsx` — head completo
12. `src/routes/recife_.galeria.tsx` — head completo
13. `src/routes/itarare_.galeria.tsx` — head completo

## Restrições
- Não mexer em layout responsivo geral nem tipografia global (só ajustes pontuais de peso e cor).
- Não inventar horários/eventos no schema — só Clínica (segunda 17:30) que é estável.
- Manter alts vazios em imagens decorativas (background do Hero/CTA).
- Não tocar em `routeTree.gen.ts` (autogerado).
- Animações da Aurora ficam ativas — só reduzo opacidade. Prop `disableAnimation` fica disponível para uso futuro.

## Pergunta de confirmação
O texto literal pedido foi "Santo Daime e Sorocaba" — proponho usar **"Santo Daime em Sorocaba"** (mais natural em português e SEO friendly, mantém ambas keywords). Se preferir literalmente "e", troco. Vou seguir com "em" salvo objeção.
