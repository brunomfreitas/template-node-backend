// V8
export interface IProntuarioPergunta {
	id_prontuario_pergunta?: number
	id_prontuario: number
	id_pergunta: number
	id_resposta: number
	dt_cadastro?: Date
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean
}