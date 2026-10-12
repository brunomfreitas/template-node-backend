// CÓDIGO V6
// src/use-cases/empresa-pessoa/find-by-id.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IEmpresaPessoaRepository) {}

  async handler(id: number): Promise<IEmpresaPessoa | null> {
    return this.repository.findById(id);
  }
}
