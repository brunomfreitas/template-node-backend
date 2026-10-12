// CÓDIGO V6
// src/use-cases/aplicacao/find-by-id.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IAplicacaoRepository) {}

  async handler(id: number): Promise<IAplicacao | null> {
    return this.repository.findById(id);
  }
}
