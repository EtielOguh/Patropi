# Patropi — Agent Instructions

Este projeto deve priorizar qualidade visual, consistência,
responsividade, acessibilidade e performance.

## Ferramentas disponíveis

### shadcn MCP

Use o shadcn MCP quando precisar:

- pesquisar componentes
- avaliar componentes existentes
- implementar primitives de UI
- criar dialogs, forms, cards, buttons, menus e outros componentes

Não substitua componentes próprios já bem implementados sem justificativa.

Não instale componentes desnecessários.

Antes de instalar algo, verifique se já existe solução equivalente no projeto.

---

### 21st.dev

Use 21st.dev quando precisar:

- buscar referências de UI
- explorar novas composições
- analisar diferentes soluções visuais
- melhorar seções visualmente fracas
- encontrar componentes de alta qualidade

Use referências como inspiração estrutural.

Não copie identidade visual de outros produtos.

Não transforme o Patropi em uma interface genérica de template.

---

### Chrome DevTools MCP

Use Chrome DevTools MCP sempre que uma alteração visual ou funcional
precisar ser validada no navegador.

Após mudanças relevantes:

1. abra o site;
2. valide o fluxo alterado;
3. verifique console;
4. verifique network;
5. verifique layout;
6. teste responsividade;
7. procure regressões visuais.

Não considere a tarefa concluída apenas porque o código compila.

---

## Fluxo padrão de trabalho

Antes de modificar uma página existente:

1. analise a implementação atual;
2. entenda os componentes existentes;
3. preserve a identidade visual existente;
4. identifique problemas concretos;
5. proponha alterações;
6. implemente apenas o necessário;
7. valide no navegador usando Chrome DevTools.

Para melhorias de design:

1. analise a página atual;
2. use 21st.dev se referências forem úteis;
3. use shadcn apenas quando um componente reutilizável trouxer ganho real;
4. preserve a identidade própria do Patropi;
5. valide desktop e mobile.

Evite redesigns completos sem solicitação explícita.
