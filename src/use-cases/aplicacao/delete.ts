// CÓDIGO V6
// src/use-cases/aplicacao/delete.ts
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IAplicacaoRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
