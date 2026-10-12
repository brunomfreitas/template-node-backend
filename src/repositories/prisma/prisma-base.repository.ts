// src/repositories/prisma/prisma-base.repository.ts
import { AppError, ERROR_CODES } from '@/errors';
import { paginate } from '@/lib/prisma/paginate';
import prisma from '@/lib/prisma/prisma';
import { PaginatedResult } from '@/repositories/interfaces/prisma-base.repository.interface';
import { parseReactTableFilterJson } from '@/utils/react-table-filter-to-prisma';
import { sqlWhereToPrismaWhere } from '@/utils/sql-where-to-prisma';
import { includeMap } from './include-map';

// 👇 importa o parser genérico do filtro do ReactTable

/** Parâmetros para o searchRawExpr (WHERE literal) */
export type RawExprParams = {
  /** Expressão WHERE literal. Ex.: "nm_organizacao ilike '%ESCU%' AND st_ativo = true" */
  expr?: string;
  /** Colunas para selecionar; se não vier, usa this.defaultColumns ou "*" */
  columns?: string;
  /** Nome da coluna para ORDER BY (ex.: "nm_organizacao") */
  orderBy?: string;
  /** Direção: "asc" | "desc" (default asc) */
  orderDir?: 'asc' | 'desc';
  /** Página 1-based (default 1) */
  page?: number;
  /** Itens por página (default 20, máx 100) */
  pageSize?: number;
  /** Se true, adiciona "AND <onlyActiveField> = true" no WHERE final (default false) */
  onlyActive?: boolean;
};

type BaseRepoOptions = {
  /** Nome completo da tabela (p.ex. "cognitio.organizacao"); default: modelName */
  table?: string;
  /** Colunas default para SELECT no searchRawExpr (p.ex. "id, nome, created_at") */
  defaultColumns?: string;
  /** Campo booleano de ativo para anexar no WHERE quando onlyActive = true (default "st_ativo") */
  onlyActiveField?: string;
};

export class PrismaBaseRepository<
  TModelName extends string = string,
  PK extends string = string
> {
  protected model: any;
  protected readonly modelName: TModelName;
  protected readonly primaryKey: PK;

  /** Nome completo da tabela para o searchRawExpr (schema.tabela) */
  protected readonly tableName: string;
  /** Colunas default do searchRawExpr */
  protected readonly defaultColumns?: string;
  /** Campo de ativo (ex.: "st_ativo") */
  protected readonly onlyActiveField: string;

  constructor(
    modelName: TModelName,
    primaryKey: PK = 'id' as PK,
    options?: BaseRepoOptions
  ) {
    this.modelName = modelName;
    this.primaryKey = primaryKey;

    this.model = (prisma as any)[modelName];
    if (!this.model) {
      throw new Error(`Model ${String(modelName)} not found in Prisma Client`);
    }

    this.tableName = options?.table ?? String(modelName);
    this.defaultColumns = options?.defaultColumns;
    this.onlyActiveField = options?.onlyActiveField ?? 'st_ativo';
  }

  /** ===== Include genérico para relações, baseado no includeMap ===== */
  protected getInclude() {
    return includeMap[this.modelName] || undefined;
  }

  /** ===== CRUD básico tipado pelo Prisma ===== */

	async create<TOut = any>(data: any): Promise<TOut> {
		try{
			return this.model.create({ data, include: this.getInclude() });
		} catch (error: any){
			console.error(error);

			switch (error.code) {

                // FK
                case 'P2003':
                    throw new AppError(400, [{ code: ERROR_CODES.INVALID_FIELD }]);

                // registro não encontrado
                case 'P2025':
                    throw new AppError(404, [{ code: ERROR_CODES.RECORD_NOT_FOUND }]);

                // campo obrigatório
                case 'P2011':
                    throw new AppError(400, [{ code: ERROR_CODES.REQUIRED_FIELD }]);

                // duplicidade
                case 'P2002':
                    throw new AppError(409, [{ code: ERROR_CODES.DUPLICATE_RECORD }]);
            }

        	throw error;
    	}
		
	}
  
/**
   * LIST v3 – paginação simples via where em objeto Prisma,
   * usando o helper paginate.ts por baixo dos panos.
   * O LIST NÃO ESTÁ PAGINANDO, ESSE PROBLEMA SERÁ TRATADO EM UM MOMENTO FUTURO
   */
  async list<TOut = any>(params?: {
    filter?: Record<string, any>;
    page?: number;
    pageSize?: number;          // pageSize aqui vira "limit" no paginate
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
  }): Promise<PaginatedResult<TOut>> {
    const {
      filter = {},
      page = 1,
      pageSize = 30,
      orderBy,
      orderDir = 'asc'
    } = params || {};

    const orderByField = orderBy || (this.primaryKey as string);
    const dir = orderDir === 'desc' ? 'desc' : 'asc';

    const baseArgs = {
      where: filter,
      include: this.getInclude(),
      orderBy: { [orderByField]: dir }
    };

    // aqui usamos o helper paginate.ts
    const { items, meta } = await paginate<TOut>(
      this.model,
      baseArgs,
      {
        page,
        limit: pageSize           // 👈 mapeia pageSize → limit
      }
    );

    return {
      data: items,
      page: meta.page,
      pageSize: meta.limit,      // 👈 converte de volta pra pageSize
      total: meta.total,
      totalPages: meta.totalPages
    };
  }


  async findById<TOut = any>(id: number): Promise<TOut | null> {
    return this.model.findUnique({
      where: { [this.primaryKey]: id } as any,
      include: this.getInclude()
    });
  }


/** updateById “baixo nível” – você pode continuar usando onde já existia */
  async updateById<TOut = any>(id: number, data: any): Promise<TOut> {
    return this.model.update({
      where: { [this.primaryKey]: id } as any,
      data,
      include: this.getInclude()
    });
  }

  /**
   * update genérico para bater com a interface IPrismaBaseRepository.
   * Espera que o objeto tenha a PK dentro do próprio data.
   */
  async update<TOut = any>( id: number, data: any ): Promise<TOut> {
	try{
	  	const hasDtAtualizacao = this.defaultColumns?.includes?.('dt_atualizacao');
				
		const payload = {
			...data,
			...(hasDtAtualizacao ? { dt_atualizacao: new Date() } : {})
		};
		
		return this.model.update({
			where: { [this.primaryKey]: id } as any,
			data: payload,
			include: this.getInclude()
		});
	} catch (error: any){
		console.error(error);

        // Prisma FK
        if (error.code === 'P2003') {
            throw new Error('Relacionamento inválido.');
        }

        // Registro não encontrado
        if (error.code === 'P2025') {
            throw new Error('Registro não encontrado.');
        }

        // Campo obrigatório
        if (error.code === 'P2011') {
            throw new Error('Campo obrigatório não preenchido.');
        }

        throw error;
	}
  }

  /**
   * delete genérico (soft delete) para bater com a interface IPrismaBaseRepository.
   * Implementado como soft delete usando onlyActiveField.
   */

	async delete<TOut = any>(id: number): Promise<TOut> {
		return this.model.delete({
		where: { [this.primaryKey]: id } as any      
		});
	}


    /** softDelete “baixo nível” */
  	async softDelete<TOut = any>(id: number): Promise<TOut> {

		const hasDtExclusao = this.defaultColumns?.includes?.('dt_exclusao');
				
		const payload = {
			[this.onlyActiveField]: false,
			...(hasDtExclusao ? { dt_exclusao: new Date() } : {})
		};
		
    return this.model.update({
      where: { [this.primaryKey]: id } as any,
      data: payload,
      include: this.getInclude()
    });
  }

  // ============== SEARCH (PRISMA) com include e whereSql ==============
  /**
   * search – focado em cenários onde você recebe um WHERE estilo SQL,
   * converte com sqlWhereToPrismaWhere e aplica paginação/ordenação.
   * Mantido independente do list.
   */
  async search<TOut = any>(args: {
    expr?: string;
	filter?: string;
    /** onlyActive: aplica st_ativo=true (ou campo configurado) junto */
    onlyActive?: boolean;
    /** paginação */
    page?: number;
    pageSize?: number;
    /** ordenação */
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
  }): Promise<PaginatedResult<TOut>> {
    const page = Math.max(1, args.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, args.pageSize ?? 20)); // limita em 100...100
	// const pageSize = 9000000;
    const skip = (page - 1) * pageSize;

    // monta where a partir do expr + onlyActive
    const parts: any[] = [];

    if (args.expr && args.expr.trim()) {
      parts.push(sqlWhereToPrismaWhere(args.expr));
    }
    if (args.onlyActive) {
      parts.push({ [this.onlyActiveField]: true });
    }

	// 🔹 filtros vindos do ReactTable (global + coluna), com config no próprio JSON
	if (args.filter) {
		const filterWhere = parseReactTableFilterJson(args.filter);
		if (filterWhere && Object.keys(filterWhere).length > 0) {
			parts.push(filterWhere);
		}
	}

    const where = parts.length ? { AND: parts } : {};

    const orderByField = args.orderBy || (this.primaryKey as string);
    const orderDir = (args.orderDir || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';

    const [total, rows] = await Promise.all([
      this.model.count({ where }),
      this.model.findMany({
        where,
        orderBy: { [orderByField]: orderDir },
        skip,
        take: pageSize,
        include: this.getInclude()
      })
    ]);

    return {
      data: rows as TOut[],
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    };
  }
}
