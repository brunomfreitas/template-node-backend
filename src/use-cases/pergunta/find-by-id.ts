// CÓDIGO V8
// src/use-cases/aplicacao/find-by-id.ts
import { IPergunta } from "@/domains/interfaces/pergunta.interface";
import { IPerguntaRepository } from "@/repositories/interfaces/pergunta.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IPerguntaRepository) {}

  async handler(id: number): Promise<IPergunta | null> {
    return this.repository.findById(id);
  }
}
