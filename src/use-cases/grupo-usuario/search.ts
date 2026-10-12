// CÓDIGO V7
// src/use-cases/grupo-usuario/search.ts
import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";
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
  constructor(private readonly repository: IGrupoUsuarioRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

    const dataFormatada = formatarStatusAtivoEId<
      IGrupoUsuario,
      "id_grupo_usuario"
    >(result.data, "id_grupo_usuario");

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
