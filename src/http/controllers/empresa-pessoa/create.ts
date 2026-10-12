// CÓDIGO V6
// src/http/controllers/organizacao/create.ts
import { EmpresaPessoaRepository } from "@/repositories/prisma/empresa-pessoa.repository";
import { CreateUseCase } from "@/use-cases/empresa-pessoa/create";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		id_empresa: z.number().int().positive(),
		id_pessoa: z.number().int().positive(),
		id_funcao: z.number().int().positive(),
		id_organizacao: z.number().int().positive(),
		id_site: z.number().int().positive()
	})

	const { id_empresa, id_pessoa, id_funcao, id_organizacao, id_site } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, EmpresaPessoaRepository)

	const data = await createUseCase.handler({ 
		id_empresa: id_empresa,
		id_pessoa: id_pessoa,
		id_funcao: id_funcao,		
		id_organizacao: id_organizacao,
		id_site: id_site,
		st_ativo: true
	});

	return res.status(201).json(data);
	
}