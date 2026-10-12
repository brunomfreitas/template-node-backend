// src/use-cases/company/list.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { ICompanyRepository } from "@/repositories/interfaces/company.repository.interface";
import { OrderDir } from "@/repositories/interfaces/prisma-base.repository.interface";
import { formatarStatusAtivoEId } from "@/utils/format-status-ativo";

type ListInput = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;
  where?: Record<string, any>;
};

export class ListUseCase {
  constructor(private readonly repository: ICompanyRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<ICompany, "id_company">(
      result.data,
      "id_company"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
