// // src/http/middlewares/require-auth.ts
// import { verifyToken } from '@/lib/auth/jwt';
// import { NextFunction, Request, Response } from 'express';

// export function requireAuth(req: Request, res: Response, next: NextFunction) {
//   const header = req.headers.authorization || '';
//   const [, token] = header.split(' ');
//   if (!token) return res.status(401).json({ message: 'Missing token' });

//   try {
//     const payload = verifyToken(token);
//     (req as any).user = payload; // { sub, pid, login }
//     return next();
//   } catch {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// }


// src/http/middlewares/require-auth.ts
import { verifyToken } from '@/lib/auth/jwt';
import { NextFunction, Request, Response } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // 1) Não autenticar preflight
  if (req.method === 'OPTIONS') return res.sendStatus(204);

  // 2) Validar Bearer corretamente
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Bearer token' });
  }

  const token = auth.slice('Bearer '.length).trim();
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = verifyToken(token);
    (req as any).user = payload; // { sub, pid, login }
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
