// CÓDIGO V6
// src/http/controllers/organizacao/create.ts
import { EmpresaRepository } from "@/repositories/prisma/empresa.repository";
import { CreateUseCase } from "@/use-cases/empresa/create";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		nm_empresa: z.string(),
		nr_cnpj: z.string().nullable().optional(),
		nr_telefone: z.string().nullable().optional(),
		nm_email: z.string().nullable().optional(),
		id_tipo_empresa: z.coerce.number(),
		id_pessoa_responsavel: z.coerce.number().nullable().optional(),
		id_organizacao: z.coerce.number(),
		id_site: z.coerce.number()
	})

	const { nm_empresa, nr_cnpj, nr_telefone, nm_email, id_tipo_empresa, id_pessoa_responsavel, id_organizacao, id_site } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, EmpresaRepository)

	const empresa = await createUseCase.handler({ 
		nm_empresa: nm_empresa,
		nr_cnpj: nr_cnpj,
		nr_telefone: nr_telefone,
		nm_email: nm_email,
		id_tipo_empresa: id_tipo_empresa,
		id_pessoa_responsavel: id_pessoa_responsavel,
		id_organizacao: id_organizacao,
		id_site: id_site,
		st_ativo: true
	});

	return res.status(201).json(empresa);
	
}