// CÓDIGO V7
// src/use-cases/empresa/search.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";
import { OrderDir } from "@/repositories/interfaces/prisma-base.repository.interface";
import { formatarStatusAtivoEId } from "@/utils/format-status-ativo";

type SearchInput = {
  expr?: string;
  filter?: string; // 👈 já incluímos
  onlyActive?: boolean;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;
};

export class SearchUseCase {
  constructor(private readonly repository: IEmpresaRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<IEmpresa, "id_empresa">(
      result.data,
      "id_empresa"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
