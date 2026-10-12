// CÓDIGO V7
// src/use-cases/aplicacao/search.ts
import { IAplicacao } from "@/domains/interfaces/aplicacao.interface";
import { IAplicacaoRepository } from "@/repositories/interfaces/aplicacao.repository.interface";
import { OrderDir } from "@/repositories/interfaces/prisma-base.repository.interface";
import { formatarStatusAtivoEId } from "@/utils/format-status-ativo";

type SearchInput = {
	expr?: string;
	filter?: string; // 👈 já incluímos
	onlyActive?: boolean;
	page?: number;
	pageSize?: number;
	orderBy?: string;
	orderDir?: OrderDir;
};

export class SearchUseCase {
  constructor(private readonly repository: IAplicacaoRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

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
