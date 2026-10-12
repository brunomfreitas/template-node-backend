// src/repositories/prisma/company.repository.ts
import { PrismaBaseRepository } from '@/repositories/prisma/prisma-base.repository';
import { ICompanyRepository } from "../interfaces/company.repository.interface";

export class CompanyRepository extends PrismaBaseRepository<'company', 'id_company'> implements ICompanyRepository
{
  constructor() {
	super('company', 'id_company', {
	  table: 'cognitio.company',
	  defaultColumns: "id_company, nr_cnpj, nm_company, ds_sector, ds_subsector, ds_segment, dt_cadastro, dt_atualizacao, dt_exclusao, st_ativo",
	  onlyActiveField: 'st_ativo'
	});
  }
}
