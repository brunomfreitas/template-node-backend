// CÓDIGO V7
// src/use-cases/organizacao/search-organizacao.ts
import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";
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
  constructor(private readonly repository: IGrupoSiteRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<IGrupoSite, "id_grupo_site">(
      result.data,
      "id_grupo_site"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
