
The user wants to recreate the cards in the "Nossas Casas" section on the home page. Each card should have its own visual identity (unique image), but with only the casa name written ON the image itself.

Let me check the current implementation to understand what's there.

Currently the CasasSection on home likely uses photos with text overlay rendered in HTML. The user wants the name baked INTO the image itself (typography as part of the artwork).

Plan:

## Recriar cards da seção "Nossas Casas" com identidade própria

Gerar 4 imagens novas (uma por casa) usando IA, cada uma com identidade visual única e o nome da casa escrito DENTRO da imagem como parte do design.

### Identidade visual de cada card

- **Sorocaba (Sede)** — Mata atlântica/floresta com luz dourada filtrada entre as árvores. Texto "SOROCABA" em tipografia serifada elegante, cor dourada.
- **São Paulo** — Skyline urbano ao entardecer com tons quentes, silhueta de prédios. Texto "SÃO PAULO" em tipografia clean.
- **Recife** — Paisagem litorânea/coqueiros com luz tropical, tons azul-turquesa e areia. Texto "RECIFE" em tipografia fluida.
- **Itararé** — Campos abertos do interior paulista, céu amplo, tons terrosos e verdes. Texto "ITARARÉ" em tipografia rústica.

Todas seguindo o mood espiritual/contemplativo do Caminho da Luz (luz suave, atmosfera mística, paleta harmonizando com cdl-primary azul e cdl-secondary dourado).

### Implementação

1. Gerar as 4 imagens via Gemini image (nano banana pro para qualidade alta) com o nome embutido em cada uma, formato landscape (16:9 ou 21:9 para combinar com o aspect ratio atual do card).
2. Salvar em `/public/images/casas/sorocaba-card.jpg`, `sao-paulo-card.jpg`, `recife-card.jpg`, `itarare-card.jpg`.
3. Atualizar `src/routes/index.tsx` na `CasasSection`:
   - Trocar as URLs das imagens dos cards pelas novas geradas.
   - Remover o overlay de texto HTML que renderiza o nome (já que agora está na imagem).
   - Manter o resto: link, hover, badge "SEDE" se aplicável, descrição abaixo.

### Arquivos alterados
- `public/images/casas/sorocaba-card.jpg` — nova
- `public/images/casas/sao-paulo-card.jpg` — nova
- `public/images/casas/recife-card.jpg` — nova
- `public/images/casas/itarare-card.jpg` — nova
- `src/routes/index.tsx` — trocar URLs e remover overlay de texto dos cards

### Observação
Texto embutido em imagens gerado por IA pode ocasionalmente sair com pequenas imperfeições. Vou revisar cada imagem após gerar e regenerar se necessário antes de aplicar. Caso prefira, posso manter o texto em HTML (mais flexível para edição futura) e apenas trocar as imagens de fundo — me avise.
