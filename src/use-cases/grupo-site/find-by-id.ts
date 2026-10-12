// CÓDIGO V6
// src/use-cases/grupo-site/find-by-id.ts
import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IGrupoSiteRepository) {}

  async handler(id: number): Promise<IGrupoSite | null> {
    return this.repository.findById(id);
  }
}
