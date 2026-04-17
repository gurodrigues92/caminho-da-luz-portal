

## Resposta às duas perguntas

### 1. Botões "Ver galeria" — para onde vão?

Os botões existem e estão configurados para levar para 4 rotas que **já existem**:
- `/sorocaba/galeria` → tem layout completo com lightbox (6 fotos estáticas)
- `/sao-paulo/galeria`, `/recife/galeria`, `/itarare/galeria` → existem mas mostram apenas "Galeria em breve. Acompanhe nosso Instagram."

**Por que parece que "não funcionam"?** Provavelmente:
- Na home, o botão `Ver galeria de São Paulo →` leva a uma página vazia (mensagem "em breve") — passa a impressão de não ter funcionado.
- Ou pode ser cache de build do `routeTree.gen.ts` desatualizado. Vou forçar a regeneração tocando os arquivos.

### 2. Sincronização com Google Drive — está ciente?

**Não, ainda não há nada implementado.** No projeto:
- Sem connector `google_drive` linkado
- Sem código que chame Drive API
- Galerias hoje são fotos hardcoded (URLs do `caminhodaluzdaime.com.br`) ou do Supabase (tabela `evento_fotos` existe mas está vazia)

### Como fazer a sincronização com Drive — opções

**Opção A — Connector Google Drive da Lovable (recomendado, mais simples)**
- Conectar a conta Google do instituto via tool `standard_connectors--connect`
- Cada casa tem uma pasta no Drive (ex.: `Galeria/Sorocaba/Festa Junina 2024/`)
- Server function `getGaleriaDrive(casa)` que lista arquivos da pasta via gateway
- Cache 1h via TanStack Query
- Imagens servidas pelo endpoint do Drive (`thumbnailLink` para grid, `webContentLink` para lightbox)
- **Limitação**: as fotos precisam estar em pastas com permissão "qualquer pessoa com o link" OU a server function faz proxy autenticado (mais lento mas privado)

**Opção B — Sync periódico Drive → Supabase Storage**
- Job que copia fotos do Drive para o bucket Supabase 1x ao dia
- Frontend lê do Supabase (rápido, sem dependência runtime do Drive)
- Mais robusto, mas requer cron / ação manual

**Opção C — Drive público + embed direto**
- Pastas públicas, frontend chama Drive API com chave pública
- Mais simples ainda, mas expõe a estrutura

### Plano de implementação proposto (em duas etapas)

**Etapa 1 — Agora (sem Drive ainda):**
1. Tornar as galerias `/sao-paulo/galeria`, `/recife/galeria`, `/itarare/galeria` funcionais com o mesmo layout do Sorocaba (grid + lightbox), usando fotos placeholder vindas do `mural` que já é usado.
2. Refatorar para um componente compartilhado `<GaleriaCasa fotos=... />` (sorocaba já tem o código, basta extrair).

**Etapa 2 — Drive (depende de você):**
3. Você confirma a Opção A (Connector Drive).
4. Você cria 4 pastas no Drive e me envia os IDs (ou nomes para eu listar).
5. Implemento server function + hook `useGaleriaDrive(casa)` substituindo as fotos placeholder.

### Perguntas para decidir

Preciso da sua resposta antes de implementar:

1. **Etapa 1 agora?** (deixar as 4 galerias com layout igual ao Sorocaba usando fotos placeholder enquanto Drive não está pronto)
2. **Qual opção de Drive prefere?** (A: connector / B: sync para Supabase / C: pasta pública)
3. **Estrutura no Drive**: uma pasta por casa, ou uma pasta por evento dentro de cada casa? (recomendo subpastas por evento para agrupar no lightbox)

