// CÓDIGO V8
// src/use-cases/aplicacao/delete.ts
import { IPergunta } from "@/domains/interfaces/pergunta.interface";
import { IPerguntaRepository } from "@/repositories/interfaces/pergunta.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IPerguntaRepository) {}

  async handler(id: number): Promise<IPergunta> {
    return this.repository.softDelete(id);
  }
}
