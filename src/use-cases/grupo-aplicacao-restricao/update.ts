// CÓDIGO V6
// src/use-cases/organizacao/update.ts
import { IGrupoAplicacaoRestricao } from "@/domains/interfaces/grupo-aplicacao-restricao.interface";
import { IGrupoAplicacaoRestricaoRepository } from "@/repositories/interfaces/grupo-aplicacao-restricao.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IGrupoAplicacaoRestricaoRepository) {}

  async handler(
    id: number,
    data: IGrupoAplicacaoRestricao
  ): Promise<IGrupoAplicacaoRestricao> {
    return this.repository.update(id, data);
  }
}
