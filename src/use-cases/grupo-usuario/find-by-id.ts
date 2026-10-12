// CÓDIGO V6
// src/use-cases/grupo-usuario/find-by-id.ts
import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";

export class FindByIdUseCase {
  constructor(private repository: IGrupoUsuarioRepository) {}

  async handler(id: number): Promise<IGrupoUsuario | null> {
    return this.repository.findById(id);
  }
}
