// CÓDIGO V8
// src/use-cases/aplicacao/delete.ts
import { IPerguntaRepository } from "@/repositories/interfaces/pergunta.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IPerguntaRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
