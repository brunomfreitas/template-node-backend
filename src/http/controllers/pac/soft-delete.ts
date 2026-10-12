// CÓDIGO V8
// src/http/controllers/pac/soft-delete.ts
import { pacUseCases } from "@/use-cases/pac/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function softDelete(req: Request, res: Response) {
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const deleteUseCase = pacUseCases.softDelete();

	const data = await deleteUseCase.handler(id);

	return res.status(200).json(data);
}
