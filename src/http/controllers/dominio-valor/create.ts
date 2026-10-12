import { DominioValorRepository } from "@/repositories/prisma/dominio-valor.repository";
import { CreateUseCase } from "@/use-cases/dominio-valor/create";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {

	const registerBodySchema = z.object({
		id_dominio: z.coerce.number(),
		nm_dominio_valor: z.string(),
		ds_dominio_valor: z.string().nullable().optional()
	})

	const { id_dominio, nm_dominio_valor, ds_dominio_valor } = registerBodySchema.parse(req.body)
	
	const createUseCase = makeUseCase(CreateUseCase, DominioValorRepository);

	const data = await createUseCase.handler({ id_dominio, nm_dominio_valor, ds_dominio_valor })

	return res.status(201).json(data)
}
