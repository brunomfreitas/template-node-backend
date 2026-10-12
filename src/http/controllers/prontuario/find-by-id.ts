// CÓDIGO V7
// src/http/controllers/prontuario/find-by-id.ts
import { prontuarioUseCases } from "@/use-cases/prontuario/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);
    
  const findByIdUseCase = prontuarioUseCases.findById();

  const data = await findByIdUseCase.handler(id);

  return res.status(200).json(data);
}
