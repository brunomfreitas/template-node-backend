---
name: cognitio-criar-modulo
description: Criar entidades, serviços (use cases) e módulos de API no backend Cognitio, seguindo sua arquitetura Express, TypeScript e Prisma. Use para adicionar entidades ou operações de negócio neste projeto; gere CRUD e rotas somente quando solicitados.
---

# Criar entidades e serviços no Cognitio

Implemente o pedido no backend Cognitio usando os módulos existentes como referência. Esta skill é específica deste projeto: confirme a raiz pelo package.json e pela estrutura antes de editar. Leia os AGENTS.md aplicáveis, inclusive o do diretório pai. Inicie as respostas relacionadas ao backend com `AGENTE BACKEND carregado. 🫡`, conforme a instrução local, enquanto ela permanecer vigente.

## Definir o escopo

Extraia do pedido o nome da entidade, campos, tipos, obrigatoriedade, relações e operações desejadas. Consulte primeiro o schema e módulos relacionados para resolver informações ausentes. Pergunte apenas sobre decisões de domínio que não possam ser inferidas, como uma relação ambígua ou regra de negócio não especificada. Avance nas partes independentes enquanto aguarda.

- Entidade apenas: implemente a representação e contratos necessários, sem adicionar automaticamente endpoints.
- Serviço ou operação: use a camada `src/use-cases/<modulo>/`; crie apenas as dependências e integrações necessárias.
- Módulo ou CRUD completo: integre entidade, interface, repositório, use cases, validação, controllers e rotas, conforme as operações pedidas.

Apresente um plano curto com arquivos afetados antes da implementação. Não crie uma camada `services` paralela aos use cases por conveniência.

## Reconhecer os padrões reais

Use `rg --files src prisma tests` e pesquisas delimitadas; exclua node_modules e dist. Escolha o módulo mais próximo do domínio solicitado e leia seu fluxo completo. Os caminhos abaixo são referências observadas, não templates imutáveis: confira a versão atual antes de copiar.

| Papel | Referência relativa à raiz do backend |
| --- | --- |
| Modelos persistidos | `prisma/schema.prisma` |
| Interface de domínio | `src/domains/interfaces/dominio.interface.ts` |
| Entidade | `src/domains/entities/dominio.entity.ts` |
| Contrato de repositório | `src/repositories/interfaces/dominio.repository.interface.ts` |
| Contrato base e paginação | `src/repositories/interfaces/prisma-base.repository.interface.ts` |
| Implementação Prisma | `src/repositories/prisma/dominio.repository.ts` |
| Base compartilhada | `src/repositories/prisma/prisma-base.repository.ts` |
| Operações de negócio | `src/use-cases/dominio/` |
| Composição | `src/use-cases/factory/make-use-case.ts` |
| Controllers e router | `src/http/controllers/dominio/` |
| Registro e autenticação | `src/routes.ts` e `src/http/middlewares/require-auth.ts` |
| Erros | `src/errors/` e `src/app.ts` |

Use arquivos kebab-case, classes PascalCase e interfaces com prefixo I quando o módulo equivalente confirmar esse padrão. Preserve os nomes de campos do domínio/banco, como `id_dominio` e `nm_dominio`, sem convertê-los arbitrariamente para camelCase. Use os aliases de importação existentes.

## Implementar entidade e persistência

Leia o modelo Prisma completo, relações, chave primária, defaults, nulabilidade e mapeamentos físicos antes de escrever consultas. Diferencie campo opcional em entrada, coluna nullable e valor preenchido pelo banco. Não copie campos de auditoria ou `st_ativo` para um modelo que não os possua.

As entidades observadas são classes que implementam interfaces em `domains/interfaces`. Repositórios específicos estendem `PrismaBaseRepository<'modelo', 'chave_primaria'>` e contratos estendem `IPrismaBaseRepository`. Reutilize a base quando compatível, verificando suas assinaturas e comportamento; não replique o CRUD herdado. Confirme o nome da tabela física antes de configurar `table`, inclusive o schema `cognitio` quando aplicável. Não presuma que todo modelo tem chave simples ou suporta soft delete.

Inspecione `src/repositories/prisma/include-map.ts` se precisar retornar relações. Acrescente somente relações necessárias e evite expor campos sensíveis. Para consultas específicas, prefira select para subconjuntos e transações quando operações dependentes precisarem ser atômicas.

Se faltar um modelo persistido, implemente o schema apenas dentro do escopo solicitado e informe o impacto no banco. Não execute automaticamente db pull, db push, reset ou migrations como efeito de gerar código. Não crie ou execute migrations destrutivas sem instrução explícita. Não leia nem reproduza credenciais em artefatos ou respostas.

## Implementar serviços e HTTP

Use cases recebem a interface do repositório pelo construtor e expõem `handler(...)` nos exemplos atuais. Mantenha regras de negócio nessa camada, sem req/res. Reutilize `makeUseCase` para composição quando sua assinatura atender ao caso; não force essa factory em dependências incompatíveis.

Nos controllers, siga a validação Zod existente, extraia somente entradas permitidas e delegue a operação. Valide body, parâmetros e query utilizados; não aceite campos internos por espalhamento irrestrito do body. Preserve erros centralizados e contratos HTTP, sem retornar stack traces ou mensagens internas do banco.

Para CRUD completo, confira as rotas atuais do módulo escolhido. Dominio usa POST `/`, GET `/`, GET `/editar/:id`, GET `/visualizar/:id`, PUT `/editar/:id`, PUT `/:id` para soft delete e GET `/search`. Não transforme soft delete em exclusão física nem exponha delete físico só porque o repositório possui esse método. Preserve a resposta paginada `{ data, page, pageSize, total, totalPages }` quando aplicável.

Registre novos routers em `src/routes.ts` no trecho protegido por `requireAuth`, salvo requisito explícito de endpoint público. Verifique autorização específica além da autenticação.

Para busca, leia `src/http/controllers/factory/make-search-handler.ts` e o use case de search equivalente. A factory resolve a expressão de acesso a partir do usuário e da aplicação no servidor; não aceite `expr` enviado pelo cliente como substituto. Determine o código correto da aplicação e informe eventual cadastro de permissão necessário, sem alterar dados de acesso automaticamente. Não concatene entrada externa em SQL.

Antes de alterar contratos existentes, procure consumidores, inclusive no frontend irmão. Atualize documentação OpenAPI quando a API criada ou alterada exigir, conferindo o mecanismo existente e evitando regeneração de arquivos não relacionados.

## Validar e entregar

Leia package.json e configuração Jest atuais antes de escolher verificações. No estado observado há `build`, `test`, `prisma:gen` e `generate:openapi`; não há script lint. Execute os checks pertinentes disponíveis, sem instalar dependências ou inventar scripts apenas para cumprir uma lista.

Para novas regras de negócio, teste sucesso, entradas inválidas, limites e falhas relevantes usando repositórios simulados quando apropriado. Para HTTP, cubra validação, status e autorização dos endpoints adicionados.

Inspecione os testes existentes antes de executar ou copiar: alguns testes de controller referem-se a SQLite, `/person` e usam deleteMany, embora o schema atual seja PostgreSQL. `tests/setup-env.ts` carrega dotenv. Não execute suites que limpem dados sem verificar isolamento em banco exclusivo de testes. Prefira testes unitários isolados para a lógica nova e relate limitações de integração sem mascará-las.

Execute os testes relevantes e `npm run build` quando alterar TypeScript. Se mudar Prisma, execute `npx prisma validate` e gere o client quando necessário com o script existente. Diferencie erros preexistentes de regressões e não amplie o escopo para consertar módulos alheios.

Revise imports, nomes de modelos, chaves, rotas, relações e contratos. Informe arquivos criados/alterados, operações implementadas, checks realmente executados e pendências de banco ou configuração. Não alegue que a funcionalidade foi validada em runtime se apenas compilou.
