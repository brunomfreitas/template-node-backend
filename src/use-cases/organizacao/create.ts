// CÓDIGO V6
// src/use-cases/organizacao/create.ts
import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";
import { IOrganizacaoRepository } from "@/repositories/interfaces/organizacao.repository.interface";

export class CreateUseCase {
  constructor(private repository: IOrganizacaoRepository) {}

  async handler(data: IOrganizacao): Promise<IOrganizacao> {
    return this.repository.create(data);
  }
}
