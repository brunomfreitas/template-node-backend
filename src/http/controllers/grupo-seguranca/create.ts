
import { GrupoSegurancaRepository } from "@/repositories/prisma/grupo-seguranca.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/grupo-seguranca/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		nm_grupo_seguranca: z.string()
	})

	const { nm_grupo_seguranca } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, GrupoSegurancaRepository)

	const data = await createUseCase.handler({ 
		nm_grupo_seguranca: nm_grupo_seguranca,
		st_ativo: true
	});

	return res.status(201).json(data);
	
}