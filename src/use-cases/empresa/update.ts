// CÓDIGO V6
// src/use-cases/empresa/update.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IEmpresaRepository) {}

  async handler(id: number, data: IEmpresa): Promise<IEmpresa> {
    return this.repository.update(id, data);
  }
}
