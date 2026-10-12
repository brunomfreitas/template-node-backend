import { SiteRepository } from "@/repositories/prisma/site.repository";

export class DeleteUseCase {
	constructor( private repository: SiteRepository) {}

	async handler(id: number): Promise<null> {
		return this.repository.delete(id)
	}
}