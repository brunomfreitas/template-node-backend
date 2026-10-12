// src/app.ts
import { router } from '@/routes';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { globalErrorHandler } from './errors';
import { setupSwagger } from './lib/swagger/setup-swagger';

dotenv.config();

const createApp = async () => {
  const app = express();

  // 1) JSON antes de tudo
  app.use(express.json());

  // 2) CORS antes de qualquer rota/middleware de auth
  app.use(
    cors({
      origin: ['http://localhost:8081'], // a sua SPA/Next
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false // true só se usar cookies HttpOnly
    })
  );

  // 3) Responder preflight SEM passar por auth
//   app.options('/(.*)', cors()); // path-to-regexp v6

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  // (opcional) rota de saúde sem auth
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // 4) Swagger (normalmente público)
  setupSwagger(app);

  // 5) Suas rotas (aplique requireAuth só onde precisa)
  app.use(router);

  app.use(globalErrorHandler);

  return app;

};

export default createApp;
