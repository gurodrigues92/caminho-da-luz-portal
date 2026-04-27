## Pedido
Na Hero, o ícone do logo e o wordmark "Caminho da Luz" NÃO devem ficar dentro do shape semi-transparente. Apenas os textos abaixo (H1 "Santo Daime em Sorocaba", parágrafo SEO, linha "Centro Espiritual...", frase do Pedrão e legenda) devem estar dentro da shape.

## Estado atual (`src/routes/index.tsx`, linhas 80-145)
Hoje a `motion.div` com `bg-black/40 backdrop-blur-md ring-1 ring-white/10 shadow-2xl` envolve TUDO: logo (mask), wordmark (mask), H1, parágrafo, "Centro Espiritual", frase do Pedrão e legenda.

## Solução
Reestruturar o bloco em duas partes irmãs dentro de um container flex vertical centralizado:

1. **Fora da shape** (sem fundo, só drop-shadow para legibilidade sobre a imagem):
   - Logo símbolo (mask) — adicionar `drop-shadow-lg`
   - Wordmark "Caminho da Luz" (mask) — adicionar `drop-shadow-lg`

2. **Dentro da shape** (novo `<div>` interno com as classes da shape):
   - H1 "Santo Daime em Sorocaba"
   - Parágrafo SEO ("O Caminho da Luz é um centro...")
   - "Centro Espiritual Universalista · Santo Daime"
   - Frase do Pedrão
   - Legenda "— João Carlos Pedrão, Dirigente"

Estrutura nova:
```tsx
<motion.div className="relative z-10 flex flex-col items-center px-4 max-w-3xl mx-auto">
  {/* Logo símbolo — fora da shape */}
  <motion.div ... className="... drop-shadow-lg" />
  {/* Wordmark — fora da shape */}
  <motion.div ... className="... drop-shadow-lg" />

  {/* Shape com APENAS os textos */}
  <div className="mt-6 w-full text-center px-6 sm:px-8 py-6 sm:py-8 rounded-2xl bg-black/40 backdrop-blur-md ring-1 ring-white/10 shadow-2xl">
    <motion.h1>Santo Daime em Sorocaba</motion.h1>
    <motion.p>O Caminho da Luz é um centro...</motion.p>
    <motion.p>Centro Espiritual Universalista · Santo Daime</motion.p>
    <motion.p>"Mudar o mundo..."</motion.p>
    <motion.p>— João Carlos Pedrão, Dirigente</motion.p>
  </div>
</motion.div>
```

## Arquivo
- `src/routes/index.tsx` — apenas reestruturação do bloco da HeroSection (linhas ~80-145).

## Restrições
- Sem mudança de conteúdo, cores, tipografia ou tamanhos.
- Logo + wordmark mantêm a cor `bg-cdl-primary` atual; ganham `drop-shadow-lg` para destacar sobre a imagem.
- Shape mantém exatamente o mesmo visual (bg-black/40, blur, ring, shadow), só envolve menos elementos.
- Demais seções da home não mudam.
