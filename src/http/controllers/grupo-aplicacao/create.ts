// CÓDIGO V6
// src/http/controllers/organizacao/create.ts
import { GrupoAplicacaoRepository } from "@/repositories/prisma/grupo-aplicacao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/grupo-aplicacao/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		id_grupo_seguranca: z.coerce.number(),
		id_aplicacao: z.coerce.number()
	})

	const { id_grupo_seguranca, id_aplicacao } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, GrupoAplicacaoRepository)	

	const data = await createUseCase.handler({ id_grupo_seguranca: id_grupo_seguranca, id_aplicacao: id_aplicacao});

	return res.status(201).json(data);
	
}