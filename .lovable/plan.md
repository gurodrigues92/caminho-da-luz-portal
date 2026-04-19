
## Pedido
Padronizar os botões secundários "Ver canal completo no YouTube →" e "Ver galeria completa de [casa]" no mesmo estilo do botão da anamnese: outline pequeno, borda azul escuro, fundo transparente, `rounded-full`, texto pequeno, discreto.

## Estado atual
- **YouTube** (`UltimosVideosSection.tsx`): hoje é um `<a>` simples com texto azul e seta — sem borda, sem botão.
- **Galeria** (`GaleriaPreview.tsx`): já é `<Button variant="outline" size="lg">` — grande demais, com `font-label uppercase tracking-widest`. Não está igual ao da anamnese (que é `size="sm"`, `text-xs`, sem uppercase).
- **Anamnese (referência)**: 
  ```tsx
  <Button asChild variant="outline" size="sm"
    className="border-cdl-primary text-cdl-primary bg-transparent hover:bg-cdl-primary/10 rounded-full text-xs">
  ```

## Solução

### 1. `src/components/UltimosVideosSection.tsx`
Trocar o `<a>` final por um `<Button asChild variant="outline" size="sm">` com as mesmas classes da anamnese, mantendo ícone Youtube + texto + seta.

### 2. `src/components/GaleriaPreview.tsx`
Trocar `size="lg"` → `size="sm"`, remover `font-label uppercase tracking-widest`, adicionar as classes da anamnese (`border-cdl-primary text-cdl-primary bg-transparent hover:bg-cdl-primary/10 rounded-full text-xs`). Manter ícone `Expand`.

## Arquivos
- `src/components/UltimosVideosSection.tsx` — link YouTube → Button outline sm
- `src/components/GaleriaPreview.tsx` — Button outline lg → sm com classes alinhadas

## Restrições
- Não mexer em CTA principal (WhatsApp, anamnese principal de fato).
- Ícones e textos preservados.
- Sem mudança de tipografia global, cores ou layout das seções.
