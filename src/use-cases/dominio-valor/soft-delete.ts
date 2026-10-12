// CÓDIGO V6
// src/use-cases/dominio-valor/delete.ts
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IDominioValorRepository) {}

  async handler(id: number): Promise<IDominioValor> {
    return this.repository.softDelete(id);
  }
}
