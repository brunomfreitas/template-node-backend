// CÓDIGO V6
// src/use-cases/dominio/delete.ts
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IDominioRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
