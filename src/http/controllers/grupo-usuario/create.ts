// CÓDIGO V6
// src/http/controllers/organizacao/create.ts
import { GrupoUsuarioRepository } from "@/repositories/prisma/grupo-usuario.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/grupo-usuario/create";
import { Request, Response } from "express";
import { z } from 'zod';

export async function create(req: Request, res: Response){

	const registerBodySchema = z.object({
		id_grupo_seguranca: z.coerce.number(),
		id_usuario: z.coerce.number(),
	})

	const { id_grupo_seguranca, id_usuario } = registerBodySchema.parse(req.body);
	
	const createUseCase = makeUseCase(CreateUseCase, GrupoUsuarioRepository)

	const data = await createUseCase.handler({ 
		id_grupo_seguranca: id_grupo_seguranca,
		id_usuario: id_usuario
	});

	return res.status(201).json(data);
	
}