// CÓDIGO V6
// src/use-cases/grupo-usuario/create.ts
import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";

export class CreateUseCase {
	constructor( private repository: IGrupoUsuarioRepository) {}

	async handler(data: IGrupoUsuario): Promise<IGrupoUsuario> {
		return this.repository.create(data)
	}
}