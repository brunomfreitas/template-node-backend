// CÓDIGO V8
// src/use-cases/prontuario-pergunta/find-by-id.ts
import { IProntuarioPergunta } from "@/domains/interfaces/prontuario-pergunta.interface";
import { IProntuarioPerguntaRepository } from "@/repositories/interfaces/prontuario-pergunta.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IProntuarioPerguntaRepository) {}

  async handler(id: number): Promise<IProntuarioPergunta | null> {
    return this.repository.findById(id);
  }
}
