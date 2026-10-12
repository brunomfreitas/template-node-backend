import { UsuarioRepository } from "@/repositories/prisma/usuario.repository";

export class DeleteUseCase {
  constructor(private repository: UsuarioRepository) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
