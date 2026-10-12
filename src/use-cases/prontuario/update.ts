// CÓDIGO V6
// src/use-cases/aplicacao/update.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IAplicacaoRepository) {}

  async handler(id: number, data: IAplicacao): Promise<IAplicacao> {
    return this.repository.update(id, data);
  }
}
