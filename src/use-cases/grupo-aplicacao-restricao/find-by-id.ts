// CÓDIGO V6
// src/use-cases/grupo-aplicacao-retricao/find-by-id.ts
import { IGrupoAplicacaoRestricao } from "@/domains/interfaces/grupo-aplicacao-restricao.interface";
import { IGrupoAplicacaoRestricaoRepository } from "@/repositories/interfaces/grupo-aplicacao-restricao.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IGrupoAplicacaoRestricaoRepository) {}

  async handler(id: number): Promise<IGrupoAplicacaoRestricao | null> {
    return this.repository.findById(id);
  }
}
