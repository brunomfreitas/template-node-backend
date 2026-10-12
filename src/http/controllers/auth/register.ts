//src/http/controllers/auth/register.ts
import { hashPassword } from "@/lib/auth/crypto";
import { signToken } from "@/lib/auth/jwt";
import prismaClient from "@/lib/prisma/prisma";
import { Request, Response } from "express";
import { z } from "zod";

const registerSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  id_pessoa: z.coerce.number().int().positive(),
});

export async function registerHandler(req: Request, res: Response) {
  const { id_pessoa, login, password } = registerSchema.parse(req.body);

  const exists = await prismaClient.usuario.findFirst({ where: { login } });
  if (exists) return res.status(409).json({ message: "Login already in use" });

  const person = await prismaClient.pessoa.findFirst({ where: { id_pessoa } });
  if (!person) return res.status(404).json({ message: "Person not found" });

  const passwordHash = await hashPassword(password);

  const user = await prismaClient.usuario.create({
    data: {
      id_pessoa,
      login,
      password: passwordHash,
      dt_cadastro: new Date(),
      st_ativo: true,
    },
  });

  const token = signToken({ sub: user.id_usuario, pid: user.id_pessoa, login: user.login });

  return res.status(201).json({
    token,
    user: {
      id: user.id_usuario,
      login: user.login,
      id_pessoa: person.id_pessoa, // <- padronizado
    },
  });
}
