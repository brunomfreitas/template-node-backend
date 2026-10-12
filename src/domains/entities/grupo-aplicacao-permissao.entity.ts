// src/domains/entities/grupo-aplicacao-permissao.entity.ts
import { IGrupoAplicacaoPermissao } from "../interfaces/grupo-aplicacao-permissao.interface";

export class GrupoAplicacaoPermissao implements IGrupoAplicacaoPermissao {
	id_grupo_aplicacao_permissao?: number | undefined
	id_grupo_aplicacao: number
	cs_ler: boolean | undefined
	cs_criar: boolean | undefined
	cs_editar: boolean | undefined
	cs_excluir: boolean	| undefined
	dt_cadastro?: Date	

	constructor(init?: Partial<IGrupoAplicacaoPermissao>) {
		Object.assign(this, init);
	}
}
