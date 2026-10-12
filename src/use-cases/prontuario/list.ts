// CÓDIGO V7
// src/use-cases/aplicacao/list.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";
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
  constructor(private readonly repository: IAplicacaoRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<IAplicacao, "id_aplicacao">(
      result.data,
      "id_aplicacao"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
