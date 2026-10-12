// CÓDIGO V8
// src/http/controllers/figura-fundo/soft-delete.ts
import { figuraFundoUseCases } from "@/use-cases/figura-fundo/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function softDelete(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const deleteUseCase = figuraFundoUseCases.softDelete();
    
  const data = await deleteUseCase.handler(id);

  return res.status(200).json(data);
}
