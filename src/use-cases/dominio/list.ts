// CÓDIGO V7
// src/use-cases/dominio/list.ts
import { IDominio } from "@/domains/interfaces/dominio.interface";
import { IDominioRepository } from "@/repositories/interfaces/dominio.repository.interface";
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
  constructor(private readonly repository: IDominioRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<IDominio, "id_dominio">(
      result.data,
      "id_dominio"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
