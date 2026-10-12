// CÓDIGO V8
// src/use-cases/prontuario-pergunta/create.ts
import { IProntuarioPergunta } from "@/domains/interfaces/prontuario-pergunta.interface";
import { IProntuarioPerguntaRepository } from "@/repositories/interfaces/prontuario-pergunta.repository.interface";

export class CreateUseCase {
  constructor(private repository: IProntuarioPerguntaRepository) {}

  async handler(data: IProntuarioPergunta): Promise<IProntuarioPergunta> {
    return this.repository.create(data);
  }
}
