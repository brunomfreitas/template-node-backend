# ---------- Base com deps completas ----------
FROM node:22.18.0-alpine AS deps
WORKDIR /app
COPY package*.json ./
# use npm ci para builds reprodutíveis
RUN npm install

# ---------- Build: compila TS e GERA o Prisma Client ----------
FROM node:22.18.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
# copie A PASTA prisma (você não estava copiando)
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
# gera o client (usa a CLI do prisma que está em devDependencies)
RUN npx prisma generate
RUN npm run build

# ---------- Runner: só prod deps + artefatos gerados ----------
FROM node:22.18.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Instala SOMENTE prod deps
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/src/lib/swagger/openapi.json ./src/lib/swagger/openapi.json

# Copia o client já gerado do estágio de build
# (sem precisar do prisma CLI em produção)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copia o build
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
