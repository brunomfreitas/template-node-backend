//CÓDIGO V6
// src/http/controllers/grupo-aplicacao/update.ts
import { GrupoAplicacaoRepository } from "@/repositories/prisma/grupo-aplicacao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/grupo-aplicacao/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_grupo_seguranca: z.coerce.number(),
    id_aplicacao: z.coerce.number(),
  });

  const { id_grupo_seguranca, id_aplicacao } = registerBodySchema.parse(
    req.body
  );

  const updateUseCase = makeUseCase(UpdateUseCase, GrupoAplicacaoRepository);

  const data = await updateUseCase.handler(id, {
    id_grupo_aplicacao: id,
    id_grupo_seguranca: id_grupo_seguranca,
    id_aplicacao: id_aplicacao,
  });

  return res.status(201).json(data);
}
