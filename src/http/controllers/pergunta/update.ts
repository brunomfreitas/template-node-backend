// V8
// src/http/controllers/pergunta/update.ts
import { PerguntaRepository } from "@/repositories/prisma/pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { UpdateUseCase } from "@/use-cases/pergunta/update";
import { Request, Response } from "express";
import { z } from "zod";

export async function update(req: Request, res: Response) {
	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	});

	const { id } = registerParamsSchema.parse(req.params);

	const registerBodySchema = z.object({
		ds_pergunta: z.string(),
		ct_pergunta: z.coerce.number(),
		id_resposta: z.coerce.number(),
		st_ativo: z.coerce.boolean(),
	});

	const { ds_pergunta, ct_pergunta, id_resposta, st_ativo } = registerBodySchema.parse(req.body);

	const updateUseCase = makeUseCase(UpdateUseCase, PerguntaRepository);

	const data = await updateUseCase.handler(id, {    
		ds_pergunta: ds_pergunta,
		ct_pergunta: ct_pergunta,
		id_resposta: id_resposta,
		st_ativo: st_ativo,
	});

  	return res.status(201).json(data);
}
