export interface IGrupoSeguranca {
	id_grupo_seguranca?: number | undefined
	nm_grupo_seguranca: string	
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean
}