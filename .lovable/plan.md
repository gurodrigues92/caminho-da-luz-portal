
## Pedido
Na seção CTA "Pronto para expandir sua consciência?", como removemos a Aurora, a imagem de fundo ficou com pouco contraste para os textos azuis. Adicionar uma camada branca semi-transparente sobre a imagem para garantir boa legibilidade.

## Estado atual
Hoje o CTA tem:
- Imagem de fundo (hero-mobile/desktop)
- Overlay escuro: `bg-gradient-to-b from-black/20 via-transparent to-black/25`
- Textos em `text-cdl-primary` (azul escuro)

O overlay escuro **piora** o contraste do texto azul — precisa virar overlay claro.

## Solução
Substituir o gradiente preto por uma camada branca translúcida que clareia a imagem e dá fundo neutro para o azul:

```tsx
<div className="absolute inset-0 bg-white/70 md:bg-white/60" />
```

Ou um gradiente suave de branco para garantir que a área central (onde fica o texto) tenha mais opacidade:

```tsx
<div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/65 to-white/75" />
```

Vou usar a versão com gradiente suave — mantém a imagem visível nas bordas e garante contraste forte no centro do texto.

## Arquivo
- `src/routes/index.tsx` — apenas a linha do overlay dentro de `CTASection`.

## Restrições
- Imagens de fundo permanecem.
- Textos azuis e botões não mudam.
- Sem alterar layout, tipografia ou outras seções.
