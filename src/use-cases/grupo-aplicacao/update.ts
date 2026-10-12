// CÓDIGO V6
// src/use-cases/grupo-aplicacao/update.ts
import { IGrupoAplicacao } from "@/domains/interfaces/grupo-aplicacao.interface";
import { IGrupoAplicacaoRepository } from "@/repositories/interfaces/grupo-aplicacao.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IGrupoAplicacaoRepository) {}

  async handler(id: number, data: IGrupoAplicacao): Promise<IGrupoAplicacao> {
    return this.repository.update(id, data);
  }
}
