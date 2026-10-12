// CÓDIGO V6
// src/http/controllers/prontuario/create.ts
import { prontuarioUseCases } from "@/use-cases/prontuario/factory";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
	const registerBodySchema = z.object({    
		ds_prontuario: z.string().trim(),
		dh_inicio_atendimento: z.coerce.date().nullable(),
		id_escola: z.coerce.number(),
		cs_serie: z.coerce.number(),
		cs_turno: z.coerce.number(),

		id_paciente: z.coerce.number(),
		nm_responsavel: z.string().trim(),
		nr_telefone_responsavel: z.string().trim(),
		ds_declaracao_responsavel: z.string().trim(),

		id_fonoaudiologo: z.coerce.number(),
		id_assistente: z.coerce.number(),
		id_organizacao: z.coerce.number(),
		id_site: z.coerce.number(),
		id_st_atendimento: z.coerce.number(),
		id_st_prontuario: z.coerce.number()
	});

  	const { ds_prontuario, dh_inicio_atendimento, id_escola, cs_serie, cs_turno, id_paciente, nm_responsavel, nr_telefone_responsavel, ds_declaracao_responsavel, id_fonoaudiologo, id_assistente, id_organizacao, id_site, id_st_atendimento, id_st_prontuario } = registerBodySchema.parse(req.body);

  	const createUseCase = prontuarioUseCases.create();

  	const data = await createUseCase.handler({
		ds_prontuario: ds_prontuario,
		dh_inicio_atendimento: dh_inicio_atendimento,
		id_escola: id_escola,		
		cs_serie: cs_serie,
		cs_turno: cs_turno,

		id_paciente: id_paciente,
		nm_responsavel: nm_responsavel,
		nr_telefone_responsavel: nr_telefone_responsavel,
		ds_declaracao_responsavel: ds_declaracao_responsavel,

		id_fonoaudiologo: id_fonoaudiologo,
		id_assistente: id_assistente,
		id_organizacao: id_organizacao,
		id_site: id_site,
		id_st_atendimento: id_st_atendimento,
		id_st_prontuario: id_st_prontuario,
		st_ativo: true,
	});

  return res.status(201).json(data);
}
