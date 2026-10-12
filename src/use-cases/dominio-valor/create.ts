// CÓDIGO V6
// src/use-cases/dominio-valor/create.ts
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";

export class CreateUseCase {
	constructor( private repository: IDominioValorRepository) {}

	async handler(data: IDominioValor): Promise<IDominioValor> {
		return this.repository.create(data)
	}
}