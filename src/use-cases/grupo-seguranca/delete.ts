// CÓDIGO V6
// src/use-cases/grupo-seguranca/delete.ts
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IGrupoSegurancaRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
