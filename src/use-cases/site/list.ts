// CÓDIGO V7
// src/use-cases/site/list.ts
import { ISite } from '@/domains/interfaces/site.interface';
import { OrderDir } from '@/repositories/interfaces/prisma-base.repository.interface';
import { ISiteRepository } from '@/repositories/interfaces/site.repository.interface';
import { formatarStatusAtivoEId } from '@/utils/format-status-ativo';

type ListInput = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;
  /** 👇 where vindo do parser de filtro (Prisma where) */
  where?: Record<string, any>;
};

export class ListUseCase {
  constructor(private readonly repository: ISiteRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    	const dataFormatada = formatarStatusAtivoEId<ISite, 'id_site'>(
      		result.data,
      		'id_site'
    	);

    	return {
      		...result,
      		data: dataFormatada
    	};
  	}
}
