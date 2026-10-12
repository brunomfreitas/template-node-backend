import { IFiguraFundo } from "@/domains/interfaces/figura-fundo.interface";
import { IFiguraFundoRepository } from "@/repositories/interfaces/figura-fundo.repository.interface";
import { FiguraFundoRepository } from "@/repositories/prisma/figura-fundo.repository";
import { createBaseUseCaseFactory } from "@/use-cases/base/base-use-cases-factory";
import { Formatado, formatarStatusAtivoEId } from "@/utils/format-status-ativo";

const repository: IFiguraFundoRepository = new FiguraFundoRepository();

type IFiguraFundoFormatado = Formatado<IFiguraFundo, "id_figura_fundo">;

const formatFiguraFundo = (
  data: IFiguraFundo[]
): IFiguraFundoFormatado[] =>
  formatarStatusAtivoEId<IFiguraFundo, "id_figura_fundo">(data, "id_figura_fundo");

export const figuraFundoUseCases = createBaseUseCaseFactory<
  IFiguraFundo,
  IFiguraFundoFormatado
>(repository, {
  formatListData: formatFiguraFundo,
  formatSearchData: formatFiguraFundo,
});