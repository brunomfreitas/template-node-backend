// src/use-cases/company/update.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { ICompanyRepository } from "@/repositories/interfaces/company.repository.interface";

export class UpdateUseCase {
  constructor(private readonly repository: ICompanyRepository) {}

  async handler(id: number, data: ICompany): Promise<ICompany> {
    return this.repository.update(id, data);
  }
}
