// CÓDIGO V8
// src/http/controllers/figura-fundo/create.ts
import { figuraFundoUseCases } from "@/use-cases/figura-fundo/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
	ds_figura_fundo: z.string().nullable().optional(),	
	cs_recusa: z.coerce.boolean(),
	st_figura_1_identificada: z.coerce.boolean().optional(),
	st_figura_2_identificada: z.coerce.boolean().optional(),
	st_figura_3_identificada: z.coerce.boolean().optional(),
	st_figura_4_identificada: z.coerce.boolean().optional(),
	st_figura_5_identificada: z.coerce.boolean().optional(),
	st_figura_6_identificada: z.coerce.boolean().optional(),
	ss_tempo_resposta_figura_1: z.coerce.number().nullable().optional(),
	ss_tempo_resposta_figura_2: z.coerce.number().nullable().optional(),
	ss_tempo_resposta_figura_3: z.coerce.number().nullable().optional(),
	ss_tempo_resposta_figura_4: z.coerce.number().nullable().optional(),
	ss_tempo_resposta_figura_5: z.coerce.number().nullable().optional(),
	ss_tempo_resposta_figura_6: z.coerce.number().nullable().optional()
  });

  const { ds_figura_fundo, cs_recusa, st_figura_1_identificada, st_figura_2_identificada, st_figura_3_identificada, st_figura_4_identificada, st_figura_5_identificada, st_figura_6_identificada, ss_tempo_resposta_figura_1, ss_tempo_resposta_figura_2, ss_tempo_resposta_figura_3, ss_tempo_resposta_figura_4, ss_tempo_resposta_figura_5, ss_tempo_resposta_figura_6 } = registerBodySchema.parse(req.body);

  const createUseCase = figuraFundoUseCases.create();

  const data = await createUseCase.handler({	
	ds_figura_fundo: ds_figura_fundo,
	cs_recusa: cs_recusa,
	st_figura_1_identificada: st_figura_1_identificada,
	st_figura_2_identificada: st_figura_2_identificada,
	st_figura_3_identificada: st_figura_3_identificada,
	st_figura_4_identificada: st_figura_4_identificada,
	st_figura_5_identificada: st_figura_5_identificada,
	st_figura_6_identificada: st_figura_6_identificada,
	ss_tempo_resposta_figura_1: ss_tempo_resposta_figura_1,
	ss_tempo_resposta_figura_2: ss_tempo_resposta_figura_2,
	ss_tempo_resposta_figura_3: ss_tempo_resposta_figura_3,
	ss_tempo_resposta_figura_4: ss_tempo_resposta_figura_4,
	ss_tempo_resposta_figura_5: ss_tempo_resposta_figura_5,
	ss_tempo_resposta_figura_6: ss_tempo_resposta_figura_6	
  });

  return res.status(201).json(data);
}
