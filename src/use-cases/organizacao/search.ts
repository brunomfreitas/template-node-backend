// CÓDIGO V7
// src/use-cases/organizacao/search.ts
import { IOrganizacao } from '@/domains/interfaces/organizacao.interface';
import { IOrganizacaoRepository } from '@/repositories/interfaces/organizacao.repository.interface';
import { OrderDir } from '@/repositories/interfaces/prisma-base.repository.interface';
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
  constructor(private readonly repository: IOrganizacaoRepository) {}

	async handler({ expr, filter, onlyActive,	page = 1, pageSize = 20, orderBy, orderDir = 'asc' }: SearchInput) {
		const result = await this.repository.search({ expr, filter, onlyActive, page, pageSize, orderBy, orderDir } as any);

		const dataFormatada = formatarStatusAtivoEId<IOrganizacao, 'id_organizacao'>
		(
			result.data,
			'id_organizacao'
		);
		
		return {
			...result,
			data: dataFormatada
		};
	}
}
