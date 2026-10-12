// CÓDIGO V6
// src/use-cases/grupo-site/delete.ts
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IGrupoSiteRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
