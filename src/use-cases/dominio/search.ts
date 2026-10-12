// CÓDIGO V7
// src/use-cases/dominio/search.ts
import { IDominio } from "@/domains/interfaces/dominio.interface";
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";
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
  constructor(private readonly repository: IDominioRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<IDominio, "id_dominio">(
      result.data,
      "id_dominio"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
