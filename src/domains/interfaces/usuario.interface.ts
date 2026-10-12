export interface IUsuario {
	id_usuario?: number | undefined
	id_pessoa: number
	login: string
	password: string
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo?: boolean
}