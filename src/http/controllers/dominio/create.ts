// CÓDIGO V6
// src/http/controllers/dominio/create.ts
import { DominioRepository } from "@/repositories/prisma/dominio.repository";
import { CreateUseCase } from "@/use-cases/dominio/create";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    nm_dominio: z.string(),
    ds_dominio: z.string(),
    ds_alias: z.string(),
    id_dominio_sup: z.coerce.number().nullable().optional(),
    id_dominio_valor_sup: z.coerce.number().nullable().optional(),
  });

  const {
    nm_dominio,
    ds_dominio,
    ds_alias,
    id_dominio_sup,
    id_dominio_valor_sup,
  } = registerBodySchema.parse(req.body);

  const createUseCase = makeUseCase(CreateUseCase, DominioRepository);

  const data = await createUseCase.handler({
    nm_dominio,
    ds_dominio,
    ds_alias,
    id_dominio_sup,
    id_dominio_valor_sup,
  });

  return res.status(201).json(data);
}
