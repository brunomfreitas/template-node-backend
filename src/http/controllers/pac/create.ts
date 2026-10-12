// CÓDIGO V8
// src/http/controllers/pac/create.ts
import { pacUseCases } from "@/use-cases/pac/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
	
	const registerBodySchema = z.object({
		id_prontuario: z.coerce.number(),
		id_figura_fundo: z.coerce.number().nullable(),
		id_localizacao_sonora: z.coerce.number().nullable(),
		id_dicotico_digitos: z.coerce.number().nullable(),
		id_ordenacao_temporal: z.coerce.number().nullable(),
		id_dicotico_sequencial: z.coerce.number().nullable(),
		id_resolucao_temporal: z.coerce.number().nullable()		
	});

  	const { id_prontuario, id_figura_fundo, id_localizacao_sonora, id_dicotico_digitos, id_ordenacao_temporal, id_dicotico_sequencial, id_resolucao_temporal } = registerBodySchema.parse(req.body);

	const createUseCase = pacUseCases.create();

	const data = await createUseCase.handler({	
		id_prontuario: id_prontuario,
		id_figura_fundo: id_figura_fundo,
		id_localizacao_sonora: id_localizacao_sonora,
		id_dicotico_digitos: id_dicotico_digitos,
		id_ordenacao_temporal: id_ordenacao_temporal,
		id_dicotico_sequencial: id_dicotico_sequencial,
		id_resolucao_temporal: id_resolucao_temporal
	});

	return res.status(201).json(data);
}
