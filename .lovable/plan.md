
## Pedido
Restaurar a cor azul escuro do wordmark "Caminho da Luz" na hero da home. Na otimização de LCP, troquei o `motion.div` (que usava `mask-image` + `bg-cdl-primary` para colorir) por uma `motion.img`, que renderiza o PNG original (provavelmente preto/transparente), perdendo a cor azul.

## Solução
Voltar ao approach de máscara CSS (que aplica `bg-cdl-primary` no elemento), mas mantendo o ganho de SEO/LCP via `<link rel="preload">` que já existe em `links` do route.

Em `src/routes/index.tsx`, na hero, substituir a `motion.img` atual por um `motion.div` com:
- `role="img"` + `aria-label="Caminho da Luz"` (acessibilidade)
- `bg-cdl-primary` (cor azul escuro da marca)
- `mask-image: url(wordmarkCdl)` + `mask-size: contain` + `mask-repeat: no-repeat` + `mask-position: center` (idem versão `-webkit-`)
- Mesmas classes de tamanho: `mx-auto h-16 md:h-24 w-full max-w-md`

O preload no `head` continua apontando para `wordmarkCdl` com `fetchpriority="high"`, então o asset segue sendo descoberto cedo — LCP preservado.

## Arquivo
- `src/routes/index.tsx` — apenas o bloco do wordmark dentro de `HeroSection`.

## Restrições
- Não mexer em mais nada (preload, fonts, lazy sections permanecem).
- Desktop e mobile mantêm tamanho atual (`h-16 md:h-24`).
