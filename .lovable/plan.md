
## Pedido

1. Trocar o logo do footer pela nova imagem (wordmark branco).
2. Mover a seção da Rádio (Spotify) para ser a **última seção antes do footer** na home.

## Investigação

- Footer atual (`src/components/layout/Footer.tsx`): usa logo do Cloudinary (`logo.png`), height `h-12`. Como a imagem é branca sobre fundo escuro (`bg-cdl-bg-dark`), funciona sem filtro.
- Home (`src/routes/index.tsx`): preciso confirmar a ordem atual das seções para reposicionar a Rádio. Já existe uma rota `/radio`, mas o usuário falou em "sessão da rádio" — provavelmente há uma seção embed do Spotify na home que precisa ser movida. Preciso ver o `index.tsx` para confirmar.

## Plano

### 1. Footer — trocar logo
- Copiar `user-uploads://Logo_Caminho_da_Luz_2-2.png` para `src/assets/wordmark-caminho-da-luz-footer.png` (mesmo wordmark já usado na hero, mas como o footer tem fundo escuro `bg-cdl-bg-dark`, mantém branco — sem máscara/filtro).
- Em `Footer.tsx`: substituir `<img src="https://res.cloudinary.com/.../logo.png" />` por `<img src={wordmark} />`.
- Ajustar altura: `h-12` → `h-10 md:h-12` (wordmark é mais largo que o símbolo redondo atual; provavelmente cabe bem).

### 2. Home — mover seção Rádio/Spotify para o final
- Ler `src/routes/index.tsx` para localizar a seção do Spotify embed e identificar a ordem atual.
- Mover o bloco `<section>` do Spotify para ser o **último filho** antes do `<Footer />` (que vem do `__root.tsx`, então basta ser a última seção do componente da home).
- Manter conteúdo, estilos e animações intactos — apenas reposicionar.

## Arquivos
- `src/assets/wordmark-caminho-da-luz-footer.png` (novo)
- `src/components/layout/Footer.tsx` (trocar logo)
- `src/routes/index.tsx` (reordenar seções — mover Rádio para o final)
