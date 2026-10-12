// CÓDIGO V6
// src/use-cases/grupo-seguranca/update.ts
import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IGrupoSegurancaRepository) {}

  async handler(id: number, data: IGrupoSeguranca): Promise<IGrupoSeguranca> {
    return this.repository.update(id, data);
  }
}
