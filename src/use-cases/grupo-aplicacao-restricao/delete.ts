// CÓDIGO V6
// src/use-cases/grupo-aplicacao-retricao/delete.ts
import { IGrupoAplicacaoRestricaoRepository } from "@/repositories/interfaces/grupo-aplicacao-restricao.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IGrupoAplicacaoRestricaoRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
