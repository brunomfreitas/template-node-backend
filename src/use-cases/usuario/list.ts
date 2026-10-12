// CÓDIGO V7
// src/use-cases/site/list.ts
import { IUsuario } from '@/domains/interfaces/usuario.interface';
import { OrderDir } from '@/repositories/interfaces/prisma-base.repository.interface';
import { IUsuarioRepository } from '@/repositories/interfaces/usuario.repository.interface';
import { formatarStatusAtivoEId } from '@/utils/format-status-ativo';

type ListInput = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;  
  where?: Record<string, any>;
};

export class ListUseCase {
  constructor(private readonly repository: IUsuarioRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    	const dataFormatada = formatarStatusAtivoEId<IUsuario, 'id_usuario'>(
      		result.data,
      		'id_usuario'
    	);

    	return {
      		...result,
      		data: dataFormatada
    	};
  	}
}
