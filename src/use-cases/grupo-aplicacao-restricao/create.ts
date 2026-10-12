// CÓDIGO V6
// src/use-cases/grupo-aplicacao-restricao/create.ts
import { IGrupoAplicacaoRestricao } from "@/domains/interfaces/grupo-aplicacao-restricao.interface";
import { IGrupoAplicacaoRestricaoRepository } from "@/repositories/interfaces/grupo-aplicacao-restricao.repository.interface";

export class CreateUseCase {
	constructor( private repository: IGrupoAplicacaoRestricaoRepository) {}

	async handler(data: IGrupoAplicacaoRestricao): Promise<IGrupoAplicacaoRestricao> {
		return this.repository.create(data)
	}
}