import { UsuarioRepository } from "@/repositories/prisma/usuario.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/usuario/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_pessoa: z.coerce.number(),
    login: z.string(),
    password: z.string(),
  });

  const { id_pessoa, login, password } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, UsuarioRepository);

  const data = await updateUseCase.handler(id, { id_pessoa, login, password });

  return res.status(200).json(data);
}
