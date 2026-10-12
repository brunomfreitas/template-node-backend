// CÓDIGO V6
// src/use-cases/grupo-aplicacao/delete.ts
import { IGrupoAplicacaoRepository } from "@/repositories/interfaces/grupo-aplicacao.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IGrupoAplicacaoRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
