import { SiteRepository } from '@/repositories/prisma/site.repository'

export class FindByIdUseCase {

  constructor(private repository: SiteRepository) {}

  async handler(id: number) {
    
	const data = await this.repository.findById(id)

    // if (!person) throw new ResourceNotFoundError()

    return data
  }
}
