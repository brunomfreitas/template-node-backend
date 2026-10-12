export interface IOrganizacao {    
	id_organizacao?: number | undefined
    nm_organizacao: string
    dt_cadastro?: Date | string | null | undefined
    dt_atualizacao?: Date | null | undefined
    dt_exclusao?: Date | null | undefined
    st_ativo: boolean
}