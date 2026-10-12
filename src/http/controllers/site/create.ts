import { SiteRepository } from "@/repositories/prisma/site.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/site/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {

	const registerBodySchema = z.object({
		nm_site: z.string(),
		id_organizacao: z.coerce.number()
	})

	const { nm_site, id_organizacao } = registerBodySchema.parse(req.body)
	
	const createUseCase = makeUseCase(CreateUseCase, SiteRepository);

	const data = await createUseCase.handler({ nm_site, id_organizacao })

	return res.status(201).json(data)
}
