// CÓDIGO V6
// src/use-cases/grupo-seguranca/delete.ts
import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IGrupoSegurancaRepository) {}

  async handler(id: number): Promise<IGrupoSeguranca> {
    return this.repository.softDelete(id);
  }
}
