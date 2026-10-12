// CÓDIGO V7
// src/use-cases/grupo-seguranca/search.ts
import { IGrupoSeguranca } from "@/domains/interfaces/grupo-seguranca.interface";
import { IGrupoSegurancaRepository } from "@/repositories/interfaces/grupo-seguranca.repository.interface";
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
  constructor(private readonly repository: IGrupoSegurancaRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<IGrupoSeguranca,'id_grupo_seguranca'>
	(
		result.data, 
		'id_grupo_seguranca'
	);

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
