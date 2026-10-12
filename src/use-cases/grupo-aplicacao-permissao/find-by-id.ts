// CÓDIGO V6
// src/use-cases/grupo-aplicacao-permissao/find-by-id.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IGrupoAplicacaoPermissaoRepository) {}

  async handler(id: number): Promise<IGrupoAplicacaoPermissao | null> {
    return this.repository.findById(id);
  }
}
