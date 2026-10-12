// CÓDIGO V6
// src/use-cases/dominio-valor/find-by-id.ts
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";

export class FindByIdUseCase {
  constructor(private repository: IDominioValorRepository) {}

  async handler(id: number): Promise<IDominioValor | null> {
    const data = await this.repository.findById(id);

    // if (!data) throw new ResourceNotFoundError()

    return data;
  }
}
