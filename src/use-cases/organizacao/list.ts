// CÓDIGO V7
// src/use-cases/organizacao/list.ts
import { IOrganizacao } from "@/domains/interfaces/organizacao.interface";
import { IOrganizacaoRepository } from "@/repositories/interfaces/organizacao.repository.interface";
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
  	constructor(private readonly repository: IOrganizacaoRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });
		
		const dataFormatada = formatarStatusAtivoEId<IOrganizacao,"id_organizacao">(result.data, "id_organizacao");

		return {
		...result,
		data: dataFormatada,
		};
  	}
}
