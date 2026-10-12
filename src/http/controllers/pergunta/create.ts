// CÓDIGO V8
// src/http/controllers/pergunta/create.ts
import { PerguntaRepository } from "@/repositories/prisma/pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/pergunta/create";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
	
	const registerBodySchema = z.object({
		ds_pergunta: z.string(),
		ct_pergunta: z.coerce.number(),
		id_resposta: z.coerce.number(),
	});

  	const { ds_pergunta, ct_pergunta, id_resposta } = registerBodySchema.parse(req.body);

  	const createUseCase = makeUseCase(CreateUseCase, PerguntaRepository);

  	const data = await createUseCase.handler({
    	ds_pergunta: ds_pergunta,
		ct_pergunta: ct_pergunta,
		id_resposta: id_resposta,
    	st_ativo: true,
  	});

  	return res.status(201).json(data);
}
