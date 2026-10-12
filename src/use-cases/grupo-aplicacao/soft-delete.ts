// CÓDIGO V6
// src/use-cases/grupo-aplicacao/delete.ts
import { IGrupoAplicacao } from "@/domains/interfaces/grupo-aplicacao.interface";
import { IGrupoAplicacaoRepository } from "@/repositories/interfaces/grupo-aplicacao.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IGrupoAplicacaoRepository) {}

  async handler(id: number): Promise<IGrupoAplicacao> {
    return this.repository.softDelete(id);
  }
}
