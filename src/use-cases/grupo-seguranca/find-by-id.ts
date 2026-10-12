// CÓDIGO V6
// src/use-cases/grupo-seguranca/find-by-id.ts
import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IGrupoSegurancaRepository) {}

  async handler(id: number): Promise<IGrupoSeguranca | null> {
    return this.repository.findById(id);
  }
}
