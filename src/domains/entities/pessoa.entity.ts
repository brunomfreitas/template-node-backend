import { IPessoa } from "@/domains/interfaces/pessoa.interface";

export class Pessoa implements IPessoa {
	id_pessoa?: number | undefined
	nm_pessoa: string
	nr_cpf?: string | null
	id_genero: number
	dt_nascimento: Date
	nr_telefone?: string | null
	nm_email?: string | null
	id_organizacao: number
	id_site: number
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo?: boolean
}