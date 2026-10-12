// CÓDIGO V6
// src/use-cases/pessoa/update.ts
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";
import { IPessoa } from "@/domains/interfaces/pessoa.interface";

export class UpdateUseCase {
  constructor(private repository: IPessoaRepository) {}

  async handler(id: number, data: IPessoa): Promise<IPessoa> {
    return this.repository.update(id, data);
  }
}
