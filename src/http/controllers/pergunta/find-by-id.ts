// CÓDIGO V8
// src/http/controllers/pergunta/find-by-id.ts
import { PerguntaRepository } from "@/repositories/prisma/pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { FindByIdUseCase } from "@/use-cases/pergunta/find-by-id";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response) {
	
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const findByIdUseCase = makeUseCase(FindByIdUseCase, PerguntaRepository);

	const data = await findByIdUseCase.handler(id);

	return res.status(200).json(data);
}
