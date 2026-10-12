// CÓDIGO V6
// src/use-cases/dominio/create.ts
import { IDominio } from "@/domains/interfaces/dominio.interface";
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";

export class CreateUseCase {
	constructor( private repository: IDominioRepository) {}

	async handler(data: IDominio): Promise<IDominio> {
		return this.repository.create(data)
	}
}