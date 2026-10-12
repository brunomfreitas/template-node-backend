import { ExportTemplateProntuarioExcelUseCase } from '@/use-cases/prontuario/export-template-excel';
import { Request, Response } from 'express';

export async function exportTemplateExcel(
  req: Request,
  res: Response,
) {
  const useCase =
    new ExportTemplateProntuarioExcelUseCase();

  const filePath = await useCase.handler();

  return res.download(filePath);
}
