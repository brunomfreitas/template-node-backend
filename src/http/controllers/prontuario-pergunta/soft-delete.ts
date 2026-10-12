// V8
// src/http/controllers/pergunta/soft-delete.ts
import { ProntuarioPerguntaRepository } from "@/repositories/prisma/prontuario-pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SoftDeleteUseCase } from "@/use-cases/prontuario-pergunta/soft-delete";
import { Request, Response } from "express";
import { z } from "zod";

export async function softDelete(req: Request, res: Response) {
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const deleteUseCase = makeUseCase(SoftDeleteUseCase, ProntuarioPerguntaRepository);

	const data = await deleteUseCase.handler(id);

	return res.status(200).json(data);
}
