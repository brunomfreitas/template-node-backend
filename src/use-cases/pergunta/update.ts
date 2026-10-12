// CÓDIGO V8
// src/use-cases/aplicacao/update.ts
import { IPergunta } from "@/domains/interfaces/pergunta.interface";
import { IPerguntaRepository } from "@/repositories/interfaces/pergunta.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IPerguntaRepository) {}

  async handler(id: number, data: IPergunta): Promise<IPergunta> {
    return this.repository.update(id, data);
  }
}
