// V8
// src/http/controllers/pergunta/soft-delete.ts
import { PerguntaRepository } from "@/repositories/prisma/pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { DeleteUseCase } from "@/use-cases/pergunta/delete";
import { Request, Response } from "express";
import { z } from "zod";

export async function deleteController(req: Request, res: Response) {
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const deleteUseCase = makeUseCase(DeleteUseCase, PerguntaRepository);

	const data = await deleteUseCase.handler(id);

	return res.status(200).json(data);
}
