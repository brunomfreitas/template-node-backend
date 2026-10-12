// CÓDIGO V8
// src/http/controllers/prontuario-pergunta/create.ts
import { ProntuarioPerguntaRepository } from "@/repositories/prisma/prontuario-pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { CreateUseCase } from "@/use-cases/prontuario-pergunta/create";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
	
	const registerBodySchema = z.object({
		id_prontuario: z.coerce.number(),
		id_pergunta: z.coerce.number(),
		id_resposta: z.coerce.number(),		
	});

  	const { id_prontuario, id_pergunta, id_resposta } = registerBodySchema.parse(req.body);

  	const createUseCase = makeUseCase(CreateUseCase, ProntuarioPerguntaRepository);

  	const data = await createUseCase.handler({
    	id_prontuario: id_prontuario,
		id_pergunta: id_pergunta,
		id_resposta: id_resposta,
    	st_ativo: true,
  	});

  	return res.status(201).json(data);
}
