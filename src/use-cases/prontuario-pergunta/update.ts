// CÓDIGO V8
// src/use-cases/prontuario-pergunta/update.ts
import { IProntuarioPergunta } from "@/domains/interfaces/prontuario-pergunta.interface";
import { IProntuarioPerguntaRepository } from "@/repositories/interfaces/prontuario-pergunta.repository.interface";

export class UpdateUseCase {
	constructor(private repository: IProntuarioPerguntaRepository) {}

	async handler(id: number, data: IProntuarioPergunta): Promise<IProntuarioPergunta> {
		return this.repository.update(id, data);
	}
}
