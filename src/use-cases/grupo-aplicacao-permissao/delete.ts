// CÓDIGO V6
// src/use-cases/grupo-aplicacao-permissao/delete.ts
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IGrupoAplicacaoPermissaoRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
