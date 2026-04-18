

## Pedido

Padronizar TODOS os botões do site com:
1. Cor azul em **degradê** (usando tons do `cdl-primary`).
2. **Texto branco**.
3. Cantos **mais arredondados**.
4. **Hover elegante** com efeito de "espelho" (shimmer/shine passando pelo botão).
5. Aplicar globalmente — começando pela seção CTA "Pronto para expandir sua consciência?".

## Investigação rápida necessária

Preciso confirmar:
- Tons exatos de azul disponíveis em `mem://design/tokens` (cdl-primary e variações).
- Variantes do `Button` (`button.tsx`) atualmente usadas no projeto (default, outline, secondary, etc.) para garantir cobertura.
- Como o CTA atual está estilizado em `src/routes/index.tsx`.

## Abordagem

**Estratégia: alterar a base do componente `Button`** em `src/components/ui/button.tsx` — assim todos os botões do site (Navbar, Hero, CTAs, cards de Casa, formulários etc.) herdam o novo padrão automaticamente, sem precisar editar dezenas de arquivos.

### Mudanças em `button.tsx`

1. **Base shape**: trocar `rounded-md` por `rounded-full` (pill) para todos os tamanhos — visual mais elegante e arredondado.

2. **Variant `default`** (a principal — usada na maioria dos CTAs):
   - Fundo: `bg-gradient-to-r from-cdl-primary via-cdl-primary to-cdl-primary/80` (degradê azul sutil).
   - Texto: `text-white` (forçado, ignora `primary-foreground`).
   - Sombra: `shadow-lg shadow-cdl-primary/30`.
   - **Efeito shimmer** no hover: pseudo-elemento (`before:`) com gradiente diagonal branco translúcido que desliza da esquerda para a direita ao passar o mouse — usando `overflow-hidden` no botão e `before:translate-x-[-150%] hover:before:translate-x-[150%] before:transition-transform before:duration-700`.
   - Hover: leve `brightness-110` + scale opcional muito sutil.

3. **Variant `outline`**: fundo transparente com borda azul em degradê, texto azul → no hover preenche com o degradê azul e texto fica branco. Mantém shimmer.

4. **Variant `secondary`**: usar gradiente `cdl-secondary` (dourado) mantendo coerência mas ainda com texto branco e mesmo efeito shimmer — para botões de acento.

5. **Variant `ghost` / `link`**: mantidas como estão (sem degradê faz sentido para esses casos discretos).

6. **Sizes**: aumentar levemente o padding horizontal (`px-6` no default, `px-8` no `lg`) para acomodar bem o shape pill.

### CSS shimmer (técnica)

Usar Tailwind arbitrary values diretamente nas classes da variant — não precisa adicionar keyframes ao `styles.css`. O efeito é baseado em transição de `translate-x` de um pseudo-elemento com gradient branco diagonal, totalmente CSS puro:

```
relative overflow-hidden
before:absolute before:inset-0 before:-translate-x-full
before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out
```

### CTA específico (seção "Pronto para expandir sua consciência?")

Após atualizar o `Button` base, o CTA já vai herdar o novo visual. Vou verificar `src/routes/index.tsx` para garantir que o botão dessa seção usa o componente `<Button>` (não um `<a>` cru ou classes custom que sobrescrevem) — se estiver com classes manuais sobrepondo, removo.

## Arquivos

- `src/components/ui/button.tsx` — atualizar `buttonVariants` (variants `default`, `outline`, `secondary`; base `rounded-full`; shimmer).
- `src/routes/index.tsx` — verificar/limpar o CTA da seção "Pronto para expandir" se houver classes que conflitam.
- (Provável) revisar outros locais com `<Button className="...">` que forçam `rounded-md` ou cores próprias e remover overrides para manter consistência.

## Confirmação

- Manter o **dourado (cdl-secondary)** como variante alternativa (`secondary`) com mesmo padrão pill+shimmer, ou eliminar e deixar TUDO azul? Vou assumir **manter dourado como secundária** para casos de destaque (ex: botão de WhatsApp/CTA forte), mas se preferir 100% azul me avise.

