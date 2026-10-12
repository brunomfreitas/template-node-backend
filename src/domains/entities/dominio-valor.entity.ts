import { IDominioValor } from "../interfaces/dominio-valor.interface"

export class DominioValor implements IDominioValor {
	id_dominio_valor?: number | undefined
	id_dominio: number
	nm_dominio_valor: string
	ds_dominio_valor?: string | null	
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo?: boolean
}