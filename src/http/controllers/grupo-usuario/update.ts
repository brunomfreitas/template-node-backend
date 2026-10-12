// CÓDIGO V6
// src/http/controllers/grupo-usuario/update.ts
import { GrupoSegurancaRepository } from "@/repositories/prisma/grupo-seguranca.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/grupo-seguranca/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    nm_grupo_seguranca: z.string(),
    st_ativo: z.coerce.boolean(),
  });

  const { nm_grupo_seguranca, st_ativo } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, GrupoSegurancaRepository);

  const data = await updateUseCase.handler(id, {    
    nm_grupo_seguranca: nm_grupo_seguranca,
    st_ativo: st_ativo,
  });

  return res.status(201).json(data);
}
