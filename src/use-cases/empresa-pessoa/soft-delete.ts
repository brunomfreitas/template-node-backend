// CÓDIGO V6
// src/use-cases/empresa-pessoa/delete.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IEmpresaPessoaRepository) {}

  async handler(id: number): Promise<IEmpresaPessoa> {
    return this.repository.softDelete(id);
  }
}
