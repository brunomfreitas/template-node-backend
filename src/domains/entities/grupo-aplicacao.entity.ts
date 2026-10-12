// src/domains/entities/grupo-seguranca.entity.ts
import { IGrupoAplicacao } from "../interfaces/grupo-aplicacao.interface";

export class GrupoAplicacao implements IGrupoAplicacao {
	id_grupo_aplicacao?: number | undefined
	id_grupo_seguranca: number
	id_aplicacao: number
	dt_cadastro?: Date

	constructor(init?: Partial<IGrupoAplicacao>) {
		Object.assign(this, init);
	}
}
