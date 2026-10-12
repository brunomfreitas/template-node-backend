// CÓDIGO V6
// src/use-cases/site/create.ts
import { ISite } from "@/domains/interfaces/site.interface";
import { ISiteRepository } from "@/repositories/interfaces/site.repository.interface";

export class CreateUseCase {
	constructor( private repository: ISiteRepository) {}

	async handler(data: ISite): Promise<ISite> {
		return this.repository.create(data)
	}
}