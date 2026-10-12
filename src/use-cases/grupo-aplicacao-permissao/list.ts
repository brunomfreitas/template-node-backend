/// CÓDIGO V7
// src/use-cases/grupo-aplicacao-permissao/list.ts
import { IGrupoAplicacaoPermissao } from "@/domains/interfaces/grupo-aplicacao-permissao.interface";
import { IGrupoAplicacaoPermissaoRepository } from "@/repositories/interfaces/grupo-aplicacao-permissao.repository.interface";
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
  constructor(
    private readonly repository: IGrupoAplicacaoPermissaoRepository
  ) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

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
