import { ISite } from "@/domains/interfaces/site.interface";
import { SiteRepository } from "@/repositories/prisma/site.repository";

export class SoftDeleteUseCase {
	constructor( private repository: SiteRepository) {}

	async handler(id: number): Promise<ISite> {
		return this.repository.softDelete(id)
	}
}