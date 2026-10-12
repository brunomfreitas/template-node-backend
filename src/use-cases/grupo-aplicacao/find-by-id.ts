// CÓDIGO V6
// src/use-cases/grupo-aplicacao/find-by-id.ts
import { IGrupoAplicacao } from "@/domains/interfaces/grupo-aplicacao.interface";
import { IGrupoAplicacaoRepository } from "@/repositories/interfaces/grupo-aplicacao.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IGrupoAplicacaoRepository) {}

  async handler(id: number): Promise<IGrupoAplicacao | null> {
    return this.repository.findById(id);
  }
}
