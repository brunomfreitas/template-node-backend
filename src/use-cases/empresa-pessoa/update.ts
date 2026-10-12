// CÓDIGO V6
// src/use-cases/empresa-pessoa/update.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IEmpresaPessoaRepository) {}

  async handler(id: number, data: IEmpresaPessoa): Promise<IEmpresaPessoa> {
    return this.repository.update(id, data);
  }
}
