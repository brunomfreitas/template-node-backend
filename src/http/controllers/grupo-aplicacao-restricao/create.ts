
import { GrupoAplicacaoRestricaoRepository } from "@/repositories/prisma/grupo-aplicacao-restricao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/grupo-aplicacao-restricao/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		id_grupo_aplicacao: z.coerce.number(),
		ds_clausula_where: z.string()
	})

	const { id_grupo_aplicacao, ds_clausula_where } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, GrupoAplicacaoRestricaoRepository)	

	const data = await createUseCase.handler({ id_grupo_aplicacao: id_grupo_aplicacao, ds_clausula_where: ds_clausula_where});

	return res.status(201).json(data);
	
}