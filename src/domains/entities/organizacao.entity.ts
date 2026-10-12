import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";

export class Organizacao implements IOrganizacao {
	id_organizacao?: number | undefined;
	nm_organizacao: string;
	dt_cadastro?: Date | string | null | undefined;
	dt_atualizacao?: Date | null | undefined;
	dt_exclusao?: Date | null | undefined;
	st_ativo: boolean;
}