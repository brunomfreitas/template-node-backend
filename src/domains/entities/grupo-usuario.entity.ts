// src/domains/entities/grupo-seguranca.entity.ts
import { IGrupoUsuario } from "../interfaces/grupo-usuario.interface";

export class GrupoUsuario implements IGrupoUsuario {
	id_grupo_usuario?: number | undefined
	id_grupo_seguranca: number
	id_usuario: number
	dt_cadastro?: Date	

	constructor(init?: Partial<IGrupoUsuario>) {
		Object.assign(this, init);
	}
}
