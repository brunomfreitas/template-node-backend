// CÓDIGO V6
// src/use-cases/organizacao/delete.ts
import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";
import { IOrganizacaoRepository } from "@/repositories/interfaces/organizacao.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IOrganizacaoRepository) {}

  async handler(id: number): Promise<IOrganizacao> {
    return this.repository.softDelete(id);
  }
}
