// CÓDIGO V8
// src/http/controllers/pac/find-by-id.ts
import { pacUseCases } from "@/use-cases/pac/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function findById(req: Request, res: Response) {
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const findByIdUseCase = pacUseCases.findById();

	const data = await findByIdUseCase.handler(id);

	return res.status(200).json(data);
}
