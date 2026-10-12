// CÓDIGO V7
// src/http/controllers/organizacao/soft-delete.ts
import { PessoaRepository } from "@/repositories/prisma/pessoa.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SoftDeleteUseCase } from "@/use-cases/pessoa/soft-delete";
import { Request, Response } from "express";
import { z } from "zod";

export async function softDelete(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });
  
  const { id } = registerParamsSchema.parse(req.params);

  const deleteUseCase = makeUseCase(SoftDeleteUseCase, PessoaRepository);

  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
