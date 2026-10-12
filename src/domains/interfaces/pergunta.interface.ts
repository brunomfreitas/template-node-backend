// V8
export interface IPergunta {
	id_pergunta?: number
	ds_pergunta: string
	ct_pergunta: number
	id_resposta: number
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean
}