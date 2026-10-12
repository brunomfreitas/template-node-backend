// src/domains/entities/prontuario.entity.ts
import { IProntuario } from "../interfaces/prontuario.interface";

export class Prontuario implements IProntuario {
	id_prontuario?: number
	ds_prontuario: string
	dh_inicio_atendimento?: Date | null
	dh_termino_atendimento?: Date | null
	id_escola: number
	cs_serie: number
	cs_turno: number
	id_paciente: number
	nm_responsavel: string
	nr_telefone_responsavel: string
	ds_declaracao_responsavel: string
	id_fonoaudiologo: number
	id_assistente: number
	id_organizacao: number
	id_site: number
	id_st_atendimento: number
	id_st_prontuario: number
	dt_atualizacao?: Date | null
	dt_exclusao?: Date | null
	st_ativo: boolean

	constructor(init?: Partial<IProntuario>) {
		Object.assign(this, init);
	}
}
