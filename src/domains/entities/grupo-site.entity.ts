// src/domains/entities/grupo-seguranca.entity.ts
import { IGrupoSite } from "../interfaces/grupo-site.interface";

export class GrupoSite implements IGrupoSite {
	id_grupo_site?: number | undefined
	id_grupo_seguranca: number
	id_site: number
	dt_cadastro?: Date

	constructor(init?: Partial<IGrupoSite>) {
		Object.assign(this, init);
	}
}
