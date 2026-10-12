import { Site } from '@/domains/entities/site.entity';
import { SiteRepository } from '@/repositories/prisma/site.repository';

export class UpdateSiteUseCase {
	constructor(private repository: SiteRepository) {}

	handler(id: number, site: Site) {
		return this.repository.update(id, site)
	}
}
