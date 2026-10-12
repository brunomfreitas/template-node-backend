// CÓDIGO V7
// src/use-cases/grupo-seguranca/list.ts
import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";
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
  constructor(private readonly repository: IGrupoSegurancaRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<
      IGrupoSeguranca,
      "id_grupo_seguranca"
    >(result.data, "id_grupo_seguranca");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
