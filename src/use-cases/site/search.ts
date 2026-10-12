// CÓDIGO V7
// src/use-cases/organizacao/search.ts
import { ISite } from '@/domains/interfaces/site.interface';
import { OrderDir } from '@/repositories/interfaces/prisma-base.repository.interface';
import { ISiteRepository } from '@/repositories/interfaces/site.repository.interface';
import { formatarStatusAtivoEId } from '@/utils/format-status-ativo';

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
  constructor(private readonly repository: ISiteRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

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
