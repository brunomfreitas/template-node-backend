// V7
// src/http/controllers/prontuario/soft-delete.ts
import { prontuarioUseCases } from "@/use-cases/prontuario/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function softDelete(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const deleteUseCase = prontuarioUseCases.softDelete();
    
  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
