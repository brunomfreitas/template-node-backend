// src/domains/interfaces/prontuario.interface.ts
export interface IProntuario {
	id_prontuario?: number,
	ds_prontuario: string,
	dh_inicio_atendimento?: Date | null,
	dh_termino_atendimento?: Date | null,
	id_paciente: number,
	nm_responsavel: string,
	nr_telefone_responsavel: string,
	ds_declaracao_responsavel: string,
	id_escola: number,	
	cs_serie: number,
	cs_turno: number,	
	id_fonoaudiologo: number,
	id_assistente: number,
	id_organizacao: number,
	id_site: number,
	id_st_atendimento: number,    
	id_st_prontuario: number,
	dt_atualizacao?: Date | null
	dt_exclusao?: Date | null
	st_ativo: boolean
}

export interface IProntuarioImport {
	ds_prontuario: string,
	dh_inicio_atendimento: Date | null,
	dh_termino_atendimento: Date | null,
	id_paciente: number,
	nm_responsavel: string | null,
	nr_telefone_responsavel: string | null,
	ds_declaracao_responsavel: string | null,
	id_escola: number | null,
	cs_serie: number | null,
	cs_turno: number | null,
	id_fonoaudiologo: number,
	id_assistente: number | null,
	id_organizacao: number,
	id_site: number,	
	id_st_atendimento: number,    
	id_st_prontuario: number
}
