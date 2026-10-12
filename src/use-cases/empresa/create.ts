// CÓDIGO V6
// src/use-cases/empresa/create.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";

export class CreateUseCase {
	constructor( private repository: IEmpresaRepository) {}

	async handler(data: IEmpresa): Promise<IEmpresa> {
		return this.repository.create(data)
	}
}