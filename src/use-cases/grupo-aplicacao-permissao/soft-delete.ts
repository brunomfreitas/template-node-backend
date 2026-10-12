// CÓDIGO V6
// src/use-cases/grupo-aplicacao-permissao/delete.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IGrupoAplicacaoPermissaoRepository) {}

  async handler(id: number): Promise<IGrupoAplicacaoPermissao> {
    return this.repository.softDelete(id);
  }
}
