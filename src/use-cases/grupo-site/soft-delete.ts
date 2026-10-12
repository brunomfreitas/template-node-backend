// CÓDIGO V6
// src/use-cases/grupo-site/delete.ts
import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IGrupoSiteRepository) {}

  async handler(id: number): Promise<IGrupoSite> {
    return this.repository.softDelete(id);
  }
}
