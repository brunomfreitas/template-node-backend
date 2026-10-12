// CÓDIGO V8
// src/http/controllers/figura-fundo/find-by-id.ts
import { figuraFundoUseCases } from "@/use-cases/figura-fundo/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);
    
  const findByIdUseCase = figuraFundoUseCases.findById();

  const data = await findByIdUseCase.handler(id);

  return res.status(200).json(data);
}
