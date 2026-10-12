// CÓDIGO V7
// src/use-cases/grupo-site/list.ts
import { IGrupoSite } from "@/domains/interfaces/grupo-site.interface";
import { IGrupoSiteRepository } from "@/repositories/interfaces/grupo-site.repository.interface";
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
  constructor(private readonly repository: IGrupoSiteRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

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
