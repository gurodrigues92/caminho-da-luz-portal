
## Pedido
Na seção CTA "Pronto para expandir sua consciência?" (agora com fundo claro/imagem visível), ajustar:
1. Todos os textos em azul escuro (cdl-primary)
2. Botão da anamnese: transformar em botão outline (borda azul escuro, fundo transparente, arredondado, menor, menos destaque)

## Contexto
A seção CTA hoje tem textos brancos (`text-cdl-text-light`, `text-white/90`) pensados para overlay escuro. Como o fundo agora está mais claro (sem `bg-black/65`), os textos brancos perdem contraste. Trocar para `cdl-primary` (azul escuro da marca) resolve.

O link "Baixe a anamnese antes" hoje é um `<a>` simples com underline. Vamos transformar em um Button outline pequeno: borda azul escuro, fundo transparente, rounded-full, `size="sm"`.

## Solução
Em `src/routes/index.tsx`, dentro da `CTASection`:

1. **H2** (título): `text-cdl-text-light` → `text-cdl-primary`
2. **Parágrafo descritivo**: `text-white/90` (ou similar) → `text-cdl-primary/80`
3. **Botão principal "Chamar no WhatsApp"**: manter como está (já é destaque com bg verde/primary) — só confirmar que continua legível
4. **Link "Baixe a anamnese antes"**: trocar de `<a className="underline...">` para um `<Button asChild variant="outline" size="sm">` com classes customizadas:
   - `border-cdl-primary text-cdl-primary`
   - `bg-transparent hover:bg-cdl-primary/10`
   - `rounded-full`
   - Texto pequeno

5. Texto auxiliar "Primeira vez?" também em `text-cdl-primary/70`.

## Arquivo
- `src/routes/index.tsx` — apenas o bloco `CTASection`.

## Restrições
- Imagens de fundo + AuroraLayer + gradiente permanecem (não mexer).
- Hero não muda.
- Botão WhatsApp principal mantém destaque atual.
- Sem alterar tipografia ou layout.
