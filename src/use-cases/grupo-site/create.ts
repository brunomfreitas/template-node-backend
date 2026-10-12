// CÓDIGO V6
// src/use-cases/grupo-site/create.ts
import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";

export class CreateUseCase {
	constructor( private repository: IGrupoSiteRepository) {}

	async handler(data: IGrupoSite): Promise<IGrupoSite> {
		return this.repository.create(data)
	}
}