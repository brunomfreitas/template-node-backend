
import { GrupoSegurancaRepository } from "@/repositories/prisma/grupo-seguranca.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateAllUseCase } from "@/use-cases/grupo-seguranca/create-all";
import { Request, Response } from "express";
import { z } from 'zod';

export async function createAll(req: Request, res: Response){

	const registerBodySchema = z.object({
		nm_grupo_seguranca: z.string()
	})

	const { nm_grupo_seguranca } = registerBodySchema.parse(req.body);
	
	const createAllUseCase = makeUseCase(CreateAllUseCase, GrupoSegurancaRepository)

	const data = await createAllUseCase.handler({ 
		nm_grupo_seguranca: nm_grupo_seguranca,
		st_ativo: true
	});

	return res.status(201).json(data);	
}