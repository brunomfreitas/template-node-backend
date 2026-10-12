// CÓDIGO V7
// src/use-cases/pessoa/list.ts
import { IPessoa } from "@/domains/interfaces/pessoa.interface";
import { IPessoaRepository } from "@/repositories/interfaces/pessoa.repository.interface";
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
  constructor(private readonly repository: IPessoaRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<IPessoa, "id_pessoa">(
      result.data,
      "id_pessoa"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
