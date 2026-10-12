// CÓDIGO V8
// src/use-cases/prontuario-pergunta/list.ts
import { IProntuarioPergunta } from "@/domains/interfaces/prontuario-pergunta.interface";
import { OrderDir } from "@/repositories/interfaces/prisma-base.repository.interface";
import { IProntuarioPerguntaRepository } from "@/repositories/interfaces/prontuario-pergunta.repository.interface";
import { formatarStatusAtivoEId } from "@/utils/format-status-ativo";

type ListInput = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;
  where?: Record<string, any>;
};

export class ListUseCase {
  constructor(private readonly repository: IProntuarioPerguntaRepository) {}

  	async handler({ page, pageSize, orderBy, orderDir = 'asc', where }: ListInput) {
		const result = await this.repository.list({ page, pageSize, orderBy, orderDir, filter: where });

    const dataFormatada = formatarStatusAtivoEId<IProntuarioPergunta, "id_prontuario_pergunta">(
      result.data,
      "id_prontuario_pergunta"
    );

    return {
      ...result,
      data: dataFormatada,
    };
  }
}
