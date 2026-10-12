// V6
// src/http/controllers/aplicacao/soft-delete.ts
import { AplicacaoRepository } from "@/repositories/prisma/aplicacao.repository";
import { DeleteUseCase } from "@/use-cases/aplicacao/delete";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function deleteController(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const deleteUseCase = makeUseCase(DeleteUseCase, AplicacaoRepository);

  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
