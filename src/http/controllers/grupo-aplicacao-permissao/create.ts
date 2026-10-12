// CÓDIGO V6
// src/http/controllers/organizacao/create.ts
import { GrupoAplicacaoPermissaoRepository } from "@/repositories/prisma/grupo-aplicacao-permissao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/grupo-aplicacao-permissao/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		id_grupo_aplicacao: z.coerce.number(),
		cs_ler: z.coerce.boolean().optional(),
		cs_criar: z.coerce.boolean().optional(),
		cs_editar: z.coerce.boolean().optional(),
		cs_excluir: z.coerce.boolean().optional(),
	})

	const { id_grupo_aplicacao, cs_ler, cs_criar, cs_editar, cs_excluir } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, GrupoAplicacaoPermissaoRepository)	

	const data = await createUseCase.handler({ id_grupo_aplicacao: id_grupo_aplicacao, cs_ler: cs_ler, cs_criar: cs_criar, cs_editar: cs_editar, cs_excluir: cs_excluir });

	return res.status(201).json(data);
	
}