

## Pedido
Na página `/sobre`, seção hero "Sobre o Caminho da Luz", reorganizar a ordem no mobile:
1. Título "Sobre o Caminho da Luz" + parágrafos de texto
2. Foto do Pedrão
3. Frase final ("Somos filhos do Céu Sagrado...") + badge "Desde 2014"

No desktop manter o layout atual (2 colunas: foto à esquerda, texto à direita).

## Diagnóstico
Hoje em `src/routes/sobre.tsx` o hero é um `grid md:grid-cols-2` com:
- Coluna 1: `<motion.img>` (foto)
- Coluna 2: `<motion.div>` com h1 + 2 parágrafos + badge "Desde 2014"

No mobile (single column) a foto aparece primeiro, depois todo o texto junto. O usuário quer dividir o bloco de texto em duas partes, com a foto no meio.

## Solução
Reestruturar o hero usando classes responsivas de `order` do Tailwind para reordenar no mobile sem quebrar o desktop:

- **Bloco A (texto principal)**: h1 + primeiro parágrafo ("O Instituto Caminho da Luz nasceu...") → `order-1 md:order-2` (mobile: 1º; desktop: coluna direita)
- **Bloco B (foto)**: imagem do Pedrão → `order-2 md:order-1` (mobile: 2º; desktop: coluna esquerda)
- **Bloco C (rodapé)**: segundo parágrafo ("Somos filhos do Céu Sagrado...") + badge "Desde 2014" → `order-3 md:col-span-2` no mobile vai ao final; no desktop fica abaixo das duas colunas, ocupando largura total **OU** mover apenas o badge "Desde 2014" + a frase curta para baixo da foto no mobile

**Decisão de implementação**: usar 3 itens no grid com `order` no mobile, e no desktop forçar Bloco C a ficar dentro da coluna do texto (junto com Bloco A) via reagrupamento. Mais simples: separar em **2 wrappers responsivos** — no mobile renderizar 3 blocos em ordem; no desktop reagrupar A+C dentro da coluna direita.

Abordagem mais limpa: usar `flex flex-col md:grid md:grid-cols-2` com:
- Wrapper texto principal (A) — `order-1 md:order-2`
- Foto (B) — `order-2 md:order-1 md:row-span-2`
- Wrapper rodapé (C: frase Céu Sagrado + badge) — `order-3 md:order-3` (fica abaixo da foto no desktop, abaixo do tudo no mobile)

Para manter o desktop EXATAMENTE como está (frase Céu Sagrado + badge na coluna direita junto com o resto), uso uma duplicação condicional:
- No desktop: layout original intacto (foto | texto completo com badge)
- No mobile: ocultar o bloco rodapé original e renderizar uma versão reordenada

**Mais simples ainda**: dividir em 3 itens de grid com `order`, e no desktop usar `md:contents` no wrapper do texto para que A e C apareçam empilhados na coluna direita. Não — `contents` complica.

**Solução final escolhida**: usar `flex flex-col md:grid md:grid-cols-2 md:gap-10 md:items-center`:
- Bloco A (h1 + 1º parágrafo): `order-1 md:order-2`
- Foto: `order-2 md:order-1`
- Bloco C (2º parágrafo + badge): `order-3 md:order-2` → no desktop cai como 2º item após a foto, mas grid 2-col só tem 2 colunas → vira 3ª célula (linha 2, coluna esquerda). **Quebra desktop.**

Por isso vou usar **renderização duplicada** com `hidden`/`md:hidden`:
- Versão mobile (`md:hidden`): 3 blocos empilhados na ordem pedida
- Versão desktop (`hidden md:grid`): layout original 2 colunas intacto

Isso garante zero impacto no desktop e atende exatamente o pedido no mobile. Conteúdo duplicado em JSX, mas é o caminho mais seguro e legível.

## Arquivos
**Editar:** `src/routes/sobre.tsx` (apenas o `<section>` hero, linhas ~30-58)

## Restrições respeitadas
- Sem mudança de texto, cores, tipografia, animações ou imagens
- Desktop 100% intacto
- Sem novas dependências

