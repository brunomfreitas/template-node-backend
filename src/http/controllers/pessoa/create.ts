import { PessoaRepository } from "@/repositories/prisma/pessoa.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/pessoa/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {
		
		const registerBodySchema = z.object({
			nm_pessoa: z.string(),
			nr_cpf: z.string(),
			id_genero: z.coerce.number(),
			dt_nascimento: z.coerce.date(),
			nr_telefone: z.string(),
			nm_email: z.string(),
			id_organizacao: z.coerce.number(),
			id_site: z.coerce.number()
		})

		const { nm_pessoa, nr_cpf, id_genero, dt_nascimento, nr_telefone, nm_email, id_organizacao, id_site } = registerBodySchema.parse(req.body)
		
		const createUseCase = makeUseCase(CreateUseCase, PessoaRepository);

		const data = await createUseCase.handler({ nm_pessoa, nr_cpf, id_genero, dt_nascimento, nr_telefone, nm_email, id_organizacao, id_site })

		return res.status(201).json(data);

}
