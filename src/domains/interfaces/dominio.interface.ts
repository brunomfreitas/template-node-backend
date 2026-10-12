export interface IDominio {
	id_dominio?: number | undefined
	nm_dominio: string
	ds_dominio?: string | null
	ds_alias?: string | null
	id_dominio_sup?: number | null
	id_dominio_valor_sup?: number | null
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo?: boolean
}