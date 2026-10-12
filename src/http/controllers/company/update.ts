// src/http/controllers/company/update.ts
import { CompanyRepository } from "@/repositories/prisma/company.repository";
import { UpdateUseCase } from "@/use-cases/company/update";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const registerBodySchema = z.object({
    nr_cnpj: z.string(),
    nm_company: z.string(),
    ds_sector: z.string(),
    ds_subsector: z.string(),
    ds_segment: z.string(),
    st_ativo: z.coerce.boolean(),
  });

  const {
    nr_cnpj,
    nm_company,
    ds_sector,
    ds_subsector,
    ds_segment,
    st_ativo,
  } = registerBodySchema.parse(req.body);

  const updateUseCase = makeUseCase(UpdateUseCase, CompanyRepository);

  const data = await updateUseCase.handler(id, {
    id_company: id,
    nr_cnpj: nr_cnpj,
    nm_company: nm_company,
    ds_sector: ds_sector,
    ds_subsector: ds_subsector,
    ds_segment: ds_segment,
    st_ativo: st_ativo,
  });

  return res.status(200).json(data);
}
