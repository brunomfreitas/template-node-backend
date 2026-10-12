// CÓDIGO V6
// src/http/controllers/dominio/update.ts
import { DominioRepository } from "@/repositories/prisma/dominio.repository";
import { UpdateUseCase } from "@/use-cases/dominio/update";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    nm_dominio: z.string(),
    ds_dominio: z.string(),
    ds_alias: z.string(),
    id_dominio_sup: z.coerce.number(),
    id_dominio_valor_sup: z.coerce.number(),
  });

  const {
    nm_dominio,
    ds_dominio,
    ds_alias,
    id_dominio_sup,
    id_dominio_valor_sup,
  } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, DominioRepository);

  const data = await updateUseCase.handler(id, {
    nm_dominio,
    ds_dominio,
    ds_alias,
    id_dominio_sup,
    id_dominio_valor_sup,
  });

  return res.status(200).json(data);
}
