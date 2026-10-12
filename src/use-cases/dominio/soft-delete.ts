// CÓDIGO V6
// src/use-cases/dominio/delete.ts
import { IDominio } from "@/domains/interfaces/dominio.interface";
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IDominioRepository) {}

  async handler(id: number): Promise<IDominio> {
    return this.repository.softDelete(id);
  }
}
