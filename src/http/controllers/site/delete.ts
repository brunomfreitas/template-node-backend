import { SiteRepository } from "@/repositories/prisma/site.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { DeleteUseCase } from "@/use-cases/site/delete";
import { Request, Response } from "express";
import { z } from 'zod';

export async function deleteController(req: Request, res: Response){

	const registerParamsSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = registerParamsSchema.parse(req.params);

	const deleteUseCase = makeUseCase(DeleteUseCase, SiteRepository)

	const data = await deleteUseCase.handler(id);

	return res.status(200).json(data);
	
}