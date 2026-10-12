export interface ISite {    
	id_site?: number | null
    nm_site: string
	id_organizacao: number
    dt_cadastro?: Date
    dt_atualizacao?: Date | null
    dt_exclusao?: Date | null
    st_ativo?: boolean
}