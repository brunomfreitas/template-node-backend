import { UsuarioRepository } from '@/repositories/prisma/usuario.repository'

export class FindByIdUseCase {

  constructor(private repository: UsuarioRepository) {}

  async handler(id: number) {
    
	const data = await this.repository.findById(id)

    // if (!person) throw new ResourceNotFoundError()

    return data
  }
}
