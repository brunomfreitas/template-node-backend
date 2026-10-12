// CÓDIGO V6
// src/use-cases/organizacao/find-by-id.ts
import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";
import { IOrganizacaoRepository } from "@/repositories/interfaces/organizacao.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IOrganizacaoRepository) {}

  async handler(id: number): Promise<IOrganizacao | null> {
    return this.repository.findById(id);
  }
}
