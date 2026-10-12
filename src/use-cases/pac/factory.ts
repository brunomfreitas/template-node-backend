import { IPac } from "@/domains/interfaces/pac.interface";
import { IPacRepository } from "@/repositories/interfaces/pac.repository.interface";
import { PacRepository } from "@/repositories/prisma/pac.repository";
import { createBaseUseCaseFactory } from "@/use-cases/base/base-use-cases-factory";
import { Formatado, formatarStatusAtivoEId } from "@/utils/format-status-ativo";

const repository: IPacRepository = new PacRepository();

type IPacFormatado = Formatado<IPac, "id_pac">;

const formatPac = (
  data: IPac[]
): IPacFormatado[] =>
  formatarStatusAtivoEId<IPac, "id_pac">(data, "id_pac");

export const pacUseCases = createBaseUseCaseFactory<
  IPac,
  IPacFormatado
>(repository, {
  formatListData: formatPac,
  formatSearchData: formatPac,
});