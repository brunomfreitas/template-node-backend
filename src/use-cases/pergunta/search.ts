// CÓDIGO V7
// src/use-cases/aplicacao/search.ts
import { IPergunta } from "@/domains/interfaces/pergunta.interface";
import { IPerguntaRepository } from "@/repositories/interfaces/pergunta.repository.interface";
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
  constructor(private readonly repository: IPerguntaRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

		const dataFormatada = formatarStatusAtivoEId<IPergunta, "id_pergunta">(
		result.data,
		"id_pergunta"
		);

		return {
			...result,
			data: dataFormatada,
		};
  }
}
