//src/http/controllers/auth/login.ts
import { verifyPassword } from "@/lib/auth/crypto";
import { signToken } from "@/lib/auth/jwt";
import prismaClient from "@/lib/prisma/prisma";
import { Request, Response } from "express";
import { z } from "zod";

const loginSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
});

export async function loginHandler(req: Request, res: Response) {
  const { login, password } = loginSchema.parse(req.body);

  const user = await prismaClient.usuario.findFirst({ where: { login } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await verifyPassword(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ sub: user.id_usuario, pid: user.id_pessoa, login: user.login });

  return res.json({
    token,
    user: {
      id: user.id_usuario,
      login: user.login,
      id_pessoa: user.id_pessoa, // <- padronizado
    },
  });
}
