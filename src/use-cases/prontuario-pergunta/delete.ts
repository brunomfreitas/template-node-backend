// CÓDIGO V8
// src/use-cases/prontuario-pergunta/delete.ts
import { IProntuarioPerguntaRepository } from "@/repositories/interfaces/prontuario-pergunta.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IProntuarioPerguntaRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
