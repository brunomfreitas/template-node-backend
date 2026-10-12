// CÓDIGO V6
// src/http/controllers/dominio/soft-delete.ts
import { DominioRepository } from "@/repositories/prisma/dominio.repository";
import { DeleteUseCase } from "@/use-cases/dominio/delete";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function deleteController(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const deleteUseCase = makeUseCase(DeleteUseCase, DominioRepository);

  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
