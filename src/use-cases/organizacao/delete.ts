// CÓDIGO V6
// src/use-cases/organizacao/delete.ts
import { IOrganizacaoRepository } from "@/repositories/interfaces/organizacao.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IOrganizacaoRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
