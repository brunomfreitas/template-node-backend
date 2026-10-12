// CÓDIGO V6
// src/use-cases/dominio-valor/delete.ts
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IDominioValorRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
