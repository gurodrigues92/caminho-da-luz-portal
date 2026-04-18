
## Entendi o pedido

Usuário quer:
1. Substituir o texto "Caminho da Luz" (h1) na hero pela nova imagem `Logo_Caminho_da_Luz_2.png` (wordmark/escrito).
2. Como ambas as imagens (símbolo já no topo + novo wordmark) são brancas e o background da hero também é claro, aplicar um filtro azul (cdl-primary) para criar contraste.

## Verificação rápida

Hero atual (`src/routes/index.tsx`):
- `<motion.img src={logoCdl} className="h-24 ..." />` — símbolo
- `<motion.h1 ...>Caminho da Luz</motion.h1>` — texto a substituir

Token de azul: `cdl-primary` (forest green per memory, mas o usuário diz "azul que estamos usando" — o token primary é o que está em uso, vou aplicar via CSS filter para igualar `--cdl-primary`).

## Plano

1. **Copiar** `user-uploads://Logo_Caminho_da_Luz_2.png` para `src/assets/wordmark-caminho-da-luz.png`.
2. **Editar `src/routes/index.tsx`**:
   - Importar `wordmarkCdl` do novo asset.
   - Substituir o `<motion.h1>Caminho da Luz</motion.h1>` por `<motion.img src={wordmarkCdl} alt="Caminho da Luz" className="h-16 md:h-24 w-auto mx-auto" style={{ filter: '...' }} />`.
   - Aplicar filtro CSS que converte branco → azul cdl-primary em **ambas** as imagens (símbolo + wordmark) na hero.

3. **Técnica de coloração**: PNG branco com transparência → usar `filter` CSS. Como `filter: hue-rotate` não funciona em branco puro, vou usar a técnica `brightness(0) saturate(100%) invert(...) sepia(...) saturate(...) hue-rotate(...) brightness(...) contrast(...)` calibrada para o azul do projeto. Alternativa mais simples e robusta: aplicar `mask-image` com `background-color: hsl(var(--cdl-primary))` — mantém a forma do PNG e pinta na cor exata do token.

   Vou usar **mask-image** (mais preciso, casa exatamente com o token CSS):
   ```tsx
   <div
     className="h-24 w-auto mx-auto bg-cdl-primary"
     style={{
       maskImage: `url(${logoCdl})`,
       WebkitMaskImage: `url(${logoCdl})`,
       maskRepeat: 'no-repeat',
       maskPosition: 'center',
       maskSize: 'contain',
       width: '120px', // precisa de width fixo pois div não tem dimensão intrínseca
     }}
   />
   ```
   
   Como mask precisa de width definido, vou usar containers com aspect-ratio adequado (símbolo ~1:1, wordmark ~5:1 baseado no preview).

4. **Manter** subtitle, citação e atribuição como estão.

## Arquivos
- `src/assets/wordmark-caminho-da-luz.png` (novo)
- `src/routes/index.tsx` (hero: trocar h1 por wordmark + colorir ambas via mask)
