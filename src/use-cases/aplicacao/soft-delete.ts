// CÓDIGO V6
// src/use-cases/aplicacao/delete.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IAplicacaoRepository) {}

  async handler(id: number): Promise<IAplicacao> {
    return this.repository.softDelete(id);
  }
}
