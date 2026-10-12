// CÓDIGO V6
// src/use-cases/grupo-aplicacao-permissao/update.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";
import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";

export class UpdateUseCase {
  constructor(private repository: IGrupoAplicacaoPermissaoRepository) {}

  async handler(
    id: number,
    data: IGrupoAplicacaoPermissao
  ): Promise<IGrupoAplicacaoPermissao> {
    return this.repository.update(id, data);
  }
}
