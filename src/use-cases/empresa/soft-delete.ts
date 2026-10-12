// CÓDIGO V6
// src/use-cases/empresa/delete.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IEmpresaRepository) {}

  async handler(id: number): Promise<IEmpresa> {
    return this.repository.softDelete(id);
  }
}
