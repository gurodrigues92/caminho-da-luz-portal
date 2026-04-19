

## Passo 1 — Reconhecimento da infraestrutura

Vou ler tudo via MCP/Supabase antes de propor mudanças. O resultado desse reconhecimento determina parte do Passo 2 (sync do JSON de aniversariantes é condicional).

### 1A. Notion (read-only)
Buscar via `mcp_01kjfwamqbfvxacefka2gqm27a--notion-fetch`:
- Página mãe `3427de9fb5e281e79f92ce2ec158d6bb` — convenções gerais e formato `YYYY-MM-DD — Descrição`.
- Database "Calendário Caminho da Luz" — schema + alguns registros (data source `4444e612-14e0-46b6-bd7a-58fbd59e6f23`).
- Database "Estrelados Aniversariantes" — schema + listagem completa (data source `1c3c1ae5-fe44-4c5f-a5ce-65a784e07fae`).
- Comparar nomes/casas/mes/dia com `public/data/aniversariantes.json` (atualmente 86 registros) → relatar diff.

### 1B. n8n (read-only)
- `search_workflows` para listar todos.
- `get_workflow_details` em `2uIpuxFRFaHPmqSb`, `2X2jrc98OOGsZbLa`, `i20zzyz49ZhXpdu7`.
- Comparar lógica e identificar qual é o canônico (o que rodou em 14/04/2026). Reportar duplicatas — **sem arquivar**.
- Reportar se há workflows de sync Notion→Supabase ou Drive→Supabase.

### 1C. Supabase
- Confirmar credenciais (`.env` já em contexto: `api.supabase.altavance.media`).
- Via `psql` (se `PGHOST` disponível) ou via `security--get_table_schema`: verificar existência das tabelas `calendario`, `eventos`, `evento_fotos`, `aniversariantes` e contagem de registros em `calendario`.

→ **Vou reportar tudo isso ao usuário antes de aplicar o Passo 2.**

---

## Passo 2 — Correções (após reconhecimento)

### Correção 1 — Rules of Hooks em `EventCalendar`
**`src/components/EventCalendar.tsx`** linhas ~32-44:
- Substituir chamada condicional por chamada incondicional: `const { eventos: dbEventos, loading } = useCalendario(casa || '');`
- Ajustar `rawEventos` para checar `casa && dbEventos.length > 0`.

**`src/hooks/useCalendario.ts`** dentro do `fetchData`:
- Early return: `if (!supabase || !casa) { setLoading(false); return; }`

### Correção 2 — Cloudinary `f_auto,q_auto,w_800`
- Buscar com `code--search_files` por `res.cloudinary.com/dtt7egwkk/image/upload/v` em todo o projeto.
- Em `src/routes/index.tsx` array `casasData`: aplicar `w_800` nas 4 imagens (caminho-da-luz, ipiranga, recife, itarare).
- Aplicar tamanhos por contexto em qualquer outra ocorrência sem otimização: logo `w_200`, cards `w_800`, hero/og `w_1200`, Pedrão `w_800`.

### Correção 3 — Proteger `.env`
- `.gitignore`: adicionar bloco `.env`, `.env.local`, `.env.production`.
- **Não rodo `git rm --cached`** — comandos git stateful são proibidos pelo ambiente. Vou reportar isso ao usuário e pedir que rode manualmente no terminal local:
  ```bash
  git rm --cached .env
  git rm --cached .env.local 2>/dev/null || true
  git rm --cached .env.production 2>/dev/null || true
  ```

### Correção 4 (condicional) — Sync `aniversariantes.json`
Só executo se o Passo 1A revelar diferença entre Notion e o JSON atual. Se houver diff:
- Reescrever `public/data/aniversariantes.json` espelhando o Notion (mapeando mês PT→número 1-12, mantendo casa exata).
- Se Notion = JSON atual, **não toco no arquivo** e reporto "já sincronizado".

---

## Restrições respeitadas
- Sem mudança visual, de texto, layout, cor, tipografia, animação ou rotas.
- n8n e Notion: apenas leitura.
- Não mexer em galeria/`useGaleria` (escopo do outro prompt).
- `git rm --cached` será solicitado ao usuário (ambiente não permite git stateful).

## Arquivos a editar (Passo 2)
- `src/components/EventCalendar.tsx`
- `src/hooks/useCalendario.ts`
- `src/routes/index.tsx` (e quaisquer outros com Cloudinary não otimizado)
- `.gitignore`
- `public/data/aniversariantes.json` (condicional)

