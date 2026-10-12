// CÓDIGO V7
// src/use-cases/empresa-pessoa/search.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";
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
  constructor(private readonly repository: IEmpresaPessoaRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<
      IEmpresaPessoa,
      "id_empresa_pessoa"
    >(result.data, "id_empresa_pessoa");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
