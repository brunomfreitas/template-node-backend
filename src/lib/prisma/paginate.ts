// src/lib/prisma/paginate.ts
import type { PageParams, Paginated } from '@/utils/types/pagination';

type Delegate = {
  findMany: (args: any) => Promise<any[]>;
  count:    (args: any) => Promise<number>;
};

type BaseArgs = {
  where?: any;
  select?: any;
  include?: any;
  orderBy?: any; // se não passar, definimos um default no repositório
};

/**
 * Paginação OFFSET-based genérica para Prisma.
 * Usa $transaction para pegar items e count no mesmo snapshot.
 */
export async function paginate<T>(
  delegate: Delegate,
  baseArgs: BaseArgs,
  params: PageParams = {}
): Promise<Paginated<T>> {
  const rawPage  = Number(params.page ?? 1);
  const rawLimit = Number(params.limit ?? 10);

  const page  = Number.isFinite(rawPage)  && rawPage  > 0 ? Math.floor(rawPage)  : 1;
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(Math.floor(rawLimit), 100) : 10;  // limita de 100...100
  // const limit = 9000000;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    delegate.findMany({ ...baseArgs, skip, take: limit }),
    delegate.count({ where: baseArgs.where })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    items: items as T[],
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages
    }
  };
}
