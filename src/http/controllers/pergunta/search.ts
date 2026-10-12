// V8
// src/http/controllers/pergunta/search.ts
import { PerguntaRepository } from "@/repositories/prisma/pergunta.repository";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { SearchUseCase } from "@/use-cases/pergunta/search";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("pergunta", async (args) => {
	const usecase = makeUseCase(SearchUseCase, PerguntaRepository);
	return usecase.handler(args);
});