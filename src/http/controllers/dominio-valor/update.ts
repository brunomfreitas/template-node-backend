// CÓDIGO V6
// src/http/controllers/dominio-valor/update.ts
import { DominioValorRepository } from "@/repositories/prisma/dominio-valor.repository";
import { UpdateUseCase } from "@/use-cases/dominio-valor/update";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    id_dominio: z.coerce.number(),
    nm_dominio_valor: z.string(),
    ds_dominio_valor: z.string().nullable().optional(),
  });

  const { id_dominio, nm_dominio_valor, ds_dominio_valor } =
    registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, DominioValorRepository);

  const data = await updateUseCase.handler(id, {
    id_dominio,
    nm_dominio_valor,
    ds_dominio_valor,
  });

  return res.status(200).json(data);
}
