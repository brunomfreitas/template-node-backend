import {
	IBaseRepository,
	ListResult,
	SearchInput,
} from "@/repositories/interfaces/base.repository.interface";

type Formatter<TInput, TOutput> = (data: TInput[]) => TOutput[];

export class BaseCreateUseCase<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async handler(data: T): Promise<T> {
    return this.repository.create(data);
  }
}

export class BaseUpdateUseCase<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async handler(id: number, data: T): Promise<T> {
    return this.repository.update(id, data);
  }
}

export class BaseDeleteUseCase<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async handler(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}

export class BaseSoftDeleteUseCase<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async handler(id: number): Promise<T> {
    return this.repository.softDelete(id);
  }
}

export class BaseFindByIdUseCase<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async handler(id: number): Promise<T | null> {
    return this.repository.findById(id);
  }
}

export class BaseListUseCase<TEntity, TOutput = TEntity> {
  constructor(
    protected readonly repository: IBaseRepository<TEntity>,
    protected readonly formatData?: Formatter<TEntity, TOutput>
  ) {}

  async handler({
    page,
    pageSize,
    orderBy,
    orderDir = "asc",
    where,
  }: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderDir?: "asc" | "desc";
    where?: Record<string, any>;
  }): Promise<ListResult<TOutput>> {
    const result = await this.repository.list({
      page,
      pageSize,
      orderBy,
      orderDir,
      filter: where,
    });

    return {
      ...result,
      data: this.formatData ? this.formatData(result.data) : (result.data as unknown as TOutput[]),
    };
  }
}

export class BaseSearchUseCase<TEntity, TOutput = TEntity> {
  constructor(
    protected readonly repository: IBaseRepository<TEntity>,
    protected readonly formatData?: Formatter<TEntity, TOutput>
  ) {}

  async handler({
    expr,
    filter,
    onlyActive,
    page = 1,
    pageSize = 20,
    orderBy,
    orderDir = "asc",
  }: SearchInput): Promise<ListResult<TOutput>> {
    const result = await this.repository.search({
      expr,
      filter,
      onlyActive,
      page,
      pageSize,
      orderBy,
      orderDir,
    });

    return {
      ...result,
      data: this.formatData ? this.formatData(result.data) : (result.data as unknown as TOutput[]),
    };
  }
}