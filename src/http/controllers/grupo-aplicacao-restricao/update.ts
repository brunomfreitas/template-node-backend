//CÓDIGO V6
// src/http/controllers/grupo-aplicacao-restricao/update.ts
import { GrupoAplicacaoRestricaoRepository } from "@/repositories/prisma/grupo-aplicacao-restricao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/grupo-aplicacao-restricao/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_grupo_aplicacao: z.coerce.number(),
    ds_clausula_where: z.string(),
  });

  const { id_grupo_aplicacao, ds_clausula_where } = registerBodySchema.parse(
    req.body
  );

  const updateUseCase = makeUseCase(
    UpdateUseCase,
    GrupoAplicacaoRestricaoRepository
  );

  const data = await updateUseCase.handler(id, {
    id_grupo_aplicacao_restricao: id,
    id_grupo_aplicacao: id_grupo_aplicacao,
    ds_clausula_where: ds_clausula_where,
  });

  return res.status(201).json(data);
}
