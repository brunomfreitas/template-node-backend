import { Usuario } from "@/domains/entities/usuario.entity";
import { UsuarioRepository } from "@/repositories/prisma/usuario.repository";

export class UpdateUseCase {
  constructor(private repository: UsuarioRepository) {}

  handler(id: number, usuario: Usuario) {
    return this.repository.update(id, usuario);
  }
}
