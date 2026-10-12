export interface IAplicacao {
	id_aplicacao?: number | undefined
	cd_aplicacao: string	
	nm_aplicacao: string	
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean
}