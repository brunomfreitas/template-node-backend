// CÓDIGO V6
// src/use-cases/empresa-pessoa/create.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";

export class CreateUseCase {
	constructor( private repository: IEmpresaPessoaRepository) {}

	async handler(data: IEmpresaPessoa): Promise<IEmpresaPessoa> {
		return this.repository.create(data)
	}
}