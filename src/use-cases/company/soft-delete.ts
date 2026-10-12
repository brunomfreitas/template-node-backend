// src/use-cases/company/soft-delete.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { ICompanyRepository } from "@/repositories/interfaces/company.repository.interface";

export class SoftDeleteUseCase {
  constructor(private readonly repository: ICompanyRepository) {}

  async handler(id: number): Promise<ICompany> {
    return this.repository.softDelete(id);
  }
}
