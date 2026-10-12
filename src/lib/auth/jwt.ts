// src/lib/auth/jwt.ts
import { env } from '@/env';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || '1d';

export type JwtPayload = {
  sub: number | undefined;          // userId
  pid: number | undefined;          // personId
  login: string;
};

export function signToken(payload: JwtPayload) {
  // Fazemos um cast explícito pro TS parar de tentar casar a sobrecarga errada
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any // string no formato "1d", "60s", etc.
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
