# GERAR SWAGGER DINAMICO COM BASE NO CÓDIGO ESCRITO:

🧠 Estrutura de referência
src/
 ├─ http/
 │   └─ controllers/
 │       └─ dominio/
 │           ├─ dominio.routes.ts   ← define as rotas
 │           ├─ create.ts
 │           ├─ find-by-id.ts
 │           ├─ update.ts
 │           ├─ list.ts
 │           ├─ list-all.ts
 │           └─ soft-delete.ts
 └─ repositories/
     └─ prisma/
         └─ dominio.repository.ts


⚙️ Etapa 1 – script para ler as rotas

Podemos usar o TypeScript compiler API ou uma lib mais leve como ts-morph para ler o código da router e extrair dinamicamente:

	method (get, post, put, delete)

	path (/editar/:id, /all, /)

	handler (create, findById, etc.)

Instalação:
	npm i -D ts-morph

🧩 Etapa 2 – script base (gera JSON OpenAPI)

Criado o script "scripts/generate-openapi-from-routes.ts":
	Esse script lê as controllers e as repositories para montar o arquivo openapi.json que é criado/atualizado na pasta: src/lib/swagger toda vez que executamos o comando: 
		npm run generate:openapi
	O Swagger se atualiza.

