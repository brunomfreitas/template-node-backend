// CÓDIGO V7
// src/use-cases/dominio-valor/search.ts
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";
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
  constructor(private readonly repository: IDominioValorRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<
      IDominioValor,
      "id_dominio_valor"
    >(result.data, "id_dominio_valor");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
