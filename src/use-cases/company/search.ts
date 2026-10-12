// src/use-cases/company/search.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { ICompanyRepository } from "@/repositories/interfaces/company.repository.interface";

type SearchInput = {
  expr?: string;
  filter?: string;
  onlyActive?: boolean;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
};

export class SearchUseCase {
  constructor(private readonly repository: ICompanyRepository) {}

  async handler(args: SearchInput) {
    return this.repository.search(args);
  }
}
