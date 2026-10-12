// CÓDIGO V6
// src/http/controllers/aplicacao/create.ts
import { AplicacaoRepository } from "@/repositories/prisma/aplicacao.repository";
import { CreateUseCase } from "@/use-cases/aplicacao/create";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    cd_aplicacao: z.string(),
	nm_aplicacao: z.string(),
  });

  const { cd_aplicacao, nm_aplicacao } = registerBodySchema.parse(req.body);

  const createUseCase = makeUseCase(CreateUseCase, AplicacaoRepository);

  const data = await createUseCase.handler({
    cd_aplicacao: cd_aplicacao,
	nm_aplicacao: nm_aplicacao,
    st_ativo: true,
  });

  return res.status(201).json(data);
}
