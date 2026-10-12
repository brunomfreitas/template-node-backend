// V7
// src/http/controllers/prontuario/delete.ts
import { prontuarioUseCases } from "@/use-cases/prontuario/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function deleteController(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);
    
  const deleteUseCase = prontuarioUseCases.delete();

  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
