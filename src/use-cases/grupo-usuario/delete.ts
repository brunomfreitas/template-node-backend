import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";

export class DeleteUseCase {
  constructor(private repository: IGrupoUsuarioRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
