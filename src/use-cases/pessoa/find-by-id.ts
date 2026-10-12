// CÓDIGO V6
// src/use-cases/pessoa/find-by-id.ts

import { IPessoa } from "@/domains/interfaces/pessoa.interface";
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IPessoaRepository) {}

  async handler(id: number): Promise<IPessoa | null> {
    const data = await this.repository.findById(id);

    // if (!data) throw new ResourceNotFoundError()

    return data;
  }
}
