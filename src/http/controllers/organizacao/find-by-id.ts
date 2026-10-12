// CÓDIGO V6
// src/http/controllers/organizacao/find-by-id.ts
import { OrganizacaoRepository } from "@/repositories/prisma/organizacao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { FindByIdUseCase } from "@/use-cases/organizacao/find-by-id";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const findByIdUseCase = makeUseCase(FindByIdUseCase, OrganizacaoRepository);

  const data = await findByIdUseCase.handler(id);

  return res.status(200).json(data);
}
