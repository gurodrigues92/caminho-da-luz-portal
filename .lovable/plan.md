# Ajuste no CTA "Pronto para expandir sua consciência?"

## Objetivo
Na seção final da home, garantir que a frase **"Primeira vez?"** apareça em uma única linha, e logo abaixo o botão **"Preencha a anamnese"** fique destacado em sua própria linha (em vez de inline com o texto, o que quebra de forma estranha no mobile 390px).

## Alteração

**Arquivo:** `src/routes/index.tsx` (linhas ~480-496)

Trocar o atual `<p>` que envolve texto + botão inline por:
- Uma linha de texto centralizada com "Primeira vez?" (sem o botão dentro)
- Logo abaixo, o botão "Preencha a anamnese" em bloco próprio, centralizado, com um `mt-3` de respiro

### Snippet proposto
```tsx
<div className="mt-6 flex flex-col items-center gap-3">
  <p className="text-cdl-primary/70 text-sm">
    Primeira vez?
  </p>
  <Button
    asChild
    variant="outline"
    size="sm"
    className="border-cdl-primary text-cdl-primary bg-transparent hover:bg-cdl-primary/10 hover:text-cdl-primary rounded-full font-label uppercase tracking-wider text-xs"
  >
    <a
      href="/docs/Anamnese_Formulario.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Preencha a anamnese
    </a>
  </Button>
</div>
```

## Resultado visual
- "Primeira vez?" em uma linha só (nunca quebra)
- Botão "Preencha a anamnese" abaixo, isolado e clicável com área confortável no mobile
- Nenhuma outra alteração no restante da seção (título, subtítulo e botão do WhatsApp permanecem iguais)
