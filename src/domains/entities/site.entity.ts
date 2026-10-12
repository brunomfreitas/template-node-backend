import { ISite } from "@/domains/interfaces/site.interface";

export class Site implements ISite {
	id_site?: number;
	nm_site: string;
	id_organizacao: number;
	dt_cadastro?: Date;
	dt_atualizacao?: Date | null;
	dt_exclusao?: Date | null;
	st_ativo?: boolean;
	
}