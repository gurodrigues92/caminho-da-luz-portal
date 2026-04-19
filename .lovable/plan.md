

## Pedido
O botão CTA novo (com gradiente, shimmer, etc.) que existe na home não está sendo usado nas páginas das casas. Os botões "antigos" nas páginas das casas precisam ser atualizados para usar o mesmo estilo.

## Análise

Preciso identificar quais botões nas páginas das casas estão com estilo antigo (provavelmente `<a>` ou `<Link>` com classes Tailwind hardcoded) em vez de usar o componente `<Button>` de `src/components/ui/button.tsx` (que já tem o gradiente + shimmer da identidade nova).

**Locais suspeitos a inspecionar:**
1. `src/components/CasaPage.tsx` — tem 3 CTAs hardcoded:
   - Botão "Chamar no WhatsApp" (linha do CTA final) — usa `bg-cdl-secondary` direto, não usa `<Button>`
   - Link "Baixe a anamnese antes" — link de texto, ok deixar
   - Links de Instagram/WhatsApp/Mapa no hero — chips, estilo diferente OK
2. `src/components/GaleriaPreview.tsx` — botão "Ver galeria completa de {casa}" usa `<Link>` com classes hardcoded `bg-cdl-primary` (estilo antigo, sem shimmer/gradiente)
3. `src/routes/index.tsx` — confirmar qual botão é o "novo padrão" que o usuário gostou
4. Possivelmente `TrabalhoCard.tsx` se tiver CTA

## Plano

1. **Inspecionar** rapidamente: `index.tsx` (confirmar padrão novo), `CasaPage.tsx` (CTA WhatsApp final), `GaleriaPreview.tsx` (botão galeria), `TrabalhoCard.tsx`
2. **Trocar os botões hardcoded por `<Button asChild>`** envolvendo os `<a>`/`<Link>`, herdando o estilo unificado (gradiente + shimmer):
   - **CasaPage.tsx → CTA "Chamar no WhatsApp"**: usar `<Button asChild variant="secondary" size="lg">` (variante gold/secondary mantém destaque sobre fundo escuro)
   - **GaleriaPreview.tsx → "Ver galeria completa"**: usar `<Button asChild variant="default" size="lg">` (gradiente cdl-primary com shimmer)
3. **Manter a identidade Josefin uppercase** com `font-label uppercase tracking-widest` quando precisar — aplicar via `className` extra no `<Button>`

## Arquivos a editar
- `src/components/CasaPage.tsx` — substituir `<a>` do CTA final por `<Button asChild>`
- `src/components/GaleriaPreview.tsx` — substituir `<Link>` do botão por `<Button asChild>` com `<Link>` dentro

## Restrições
- Manter as fontes da identidade (Cormorant/Source Sans/Josefin)
- Não trocar cores da paleta — só unificar usando o componente `<Button>` existente
- Sem mudar estrutura/layout, só o componente do botão
- Aplicar a mesma mudança em todas as 4 casas automaticamente (ambos componentes são compartilhados, então o fix é centralizado)

