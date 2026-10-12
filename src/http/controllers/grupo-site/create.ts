// CÓDIGO V6
// src/http/controllers/organizacao/create.ts
import { GrupoSiteRepository } from "@/repositories/prisma/grupo-site.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/grupo-site/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		id_grupo_seguranca: z.coerce.number(),
		id_site: z.coerce.number()
	})

	const { id_grupo_seguranca, id_site } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, GrupoSiteRepository)

	const data = await createUseCase.handler({ 
		id_grupo_seguranca: id_grupo_seguranca,
		id_site: id_site
	});

	return res.status(201).json(data);
	
}