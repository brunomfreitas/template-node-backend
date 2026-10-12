import { IUsuario } from "@/domains/interfaces/usuario.interface";
import { UsuarioRepository } from "@/repositories/prisma/usuario.repository";

export class SoftDeleteUseCase {
  constructor(private repository: UsuarioRepository) {}

  async handler(id: number): Promise<IUsuario> {
    return this.repository.softDelete(id);
  }
}
