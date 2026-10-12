// CÓDIGO V6
// src/http/controllers/organizacao/update.ts
import { OrganizacaoRepository } from "@/repositories/prisma/organizacao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/organizacao/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    nm_organizacao: z.string(),
    st_ativo: z.coerce.boolean(),
  });

  const { nm_organizacao, st_ativo } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, OrganizacaoRepository);

  const data = await updateUseCase.handler(id, {    
    nm_organizacao: nm_organizacao,
    st_ativo: st_ativo,
  });

  return res.status(201).json(data);
}
