// V8
// src/http/controllers/prontuario-pergunta/update.ts
import { ProntuarioPerguntaRepository } from "@/repositories/prisma/prontuario-pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/prontuario-pergunta/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const registerBodySchema = z.object({
		id_prontuario: z.coerce.number(),
		id_pergunta: z.coerce.number(),
		id_resposta: z.coerce.number(),
		st_ativo: z.coerce.boolean(),
	});

	const { id_prontuario, id_pergunta, id_resposta, st_ativo } = registerBodySchema.parse(req.body);

	const updateUseCase = makeUseCase(UpdateUseCase, ProntuarioPerguntaRepository);

	const data = await updateUseCase.handler(id, {    
    	id_prontuario: id_prontuario,
		id_pergunta: id_pergunta,
		id_resposta: id_resposta,
		st_ativo: st_ativo,
	});

  	return res.status(201).json(data);
}
