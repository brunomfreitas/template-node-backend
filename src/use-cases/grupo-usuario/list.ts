// CÓDIGO V7
// src/use-cases/grupo-usuario/list.ts
import { IGrupoUsuario } from "@/domains/interfaces/grupo-usuario.interface";
import { IGrupoUsuarioRepository } from "@/repositories/interfaces/grupo-usuario.repository.interface";
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
  constructor(private readonly repository: IGrupoUsuarioRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

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
