import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";

export class SoftDeleteUseCase {
  constructor(private repository: IGrupoUsuarioRepository) {}

  async handler(id: number): Promise<IGrupoUsuario> {
    return this.repository.softDelete(id);
  }
}
