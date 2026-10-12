// CÓDIGO V6
// src/use-cases/dominio/update.ts
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";
import { IDominio } from "@/domains/interfaces/dominio.interface";

export class UpdateUseCase {
  constructor(private repository: IDominioRepository) {}

  async handler(id: number, data: IDominio): Promise<IDominio> {
    return this.repository.update(id, data);
  }
}
