// CÓDIGO V6
// src/use-cases/site/create.ts
import { IUsuario } from "@/domains/interfaces/usuario.interface";
import { IUsuarioRepository } from "@/repositories/interfaces/usuario.repository.interface";

export class CreateUseCase {
	constructor( private repository: IUsuarioRepository) {}

	async handler(data: IUsuario): Promise<IUsuario> {
		return this.repository.create(data)
	}
}