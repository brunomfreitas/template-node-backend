// CÓDIGO V8
// src/use-cases/prontuario-pergunta/search.ts
import { IProntuarioPergunta } from "@/domains/interfaces/prontuario-pergunta.interface";
import { OrderDir } from "@/repositories/interfaces/prisma-base.repository.interface";
import { IProntuarioPerguntaRepository } from "@/repositories/interfaces/prontuario-pergunta.repository.interface";
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
  constructor(private readonly repository: IProntuarioPerguntaRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

		const dataFormatada = formatarStatusAtivoEId<IProntuarioPergunta, "id_prontuario_pergunta">( result.data, "id_prontuario_pergunta" );

		return {
			...result,
			data: dataFormatada,
		};
  }
}
