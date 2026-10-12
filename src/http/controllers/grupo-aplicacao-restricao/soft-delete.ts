import { GrupoAplicacaoRestricaoRepository } from "@/repositories/prisma/grupo-aplicacao-restricao.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SoftDeleteUseCase } from "@/use-cases/grupo-aplicacao-restricao/soft-delete";
import { Request, Response } from "express";
import { z } from 'zod';

export async function softDelete(req: Request, res: Response){

	const registerParamsSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = registerParamsSchema.parse(req.params);

	const deleteUseCase = makeUseCase(SoftDeleteUseCase, GrupoAplicacaoRestricaoRepository)

	const data = await deleteUseCase.handler(id);

	return res.status(200).json(data);
	
}