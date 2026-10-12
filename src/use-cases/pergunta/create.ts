// CÓDIGO V8
// src/use-cases/aplicacao/create.ts
import { IPergunta } from "@/domains/interfaces/pergunta.interface";
import { IPerguntaRepository } from "@/repositories/interfaces/pergunta.repository.interface";

export class CreateUseCase {
  constructor(private repository: IPerguntaRepository) {}

  async handler(data: IPergunta): Promise<IPergunta> {
    return this.repository.create(data);
  }
}
