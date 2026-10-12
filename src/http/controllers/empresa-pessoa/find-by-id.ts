import { EmpresaPessoaRepository } from "@/repositories/prisma/empresa-pessoa.repository";
import { FindByIdUseCase } from "@/use-cases/empresa-pessoa/find-by-id";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { Request, Response } from "express";
import { z } from 'zod';

export async function findById(req: Request, res: Response){

	const registerParamsSchema = z.object({
		id: z.coerce.number()
	})

	const { id } = registerParamsSchema.parse(req.params);

	const findByIdUseCase = makeUseCase(FindByIdUseCase, EmpresaPessoaRepository)

	const data = await findByIdUseCase.handler(id);

	return res.status(200).json(data);
	
}

