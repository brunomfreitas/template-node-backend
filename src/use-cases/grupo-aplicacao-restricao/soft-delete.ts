// CÓDIGO V6
// src/use-cases/grupo-aplicacao-retricao/delete.ts
import { IGrupoAplicacaoRestricao } from "@/domains/interfaces/grupo-aplicacao-restricao.interface";
import { IGrupoAplicacaoRestricaoRepository } from "@/repositories/interfaces/grupo-aplicacao-restricao.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IGrupoAplicacaoRestricaoRepository) {}

  async handler(id: number): Promise<IGrupoAplicacaoRestricao> {
    return this.repository.softDelete(id);
  }
}
