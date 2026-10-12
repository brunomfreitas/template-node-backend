// CÓDIGO V6
// src/use-cases/empresa/delete.ts
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IEmpresaRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
