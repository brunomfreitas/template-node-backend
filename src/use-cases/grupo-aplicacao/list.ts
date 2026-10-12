// CÓDIGO V7
// src/use-cases/grupo-aplicacao/list.ts
import { IGrupoAplicacao } from "@/domains/interfaces/grupo-aplicacao.interface";
import { IGrupoAplicacaoRepository } from "@/repositories/interfaces/grupo-aplicacao.repository.interface";
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
  constructor(private readonly repository: IGrupoAplicacaoRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<
      IGrupoAplicacao,
      "id_grupo_aplicacao"
    >(result.data, "id_grupo_aplicacao");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
