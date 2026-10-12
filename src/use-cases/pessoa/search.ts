// CÓDIGO V7
// src/use-cases/pessoa/search.ts
import { IPessoa } from "@/domains/interfaces/pessoa.interface";
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";
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
  constructor(private readonly repository: IPessoaRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<IPessoa, "id_pessoa">(
      result.data,
      "id_pessoa"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
