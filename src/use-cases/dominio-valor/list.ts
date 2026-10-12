// CÓDIGO V7
// src/use-cases/dominio-valor/list.ts
import { IDominioValor } from "@/domains/interfaces/dominio-valor.interface";
import { IDominioValorRepository } from "@/repositories/interfaces/dominio-valor.repository.interface";
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
  constructor(private readonly repository: IDominioValorRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

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
