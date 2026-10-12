// CÓDIGO V6
// src/use-cases/pessoa/delete.ts
import { IPessoa } from "@/domains/interfaces/pessoa.interface";
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IPessoaRepository) {}

  async handler(id: number): Promise<IPessoa> {
    return this.repository.softDelete(id);
  }
}
