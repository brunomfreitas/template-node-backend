// CÓDIGO V6
// src/use-cases/empresa/find-by-id.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IEmpresaRepository) {}

  async handler(id: number): Promise<IEmpresa | null> {
    return this.repository.findById(id);
  }
}
