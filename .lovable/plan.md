
# Sincronização Google Drive → Supabase (Galeria)

## Diagnóstico

A galeria não aparecia porque **a integração com Google Drive nunca foi implementada** no projeto. Hoje `useGaleria` lê apenas das tabelas `eventos` + `evento_fotos` do Supabase self-hosted. Vamos construir um sincronizador que percorre a sua estrutura de pastas no Drive e popula essas tabelas.

## Mapeamento de pastas → dados

```
Caminho da Luz/                    ← pasta raiz (ID configurado em env)
├── {Casa}/                        → coluna `casa` (Sorocaba, São Paulo, Recife, Itararé)
│   └── {Trabalho}/                → `tipo_trabalho` + slug (Original, Sementes, ...)
│       └── Galeria/               → marcador (ignorado, só agrupa)
│           └── {YYYY-MM-DD — Descrição}/   → 1 registro em `eventos`
│               ├── foto1.jpg      → 1 linha em `evento_fotos`
│               └── foto2.jpg
```

Regras de parsing do nome do evento:
- Prefixo `YYYY-MM-DD` → `data_evento`
- Resto após ` — ` (ou ` - `) → `titulo`
- Se não tiver data válida, usa `modifiedTime` da pasta como fallback e o nome inteiro como título

Deduplicação: armazenamos `drive_folder_id` em `eventos` e `drive_file_id` em `evento_fotos` (índices únicos). Re-sync vira upsert idempotente — adiciona novos, ignora existentes.

## Arquitetura

### 1. Connector
Conectar Google Drive via `standard_connectors--connect` (gateway-enabled, OAuth gerenciado pela Lovable). Você seleciona a conta que tem acesso à pasta "Caminho da Luz".

### 2. Schema (migration)
- `ALTER TABLE eventos ADD COLUMN drive_folder_id text UNIQUE`
- `ALTER TABLE evento_fotos ADD COLUMN drive_file_id text UNIQUE`
- Índices nessas colunas para upsert rápido

### 3. Storage
Bucket público no Supabase Storage chamado `galeria-drive`. As fotos são baixadas do Drive e re-uploadadas pra lá (URLs estáveis, sem depender de tokens do Drive). Estrutura: `{casa-slug}/{trabalho-slug}/{evento-slug}/{drive_file_id}.{ext}`.

### 4. Server route: `POST /api/admin/sync-drive`
- Protegida por header `x-sync-token` (segredo `SYNC_DRIVE_TOKEN`)
- Aceita `{ casa?: string, trabalho?: string }` para sync parcial; sem corpo = full sync
- Resposta: `{ casas, trabalhos, eventos_novos, fotos_novas, ignoradas, erros[] }`

Fluxo do handler:
1. Lista subpastas da raiz (`q='ROOT_ID' in parents and mimeType='application/vnd.google-apps.folder'`)
2. Para cada Casa → lista Trabalhos → entra em `Galeria` → lista pastas de evento
3. Faz upsert em `eventos` usando `drive_folder_id`
4. Lista imagens da pasta do evento (`mimeType contains 'image/'`)
5. Para cada imagem nova: baixa via `?alt=media` (gateway), faz `supabaseAdmin.storage.upload`, insere em `evento_fotos` com `url_imagem` apontando pro Storage público
6. Gera `url_thumbnail` com `?width=400` (transform do Supabase Storage) ou Drive `thumbnailLink`

### 5. UI Admin: rota `/admin/sync` (protegida)
- Página simples com:
  - Botão "Sincronizar tudo"
  - Botões por casa ("Sincronizar Sorocaba", etc)
  - Log da última execução (eventos/fotos adicionados, erros)
- Proteção: senha simples em env (`ADMIN_PASSWORD`) validada no servidor — não é fluxo de auth completo, é admin interno

### 6. Cron opcional (não nesta entrega, deixar documentado)
URL estável `https://project--40d704e6-d4b0-4645-b25e-25ddac5f2704.lovable.app/api/admin/sync-drive` pode ser chamada por pg_cron ou cron externo passando o `x-sync-token`.

## Variáveis de ambiente (a configurar)

| Var | Onde | Para quê |
|-----|------|----------|
| `LOVABLE_API_KEY` | server | Gateway (já existe quando connector é linkado) |
| `GOOGLE_DRIVE_API_KEY` | server | Gateway connector key (auto após connect) |
| `GOOGLE_DRIVE_ROOT_FOLDER_ID` | server | ID da pasta "Caminho da Luz" no Drive |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Insert/upload bypassando RLS |
| `SYNC_DRIVE_TOKEN` | server | Protege o endpoint |
| `ADMIN_PASSWORD` | server | Login da página /admin/sync |

Vou pedir o `ROOT_FOLDER_ID` (você copia da URL da pasta no Drive) e o service role key na implementação.

## Ordem de execução

1. Disparar `standard_connectors--connect` para Google Drive
2. Pedir: ID da pasta raiz + service role key do Supabase self-hosted
3. Migration: colunas `drive_folder_id`, `drive_file_id` + índices únicos
4. Criar bucket `galeria-drive` (público) no Supabase
5. Criar `src/lib/drive-sync.server.ts` (lógica de sync)
6. Criar `src/routes/api/admin/sync-drive.ts` (server route POST)
7. Criar `src/routes/admin.sync.tsx` (UI admin com login)
8. Testar com a pasta de exemplo, conferir registros e exibição em `/galeria/sorocaba`

## Out of scope (esta entrega)

- Cron automático (deixo URL pronta pra você configurar)
- Webhook do Drive para sync em tempo real (Google Drive push notifications exige domínio verificado)
- Edição/remoção via UI — remoção no Drive não apaga do Supabase nesta v1 (pode adicionar depois com flag `--prune`)
- Vídeos / outros mimetypes além de imagem
