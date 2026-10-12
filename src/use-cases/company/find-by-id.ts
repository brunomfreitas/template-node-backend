// src/use-cases/company/find-by-id.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { ICompanyRepository } from "@/repositories/interfaces/company.repository.interface";

export class FindByIdUseCase {
  constructor(private readonly repository: ICompanyRepository) {}

  async handler(id: number): Promise<ICompany | null> {
    return this.repository.findById(id);
  }
}
