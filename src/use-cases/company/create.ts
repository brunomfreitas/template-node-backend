// src/use-cases/company/create.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { ICompanyRepository } from "@/repositories/interfaces/company.repository.interface";

export class CreateUseCase {
	constructor( private repository: ICompanyRepository ) {}

	async handler(data: ICompany): Promise<ICompany> {
		return this.repository.create(data)
	}
}
