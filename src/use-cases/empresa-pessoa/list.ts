// CÓDIGO V7
// src/use-cases/organizacao/list.ts
import { IEmpresaPessoa } from "@/domains/interfaces/empresa-pessoa.interface";
import { IEmpresaPessoaRepository } from "@/repositories/interfaces/empresa-pessoa.repository.interface";
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
  constructor(private readonly repository: IEmpresaPessoaRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<
      IEmpresaPessoa,
      "id_empresa_pessoa"
    >(result.data, "id_empresa_pessoa");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
