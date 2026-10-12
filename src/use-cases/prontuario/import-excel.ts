import { IProntuarioImport } from '@/domains/interfaces/prontuario.interface';
import prismaClient from '@/lib/prisma/prisma';
import { ProntuarioRepository } from '@/repositories/prisma/prontuario.repository';
import { parseExcel } from '@/utils/excel/parse-excel';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import fs from 'fs/promises';
import { z } from 'zod';

dayjs.extend(customParseFormat);

const nullableText = z.preprocess(
  (value) => value == null || String(value).trim() === '' ? null : String(value).trim(),
  z.string().nullable(),
);
const nullableId = z.preprocess(
  (value) => value == null || String(value).trim() === '' ? null : value,
  z.coerce.number().int().positive().nullable(),
);
const dateField = z.preprocess((value) => {
  if (value == null || String(value).trim() === '') return null;
  if (value instanceof Date) return value;
  const parsed = dayjs(String(value).trim(), ['DD/MM/YYYY HH:mm', 'DD/MM/YYYY'], true);
  return parsed.isValid() ? parsed.toDate() : value;
}, z.date().nullable());

const prontuarioSchema = z.object({
  PRONTUARIO: z.string().trim().min(1).transform((value) => value.toUpperCase()),
  DH_INICIO_ATENDIMENTO: dateField,
  DH_TERMINO_ATENDIMENTO: dateField,
  PACIENTE: z.string().trim().min(1).transform((value) => value.toUpperCase()),
  RESPONSÁVEL: nullableText,
  TELEFONE: nullableText,
  DECLARACAO: nullableText,
  ESCOLA: nullableText,
  SÉRIE: nullableText,
  TURNO: nullableText,
  FONOAUDIOLOGO: z.coerce.number().int().positive(),
  ASSISTENTE: nullableId,
  ORGANIZACAO: z.string().trim().min(1),
  SITE: z.string().trim().min(1),
  ST_ATENDIMENTO: z.string().trim().min(1),
  ST_PRONTUARIO: z.string().trim().min(1),
});

const repository = new ProntuarioRepository();

const findDomainValue = async (alias: string, description: string | null) => {
  if (!description) return null;
  return prismaClient.dominio_valor.findFirst({
    where: {
      dominio: { ds_alias: alias },
      ds_dominio_valor: { equals: description, mode: 'insensitive' },
      st_ativo: true,
    },
  });
};

export class ImportProntuarioExcelUseCase {
  async handler(filePath: string) {
    try {
      const rows = parseExcel(filePath);
      const success: unknown[] = [];
      const errors: Array<{ linha: number; erro: string; dados: unknown }> = [];

      for (const [index, row] of rows.entries()) {
        try {
          const parsed = prontuarioSchema.parse(row);
          const organizacao = await prismaClient.organizacao.findFirst({
            where: { nm_organizacao: { equals: parsed.ORGANIZACAO, mode: 'insensitive' }, st_ativo: true },
          });
          if (!organizacao) throw new Error(`Organização inválida: ${parsed.ORGANIZACAO}`);

          const site = await prismaClient.site.findFirst({
            where: { nm_site: { equals: parsed.SITE, mode: 'insensitive' }, id_organizacao: organizacao.id_organizacao, st_ativo: true },
          });
          if (!site) throw new Error(`Site inválido para a organização informada: ${parsed.SITE}`);

          const paciente = await prismaClient.pessoa.findFirst({
            where: {
              nm_pessoa: { equals: parsed.PACIENTE, mode: 'insensitive' },
              id_organizacao: organizacao.id_organizacao,
              id_site: site.id_site,
              st_ativo: true,
            },
          });
          if (!paciente) throw new Error(`Paciente inválido: ${parsed.PACIENTE}`);

          const [statusProntuario, statusAtendimento, escola, serie, turno, fonoaudiologo, assistente] = await Promise.all([
            findDomainValue('ST_PRONTUARIO', parsed.ST_PRONTUARIO),
            findDomainValue('ST_ATENDIMENTO', parsed.ST_ATENDIMENTO),
            findDomainValue('ESCOLAS', parsed.ESCOLA),
            findDomainValue('SERIES', parsed['SÉRIE']),
            findDomainValue('TURNOS', parsed.TURNO),
            prismaClient.empresa_pessoa.findFirst({ where: { id_empresa_pessoa: parsed.FONOAUDIOLOGO, id_organizacao: organizacao.id_organizacao, st_ativo: true } }),
            parsed.ASSISTENTE
              ? prismaClient.empresa_pessoa.findFirst({ where: { id_empresa_pessoa: parsed.ASSISTENTE, id_organizacao: organizacao.id_organizacao, st_ativo: true } })
              : Promise.resolve(null),
          ]);

          if (!statusProntuario) throw new Error(`Status do prontuário inválido: ${parsed.ST_PRONTUARIO}`);
          if (!statusAtendimento) throw new Error(`Status do atendimento inválido: ${parsed.ST_ATENDIMENTO}`);
          if (parsed.ESCOLA && !escola) throw new Error(`Escola inválida: ${parsed.ESCOLA}`);
          if (parsed['SÉRIE'] && !serie) throw new Error(`Série inválida: ${parsed['SÉRIE']}`);
          if (parsed.TURNO && !turno) throw new Error(`Turno inválido: ${parsed.TURNO}`);
          if (!fonoaudiologo) throw new Error(`Fonoaudiólogo inválido: ${parsed.FONOAUDIOLOGO}`);
          if (parsed.ASSISTENTE && !assistente) throw new Error(`Assistente inválido: ${parsed.ASSISTENTE}`);

          const data: IProntuarioImport = {
            ds_prontuario: parsed.PRONTUARIO,
            dh_inicio_atendimento: parsed.DH_INICIO_ATENDIMENTO,
            dh_termino_atendimento: parsed.DH_TERMINO_ATENDIMENTO,
            id_paciente: paciente.id_pessoa,
            nm_responsavel: parsed['RESPONSÁVEL'],
            nr_telefone_responsavel: parsed.TELEFONE,
            ds_declaracao_responsavel: parsed.DECLARACAO,
            id_escola: escola?.id_dominio_valor ?? null,
            cs_serie: serie?.id_dominio_valor ?? null,
            cs_turno: turno?.id_dominio_valor ?? null,
            id_fonoaudiologo: fonoaudiologo.id_empresa_pessoa,
            id_assistente: assistente?.id_empresa_pessoa ?? null,
            id_organizacao: organizacao.id_organizacao,
            id_site: site.id_site,
            id_st_atendimento: statusAtendimento.id_dominio_valor,
            id_st_prontuario: statusProntuario.id_dominio_valor,
          };
          success.push(await repository.create(data));
        } catch (error: any) {
          errors.push({
            linha: index + 2,
            erro: error instanceof z.ZodError
              ? error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
              : error.message,
            dados: row,
          });
        }
      }

      return { total: rows.length, importados: success.length, erros: errors.length, detalhesErros: errors };
    } finally {
      await fs.unlink(filePath).catch(() => undefined);
    }
  }
}
