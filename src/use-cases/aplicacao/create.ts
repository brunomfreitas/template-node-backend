// CÓDIGO V6
// src/use-cases/aplicacao/create.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";

export class CreateUseCase {
  constructor(private repository: IAplicacaoRepository) {}

  async handler(data: IAplicacao): Promise<IAplicacao> {
    return this.repository.create(data);
  }
}
