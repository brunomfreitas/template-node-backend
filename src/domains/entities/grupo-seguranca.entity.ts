// src/domains/entities/grupo-seguranca.entity.ts
import { IGrupoSeguranca } from "../interfaces/grupo-seguranca.interface";

export class GrupoSeguranca implements IGrupoSeguranca {
	id_grupo_seguranca?: number | undefined
	nm_grupo_seguranca: string	
	dt_cadastro?: Date
	dt_atualizacao?: Date | null | undefined
	dt_exclusao?: Date | null | undefined
	st_ativo: boolean

  constructor(init?: Partial<IGrupoSeguranca>) {
    Object.assign(this, init);
  }
}
