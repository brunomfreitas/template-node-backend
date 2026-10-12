import { ImportProntuarioExcelUseCase } from '@/use-cases/prontuario/import-excel';
import { Request, Response } from 'express';

export async function importExcel(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Arquivo não enviado',
      });
    }

    const useCase = new ImportProntuarioExcelUseCase();

    const result = await useCase.handler(req.file.path);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
