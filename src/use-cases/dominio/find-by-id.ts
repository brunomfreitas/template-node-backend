// CÓDIGO V6
// src/use-cases/dominio/find-by-id.ts
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";
import { IDominio } from "@/domains/interfaces/dominio.interface";

export class FindByIdUseCase {
  constructor(private repository: IDominioRepository) {}

  async handler(id: number): Promise<IDominio | null> {
    const data = await this.repository.findById(id);

    // if (!data) throw new ResourceNotFoundError()

    return data;
  }
}
