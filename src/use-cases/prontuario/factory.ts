import { IProntuario } from "@/domains/interfaces/prontuario.interface";
import { IProntuarioRepository } from "@/repositories/interfaces/prontuario.repository.interface";
import { ProntuarioRepository } from "@/repositories/prisma/prontuario.repository";
import { createBaseUseCaseFactory } from "@/use-cases/base/base-use-cases-factory";
import { Formatado, formatarStatusAtivoEId } from "@/utils/format-status-ativo";

const repository: IProntuarioRepository = new ProntuarioRepository();

type IProntuarioFormatado = Formatado<IProntuario, "id_prontuario">;

const formatProntuario = (
  data: IProntuario[]
): IProntuarioFormatado[] =>
  formatarStatusAtivoEId<IProntuario, "id_prontuario">(data, "id_prontuario");

export const prontuarioUseCases = createBaseUseCaseFactory<
  IProntuario,
  IProntuarioFormatado
>(repository, {
  formatListData: formatProntuario,
  formatSearchData: formatProntuario,
});