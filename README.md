# Rede Patropi — site institucional

Site institucional/comercial em Next.js, TypeScript e Tailwind CSS para o Restaurante/Churrascaria e Hotel Patropi, em Casimiro de Abreu — RJ.

## Executar localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run lint
npm run build
npm run start
```

## Dados do negócio

Telefone, endereço, horários, avaliações, links e o estado de verificação de cada informação ficam centralizados em:

`src/config/business.ts`

Informações divergentes ou ainda não fornecidas não foram tratadas como definitivas. Consulte `OWNER_CHECKLIST.md` antes de publicar.

## Fotos e marca

O site usa a logo e fotografias reais publicadas no Instagram oficial e no perfil público do Hotel Patropi no Google. As cópias locais foram convertidas para WebP. A origem de cada arquivo está documentada em `public/images/README.md`.

Quando o estabelecimento fornecer os originais em alta resolução, eles podem substituir os arquivos mantendo nomes e proporções.

## Formulário

A rota `/api/contact` inclui validação server-side, honeypot e limitação básica por IP. Para entregar mensagens, configure no ambiente do servidor:

```env
CONTACT_WEBHOOK_URL=https://seu-provedor.example/webhook
NEXT_PUBLIC_SITE_URL=https://dominio-final.example
```

Sem `CONTACT_WEBHOOK_URL`, o site orienta o visitante a ligar, sem simular um envio bem-sucedido.

## Integrações preparadas

- Eventos via `window.dataLayer` para GA4/GTM.
- Preferência de cookies salva localmente; trackers opcionais não estão ativados.
- Campos centralizados para ratings e contagem de avaliações, preparados para Google Places API.
- Formulário de disponibilidade encaminha datas e hóspedes ao contato.
- O fluxo de disponibilidade abre o WhatsApp com datas e quantidade de hóspedes preenchidas automaticamente.
- Estrutura de cardápio em `/restaurante/cardapio` sem itens ou preços inventados.
