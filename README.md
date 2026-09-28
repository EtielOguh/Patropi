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
npm run preview
```

O build estático é gerado na pasta `out`.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente o site a cada envio para a branch `main` e também pode ser executado manualmente pela aba **Actions**.

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Envie as alterações para a branch `main`.
4. Acompanhe o workflow **Publicar site no GitHub Pages** na aba **Actions**.

O endereço e o caminho base são obtidos automaticamente da configuração do GitHub Pages. Assim, o site funciona tanto em `usuario.github.io/Patropi/` quanto em um domínio personalizado configurado nas opções do repositório.

Para simular localmente o endereço padrão deste repositório:

```bash
NEXT_PUBLIC_BASE_PATH=/Patropi \
NEXT_PUBLIC_SITE_URL=https://etieloguh.github.io/Patropi \
npm run build
```

## Dados do negócio

Telefone, endereço, horários, avaliações, links e o estado de verificação de cada informação ficam centralizados em:

`src/config/business.ts`

Informações divergentes ou ainda não fornecidas não foram tratadas como definitivas. Consulte `OWNER_CHECKLIST.md` antes de publicar.

## Fotos e marca

O site usa a logo e fotografias reais publicadas no Instagram oficial e no perfil público do Hotel Patropi no Google. As cópias locais foram convertidas para WebP. A origem de cada arquivo está documentada em `public/images/README.md`.

Quando o estabelecimento fornecer os originais em alta resolução, eles podem substituir os arquivos mantendo nomes e proporções.

## Formulários

O GitHub Pages não executa rotas de servidor. Por isso, os formulários de contato e disponibilidade preparam a mensagem no navegador e abrem o WhatsApp da Patropi para o visitante confirmar o envio. Nenhum dado dos formulários é armazenado pelo site.

## Integrações preparadas

- Eventos via `window.dataLayer` para GA4/GTM.
- Preferência de cookies salva localmente; trackers opcionais não estão ativados.
- Campos centralizados para ratings e contagem de avaliações, preparados para Google Places API.
- Formulário de disponibilidade abre o WhatsApp com datas, adultos e crianças preenchidos automaticamente.
- Formulário geral de contato abre uma mensagem completa no WhatsApp.
- Estrutura de cardápio em `/restaurante/cardapio` sem itens ou preços inventados.
