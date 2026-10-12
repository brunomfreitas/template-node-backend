// CÓDIGO V7
// src/use-cases/grupo-aplicacao-permissao/search.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";
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
  constructor(
    private readonly repository: IGrupoAplicacaoPermissaoRepository
  ) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<
      IGrupoAplicacaoPermissao,
      "id_grupo_aplicacao_permissao"
    >(result.data, "id_grupo_aplicacao_permissao");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
