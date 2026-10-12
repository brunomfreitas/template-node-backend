// CÓDIGO V6
// src/http/controllers/dominio-valor/soft-delete.ts
import { DominioValorRepository } from "@/repositories/prisma/dominio-valor.repository";
import { DeleteUseCase } from "@/use-cases/dominio-valor/delete";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function deleteController(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const deleteUseCase = makeUseCase(DeleteUseCase, DominioValorRepository);

  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
