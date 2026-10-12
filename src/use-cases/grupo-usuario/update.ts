// CÓDIGO V6
// src/use-cases/grupo-usuario/update.ts
import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";

export class UpdateUseCase {
  constructor(private repository: IGrupoUsuarioRepository) {}

  async handler(id: number, data: IGrupoUsuario): Promise<IGrupoUsuario> {
    return this.repository.update(id, data);
  }
}
