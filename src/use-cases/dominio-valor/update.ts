// CÓDIGO V6
// src/use-cases/organizacao/update.ts
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";

export class UpdateUseCase {
  constructor(private repository: IDominioValorRepository) {}

  async handler(id: number, data: IDominioValor): Promise<IDominioValor> {
    return this.repository.update(id, data);
  }
}
