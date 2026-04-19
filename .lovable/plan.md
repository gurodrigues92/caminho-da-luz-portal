

## Pedido
Duas coisas:
1. **Conteúdo externo (Drive + Notion)** — aplicar formato `YYYY-MM-DD — Descrição` (continuação do ciclo anterior, parte do Notion já feita)
2. **Tipografia/contraste no site** — usuário acha as letras pequenas em geral, e a seção "Pronto para expandir sua consciência?" tem baixo contraste

## Parte 1 — Drive + Notion (status do ciclo anterior)

- **Notion**: 6/6 substituições já aplicadas no ciclo anterior. Vou re-rodar `notion-fetch` rápido só para confirmar idempotência (se já estiver no novo formato, reporto skip).
- **Google Drive**: conector **continua não disponível** neste workspace (só Notion + n8n estão conectados). Não há como deletar/criar os 7 READMEs via MCP. Arquivo `_LEIA-ME — Como adicionar fotos.md` já foi gerado em `/mnt/documents/` no ciclo anterior para upload manual.

→ Ação: re-confirmo Notion + ofereço botão para conectar Google Drive (se disponível no catálogo) **ou** lista clicável das 7 pastas para o usuário fazer o swap manual.

## Parte 2 — Tipografia + contraste (mudança de código)

### Diagnóstico
Preciso inspecionar antes de propor números finais:
- `src/styles.css` — tamanhos base, escala, variáveis de cor
- `src/routes/index.tsx` — encontrar a seção "Pronto para expandir sua consciência?" e ver classes/cores atuais
- Verificar se body usa `text-base` (16px) ou menor, e qual é a hierarquia tipográfica das fontes Cormorant/Source Sans/Josefin

### Hipótese de solução (a refinar após leitura)

**Tamanho geral (sem trocar fonte — manter Cormorant + Source Sans + Josefin que são parte da identidade):**
- Subir body de `text-base` (16px) → `text-[17px]` ou `text-lg` (18px) no desktop, mantendo 16px no mobile
- Subir line-height de parágrafos para `leading-relaxed` (1.625) onde estiver `leading-normal`
- H2 de seções: garantir mínimo `text-3xl md:text-4xl lg:text-5xl`
- Labels Josefin: subir de `text-xs` → `text-sm` onde aparecer pequeno

**Seção "Pronto para expandir sua consciência?" (CTA final):**
- Identificar fundo atual e texto — provavelmente fundo escuro com texto em opacidade reduzida ou cor próxima
- Aumentar contraste: trocar `text-white/70` por `text-white/95` (ou `text-cdl-bg-light`)
- Aumentar peso da fonte do parágrafo: `font-normal` → `font-medium`
- Aumentar tamanho do título e do parágrafo descritivo
- Garantir que botões CTA tenham contraste WCAG AA (4.5:1)

**NÃO trocar fontes** — Cormorant Garamond, Source Sans 3 e Josefin Sans estão na memory `Core` como identidade obrigatória. A solução é **calibrar tamanho/peso/contraste**, não substituir família.

### Arquivos a editar (Parte 2)
- `src/styles.css` (provável: ajustar `--font-size-base` ou tokens de tipografia)
- `src/routes/index.tsx` (seção CTA "Pronto para expandir...")
- Possivelmente `src/components/layout/Footer.tsx` se for parte da seção

## Plano de execução

1. **Ler arquivos** (`styles.css`, `index.tsx`, memory `design/tokens`) para ver tamanhos e cores atuais e localizar a seção "Pronto para expandir"
2. **Re-confirmar Notion** com `notion-fetch` (rápido)
3. **Aplicar ajustes de tipografia/contraste** no código (Parte 2)
4. **Reportar**:
   - Notion: 6/6 já aplicadas (confirmar)
   - Drive: 0/7 — pendente (sem conector); arquivo `.md` pronto em `/mnt/documents/`
   - Código: o que mudou em tamanho/contraste, com antes/depois das classes principais

## Restrições respeitadas
- Não troco famílias de fonte (Cormorant/Source Sans/Josefin permanecem)
- Não mexo em texto/conteúdo, só tamanho/peso/cor
- Não toco em databases do Notion nem em workflows n8n
- Não tento ações de Drive sem conector
- Mantenho identidade visual; só calibro escala e contraste

