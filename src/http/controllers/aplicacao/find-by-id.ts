// CÓDIGO V6
// src/http/controllers/aplicacao/find-by-id.ts
import { AplicacaoRepository } from "@/repositories/prisma/aplicacao.repository";
import { FindByIdUseCase } from "@/use-cases/aplicacao/find-by-id";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const findByIdUseCase = makeUseCase(FindByIdUseCase, AplicacaoRepository);

  const data = await findByIdUseCase.handler(id);

  return res.status(200).json(data);
}
