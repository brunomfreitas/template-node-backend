// V8
// src/http/controllers/prontuario-pergunta/search.ts
import { ProntuarioPerguntaRepository } from "@/repositories/prisma/prontuario-pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SearchUseCase } from "@/use-cases/prontuario-pergunta/search";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("prontuario_pergunta", async (args) => {
	const usecase = makeUseCase(SearchUseCase, ProntuarioPerguntaRepository);
	return usecase.handler(args);
});