// CÓDIGO V6
// src/use-cases/grupo-aplicacao-permissao/create.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";

export class CreateUseCase {
	constructor( private repository: IGrupoAplicacaoPermissaoRepository) {}

	async handler(data: IGrupoAplicacaoPermissao): Promise<IGrupoAplicacaoPermissao> {
		return this.repository.create(data)
	}
}