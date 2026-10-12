// CÓDIGO V6
// src/use-cases/pessoa/delete.ts
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IPessoaRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
