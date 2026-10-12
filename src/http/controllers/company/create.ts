// src/http/controllers/company/create.ts
import { CompanyRepository } from "@/repositories/prisma/company.repository";
import { CreateUseCase } from "@/use-cases/company/create";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		nr_cnpj: z.string(),
		nm_company: z.string(),
		ds_sector: z.string(),
		ds_subsector: z.string(),
		ds_segment: z.string()
	})

	const { nr_cnpj, nm_company, ds_sector, ds_subsector, ds_segment } = registerBodySchema.parse(req.body);

	const createUseCase = makeUseCase(CreateUseCase, CompanyRepository)

	const company = await createUseCase.handler({
		nr_cnpj: nr_cnpj,
		nm_company: nm_company,
		ds_sector: ds_sector,
		ds_subsector: ds_subsector,
		ds_segment: ds_segment,
		st_ativo: true
	});

	return res.status(201).json(company);

}
