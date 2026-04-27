
# Renomear Recife → Pernambuco (URL, conteúdo e dados)

## Resumo

Trocar a casa "Recife" por "Pernambuco" em todo o projeto: rota `/recife` vira `/pernambuco`, arquivos de imagem renomeados, registros do Supabase atualizados, e redirect 301 de `/recife*` para preservar links antigos e SEO.

## Mudanças

### 1. Renomear arquivos de rota (TanStack file-based routing)
- `src/routes/recife.tsx` → `src/routes/pernambuco.tsx`
- `src/routes/recife_.galeria.tsx` → `src/routes/pernambuco_.galeria.tsx`
- `src/routes/recife_.galeria.$trabalho.tsx` → `src/routes/pernambuco_.galeria.$trabalho.tsx`

Dentro de cada um: trocar `createFileRoute("/recife...")` para `/pernambuco...`, atualizar `nome`, `slug`, metadados (title, og:*, canonical), `casa` passada para `<GaleriaCasa>` e mensagem do WhatsApp.

### 2. Renomear assets de imagem
- `public/images/casas/recife-card.jpg` → `pernambuco-card.jpg`
- `public/images/bg/hero-recife.jpg` → `hero-pernambuco.jpg` (se existir)
- Atualizar todas as referências (`src/routes/index.tsx` linha 182, `recife.tsx` linha 31)
- Imagens do Cloudinary (`v1776188750/caminhodaluz/recife.jpg`) ficam como estão — são URLs externas, basta o front continuar referenciando. Renomear no Cloudinary é opcional e fora do escopo (avisar usuário).

### 3. Atualizar referências textuais
- `src/components/layout/Navbar.tsx`: `{ name: "Pernambuco", to: "/pernambuco" }`
- `src/components/layout/Footer.tsx`: link e texto
- `src/components/CasaPage.tsx`: tipo `slug` aceita `"pernambuco"` no lugar de `"recife"`
- `src/routes/__root.tsx`: meta description global
- `src/routes/index.tsx`: descrição da seção Sobre, card da casa (nome, image, to)
- `src/routes/faq.tsx`: resposta sobre localizações
- `public/sitemap.xml`: atualizar URLs
- `public/data/aniversariantes.json`: trocar `casa: "Recife"` para `"Pernambuco"`

### 4. Redirect 301 `/recife*` → `/pernambuco*`
Criar rotas TanStack que redirecionam server-side preservando o sub-path:
- `src/routes/recife.tsx` (novo, mínimo): `loader` que dispara `throw redirect({ to: "/pernambuco" })`
- `src/routes/recife_.galeria.tsx`: redirect para `/pernambuco/galeria`
- `src/routes/recife_.galeria.$trabalho.tsx`: redirect preservando `params.trabalho`

Isso mantém links antigos funcionando e sinaliza pro Google que o conteúdo mudou de URL.

### 5. Migration no Supabase (UPDATE)
```sql
UPDATE eventos       SET casa = 'Pernambuco' WHERE casa = 'Recife';
UPDATE evento_fotos  SET casa = 'Pernambuco' WHERE casa = 'Recife';  -- se a coluna existir
UPDATE calendario    SET casa = 'Pernambuco' WHERE casa = 'Recife';
```
Vou primeiro inspecionar o schema das três tabelas pra confirmar quais têm a coluna `casa` antes de rodar.

### 6. Pasta no Drive (você precisa fazer manualmente)
Para o sync Drive→Supabase futuro funcionar com o nome novo, você precisa renomear a pasta `Recife/` → `Pernambuco/` no Google Drive. Vou te lembrar disso no final.

## Ordem de execução

1. Inspecionar schema (`eventos`, `evento_fotos`, `calendario`) — confirmar colunas
2. Rodar migration UPDATE
3. Renomear assets (`mv` no `public/images/`)
4. Criar os 3 novos arquivos `pernambuco*.tsx` com conteúdo migrado
5. Substituir os 3 antigos `recife*.tsx` por stubs de redirect 301
6. Atualizar Navbar, Footer, CasaPage (tipo), __root, index, faq, sitemap, aniversariantes.json
7. Avisar usuário pra renomear a pasta no Drive

## Out of scope

- Renomear arquivo no Cloudinary (URL externa, exigiria upload manual)
- Renomear bucket/pastas existentes no Supabase Storage caso já existam fotos lá (não há ainda — sync do Drive não foi rodado)
