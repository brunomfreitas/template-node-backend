import { UsuarioRepository } from "@/repositories/prisma/usuario.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/usuario/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response) {

	const registerBodySchema = z.object({
		id_pessoa: z.coerce.number(),
		login: z.string(),
		password: z.string()
	})

	const { id_pessoa, login, password } = registerBodySchema.parse(req.body)
	
	const createUseCase = makeUseCase(CreateUseCase, UsuarioRepository);

	const data = await createUseCase.handler({ id_pessoa, login, password })

	return res.status(201).json(data)
}
