// V8
// src/http/controllers/prontuario/update.ts
import { prontuarioUseCases } from "@/use-cases/prontuario/factory";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

export async function update(req: Request, res: Response) {

	try{
	
		const registerParamsSchema = z.object({
			id: z.coerce.number(),
		});

  		const { id } = registerParamsSchema.parse(req.params);

		const registerBodySchema = z.object({
			ds_prontuario: z.string(),

			dh_inicio_atendimento: z.coerce.date().nullable().optional(),
			dh_termino_atendimento: z.coerce.date().nullable().optional(),
			
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
			id_st_prontuario: z.coerce.number(),		
			st_ativo: z.coerce.boolean(),
		});

  		const { ds_prontuario, dh_inicio_atendimento, dh_termino_atendimento, id_escola, cs_serie, cs_turno, id_paciente, nm_responsavel, nr_telefone_responsavel, ds_declaracao_responsavel, id_fonoaudiologo, id_assistente, id_organizacao, id_site, id_st_atendimento, id_st_prontuario, st_ativo } = registerBodySchema.parse(req.body);
	
		const updateUseCase = prontuarioUseCases.update();

		const data = await updateUseCase.handler(id, {    
			ds_prontuario: ds_prontuario,
			dh_inicio_atendimento: dh_inicio_atendimento,
			dh_termino_atendimento: dh_termino_atendimento,
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
			st_ativo: st_ativo,
		});

  		return res.status(201).json(data);

	} catch(error) {

		if (error instanceof ZodError) {
			return res.status(400).send({
				message: error.issues.map(e => ({
					field: e.path[0],
					message: e.message
				}))
			});
		}

		throw error;
	}
}