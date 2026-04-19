

## Diagnóstico
A imagem de fundo não está por cima do efeito. Pela estrutura atual da hero, a ordem é:

```text
imagem de fundo
→ AuroraLayer
→ overlay preto
→ conteúdo
```

Então o problema principal não é a foto sobrepor a aurora, e sim:
- o `overlay` escuro acima da aurora está escurecendo tudo;
- `mix-blend-soft-light` é sutil demais sobre foto;
- a própria aurora ainda está muito “lavada” para aparecer bem.

## Ajuste proposto
Vou deixar a hero mais clara e fazer a aurora aparecer de verdade, sem mexer no conteúdo.

### 1. `src/routes/index.tsx`
Na hero:
- reduzir o escurecimento do overlay: `bg-black/30` → algo como `bg-black/10` ou um gradiente mais leve;
- deixar a imagem um pouco mais clara com classes tipo `brightness-110` / `contrast-105`;
- trocar o uso da aurora de `mix-blend-soft-light` para uma abordagem mais visível:
  - remover o blend mode, ou
  - usar `mix-blend-screen` com opacidade alta só se o resultado ficar melhor;
- manter a aurora entre a foto e o overlay, mas com menos bloqueio visual por cima.

### 2. `src/components/ui/aurora-background.tsx`
Fortalecer o efeito:
- aumentar ainda mais a presença das cores;
- reduzir o quanto o blur apaga as luzes;
- remover comportamentos que suavizam demais o efeito;
- se necessário, duplicar a camada visual da aurora para criar mais volume de luz.

## Resultado esperado
- hero mais clara;
- imagem de fundo continua visível;
- aurora finalmente perceptível em movimento;
- texto continua legível.

## Arquivos
- `src/routes/index.tsx`
- `src/components/ui/aurora-background.tsx`

