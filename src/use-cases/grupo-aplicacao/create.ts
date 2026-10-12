// CÓDIGO V6
// src/use-cases/grupo-aplicacao/create.ts
import { IGrupoAplicacao } from "@/domains/interfaces/grupo-aplicacao.interface";
import { IGrupoAplicacaoRepository } from "@/repositories/interfaces/grupo-aplicacao.repository.interface";

export class CreateUseCase {
	constructor( private repository: IGrupoAplicacaoRepository) {}

	async handler(data: IGrupoAplicacao): Promise<IGrupoAplicacao> {
		return this.repository.create(data)
	}
}