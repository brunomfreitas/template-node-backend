// CÓDIGO V6
// src/use-cases/grupo-seguranca/create.ts
import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";

export class CreateUseCase {
	constructor( private repository: IGrupoSegurancaRepository) {}

	async handler(data: IGrupoSeguranca): Promise<IGrupoSeguranca> {
		return this.repository.create(data)
	}
}