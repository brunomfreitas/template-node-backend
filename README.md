# Procedimento para colocar o sistema no ar

Para subir o docker com o backend e postgres:
	
	docker compose up --build	
	
Comando para limpar o ambiente completo:

	docker compose down -v --rmi all



Após rodar o comando acima parar o backend e rodar backend localmente:
	npm run dev

Depois do backend no ar temos acessivel o swagger:
http://localhost:3000/swagger/








# P1 - Para criar um projeto do Zero
npm init -y

npm install express

npm i -D @types/node tsup tsx typescript

npx tsc --init

npm i dotenv zod



# TypeORM
https://typeorm.io/docs/getting-started

npm install typeorm
npm install reflect-metadata
npm install pg

npx typeorm init --name blog --database postgres



# P2 - Preparar ambiente docker
> Rede
docker network create --driver bridge blog-network

> Volume para o banco de dados
docker volume create blogpgdata

# P3 - Criar conteiner a partir da imagem cognitio-postgres
docker run -d --name blog-pg --network blog-network -e POSTGRES_USER="admin" -e POSTGRES_PASSWORD="blog" -e POSTGRES_DB="blog" -v blogpgdata:/var/lib/postgresql/data -p 5433:5432 cognitio-postgres:17

# P4 - Configuração do banco de dados

1. Criar o schema (se ainda não criou):
CREATE SCHEMA blog;

2. Criar um usuário para a aplicação:
CREATE USER blog_user WITH PASSWORD 'blog_user';

3. Dar permissão para esse usuário acessar o schema:
GRANT USAGE ON SCHEMA blog TO blog_user;

4. Dar permissão para criar/usar tabelas no schema:
GRANT CREATE ON SCHEMA blog TO blog_user;

5. Garantir acesso às tabelas futuras:
ALTER DEFAULT PRIVILEGES IN SCHEMA blog
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO blog_user;

6. Caso já existam tabelas no schema, conceder acesso nelas:
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA blog TO blog_user;




### cognitio - V3

npm init -y
npx tsc --init

npm install prisma @prisma/client
npm install express dotenv zod bcryptjs jsonwebtoken pg swagger-jsdoc swagger-ui-express
npm i -D typescript tsx tsc-alias jest @swc/jest @swc/core @types/node @types/express @types/jsonwebtoken @types/supertest @types/jest supertest

npm i express dotenv
npm i -D typescript tsx @types/node @types/express


# PRISMA
npx prisma db pull
npx prisma generate


# TESTE
https://jestjs.io/


# AUTH




# SWAGGER DINAMICO COM BASE NO CÓDIGO ESCRITO:

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






# ESTRUTURA DE PASTA DO PROJETO COGNITIO
🧠 Estrutura de referência
src/
 ├─ domains/
 │   └─ entities/
 │	 │		├─ dominio.entity.ts
 │   └─ enums/
 │	 │		├─ dominio.enums.ts
 │   └─ interfaces/
 │			├─ dominio.interface.ts
 ├─ http/
 │   └─ controllers/
 │       └─ dominio/
 │           ├─ dominio.routes.ts
 │           ├─ create.ts
 │           ├─ find-by-id.ts
 │           ├─ update.ts
 │           ├─ list.ts
 │           ├─ list-all.ts
 │           └─ soft-delete.ts
 │   └─ middlewares/
 │       └─ require-auth.ts
 └─ lib/
     └─ auth/
         └─ dominio.repository.ts
	 └─ prisma/
 └─ repositories/
     └─ prisma/
         └─ dominio.repository.ts






# ordem de criação de objetos

1 - domain/interface
2 - domain/entity

3 - repository/interface
4 - repository/prisma







