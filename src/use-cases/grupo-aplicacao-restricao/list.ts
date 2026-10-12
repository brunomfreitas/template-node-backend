/// CÓDIGO V7
// src/use-cases/grupo-aplicacao-restricao/list.ts
import { IGrupoAplicacaoRestricao } from "@/domains/interfaces/grupo-aplicacao-restricao.interface";
import { IGrupoAplicacaoRestricaoRepository } from "@/repositories/interfaces/grupo-aplicacao-restricao.repository.interface";
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
    private readonly repository: IGrupoAplicacaoRestricaoRepository
  ) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<
      IGrupoAplicacaoRestricao,
      "id_grupo_aplicacao_restricao"
    >(result.data, "id_grupo_aplicacao_restricao");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
