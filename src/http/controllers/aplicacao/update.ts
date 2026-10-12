// V6
// src/http/controllers/aplicacao/update.ts
import { AplicacaoRepository } from "@/repositories/prisma/aplicacao.repository";
import { UpdateUseCase } from "@/use-cases/aplicacao/update";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    cd_aplicacao: z.string(),
	nm_aplicacao: z.string(),
    st_ativo: z.coerce.boolean(),
  });

  const { cd_aplicacao, nm_aplicacao, st_ativo } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, AplicacaoRepository);

  const data = await updateUseCase.handler(id, {    
    cd_aplicacao: cd_aplicacao,
	nm_aplicacao: nm_aplicacao,
    st_ativo: st_ativo,
  });

  return res.status(201).json(data);
}
