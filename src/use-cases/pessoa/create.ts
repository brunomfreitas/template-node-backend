// CÓDIGO V6
// src/use-cases/pessoa/create.ts
import { IPessoa } from "@/domains/interfaces/pessoa.interface";
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";

export class CreateUseCase {
	constructor( private repository: IPessoaRepository) {}

	async handler(data: IPessoa): Promise<IPessoa> {
		return this.repository.create(data)
	}
}