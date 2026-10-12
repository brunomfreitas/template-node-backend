// CÓDIGO V6
// src/use-cases/empresa-pessoa/delete.ts
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IEmpresaPessoaRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
