// CÓDIGO V7
// src/use-cases/empresa/list.ts
import { IEmpresa } from "@/domains/interfaces/empresa.interface";
import { IEmpresaRepository } from "@/repositories/interfaces/empresa.repository.interface";
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
  constructor(private readonly repository: IEmpresaRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<IEmpresa, "id_empresa">(
      result.data,
      "id_empresa"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
