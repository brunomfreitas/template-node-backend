// CÓDIGO V6
// src/use-cases/aplicacao/create.ts
import { IProntuario } from "@/domains/interfaces/prontuario.interface";
import { IProntuarioRepository } from "@/repositories/interfaces/prontuario.repository.interface";

export class CreateUseCase {
  constructor(private repository: IProntuarioRepository) {}

  async handler(data: IProntuario): Promise<IProntuario> {
    return this.repository.create(data);
  }
}
