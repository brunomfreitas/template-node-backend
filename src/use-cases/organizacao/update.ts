// CÓDIGO V6
// src/use-cases/organizacao/update.ts
import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";
import { IOrganizacaoRepository } from "@/repositories/interfaces/organizacao.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IOrganizacaoRepository) {}

  async handler(id: number, data: IOrganizacao): Promise<IOrganizacao> {
    return this.repository.update(id, data);
  }
}
