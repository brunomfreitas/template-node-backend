// CÓDIGO V6
// src/use-cases/grupo-site/update.ts
import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IGrupoSiteRepository) {}

  async handler(id: number, data: IGrupoSite): Promise<IGrupoSite> {
    return this.repository.update(id, data);
  }
}
